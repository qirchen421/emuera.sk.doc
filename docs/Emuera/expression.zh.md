# Emuera中新增的语法  
## 行末注释  

	A = B ;将B赋值给A  

这样可以在行末插入注释  
不过，也有例外，如[`PRINT`](../Reference/PRINT.zh.md)指令那样参数为简单字符串的指令，不会被注释化，而是被评价为字符串的一部分  

	PRINT foobar;霍格霍格  

这种情况下，会`PRINT` `foobar;霍格霍格`  

## 行连接  

	{  
		DIM CONST HOGE =  
			1,2,3,4  
	}  

这样写会被解释为`#DIM CONST HOGE = 1,2,3,4`  
`{`、`}`行不能有空白字符以外的其他字符  
换行符号的位置会补充半角空格  
也就是说不能在函数名·变量名中间分割行，  
分割`PRINT`等会导致显示字符串中包含换行时的半角空格  
在Emuera的语法解释中，行连接处理在注释解释之前进行  
也就是说  

	{  
		#DIM CONST HOGE =  
			1,2,3,4 ;注释  
			,5,6,7,8  
	}  

会变成`#DIM CONST HOGE = 1,2,3,4 ;注释 ,5,6,7,8`，  
`,5,6,7,8`被视为行末注释的一部分而被忽略  

## 特殊注释行  
### `;!;`  
无论Emuera还是eramaker，以`;`开头的行都被视为注释行，但Emuera将`;!;`开头的行视为有效行而非注释。  
在eramaker中不想执行的语句可以这样写。  
例如，在`@SHOWSHOP`中加入以下脚本可以禁止在Emuera中运行。  

	;!;PRINTW 此脚本无法在Emuera中运行  
	;!;QUIT  

另外，与`[SKIPSTART]`和`[SKIPEND]`一起使用时，可以像以下脚本一样禁止在Emuera以外运行。  
请在不想在Emuera以外执行的语句中使用。  

	;!;[SKIPSTART]  
	PRINTW 此脚本无法在Emuera以外运行  
	QUIT  
	;!;[SKIPEND]  

### `;#;`  
以`;#;`开头的行只在调试模式时执行。  
非调试模式时被视为注释行不执行。  
但是，`DEBUG`系列指令原本在非调试模式时就被忽略，所以不需要在行首添加`;#;`。  
同样，调试变量在非调试模式时也为空字符串或0，不用担心出错。  
关于调试模式请参考这里。  

## 角色数组  
eramaker中可能只为角色创建准备了100个数组。  
因此，即使在`chara3.csv`和`chara03.csv`和`chara3B.csv`中分别定义不同的角色，也只有一个生效。  
Emuera中只要内存允许，可以定义任意多个角色。  
另外，只要是符合`chara*.csv`的，`chara101.csv`、`charaABC.csv`等任何文件都会读取。  
角色注册编号 (NO) 重复，在使用[`ADDCHARA`](../Reference/ADDCHARA.zh.md)或`ADDSPCHARA`时有多个候选时，只有先读取的那个生效。  

## 整数类型的值范围  
eramaker中可处理的整数是32位有符号整数，即`-2147483648～2147483647`范围。  
Emuera中与吉里吉里一样，处理64位有符号整数，`-9223372036854775808～9223372036854775807`范围的值。  

## 数组变量批量赋值  

	A:10 = 1,2,3  
	DA:0:0 = 1,2,3  

