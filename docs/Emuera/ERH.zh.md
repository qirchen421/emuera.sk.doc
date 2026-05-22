# 头文件  
在ERB文件夹中，除了扩展名为ERB的文件外，还可以放置扩展名为ERH的文件。  
ERH文件中应写入需要在ERB之前处理的内容。  
具体来说，就是用`#DIM`和`#DIMS`定义全局变量和用`#DEFINE`定义宏。  
在头文件中不能写入`#DIM`、`#DIMS`和`#DEFINE`以外的行。  

Emuera会读取ERB文件夹中的所有`*.ERH`文件。  
处理顺序是`csv文件夹内的文件`→`*.ERH`→`*.ERB`，所以ERH的效果不会影响CSV文件夹内的内容。  
相反，`_rename.csv`的替换也会应用到`*.ERH`。  
eramakerEX不会对`*.ERH`应用`_rename.csv`，因此使用ERH文件会失去与`eramakerEX`的兼容性。  

## 全局变量的声明  
※请同时参考[用户定义](./user_defined_variables.zh.md)的变量。  

头文件中可以声明新变量。  
这与在ERB中声明的私有变量不同，成为可以在ERB中所有地方引用的全局变量。  
与私有变量不同，没有`DYNAMIC`、`STATIC`的区别，也不能声明使用`REF`的引用型变量，但可以像平常一样声明使用`CONST`的常量。  
可声明的变量最多可定义三维数组。  
如果不指定元素数，将成为元素数为1的数组，可以像非数组变量一样使用。  
变量声明按如下方式使用`#DIM`或`#DIMS`进行。  
例如，`#DIM HOGE,1,2`会成为二维数组。  

	<*.ERH>  
		#DIM MY_INT  
		#DIM MY_INT_ARRAY, 100  
		#DIMS MY_STR  
		#DIMS MY_STR_ARRAY, 100  

在ERH中按上述方式定义后，在ERB中可以如下使用变量：  

	<*.ERB>  
		MY_INT = 100  
		MY_INT_ARRAY:10 = MY_INT_ARRAY:10 + 45  
		MY_STR = 哎呀呀  
		PRINTFORML {MY_INT_ARRAY:10} %MY_STR%  

`#DIM`变量声明的元素数指定除了数值外，也可以用常量表达式指定。  
但请注意，与`*.ERB`中的`#DIM`不同，宏不会展开。  

### `SAVEDATA` 关键字  

在变量声明时添加`SAVEDATA`关键字可以声明可保存的变量。  
但是，使用`SAVEDATA`关键字声明可保存的多维变量时，选项`以二进制格式保存存档数据`必须启用。  

	<*.ERH>  
		#DIM SAVEDATA MY_INT_ARRAY, 100  
		#DIMS SAVEDATA MY_STR_ARRAY, 100  

这样声明后，`MY_INT_ARRAY`、`MY_STR_ARRAY`的内容会与`DAY`、`MONEY`等现有变量一样被保存和加载。  
换句话说，没有添加`SAVEDATA`关键字声明的变量不会被保存，加载时会被初始化。  

### `CHARADATA` 关键字  
在变量声明时添加`CHARADATA`关键字可以声明角色变量。  
`CHARADATA`可以与`SAVEDATA`关键字同时使用。  

	<*.ERH>  
		#DIM CHARADATA C_INT_ARRAY, 100  
		#DIMS CHARADATA C_STR_ARRAY, 100  
		#DIM CHARADATA SAVEDATA CS_INT_ARRAY, 100  

上面的例子中，`C_INT_ARRAY`、`C_STR_ARRAY`是角色变量，但不会被保存加载。  
`CS_INT_ARRAY`既是角色变量，也进行保存和加载。  

### `GLOBAL` 关键字  
在变量声明时添加`GLOBAL`关键字可以声明全局变量。  
`GLOBAL`可以与`SAVEDATA`关键字同时使用。  

	<*.ERH>  
		#DIM GLOBAL G_INT_ARRAY, 100  
		#DIMS GLOBAL G_STR_ARRAY, 100  
		#DIM GLOBAL SAVEDATA GS_INT_ARRAY, 100  

全局变量在通常的保存加载时既不会加载也不会初始化。  
由于这个特性，可以在不同的存档数据之间共享数据。  
当同时使用`GLOBAL`和`SAVEDATA`关键字时，将成为通过`SAVEGLOBAL`、`LOADGLOBAL`指令读写`global.sav`文件的变量。  

其他关于初始值、常量化等详细信息请参考[用户定义的变量](./user_defined_variables.zh.md)。  

## 宏的定义  
这里所说的宏是将ERB代码中的字符串替换为预先定义的另一字符串的功能。  
虽然名为宏，但与Emuera运行中`F1～F12键`可用的键盘宏无关。  
此功能参考了C或C++的`#define`。  
在ERH文件中定义宏后会应用于所有ERB文件内的代码。  

### 基本用法  
宏通常定义如下：  

	<*.ERH>  
		#DEFINE <替换源标识符> <替换后表达式>  

这样在ERB中<替换源标识符>会被替换为<替换后表达式>。例如，在.ERH中  

	<*.ERH>  
		#DEFINE FIVE 5  

预先定义后，.ERB中的FIVE字符串将被替换为5。例如  

	<*.ERB>  
		X = FIVE  

展开为  

	(展开后)  
		X = 5  

宏也可以添加行末注释。  
分号以后的部分会被忽略为注释。  
分号以后的部分不会包含在宏中，也不会被展开。  

	<*.ERH>  
		#DEFINE FIVE 5 ;注释  
	<*.ERB>  
		X = FIVE + FIVE  
	(展开后)  
		X = 5 + 5  

