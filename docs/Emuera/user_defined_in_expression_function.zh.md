# 用户定义的表达式函数  
除了内置函数外，还可以在表达式中调用用`@～～`定义的函数作为"表达式中可使用的函数"。  
关于"表达式中可使用的函数"中的内置函数，请参考[表达式中可使用的函数](../Reference/README.md)。  

## 格式
被调用的函数必须带有`#FUNCTION`标志或`#FUNCTIONS`标志，并以`RETURNF`结束。  

添加`#FUNCTION`会被识别为返回数值的函数。  
添加`#FUNCTIONS`会被识别为返回字符串的函数。  
带有`#FUNCTION(S)`的函数不能用通常的[`RETURN`](../Reference/RETURN.md)结束。而是用`RETURNF`结束。  
`RETURNF`需要指定数值表达式或字符串表达式。这必须与`#FUNCTION(S)`所指示的类型一致。  
省略`RETURNF`的参数，或在没有`RETURNF`的情况下到达函数末端时，返回`0`或空字符串。  

	X = GET_CFLAG(TARGET, Y)  
	STR = %GET_NAME(TARGET)%  

	@GET_CFLAG(ARG:0, ARG:1)  
	#FUNCTION  
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM  
			RETURNF 0  
		RETURNF CFLAG:(ARG:0):(ARG:1)  

	@GET_NAME(ARG:0)  
	#FUNCTIONS  
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM  
			RETURNF ""  
		RETURNF NAME:(ARG:0)  

※虽然函数定义的参数用`()`括起来，但这不是定义时的必要语法。  
调用表达式函数时，必须使用用`()`括起来的语法。  
也可以像通常函数一样用逗号分隔函数名和参数。  
以下两行意思相同。  

	@GET_CFLAG(ARG:0, ARG:1)  
	@GET_CFLAG, ARG, ARG:1  

另外，可以为参数设置初始值。
关于初始值的语法，请参考[自定义函数中的参数指定](./function.md#_2)。  

## 限制  
### 无法从CALL调用  
带有`FUNCTION(S)`标志的函数无法通过[`CALL`](../Reference/CALL.md)等通常调用方式调用。  
只能在表达式中调用。  

		;错误  
		CALL GET_CFLAG, X, Y  
	@GET_CFLAG(ARG:0, ARG:1)  
	#FUNCTION  
		SIF ARG:0 <= 0 || ARG:0 >= CHARANUM  
			RETURNF 0  
		RETURNF CFLAG:(ARG:0):(ARG:1)  

可以通过专用于调用`#FUNCTION(S)`的指令`CALLF`、`CALLFORMF`进行调用。  

### 部分指令不可使用
在带有`FUNCTION(S)`标志的函数中，不能使用[`WAIT`](../Reference/WAIT.md)等伴随输入的指令、`CALL`等伴随函数调用的指令。  
使用时会出错。  

虽然不能使用`CALL`指令，但可以在表达式中调用带有`FUNCTION(S)`标志的函数。  
另外，也可以通过`CALLF`、`CALLFORMF`指令调用`#FUNCTION(S)`。  

### 无法重载  
无法根据参数数量、类型的不同区分调用多个`#FUNCTION(S)`函数。  
同名函数只能定义一个，定义多个同名函数时只有第一个定义的函数有效。  

### 覆盖内置函数  
定义与内置函数同名的函数时，该内置函数将无法调用。  
例如，定义`@ABS`后就无法调用原来的ABS。  
内置函数被覆盖时，Emuera启动时会显示警告。  
由于内置函数被覆盖可能导致非预期动作，可以通过配置禁止函数覆盖。  
也有配置选项可以不警告即使被覆盖（仅在有意覆盖时，不推荐）。  

## 注意事项  
不应该在带有`FUNCTION(S)`标志的函数中改变局部变量以外的变量。  
改变局部变量以外的变量的函数（有副作用的函数）可能因后述的短路评估或表达式评估顺序等导致动作改变。  
另外，由于调试命令或调试用变量监视窗口等的意外调用，可能导致非预期动作。  

### 短路评估导致的调用省略  
即使表达式中有函数，也可能因短路评估而不被调用。  

例如以下脚本，在[`IF`](../Reference/IF.md)语句中调用`GET_ASSI_CFLAG`，在`GET_ASSI_CFLAG`中修改`ASSI`。  

		IF X || GET_ASSI_CFLAG(0)  
			Y = CFLAG:ASSI:2  
		ENDIF  
	@GET_ASSI_CFLAG(ARG:0)  
	#FUNCTION  
		SIF ASSI < 0  
			ASSI = 0  
		RETURNF CFLAG:ASSI:(ARG:0)  

乍一看，`Y = CFLAG:ASSI:2`执行时似乎不会出现`ASSI < 0`的情况。  
但是，当`X`不为`0`时，因短路评估`GET_ASSI_CFLAG`不会执行，因此可能在`ASSI < 0`状态下尝试评估`CFLAG:ASSI:2`而出错。  

### 因表达式评估顺序导致结果改变  
表达式中的变量·函数评估顺序是不确定的。  
有副作用的函数可能依赖于表达式中函数的调用顺序。  
请不要编写此类代码。  
虽然在相同版本的Emuera中调用顺序应该是相同的，但未来可能会更改。  
在以下脚本中，在`@ADDCHARA_CFLAG`中修改`TARGET`。  

		X = CFLAG:TARGET:10 + ADDCHARA_CFLAG(0)  
	@ADDCHARA_CFLAG(ARG)  
	#FUNCTION  
		ADDCHARA ARG  
		TARGET = CHARANUM -1  
		RETURNF CFLAG:TARGET:2  

根据是在`@ADDCHARA_CFLAG`之前还是之后评估`CFLAG:TARGET:10`，`CFLAG:TARGET:10`所指的变量会改变。  
因此此脚本依赖于评估顺序。  
不应在带有`#FUNCTION(S)`标志的函数中使用[`ADDCHARA`](../Reference/ADDCHARA.md)或给`TARGET`赋值。  
可能通过调试功能被调用  
带有`#FUNCTION(S)`标志的函数不仅可能从`*.ERB`文件中的脚本调用，还可能从调试命令或调试用变量监视窗口动态调用。  
特别是变量监视频繁尝试更新值，每次更新时都会调用该函数。  
有副作用的函数可能因这种调用而误动作。  