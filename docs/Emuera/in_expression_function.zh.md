# 表达式中可使用的函数  
**本页面解释的语法不是必需的。**  
**ERB中所有能做的事情都可以不使用"表达式中可使用的函数"（只是脚本会稍微变长）来执行。**  
**如果对至今为止的语法没有感到不便，则没有必要使用"表达式中可使用的函数"。**  

"表达式中可使用的函数"是在Emuera ver 1.712中新增的语法。  
这在许多编程语言中简称为"函数"。  
在eramaker basic中，将用`@～～`定义并用[`CALL`](../Reference/CALL.zh.md)调用的称为"函数"，因此在Emuera中将新的"函数"称为"表达式中可使用的函数"。  
以下，如无误解可能，将"表达式中可使用的函数"简称为函数。  

另外，在其他页面中"表达式中可使用的函数"可能会简称为"表达式函数"。  
但是，这与其它编程语言中的表达式函数（匿名函数）或内联函数无关。  
非内置函数、在ERB中定义使用的"表达式中可使用的函数"请参考[用户定义的表达式函数](./user_defined_in_expression_function.zh.md)。  

"表达式中可使用的函数"使用方法如下。  

	A = ABS(A)  
	IF STRLENS(STR:0) > A  
		LOCALS:0 = %SUBSTRING(STR:0, A, 1)%  
	ENDIF  

这是，  
求A的绝对值并赋值给A，  
如果`STR:0`的字符串长度大于`A`，  
将`STR:0`的第`A`个字符赋值给`LOCALS:0`，  
这样的脚本。  
上述脚本可以替换为不使用"表达式中可使用的函数"的形式，如下所示。  

	ABS A  
	A = RESULT  
	STRLENS STR:0  
	IF RESULT > A  
		SUBSTRING STR:0, A, 1  
		LOCALS:0 = %RESULTS:0%  
	ENDIF  

除了`RESULT`和`RESULTS`被赋予中间值外，与上述完全相同。

# 图例
以下是对说明中符号的解释。
例如，

	int STRLENS(str s)  
	str SUBSTRING(str s, int start = 0, int length = -1)  

等中，开头的`int`和`str`表示返回值类型。  
`int`表示整数型，`str`表示字符串型。  
以下脚本中第1行正常运行，第2行会出错。  

	A = STRLENS("abc")  
	A = SUBSTRING("abc", 0, 1)  

[`SUBSTRING`](../Reference/SUBSTRING.zh.md)的返回值是`str`，即字符串型，所以不能赋值给整数型变量`A`。虽然字符串型函数不能赋值，但在其他方面可以像字符串变量一样处理。  

	STR = %SUBSTRING("abc", 0, 1)%

接下来的[`STRLENS`](../Reference/STRLEN.zh.md)和`SUBSTRING`是函数名称。  

`()`中的文字，如`str s`表示参数。
如果有多个参数，用`,`（逗号）分隔。`STRLENS`有1个参数，`SUBSTRING`有3个参数。  

参数开头的单词是参数类型。  
`STRLENS`的参数是字符串型(str)。  
`SUBSTRING`第1参数是字符串型(str)，第2和第3参数是整数型(int)。  
接下来的`str`、`start`、`length`等单词是参数名称。  
参数名称是为了在说明文中使用而设置的方便名称，不必特别在意。  

参数名称后面的`= 0`等表示该参数可省略，以及省略时的默认值。  
以下脚本各行都具有相同含义。  

	STR = SUBSTRING(RESULTS)  
	STR = SUBSTRING(RESULTS, 0)  
	STR = SUBSTRING(RESULTS, , -1)  
	STR = SUBSTRING(RESULTS, 0, -1)  

在省略参数时，如果不是省略最后的参数而是省略中间的参数，需要像`SUBSTRING(RESULTS, , -1)`这样用`,`表明省略了哪个参数。  
但是，如果明显知道省略了哪个参数则不需要。  
以下脚本各行都具有相同含义。  

	;int RAND(int min = 0, int max)  
	A = RAND(100)  
	A = RAND( , 100)  
	A = RAND(0, 100)  

另外，  

	int GETTIME()  

表示没有参数。这种情况下，`()`仍是必需的（为了与变量区分）。  

	int FINDCHARA(var key, ? value, int start = 0)  

中，`var`表示变量类型。这里传递`TALENT`等变量。  
?表示接受多种类型。  
`FINDCHARA`中，根据第1参数指定的变量，第2参数应传递的类型会改变。  

	int MAX(int n, int m...)

表示参数数量不限。  

	M = MAX(A, B, C, D, E, F, G)  

将A～G中最大的数字赋值给M。  

EM+EE的文档中记法略有不同。