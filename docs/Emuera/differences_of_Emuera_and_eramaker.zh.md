# 与eramaker的差异点  
## Bug和不自然动作的修复  
### 数组最后一个元素无法使用  
在eramaker中，如果数组的最后一个元素不是0，加载时数据会被**破坏**。  
Emuera中不会出现这个问题。  
这个问题是由于eramaker中保存和加载机制不统一导致的，而Emuera统一使用了保存时的机制。  
因此，用eramaker保存并用Emuera加载不会出现问题，但用Emuera保存并用eramaker加载时会重现此问题。  

### 单目运算符`-`的异常  
eramaker中存在`-100 < 0`为假等问题。  
Emuera中不会出现这个问题。  

### 文件最后一行无法读取  
eramaker会忽略没有换行符的行。  
也就是说，无论是CSV还是ERB，文件的最后一行都会被忽略。  
Emuera不会重现这种行为。  

### 数组有多余元素时被忽略  

	A:1:2 = 34  

上述表达式在eramaker中会将`34`赋值给`A:1`。  
Emuera会将其视为错误。  

### 数组调用时特定格式无法使用  
eramaker中可以使用`A:0`或`A:(COUNT+1)`这样的变量用法。  
然而，对于二维数组变量，写成`ABL:0:2`或`TALENT:(COUNT+1):2`这样的格式时会出错。  
此外，在调用字符串变量时省略参数可能导致错误。  
Emuera不会出现这个问题。  
二维数组参数无论是常数还是表达式都不会出错，字符串变量的参数也可以省略。  

### CSV中异常数值当作整数处理  

	0,罗塔,200  
	0xFF,路由,200  

如果上述内容出现在`Item.csv`中，eramaker会将`0xFF`解释为`0`，并定义`TALENT:0`为路由。  
Emuera不会重现这种情况，而是报错并使此定义无效，`TALENT:0`将被定义为罗塔。  

### 不自然的记号能正常运行  

	A:0:1:99999 +-RESULTS:0=@=+123|*?=Y  

上述表达式在eramaker中可以运行。  
Emuera会将其视为错误。  

## 其他与eramaker运行不同的地方  
[`SIF`](../Reference/IF.md)后直接是空行或注释行等情况  

对于如下脚本：  
	SIF 条件  
		;注释  
		PRINT hogehoge  

eramaker总是执行[`PRINT`](../Reference/PRINT.md)行。  
因为eramaker认为`SIF`的下一行是";注释"。  

Emuera与吉里吉里等一样，只在条件为真时执行`PRINT`行。  
Emuera将空行和注释行完全当作不存在，认为`SIF`的下一行是`PRINT hogehoge`。  
此外，eramaker中可以在`SIF`后放置[`IF`](../Reference/IF.md)语句或REPEAT语句，但这通常会导致与作者意图不同的行为，因此Emuera限制了可以放在`SIF`后的内容。  

### 省略`IF`、`ELSEIF`等参数时的动作  
eramaker中省略`IF`、`ELSEIF`或赋值语句的参数时，动作会不确定。  
不过，省略[`RETURN`](../Reference/RETURN.md)参数时为`RETURN 0`。  
Emuera总是将省略的参数解释为`0`，因此`IF`以下永远不执行，但会被警告。  