像上面这样写时，分别将`1`,`2`,`3`赋值给`A:10`～`A:12`  
像下面这样的多维数组中，分别将`1`,`2`,`3`赋值给`DA:0:0`～`DA:0:2`  
不会在`DA:0:0`～`DA:0:99`之后赋值给`DA:1:0`，而是数组越界引用错误  
不过，复合赋值运算不能使用（不能写`A += 1,2,3`等）。  
另外，对字符串型数组变量赋值使用批量赋值时，必须使用[字符串表达式赋值](#_9)  

	;STR:20被赋值为"草莓,蜜瓜,蓝色夏威夷"这样的字符串  
	STR:20 = 草莓,蜜瓜,蓝色夏威夷  
	;分别将"草莓""蜜瓜""蓝色夏威夷"赋值给STR:20～STR22  
	STR:20 '= "草莓", "蜜瓜", "蓝色夏威夷"  

## 使用FORM语法对字符串变量赋值  
对字符串变量赋值时，可以使用与[`PRINTFORM`](../Reference/PRINT.zh.md)相同的形式指定要赋值的字符串。  

	SAVESTR:0 = %RESULTS%  

这句中可以将`RESULTS`的内容赋值给`SAVESTR:0`。  
同一语句在eramaker中会将字符串`%RESULTS%`本身赋值给`SAVESTR:0`。  
在Emuera中想将字符串`%RESULTS%`本身赋值时，请如下书写。  

	SAVESTR:0 = \%RESULT\%  

`\`符号后面的字符不会被当作系统符号处理。  
想在字符串中包含`\`符号本身时，请写成`\\`  
虽然不太常见，但想让eramaker和Emuera有相同动作时，需要如下书写。  

	;!;SAVESTR:0 = \%RESULT\%  
	;!;[SKIPSTART]  
	SAVESTR:0 = %RESULTS%  
	;!;[SKIPEND]  

## 使用字符串表达式对字符串变量赋值  
从ver1813开始的Emuera中，新增了可以用赋值运算符`'=`和字符串表达式对字符串变量赋值的功能。  

	;"STR = あいう"与之相同  
	STR '= "あいう"  
	;"STR = %TSTR:0%いろは"与之相同  
	STR '= TSTR:0 + "いろは"  

## 用字符串指定数组变量元素 { #string-array-element }  
以下变量，可以用`*.csv`中定义的字符串作为参数调用。  
关于Emuera新增变量的详细信息，请参阅Emuera新增的[扩展语法 - 常量·变量](variables.zh.md)。  

	ITEM (item.csv)  
	ITEMSALES (item.csv)  
	LOSEBASE (base.csv)  
	BASE (base.csv)  
	MAXBASE (base.csv)  
	ABL (abl.csv)  
	TALENT (talent.csv)  
	EXP (exp.csv)  
	MARK (mark.csv)  
	RELATION (chara*.csv)  
	UP (palam.csv)  
	DOWN (palam.csv)  
	PALAM (palam.csv)  
	JUEL (palam.csv)  
	GOTJUEL (palam.csv)  
	STAIN (stain.csv)  
	SOURCE (source.csv)  
	EX (ex.csv)  
	NOWEX (ex.csv)  
	TEQUIP (tequip.csv)  
	EQUIP (equip.csv)  
	FLAG (flag.csv)  
	TFLAG (tflag.csv)  
	CFLAG (cflag.csv)  
	STR (strname.csv)  
	SAVESTR (savestr.csv)  
	以下是Emuera新增的变量  
	ITEMPRICE (item.csv)  
	DOWNBASE (base.csv)  
	CUP (palam.csv)  
	CDOWN (palam.csv)  
	TCVAR (tcvar.csv)  
	TSTR (tstr.csv)  
	CSTR (cstr.csv)  
	CDFLAG (cdflag1.csv, cdflag2.csv)  
	GLOBAL (global.csv)  
	GLOBALS (globals.csv)  

例如，如果`abl.csv`中有`2,技巧`这样的定义，则以下4行含义相同。  

	ABL:技巧 += 1  
	ABL:2 += 1  
	ABL:"技巧" += 1  
	ABL:(ABLNAME:2) += 1  

`RELATION`可以用`NAME`或`CALLNAME`指定。  
同名有多个定义时，优先调用先定义的。  
例如，如果`abl.csv`中有`2,技巧`和`4,技巧`，且`2,技巧`在前面的行中定义，则`ABL:技巧`等同于`ABL:2`。  
字符串也可以是表达式或变量。这种情况下请如下添加()。  

	ABL:(RESULTS:0) = ABL:(RESULTS:0) + 1  

省略`()`时，可能存在物品名与变量名相同的情况。这种情况下优先使用变量。  
例如，即使`abl.csv`中有`0,罗塔`这样的定义，  

	@HOGE  
	#DIM 罗塔, 0  
	罗塔 = 1  
	PRINTFORML {ABL:罗塔}  

这种情况下，会被解释为1号`ABL`而不是0号`ABL`。  
同样，如果物品名是数值，则优先按数值解释。  
例如，如果`abl.csv`中有`0,10`这样的定义，引用`ABL:10`时不会被解释为0号`ABL`而是10号`ABL`。  
这也可以在`chara*.csv`的定义中使用。  
例如，如果`abl.csv`中有`2,技巧`这样的定义，则以下2行含义相同。  

	能力,2,2  
	能力,技巧,2  

不过，不能用于相性(`RELATION`)。  
因为在读取`chara*.csv`阶段，系统还未掌握`chara`的姓名与`NO`的对应关系。  

## 格式化字符串（FORM语法）扩展  
在[`PRINTFORM`](../Reference/PRINT.zh.md)等使用的格式化字符串中，可以为`{}`、`%%`指定显示位数（字符数）。  
指定格式为`{变量·表达式等,显示位数, 对齐(LEFT or RIGHT)}`、`%变量、字符串表达式等, 显示位数, 对齐(LEFT or RIGHT)%`。  
字符数按全角字符算2字符计算。  
不足显示位数（字符数）的部分会补充半角空格。  
通常为右对齐，指定关键词`LEFT`则为左对齐。  
指定的显示位数小于原始位数时，按原样显示。  

**示例**  

	A = 123456  
	STR:0 = あいう  
	PRINTFORML [{A}]  
	PRINTFORML [{A,10}]  
	PRINTFORML [{A,10,LEFT}]  
	PRINTFORML [%STR:0%]  
	PRINTFORML [%STR:0,10%]  
	PRINTFORML [%STR:0,10,LEFT%]  
	PRINTFORML [{A,2}]  
	PRINTFORML [%STR:0,2%]  

**结果**  

	[123456]  
	[  123456]  
	[123456  ]  
	[あいう]  
	[  あいう]  
	[あいう  ]  
	[123456]  
	[あいう]  

## 在字符串表达式中使用格式化字符串（`FORM`语法）  
在`PRINTS`或用户定义的表达式函数参数等字符串表达式中使用`FORM`语法时会出错。  
因此，在字符串表达式中使用格式化字符串时，与在字符串表达式中使用定字符串时使用`"～"`一样，  
使用`@"～"`。另外，如果`@"～"`中的字符串仅为`\@～\@`的三元运算子记述，则可以省略`@"～"`直接写成`\@～\@`。  

**正确示例**  

	;赋值使用FORM语法  
	STR:0 = あいう  
	;加法使用字符串表达式  
	RESULTS += STR:0  
	;字符串表达式中使用定字符串示例  
	RESULTS += "えお"  
	;字符串表达式中使用FORM语法示例  
	PRINTS @"%RESULTS%かきくけこ"  

	;以下4行都相同  
	PRINTS STR:0 + "！"  
	PRINTFORM %STR:0%！  
	PRINTS @"%STR:0%！"  
	PRINTFORM %STR:0 + "！"%  

**错误示例**  

	;内容为"RESULTS"  
	STR:0 = RESULTS  
	;出错  
	RESULTS += えお  
	;出错  
	RESULTS += %STR:0%  
	;显示"@"和""  
	PRINTFORM @"%RESULTS%かきくけこ"  

## `INPUTS`系列中使用宏语法  
在[`INPUTS`](../Reference/INPUT.zh.md)及类似输入接收指令中，可以使用宏表达式。  
关于宏的语法，请参考使用方法中的宏项。  
如果不使用宏语法，单纯将`()`作为字符串使用时，请使用`\`转义。  