请注意宏的展开几乎是直接进行字符串替换。  

	<*.ERH>  
		#DEFINE SIX       1 + 5  
		#DEFINE NINE      8 + 1  
	<*.ERB>  
		X = SIX * NINE  

你可能以为`X`会被赋值为`6*9`，也就是36，但实际上展开为  

	(展开后)  
		X = 1 + 5 * 8 + 1  

所以乘法优先，结果是`X = 42`。  

宏可以展开为`"～～"`等常量字符串，也可以是变量、函数、表达式。  
只要认为`#DEFINE`右侧的字符串直接展开，大致就能理解。  

	<*.ERH>  
		#DEFINE HOGE    "霍格霍格"  
		#DEFINE PIYO    A  
		#DEFINE FUGA    DA:10  
		#DEFINE HOGERA    LOCAL + MY_FUNC(X, Y)  
	<*.ERB>  
		X = STRLEN(HOGE)  
		Y = PIYO + 5  
		FUGA:20 += PIYO  
		LOCAL = HOGERA  

		@MY_FUNC(ARG, ARG:1)  
		#FUNCTION  
			～略～  
	(展开后)  
		X = STRLEN("霍格霍格")  
		Y = A + 5  
		DA:10:20 += A  
		LOCAL = LOCAL + MY_FUNC(X, Y)  

		@MY_FUNC(ARG, ARG:1)  
		#FUNCTION  
			～略～  

由于宏按字符串直接展开，替换后可以不是完整的表达式，而是运算符或表达式的一部分。  
但不推荐这样使用。  
若不小心使用，会严重损害代码的可读性。  

	<*.ERH>  
		#DEFINE PLUS     +  
		#DEFINE FIVEPLUS   5 +  
	<*.ERB>  
		X = 1 PLUS 2  
		Y = FIVEPLUS 2  
	(展开后)  
		X = 1 + 2  
		Y = 5 + 2  

### 宏的多重展开  
可以定义包含宏的宏。这样的宏在ERB加载时会反复展开，直到无法再应用宏为止。  

	<.ERH>  
		#DEFINE FIVE_1 5  
		#DEFINE FIVE_2 FIVE_1 + FIVE_1  
		#DEFINE FIVE_3 FIVE_2 + FIVE_2  
	<.ERB>  
		X = FIVE_3  
	(展开后)  
		X = 5 + 5 + 5 + 5  

即使重复展开一定次数后宏仍然存在，Emuera会认为是自引用或循环引用宏而停止处理并报错。  
请注意不要创建如下自引用或循环引用的宏。  

	<.ERH>  
		#DEFINE HOGE HOGE  
		#DEFINE PIYO FUGA + 1  
		#DEFINE FUGA PIYO + 2  
	<.ERB>  
	;会出错  
		X = HOGE  
		Y = PIYO  

### 预处理器  
可以根据宏是否定义来决定执行多行或分支。  
`[IF XXX]`行和`[ENDIF]`行之间的行只在`XXX`被`DEFINE`时执行。例如如下使用  

	<*.ERB>  
		[IF HOGE]  
			PRINTL HOGE被定义了  
		[ELSEIF PUYO]  
			PRINTL HOGE未被定义  
			PRINTL PUYO被定义了  
		[ELSE]  
			PRINTL HOGE和PUYO都未被定义  
		[ENDIF]  

为此目的，也可以定义空宏（没有替换目标的宏）。  

	<*.ERH>  
		#DEFINE HOGE  

同样的用途，EM+EE也可以使用[`ISDEFINED`](../Reference/ISDEFINED.zh.md)  

### 宏的限制  
宏展开基本只在表达式中进行。  

	<*.ERH>  
		#DEFINE FIVE 5  
	<*.ERB>  
		PRINT FIVE  

只是打印`FIVE`字符。这与`PRINT X`只打印`X`字符而不打印`X`的值是一样的。  

宏的替换目标不能是赋值运算符，也不能包含赋值运算符的表达式。以下宏定义会报错。  

	<*.ERH>  
	;会出错  
		#DEFINE HOGE =  
		#DEFINE PUGE X = 1  

虽然说宏的替换目标可以是表达式的一部分，但括号对应必须在宏内部完成。以下宏定义会报错。  

	<*.ERH>  
	;会出错  
		#DEFINE HOGE ( X +  
		#DEFINE PUGE Y )  
	<*.ERB>  
		Z = HOGE PUGE  

宏的替换目标不能是指令。以下宏定义会报错。  

	<*.ERH>  
		#DEFINE MY_PRINTL   PRINTL  
	<*.ERB>  
		MY_PRINTL 这是PRINTL  
	(展开后)  
		;会出错  

如前所述，宏只应用于`*.ERB`，不应用于`*.csv`和`*.ERH`。  
此外，在`*.ERB`中，预处理器、属性名和行首符号也不应用宏。  
`[SKIPSTART]`等、`#DIM`或`#FUNCTION`等、`@EVENTFIRST`等的`@`部分，都不在替换范围内。  
例如即使`#DEFINE HOGE SKIPSTART`，`[HOGE]`也不会开始注释。  
但是，即使是以`#`开头的字符串，`#DIM`的变量名等也会被替换。  
例如以下代码  

	<*.ERH>  
		#DEFINE HOGE MY_INT  
		#DEFINE FIVE 5  
	<*.ERB>  
		@FUNC  
		#DIM HOGE, FIVE  
		HOGE:0 = 10  
	(展开后)  
		@FUNC  
		#DIM MY_INT, 5  
		MY_INT:0 = 10  

会如此展开，所以能正常运行。  