### 函数名可使用的字符  
eramaker中符号、全角字符等所有字符都可以使用。  
Emuera中也可以使用全角字符，但除了`_（下划线）`以外的符号不能使用。  
此外，Emuera不建议函数名以半角数字开头。  
以下脚本在eramaker中可以运行，但在Emuera中会报错。  

	CALL \.,)(][+-%*　@&$  

	@\.,)(][+-%*　@&$  
	PRINTL 函数@\.,)(][+-%*　@&$被调用。  
	RETURN 0  

Emuera中，如果函数名包含","或"("，会被误认为是函数参数。  
另外，如果函数名包含"@"或运算符符号等，`LOCAL@函数名`这种调用方式就无法正常工作。  
包含"{}"或"%"时，`CALLFORM`调用会受阻。  
因此，Emuera与C#、吉里吉里等许多编程语言一样，禁止在函数名中使用符号。  
在ver 1.721中，这只是警告级别1，并不会立即错误终止，但可能会出现意外行为。  
另外，如果函数名以半角数字开头，则无法作为`表达式中可使用的函数`(in_expression_functions.md)调用。  
因为在表达式中，会根据第一个字符判断是数字还是变量/函数。  

### `RAND`的规格  

	A = RAND:X  

关于这一点，eramaker中当`X`为`0`时返回`0`。  
其他情况下，返回`(0～32767的随机数) % (X的绝对值)`。  
这种方式即使X为负值也能运行，不会返回`32767`以上的值，当`X`超过1000左右时值的偏差变得不可忽视。  

Emuera不会重现这些特性。  
Emuera返回`(0～18446744073709551615的随机数) % (X)`。  
当`X`为`0`或负值时，Emuera会产生错误。  
（基于官方说明中"RAND:A返回的是0到A-1之间的整数"的描述，为了保持返回值的一致性）  
此外，`X`的有效范围是`1～9223372036854775807`（64位有符号整数的正值范围）。  
只要X在100万亿以下，几乎不会有明显的偏差。  

### `WAIT`的规格  
eramaker中执行[`WAIT`](../Reference/WAIT.md)指令时不换行，按Enter键时才换行。  
Emuera中执行`WAIT`指令时如果光标在行中间则会换行，而在"按Enter键"、"左键单击"等操作时不换行。  

### `JUMP`的规格  
eramaker中无法从通过[`CALL`](../Reference/CALL.md)调用的函数中执行[`JUMP`](../Reference/JUMP.md)。  
Emuera中即使是被`CALL`调用的函数也可以执行`JUMP`。  
在`JUMP`目标处执行[`RETURN`](../Reference/RETURN.md)时，与从`JUMP`源函数返回时动作相同。  

**示例**  

	CALL FOOBAR  

	@FOO  
	PRINTL 函数@FOO  
	JUMP BAR  
	@BAR  
	PRINTL 函数@BAR  
	RETURN 0  
	@FOOBAR  
	PRINTL 函数@FOOBAR  
	CALL FOO  
	PRINTW 返回到函数@FOOBAR  

**执行结果**  
**eramaker（错误）**  

	试图从CALL调用的函数中执行JUMP函数  

**Emuera**  

	函数@FOOBAR  
	函数@FOO  
	函数@BAR  
	返回到函数@FOOBAR  

### CALLNAME的规格  
eramaker中引用`CALLNAME`时，如果`CALLNAME`为空字符串，则返回`NAME`的值。  
Emuera中如果`CALLNAME`为空字符串则返回空字符串。  

为了弥补这个差异，Emuera提供了`当CALLNAME为空字符串时代入NAME`选项。  
当此选项为`YES`时，如果在`chara*.csv`中未设置`CALLNAME`或设置为空字符串，则当作与`NAME`相同字符串处理。  
不过，即使使用此选项也不能完全重现。  
例如，将eramaker中添加角色的存档数据在Emuera中读取时，可能会出现不同的行为。  

### `PRINTFORM`等`FORM`的展开  
eramaker会重复展开直到没有可展开的内容为止。  
如果有自引用或循环引用，会导致程序冻结。  
Emuera只展开一次。  
eramaker的展开大概是按以下方式进行的。  

	str = 要展开的字符串  
	while(str中包含{～～})  
		展开最左边的{～～}  
	while(str中包含%～～%)  
		展开最左边的%～～%  
	while(str中包含***)  
		展开最左边的***  
	while(str中包含$$$)  
		展开最左边的$$$  
	while(str中包含+++)  
		展开最左边的+++  
	while(str中包含///)  
		展开最左边的///  
	while(str中包含===)  
		展开最左边的===  

因此，eramaker中可以做到以下事情。  

**示例**  

	STR:1 = S1%STR:2%3%4%  
	STR:2 = S2%STR:  
	STR:3 = S3%STR:  
	STR:4 = S4  
	PRINTFORMSL STR:1  
	PRINTFORML %STR:1%  
	DRAWLINE   

**结果**  

	;S1S2S3S4  
	;S1S2S3S4  

Emuera不会重现这种情况。  

### EVENT函数的属性  
eramaker中事件函数的调用如下进行。  

	foreach(#PRI标注的函数)  
	{  
		函数调用  
		if(#SINGLE且返回值为1)  
			break;  
	}  
	foreach(既没有#PRI也没有#LATER标注的函数)  
	{  
		函数调用  
		if(#SINGLE且返回值为1)  
			break;  
	}  
	foreach(#LATER标注的函数)  
	{  
		函数调用  
		if(#SINGLE且返回值为1)  
			break;  
	}  

同时标注了`#PRI`和`#LATER`的事件函数会被调用两次。  
`#SINGLE`仅在返回值为`1`时才中断后续函数调用。  
此外，`#SINGLE`引起的函数调用中断是按`#PRI`或`#LATER`组合分别进行的。  
从ver1.800（开发版包括1.756alpha018）开始，Emuera准确重现了这种行为。  

更早的Emuera中，事件函数的调用如下进行。  
根据`#PRI`、`#LATER`对函数列表排序  

	foreach(所有函数)  
	{  
		函数调用  
		if(#SINGLE且返回值为1)  
			break;  
	}  

同时标注`#PRI`和`#LATER`时，会当作两者都没标注一样处理。  
`#SINGLE`中断函数调用时，无论有无`#PRI`、`#LATER`，该事件函数的调用都会结束。  

顺便说一下，Emuera1.751b之前，`#SINGLE`会在返回值非0时中断后续函数调用。  
这在1.752中得到了修正，当前版本中与eramaker一样，只在返回值为1时中断后续函数调用。  

### `gamebase.csv`"代码"的读取方式  
当在[`gamebase.csv`](../eramaker/CSV_format.md#gamebasecsv)的代码中写入超出eramaker可处理数字范围`-2147483648～2147483647`的数值时，  
eramaker会将csv中的值转换为十六进制，并取其后8位作为游戏代码。  
例如，`代码,08231000181818110`的情况下，游戏代码会变为`301712126`，变成eramaker可处理的范围。  

Emuera不会重现这种行为。  
ver1.803以前的Emuera中，`代码,08231000181818110`的情况下，游戏代码会变为`0`。  
Emuera可以处理`-9223372036854775808～9223372036854775807`范围的数字，  
但`GAMEBASE_GAMECODE`与eramaker一样，只能处理`-2147483648～2147483647`范围的数字，超出范围时会变为`0`。  

此外，从ver1.804开始的Emuera中，`代码,08231000181818110`的情况下，游戏代码会按所写变为`8231000181818110`。  
（`GAMEBASE_GAMECODE`也已改为与其他变量同样处理范围的变量）  
这种情况下，如果像`代码,98231000181818110110`一样，数值超出Emuera可处理的范围，游戏代码会变为`0`。  
另外，从ver1.805开始的Emuera中，即使存档数据的游戏代码为`0`，也可以不受游戏端游戏代码的影响进行加载。  

### `abl.csv`等的读取方式  
eramaker中可以为索引指定负值或非常大的值，如`99999:技巧`。  
不过，这里指定的编号会在[`PRINT_ABL`](../Reference/PRINT_STATUS.md)等时使用，因此在`PRINT_ABL`时（在eramaker内部）会引用`ABL:99999`，导致错误。  
因此，实用上可用的值与`ABL`或`TALENT`的数组数量相同。  
在`item.csv`中，`SHOP`引用`ITEM`或`ITEMSALES`时也会出错。  
Emuera中无法指定`ABL`等数组范围外的值。  
这样的行会被忽略。  
作为替代，可以通过`VariableSize.csv`改变数组范围。  

### train.csv的读取方式  
基本上与其他csv文件相同，但略有不同。  
eramaker中即使定义了`XXX,99999`，只要`@COM99999`被定义，就能正常执行。  
另一方面，如果像`YYY,-2`一样定义负值，虽然命令会显示，但选择后什么都不会发生。  

Emuera不会重现这种行为。  
可定义的范围为`VariableSize.csv`中指定的`TRAINNAME`大小，其他会被忽略。  
如果没有改变`TRAINNAME`的大小，则有效范围是`0～999`。  

### chara*.csv的读取方式  
eramaker中，即使`号码`为0以下或1000以上，也能正常执行[`ADDCHARA`](../Reference/ADDCHARA.md)。  
Emuera也是如此。  

eramaker中，如`基础,0`一样，第三位值是必需的情况下省略该值时，会当作`0`处理。  
另外，如`素质,0,100`一样，第三位值不需要时指定值也会被忽略，变为`1`。  
Emuera不会重现这种行为。  
`基础,0`的话`MAXBASE:0`会变为`1`，`素质,0,100`的话`TALENT:0`会变为`100`。  

### 文件换行符  
eramaker中，将`[CR][LF]`和`[LF]`当作换行符，但只有`[CR]`时不会被当作换行符，会出现各种错误行为。  
Emuera不会重现这种行为，只有`[CR]`时也视为换行。  

## 未修复的Bug和不自然行为  
### 文件读取顺序依赖于文件系统  
eramaker basic中，多重定义的函数在被[`CALL`](../Reference/CALL.md)调用时等，动作依赖于文件读取顺序。  
然而，由于eramaker的文件读取顺序依赖于文件系统，可能不会按预期运行。  
Emuera中也会重现这个问题。  
目前公开的许多脚本都假设文件系统是NTFS，如果文件系统是FAT则无法正常运行。  

### REPEAT-REND结束时COUNT递增  
eramaker中，从[`REPEAT-REND`](../Reference/REPEAT.md)退出时`COUNT`会+1。  
即使是用`BREAK`退出也会+1。  
Emuera会重现这种行为。  
`FOR-NEXT`结构中同样会对循环变量+1。  
请注意，这与一般编程语言的`for`结构和`break`语句动作不同。  

### NEXTCOM的动作  
eramaker中`NEXTCOM`的初始值是-1，但`NEXTCOM`执行后被赋的值不是-1而是0。  
因此，除非ERB侧再次赋值，否则会一直重复`COM0`。  
另外，eramaker的官方说明中并未记载`NEXTCOM`的存在。  
Emuera也会重现这种行为。  
`NEXTCOM`功能仅为与eramaker兼容而重现，不推荐使用。  
对于不打算在eramaker中运行的代码，建议考虑使用`DOTRAIN`或`CALLTRAIN`指令。  

## 修改的功能  
### SP角色  
eramaker中，csv中`CFLAG:0`被设置为非0的角色是SP角色。  
需要通过[`ADDCHARA`](../Reference/ADDCHARA.md)注册，而不能用`ADDCHARA`注册，这有点难以理解。  
此外，无意中将`CFLAG:0`设置为非0，导致无法用`ADDCHARA`注册，这也是造成bug的原因之一。  
从ver 1.816开始，Emuera决定默认不支持此功能。  
`CFLAG:0`不再特殊处理，所有角色都可以通过`ADDCHARA`注册。  
虽然可以通过兼容性选项"使用SP角色"重现eramaker的动作，但不推荐将其用于除运行旧脚本以外的目的。  

<!--
## 新增功能
参考Emuera中新增的扩展语法
-->