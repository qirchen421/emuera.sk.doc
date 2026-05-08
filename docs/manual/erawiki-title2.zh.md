# 变体制作/标题实践篇  

原始页面  
[era系列讨论汇总Wiki V3 标题实践篇](https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bc%c2%c1%a9%ca%d4)  

---  

- [教程](erawiki-tutorial.md)  
- [标题准备篇](erawiki-title.md)  
- 标题实践篇  
- [ERB制作实践篇](erawiki-ERBmanual.md)  

---  

## `SYSTEM_FLOW.ERB`  
好吧，尽管标题是制作标题，  
之前写的却都是不制作标题的方法。  
想必也有人感到厌烦了。  

打开etc1821文件夹。  
里面有一个叫`SYSTEM_FLOW.ERB`的文件。打开看看。  

```  
;[License]Public Domain  
;放弃与本文件相关的著作权。  
;不主张与本文件相关的著作人格权。  
;2015/11/01 MinorShift(Emuera作者)  
```  

上面这样写着。  
不仅是工具提供和友好的许可证，甚至连入门指导都提供了。  
真是令人感激。怀着崇敬的心情写下这篇文章，感谢MinorShift大人的宽宏大量。  

往下滚动页面，  

```  
;如果定义了@SYSTEM_TITLE，则调用SYSTEM_TITLE代替标准标题画面。  
@SYSTEM_TITLE  
```  

写着这样一句话。  

『`;`』这个符号表示『从这里到行尾』是注释，不要当作处理来读取。  

<!--//（2021/05/12 在帖子中被指出后修改了表述。感谢） -->  

也就是说『;@SYSTEM_TITLE如果被定义～』这一行，  
是对想要修改的人解释处理内容的文本。  

当然，注释也是为了自己不会忘记而写的，  
etc 1821文件夹中的内容总体上传达了作者的教学意图。  

解读ERB的作业，一半工作就是沿着这些日文注释愉快地进行。  

这个说明意思是：  
在ERB文件夹中的任何ERB文件的某个地方，  
如果有  

```  
@SYSTEM_TITLE  
```  

这一行的话，  
之前一直看到的标题画面就不会显示，  
而是显示下面写的处理。  

---  

## 新文件创建！  

那么，回到erakanon文件夹吧。  

在ERB文件夹中创建  
『TITLE.ERB』。  

<!--编码差异应该已被接受，所以不需要此说明  
此时需要注意，如果未设置编码就进行操作，  
不要在文件夹中右键选择新建，  
而是在ERB文件夹中打开某个文件，重命名保存后，  
删除内容使用，并且一定要『输入某些内容后再』保存。  

如果试图在完全空白状态下保存，  
编辑器可能会贴心地询问"是否删除？"，  
或者打开空文件时编码会被设置为默认值，  
所以一定要在输入某些内容后保存。  

这是为了统一编码。  
<!--  
//(2021/05/12 在wiki编辑帖子中被指出后进行了修改和补充。感谢。  

//2021/05/17 默认编码列表已移到编码是什么？项目）  

当然，如果确认并能统一编码，也可以使用新建。  

--->  

## 编码是什么？  

不同的变体之间可能存在编码差异。  

对人类而言，文字就是文字，但电脑会给每个字符分配数字，  
判断"这个数值的话，就显示这个字符吧？"。  

编码就是这种判断标准，即把哪些字符分配给哪些数字。  

为了与视频等的编码区分开，有时也被称为字符编码。  

过去并没有统一的标准，所以编码有几种类型。  

如果用不同的分配方式读取，电脑会混淆导致文字乱码。  

|编辑器|默认编码|更改方法|  
|-:|:-|:-|  
|Windows记事本|Win10 201903以后<br>BOM无UTF-8<br>其他情况则为Shift-JIS|无法更改|  
|秀丸编辑器|Shift-JIS|其他(O)→高级设置检查→文件~~→编码1→新建或ASCⅡ时→更改(D)|  
|樱花编辑器|BOM无UTF-8|设置→类型别设置一览→基本→设置变更→窗口标签~~→默认字符编码|  
|Visual Studio Code|BOM无UTF-8|Setting(`Ctrl+,`) 的files.autoGuessEncoding 项目<br>打勾(true)后，自动编码功能生效|  
| | |Setting(Ctrl+,) 的 files.encoding 项目<br>可更改默认编码|  
| | |窗口底部右侧显示的UTF-8，<br>从显示的操作列表中选择带编码的重新打开<br>选择推测结果最上面的日语（Shift JIS）可临时更改|  

过去主流的是『Shift_JIS』，  
现在的era则逐渐转向『带BOM的UTF-8』。  

有几个原因，汇总wiki中有解释。  

- [系统改造Q&A→其他→尽可能使用UTF-8作为字符编码](erawiki-modification-QandA.md#utf-8)|  

erakanon从制作年份看是过去的作品，所以是『Shift_JIS』。  

如果编辑器能显示编码，应该显示的是这个。  

编码和换行通常在右下角显示。  

编码混合会导致读取不正常而乱码。  

长期修改的话，建议将所有文件改为带BOM的UTF-8。  

一个个保存很麻烦，建议使用编码转换工具一次性完成。  

目前没有更改的人，建议先用Shift_JIS试试。  

<details><summary>目前可以跳过的补充</summary>  

其他与UTF-8相关的事。在Emuera的ERH中，使用『#DIM SAVEDATA』定义可保存的角色型变量或多个字符串变量时，<br>  
config中的『将存档数据以二进制格式保存』设置必须为YES。<br>  
设为YES后，存档数据会自动以UTF-8保存。<br>  

</details>  

---  

## `@SYSTEM_TITLE`  

确认创建的『TITLE.ERB』是Shift-JIS编码，  

``` { #language-erb title="ERB" }  
PRINTL 标题画面  
WAIT  
```  

输入试试看  

启动后，在刚才标题画面显示的时间点，  
会显示  
『标题画面』  
文字，然后停止。  

---  

## emuera.log  

点击会出现错误。  

``` { #language-erb title="ERB" }  
在函数结尾发生错误。  
意外的脚本结尾。  
※※※日志文件输出到～emuera.log  
```  

这个"emuera.log"，是与era打交道时的长期伙伴。  

先关闭游戏吧。  

在Emuera1824.exe所在位置，会生成一个名为emuera.log的文件。  

这里保存了在哪里发生了什么错误。  

警告的程度可以通过config设置。  

Emuera作者之一，`妊）|d)的人`大人  
公开了推荐的开发者设置。真是令人感激。  

- [eratoho汇总 V3→Emuera相关内容补充→开发者用Emuera讲义](Emuera-etc.md#emuera_1)  

现在也有自动完成这些设置的"一键开发者模式"。  

---  

## 函数的分隔、边界在哪里？  

继续看SYSTEM_FLOW.ERB。  

『@某某』=函数，  
可能在1个文件中只有1个，  
但如果有2个以上，下一个『@某某』开始前的部分就是一个整体。  

所以，@SYSTEM_TITLE的内容如下。  

全部复制粘贴到TITLE.ERB中试试。  

``` { #language-erb title="ERB" }  
@SYSTEM_TITLE  
#DIMS VERSIONNAME  
;在这个时机读取全局变量就不会遗漏了。  

;GLOBAL不会被RESETDATA或LOADDATA初始化或覆盖。  

;根据需要取消注释。  

;LOADGLOBAL  

;创建版本显示到VERSIONNAME中。  

;1001显示为1.001，1100显示为1.10  

VERSIONNAME = {GAMEBASE_VERSION / 1000}.%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
SIF GAMEBASE_VERSION % 10 != 0  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)  

;标题显示。  
DRAWLINE   

ALIGNMENT CENTER  
PRINTFORML %GAMEBASE_TITLE%  
PRINTFORML %VERSIONNAME%  
PRINTFORML %GAMEBASE_AUTHOR%  
PRINTFORML (%GAMEBASE_YEAR%)  
PRINTL   
PRINTFORML %GAMEBASE_INFO%  
ALIGNMENT LEFT  

DRAWLINE   

;选择项显示  
$TITLE_SELECT  
PRINTSL "[0] " + GETCONFIGS("系统菜单0");  
PRINTSL "[1] " + GETCONFIGS("系统菜单1");  

$TITLE_INPUT  
INPUT  
IF RESULT == 0  
	RESETDATA  
	;ADDDEFCHARA是为了重现eramaker初始化处理而存在的专用函数  
	;其他场合请使用ADDCHARA  
	ADDDEFCHARA  
	BEGINWORD '= "FIRST"  
	CALL MAIN_LOOP  
ELSEIF RESULT == 1  
	CALL LOADGAME_EX  
	GOTO TITLE_SELECT  
	;LOADGAME_EX未进行LOAD就返回时，再次重新选择。  
ELSE  
	REUSELASTLINE 无效值  
	GOTO TITLE_INPUT  
ENDIF  
```  

---  

## DIM是什么？  

第一行  

``` { #language-erb title="ERB" }  
#DIMS VERSIONNAME  
```  

来看看。  

一般称为`DIM`的是『用户定义变量』。  
用户指的是Emuera的用户，也就是用Emuera制作游戏的人们。  
（玩家是终端用户）  

也就是说，我们可以定义的变量，可以随意命名的变量。  

也可以使用日文。不过关于在变量名中使用日文，意见分歧很大。  
积极使用日文名提高可读性派。  
日文名与日文字符串组合时混杂难懂派。  
因为用GREP搜索时会搜索到正文，所以倾向于与英文关键词组合派等。  
因人而异。  

DIM有规定必须写在『@某某』的下一行。  

（对于表达式函数，先有`#FUNCTION`或`#FUNCTIONS`等，  
　也有专门用于全局使用的ERH文件）  

``` { #language-erb title="ERB" }  
#DIM 喜欢的名字  
```  

可以存放数字的箱子  

``` { #language-erb title="ERB" }  
#DIMS 喜欢的名字  
```  

可以存放字符串  
的箱子。  

（通常末尾加上`S`表示字符串版。  
　`#FUNCTION`、`#FUNCTIONS`等也是如此。  
　字符串的英文是`character`、`string`。  
　.NET和其他语言中，字符串相关处理被称为String类或String对象。  
　`S`是其缩写）  

这样写变量称为『声明变量』。  

还有很多其他模式。  

- [EmueraWiki→eramaker basic 开发者信息→Emuera新增扩展语法→用户定义变量](../Emuera/user_defined_variables.md)  

为了使内容易于理解，便于搜索，给变量起个好名字以提高可读性。  
为了防止多人使用相同变量进行不同用途，无意中覆盖，  
等等目的，经常用来代替预先准备的「`LOCAL`」「`LOCALS`」「`ARG`」「`ARGS`」  
「`A`」「`B`」「`C`」  
"A"、"B"、"C"等单字或双字变量。  

- [era系列讨论汇总Wiki V3→系统改造Q&A→基础知识→关于私有变量(使用#DIM而非A～Z或LOCAL)](erawiki-modification-QandA.md#azlocaldim)  

旧处理难以理解且麻烦。希望有人能把全部改为`DIM`。  
我明白了。  

但是，不要指责整理的人"为什么不更新？"。  
看着大家玩完后乱扔垃圾就走的房间问"为什么不清扫？"向房间主人提问，  
恶鬼罗刹般的人会生气的。这种事情也存在。  

这里  

``` { #language-erb title="ERB" }  
#DIMS VERSIONNAME  
```  

所以，  
创建名为`VERSIONNAME`的字符串箱子。  

---  

## 全局变量是什么？  

下一行看看。  

``` { #language-erb title="ERB" }  
;在这个时机读取全局变量就不会遗漏了。  
;GLOBAL不会被RESETDATA或LOADDATA初始化或覆盖。  
;根据需要取消注释。  
;LOADGLOBAL  
```  

写着这样。  
这一行，如果没使用全局变量可以忽略。  

全局变量是游戏全程使用的变量。  

虽然统称为全程，但可能难以想象。  

例如，玩游戏，保存存档A。  
再重新开始，保存存档B。  
数据A和B的内容不会互相干扰。  
这是普通的可保存变量。  

但是，AB两个信息可能保存在同一位置。  
比如从标题画面可查看的回忆模式，或配置设置保存等。  

从标题画面可查看的回忆模式通常，  
不管存档，只要看过事件就能查看回忆。  
A中看到的事件、B中看到的事件，两个都会标记。  
配置设置也可以，A中保存的设置在B中读取。  

这种不受存档约束的  
游戏全程使用的变量称为全局变量。  

保存时也称为全局存档数据。  
全局存档数据与存档数据分开，  
以global.sav文件保存。  

|变量名|性质|  
|:-|:-|  
|GLOBAL|可通过SAVEGLOBAL命令保存，通过LOADGLOBAL命令读取。|  
|GLOBALS|GLOBAL的字符串版。|  
|#DIM GLOBAL SAVEDATA 喜欢的名字|DIM版|  

等属于此类。  

如果使用全局变量，这里的  

``` { #language-erb title="ERB" }  
;LOADGLOBAL  
```  

注释『;』去掉  

``` { #language-erb title="ERB" }  
LOADGLOBAL  
```  

这样在这里读取全局变量，游戏就会反映出来，  
根据需要使用，就是这样。  

---  

## 计算版本并转换为字符串  
下一行看看。  

``` { #language-erb title="ERB" }  
;创建版本显示到VERSIONNAME中。  
;1001显示为1.001，1100显示为1.10  
VERSIONNAME = {GAMEBASE_VERSION / 1000}.%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
SIF GAMEBASE_VERSION % 10 != 0  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)  
```  

一看就想绝望，这是什么啊。突然门槛这么高。不禁苦笑。  

实际上，只是除以1000。era basic的限制，无法处理小数点的计算结果。  

- [eratoho汇总 V3→开发相关→ERB语法讲义2→小数乘法](eratohowiki-ERBmanual.md#_36)  

<!--//（2021/05/12 在帖子中被指出后修改了表述和补充。感谢）  -->  

所以为了显示版本时，让它看起来像小数，  
正在准备将数字作为字符串整理显示。  

所以，这部分可以委托给这个计算，假装没看到。  
如果想理解，逐个看看。  

### VERSIONNAME  
<!--//（2021/05/12 在帖子中被指出后修改。感谢）  -->  
这是上面声明的用户定义变量。  
因为用『DIMS』声明，可以存储字符串。  

右边看起来在进行各种计算，  
但结果是作为字符串处理的。  

### GAMEBASE_VERSION  
终于出现了之前频繁出现的Gamebase.csv相关信息。  
『GAMEBASE_VERSION』中存储了  
在Gamebase.csv中设置的版本。  

这里想提醒的是，版本通常  
显示为『1.01』或『0.001』等小数，  
但在Gamebase.csv中写的是像『1001』这样的四位数字。  

要让它看起来像版本信息，除以1000就够了。  
但无法获得小数点以下的结果。  

所以，  
在字符串『.`』前，放上四位版本除以1000的数字。  
在字符串『.`』后，放上四位版本除以1000的余数，再除以10，用0填充两位数字作为字符串。  
如果还有余数，就在后面作为字符串放置。  

全部连接起来，就会成为看起来像小数的字符串。  

就是做这样的处理。  
（第一位为主版本  
　小数点后1～2位为次版本号  
　小数点后第3位为错误修复  
　是这样划分的）  

这么麻烦的话，不如一开始就用字符串好了？  
可能会有这样的想法，但不行。  

版本必须是数字有原因。  
不习惯的话可能有点难理解，  
同样的数字『1』，如果要求电脑作为字符串处理，  
就无法计算。  
因为电脑无法区分字符串和数字，无论是数字还是平文，  
电脑方面没有判断基准（除非创建判断函数）  

数字和字符串的区别之一，  
是可以进行计算或数值大小比较。  

如果要指定版本0.8以下是不兼容的，  
不想一个个指定0.7不行、0.6也不行……。  

只在Gamebase.csv的『版本差异认可？』一处指定，  
就能将小于该数字的版本批量禁用，更方便。  
为此必须是数字。  

所以，看起来复杂的处理似乎是  
为了整理显示的无奈之举。  

### `{~~}`是什么？  
问这个问题，虽然大概知道在做什么，  
但如果无法自行解读就没有意义。  
有几个不认识的符号。  

『`{~~}`』被称为FORM字符串、FORM语法或格式化字符串。  

在`PRINTFORM`或`CALLFORM`等指令中使用时，可以展开变量或变量的计算。  

虽然现在可能还不太明白，  
但如果你开过ERB，应该对下面这样的文本很熟悉，常用于口上或正文：  

``` { #language-erb title="ERB" }  
PRINTFORM 好感度变成{CFLAG:TARGET:好感度}了。  
```  

『`{~~}`』的用途有两个。  

这里是用途1『给我变量内容或计算式的结果』的意思。  

<!--//(2021/05/12 在wiki编辑帖子中被指出后修改。感谢） -->  

``` { #language-erb title="ERB" }  
VERSIONNAME = {GAMEBASE_VERSION / 1000}～  
```  

来看一下。  

将`GAMEBASE_VERSION`除以1000。取出千位。  
通过`{}`符号包围，结果可以显示。  

在Gamebase.csv中指定的版本如果是『1』，存储的`GAMEBASE_VERSION`也是『1』。  
『`/`』意思是『÷』，所以『`1 / 1000 = 0.001`』，  

但era会舍弃小数点后的数字。结果是『`0`』。  

`GAMEBASE_VERSION / 1000`被`{}`包围，结果『`0`』虽然是数字，但后续表达式是字符串，  
通过加法，数字也作为字符串处理，作为字符串赋值给`VERSIONAME`。  

『`{~~}`』的用途2『行连接』，这里还没关系，  
所以贴出Wiki说明的页面。  

- [EmueraWiki→eramaker basic 开发者信息→Emuera新增扩展语法→一般→行连接](../Emuera/expression.md#_2)  

---  

### `%~~%`是什么？  
『`%~~%`』意思是『给我字符串变量内容或字符串计算式的结果』。  

不是数字而是针对字符串使用。  
总之是『`{~~}`』用途1『给我变量内容或计算式的结果』的字符串版。  

<!--//(2021/05/12 在wiki编辑帖子中被指出后修改。感谢） -->  

``` { #language-erb title="ERB" }  
VERSIONNAME = {GAMEBASE_VERSION / 1000}.%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
```  

写着。`{GAMEBASE_VERSION / 1000}`后面有个『.`』是普通字符串。  

``` { #language-erb title="ERB" }  
%TOSTR(GAMEBASE_VERSION % 1000 / 10,"00")%  
```  

看看。被『`%%`』包围着。  

`GAMEBASE_VERSION`是数字，为什么是字符串？可能会这么想。  

``` { #language-erb title="ERB" }  
GAMEBASE_VERSION % 1000 / 10  
```  

是用1000除求余数，再进一步除以10等。  

这是数字才能做的。  

这里涉及到『`TOSTR()`』。  

---  

### `TOSTR()`是什么？  

意思是『帮我转换为字符串』。  

`TOSTR()`是Emuera预先准备的，可在表达式中使用的函数。  

- [EmueraWiki→eramaker basic 开发者信息→Emuera新增扩展语法→表达式中可用函数→str TOSTR(int value, str format = "")](../Reference/TOSTR.md)  

表达式中可用的函数有很多便利功能，但数量太多难以记住。  

不是默认变量名或`DIM`声明的变量名，  
神秘英文单词风格的地方大多是指令，指令没有`()`。  
如果有`()`，那就是函数，但如果突然出现在没有`@`或`CALL`的地方，就是表达式中可用的函数。  
在列出表达式中可用函数的页面搜索一下。  
（虽然这个判断是否正确另当别论，但基本上可以这样搜索）  
[命令·表达式函数一览](../Reference/README.md)  

同时按下CTRL键和F键，  
浏览器的页面内搜索窗口会显示。  

搜索时，如果搜索`()`内的内容可能找不到。  
只提取`()`前的单词进行搜索。  

如果没有，可以在这个变体内部用grep搜索。  
想找到处理写在哪里，用『@搜索的单词』搜索。  
找到了的话，说明是某人自创的表达式中可用函数。  

- [era系列讨论汇总Wiki V3→系统改造Q&A→基础知识→GREP使用方法](erawiki-modification-QandA.md#grep)  

（如果使用VisualStudio Code等编辑器，点击函数名或表达式函数名，  
　会自动打开其描述的文件，有人公开了这个功能）  

总之，可以知道`TOSTR`是将数字转换为字符串的功能。  

数字加逗号或用零填充以对齐位数时很方便。  

这里，  
想要显示为`01、02、03…`这样，即使数字是一位数也用零填充显示两位数  
的意思，指定"`00`"。  

（这样用零填充称为零填充）  

---  

### `SIF`是什么？  

``` { #language-erb title="ERB" }  
SIF GAMEBASE_VERSION % 10 != 0  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)  
```  

看看。  

`SIF`是条件分支。  
是`IF～ELSE～ENDIF`这类条件分支的简化，一行完成的`IF`语句。  

- [eramaker ERB文件格式（暂定版）→变量与指令→关于指令→条件判断](../eramaker/ERB_format.md#_4)  

`SIF`在条件式不为0时（成立时）执行下一行。为0时（不成立），跳过下一行。  
写着这样。  

``` { #language-erb title="ERB" }  
SIF XXXXX  
```  

`XXXXX`处写条件。  
下一行是条件通过时执行的处理。  

``` { #language-erb title="ERB" }  
SIF GAMEBASE_VERSION % 10 != 0  
```  

的情况下  
`GAMEBASE_VERSION`除以10的余数（%计算余数）不是0的话  
（`!`是否定的意思。`!=`是等号的否定，也就是不相等的意思）  
意思是这样。  

除以10余0意味着没有个位数。  
余数就是个位数本身。  

所以，  

``` { #language-erb title="ERB" }  
SIF GAMEBASE_VERSION % 10 != 0	;如果有各位数的话  
	VERSIONNAME += TOSTR(GAMEBASE_VERSION % 10)	;把个位数作为字符串追加  
```  

意思是这样。  

※`SIF`当处理增加行数增加时需要改写为`IF`语句，  
　加注释时行会难以理解  
　处理注释掉会影响下一行等，所以不太受欢迎。  
　另一方面，习惯了制作时很方便，容易滥用。因人而异。  

---  

### 补充 `=`和`'=`  

``` { #language-erb title="ERB" }  
VARSIONNAME =  
```  

现在可以写成  

``` { #language-erb title="ERB" }  
VARSIONNAME '= ""  
```  

<!--//(2021/05/12 在帖子中被指出后修改。感谢)  -->  
也可以这样写。  

- [EmueraWiki→Emuera新增扩展语法→一般→使用字符串表达式赋值字符串变量](../Emuera/expression.md#_9)  

这是原来不能用的写法，随着Emuera进化变得可用。  
更清楚地表明是字符串赋值。  

不过这样需要『`字符串变量名 '= "aaa"`』这样用`"~~"`包围。  

虽然有点麻烦，但即使日文变量和日文字符串混杂也不易混乱。  
另外，末尾有空格的字符串或纯空格字符串赋值时，一眼就能看出。  

<!--//(2021/05/12 在帖子中被指出后补充。感谢)  -->  

---  

## 主要部分显示  

终于看下个处理吧。  

``` { #language-erb title="ERB" }  
;标题显示。  
DRAWLINE   

ALIGNMENT CENTER  
PRINTFORML %GAMEBASE_TITLE%  
PRINTFORML %VERSIONNAME%  
PRINTFORML %GAMEBASE_AUTHOR%  
PRINTFORML (%GAMEBASE_YEAR%)  
PRINTL   
PRINTFORML %GAMEBASE_INFO%  
ALIGNMENT LEFT  

DRAWLINE   
```  

写着。  

---  

### `DRAWLINE`是什么？  
意思是画分割线。  
常用于场景变更、标题制作等。  

- [参考→`DRAWLINE`](../Reference/DRAWLINE.md)  

写着这样。  

>DRAWLINE会在画面左端到右端画一条----线。  

---  

### `_Replace.csv`  

`DRAWLINE`在Emuera默认设置下是『`-`』连接的线条。  

也有人想将其改为无缝线『`─`』，  
或者想改为『`=`』制作双重线。  

要用什么方法改变`DRAWLINE`使用时显示的线？  

- [EmueraWiki→eramaker basic 开发者信息→_replace.csv](../Emuera/replace.md)  

etc1821文件夹内有_Replace.csv文件。  

复制到erakanon文件夹内的CSV文件夹中试试。  

``` { #language-erb title="ERB" }  
;DRAWLINE显示字符  
;DRAWLINE显示的字符  
;DRAWLINE字符 , (半角字符)  
;DRAWLINE字符 , +  
```  

有这样的行。  

``` { #language-erb title="ERB" }  
;DRAWLINE字符 , +  
```  

把  
『`;`』删掉  

``` { #language-erb title="ERB" }  
DRAWLINE字符 , +  
```  

保存试试。  

启动Emuera，之前的  

```  
------  
```  

线变成了  

```  
++++++  
```  

线。  

光是这样就觉得标题画面有点原创性了。  
也有人想区分使用线的种类。  

想在大标题和小标题用不同种类的线，或只在日期变更时用粗线等。  

``` { #language-erb title="ERB" }  
CUSTOMDRAWLINE <字符串>  
```  

这种指令，  

``` { #language-erb title="ERB" }  
DRAWLINEFORM <FORM字符串>  
```  

这种指令方法。  

- [参考→`CUSTOMDRAWLINE`、`DRAWLINEFORM`](../Reference/CUSTOMDRAWLINE.md)  

``` { #language-erb title="ERB" }  
CUSTOMDRAWLINE ─  
```  

这样，每次指定想要的符号画线。  

---  

### `ALIGNMENT CENTER`是什么？  

- [参考→`ALIGNMENT`](../Reference/ALIGNMENT.md)  

`ALIGNMENT` 是对齐的意思。  

指定文字左对齐、居中对齐、右对齐等。  

``` { #language-erb title="ERB" }  
ALIGNMENT RIGHT ;右对齐  
ALIGNMENT CENTER ;居中对齐  
ALIGNMENT LEFT ;左对齐  
```  

通常为左对齐，这里为了让标题画面显得居中。  

---  

### `PRINTFORML`是什么？  

显示字符串的指令之一。  

- [参考→`PRINT`](../Reference/PRINT.md)  

突然看到`PRINT(|V|S|FORM|FORMS)(|K|D)(|L|W)`  
这种神秘描述，可能会有人头疼。  

`PRINT`本身是显示文字的指令。  
在`PRINT`后，空半个角格，写入文字。  

``` { #language-erb title="ERB" }  
PRINT 啊啊啊啊  
```  

像这样。  

然后`PRINT`后跟的复杂内容。可能会在意。  
`PRINT`后，括号分成了三个。  
几个字母或单词被『`|`』分隔。  

这是可以给`PRINT`附加所需功能的意思。  

这些被『`|`』分隔的字母或单词，各自分配了不同功能。  
一个括号内的功能只能选择一个，但可以与其他括号的功能组合使用。  
『`(|`』表示『(无|』的意思，所以可以省略。  

<!--//（2021/05/12 在帖子中被指出后修改。感谢）  -->  

这样，可以从三个括号中各选一个使用  
`PRINTV / PRINTS / PRINTFORM / PRINTFORMS / PRINTK / PRINTD / PRINTL / PRINTW`  

这样，可以从第一个、第二个括号各选一个组合  
`PRINTVK / PRINTSK / PRINTFORMK / PRINTFORMSK / PRINTVD / PRINTSD`  

这样，可以从第一个、第二个、第三个括号各选一个组合  
`PRINTVKL / PRINTSKL / PRINTFORMKL / PRINTFORMSKL / PRINTVDL / PRINTSDL`  

也可以从第一个括号选一个，从第三个括号选一个等。  

era在口上或正文里，经常使用字符串变量化的你或角色名字。  

所以`{~~}`和`%~~%`可用的`PRINTFORM`系列经常使用。  

还有，用于整理布局的`PRINTC`系列。  
用`PRINTBUTTON`系列显示选项，用`INPUT`接收。  
用`PRINTDATA`系列显示随机文本。  

等等，`PRINT`相关是便利且基础的信息。  

这里『`PRINTFORML `』，  
是『`PRINT`』显示文字的指令，  
加上『`FORM`』使用格式化字符。  
『`L`』换行，不需要点击。  
是组合这些功能的意思。  

---  

### 各显示  

前半部分讲了Gamebase.csv，但其中的信息变量排列如下。  

内容如这里所示。  

- [EmueraWiki→eramaker basic 开发者信息→Emuera新增扩展语法→常量·变量](../Emuera/variables.md#gamebasecsv)  

这样通过标题画面使用Gamebase.csv的信息，  
只修改Gamebase.csv，不用修改标题画面就能更新。  

``` { #language-erb title="ERB" }  
DRAWLINE   

ALIGNMENT CENTER  
PRINTFORML %GAMEBASE_TITLE%  
PRINTFORML %VERSIONNAME%  
PRINTFORML %GAMEBASE_AUTHOR%  
PRINTFORML (%GAMEBASE_YEAR%)  
PRINTL   
PRINTFORML %GAMEBASE_INFO%  
ALIGNMENT LEFT  

DRAWLINE   
```  

Gamebase.csv中整理的信息，  
版本数字转换为字符串整理的`VERSIONNAME`，  
在想要空行的地方使用`PRINTL`，  
将居中对齐改为左对齐，  
再画一次分割线，  

标题显示就结束了。  

---  

### 独特设计  

可以改变文字左对齐显示格式，添加想要的信息或删除其他地方显示的信息，  
省略GAMEBASE_TITLE改为ASCII艺术，或显示图片等，根据喜好修改。  

字体显示、颜色变化、特殊显示等  

- [参考→`PRINT系列`](../Reference/PRINT.md)  
- [参考→显示操作·字体操作·显示规格参考](../Reference/README.md#_3)  
- [参考→`HTML_PRINT`](../Reference/HTML_PRINT.md)  

图片显示  

- [参考→`PRINT_IMG`](../Reference/PRINT_IMG.md)  
- [资源文件相关](../Emuera/resources.md)  
- [参考→`HTML_PRINT`](../Reference/HTML_PRINT.md)  
- [参考→图像处理相关](../Reference/README.md#_14)  

另外，`WINDOW_TITLE`可赋值。  

也可以在左上角窗口标题添加某些显示。  

也可以用_Replace.csv修改`少女祈祷中...`的加载显示。  

---  

## 选项  

外观应该可以修改了，  
但不显示按钮让用户选择，就很难做成游戏。  

继续看下去。  

因为是标题画面，所以使用了有点特殊的_Replace.csv的按钮。  

``` { #language-erb title="ERB" }  
;选项显示  
$TITLE_SELECT  
PRINTSL "[0] " + GETCONFIGS("系统菜单0");  
PRINTSL "[1] " + GETCONFIGS("系统菜单1");  
```  

---  

### `$TITLE_SELECT`  

根据之前的说明  

``` { #language-erb title="ERB" }  
$TITLE_SELECT  
```  

这是不熟悉的行。  

处理基本上是从上到下流动，  
但也可以来回移动，让同一个地方反复转圈。  

写『$喜欢的标签名』，可以在那里贴上『标签』。  

就像在书的重要地方贴的便签，或聊天工具的置顶一样。  

写『`GOTO 喜欢的标签名`』在同函数内的其他地方，可以回到指定的标签处。  

这里好像是从加载画面不加载返回时，  
再次显示按钮的返回地点贴的标签。  

- [系统改造Q&A→基础知识→函数中的移动方法（控制语句）](erawiki-modification-QandA.md#_2)  

`GOTO`语句因为容易降低可读性，据说除了一次性跳出嵌套循环外，  
最好尽量不使用。建议用`LOOP`语句或`WHILE`语句代替。  

可能有点难，但就算不理解也没关系，  
搜索一下『意大利面条程序』或『意大利面条代码』。  

<!--//（2021/05/12 考虑是否可以贴链接，只写了搜索建议。感谢指正）  -->  

所以，学习循环处理的写法。  

- [参考→循环·分支语法](../Reference/README.md#_10)  
- [系统改造Q&A→基础知识→循环处理写法(FOR和REPEAT的区别和推荐格式)](erawiki-modification-QandA.md#forrepeat)  

不明白的话，先照着用到理解为止。  

---  

### 按钮  

``` { #language-erb title="ERB" }  
PRINTSL "[0] " + GETCONFIGS("系统菜单0");  
PRINTSL "[1] " + GETCONFIGS("系统菜单1");  
```  

使用了『`GETCONFIGS()`』的略显特殊的按钮。  

`PRINTSL`是  
显示文字的『`PRINT`』  
显示字符串式的『`S`』  
点击不需要换行的『`L`』  
组合起来的指令。  

用`"~~"`包围文字，作为字符串式相加显示。  

然后使用『`GETCONFIGS()`』这种表达式中可用的函数，  
调用_Replace.csv的数据。  

『`GETCONFIGS()`』是『获取replace.csv设置项的整数或字符串』。  

打开_Replace.csv，  

``` { #language-erb title="ERB" }  
;标题系统菜单显示1  
;启动画面中的『[0] 从头开始』的文字部分  
;系统菜单0 , (字符串)  
系统菜单0 , 从头调教  
;标题系统菜单显示2  
;启动画面中的『[1] 加载后开始』的文字部分  
;系统菜单1 , (字符串)  
系统菜单1 , 继续调教  
```  

写着这样。  

行首的`;`是注释，所以是不被读取的说明文。也就是说  

``` { #language-erb title="ERB" }  
系统菜单0 , 从头调教  
系统菜单1 , 继续调教  
```  

替换这个，  
就能把『从头调教』改为『Game Start』等。  

关于`[0]`或`[1]`，在EmueraWiki的`PRINTBUTTON`指令中可以看到  
按钮显示整体说明，可能更容易理解。  

- [参考→`PRINTBUTTON`](../Reference/PRINTBUTTON.md)  

---  

## 选择结果  

看下个。  

``` { #language-erb title="ERB" }  
$TITLE_INPUT  
INPUT  
IF RESULT == 0  
	RESETDATA  
	;ADDDEFCHARA是为重现eramaker初始化处理而存在的专用函数  
	;其他场合请使用ADDCHARA  
	ADDDEFCHARA  
	;BEGINWORD '= "FIRST"  
	;CALL MAIN_LOOP  
	BEGIN FIRST  
ELSEIF RESULT == 1  
	LOADGAME  
	GOTO TITLE_SELECT  
	;LOADGAME_EX未进行LOAD就返回时，再次重新选择。  
ELSE  
	REUSELASTLINE 无效值  
	GOTO TITLE_INPUT  
ENDIF  
```  

---  

### `INPUT`  

``` { #language-erb title="ERB" }  
INPUT  
```  

是等待输入的指令。  

显示按钮后必须在某处输出这个。  
不然游戏会自动进行，玩家无法选择按钮。  

手动输入0时，  
输入值为0的按钮用鼠标点击，  
两种都被视为输入了0。  

所以，鼠标点击按钮，  
或手动输入编号按Enter键，  
在任一操作完成前都要等待。  

如果想接收字符串，  

``` { #language-erb title="ERB" }  
INPUTS  
```  

也有这种指令。  

``` { #language-erb title="ERB" }  
INPUT 0  
```  

这样写，  
不输入任何内容按Enter键时，输入0。  

『按住Enter键连续点击大量选项全部返回0』  
这种操作可能，测试时方便。  

『`$TITLE_INPUT`』和『`$TITLE_SELECT`』是相同标签。  

无效值时，为再次等待输入而调用，  
所以放在`INPUT`上一行。  

---  

### IF  
这是被称为『IF语句』、『条件式』、『分支』、『条件分支』的东西。  
"如果～，就～"下达命令。  
说游戏大部分由条件分支构成也不为过。  

如果好感度超过1000就加上恋慕。  
如果持有资金超过1亿就通关游戏。  
等等。  

在开场介绍目标。  
玩家操作按钮后，作为结果改变状态值。  
达成条件就显示结局。  

这种流程是游戏基本处理。  

使用方法1  

``` { #language-erb title="ERB" }  
IF 条件  
	条件成立时的内容  
ENDIF  
```  

使用方法2  

``` { #language-erb title="ERB" }  
IF 条件  
	条件成立时的内容  
ELSE  
	条件不成立时的内容  
ENDIF  
```  

使用方法3  

``` { #language-erb title="ERB" }  
IF 条件1  
	条件1成立时的内容  
ELSEIF 条件2  
	条件2成立时的内容  
ELSE  
	条件1和2都不成立时的内容  
ENDIF  
```  

`ELSEIF`可以指定多个。  

顺便『`IF 条件`』的下一行开头有空格。  
这里按了Tab键。  

`IF`语句像俄罗斯套娃一样，`IF`语句中还有`IF`语句。  
称为嵌套结构，但如果都是从开头开始就很难理解。  
所以`IF`语句中的处理，一定要按一次Tab键缩进行首。  

在缩进一行的地方再写IF语句，那个处理再缩进一行。  
这样做，使嵌套结构易于理解。  

（即使整理形状，嵌套也很复杂，所以如果能避免最好避免。  
　另外，制作全新变体时也可以考虑使用半角空格。  
　大厂最新的编码规则中，指定不使用Tab而使用半角空格，这种情况下，空格数也根据用途具体确定。  
　但是，不一致是最难理解的。  
　所以借用使用Tab的现有作品时，用Tab比较好）  

将行首位置比周围文字更低称为『缩进』或『缩格』。  
大量嵌套`IF`语句且不整齐缩进的补丁有时会让制作伙伴发疯。  
写`IF`语句时要注意。  

可能有人见过，era的情况是  
『可能有几百个命令的条件分支』。  
如果中间有一个偏移，后续全部都会偏移。  

另外，对于『对一个变量，内容数字是1时、2时、3时……』  
这样的条件分支，推荐用『`SELECTCASE`』语句简化条件式。  
这里介绍。  

[系统改造Q&A→基础知识→`IF·ELSEIF`组可以转换为`SELECTCASE`语句吗](erawiki-modification-QandA.md#ifelseselectcase)  

正好现在看的`INPUT`的`RESULT`分支容易转换为`SELECTCASE`语句。  
可以试试。  

---  

### `RESULT == 0`  
条件是『`RESULT == 0`』。  
突然出现的『`RESULT`』是预先准备的变量。  
『`INPUT`』中玩家选择的按钮或手动输入的值  
会自动保存到这个『`RESULT`』中。  
（不只是`INPUT`，也接收函数的『`RETURN 什么`』）  

这个『`RESULT`』经常使用，内容容易替换。  
所以接收后马上用自己的`DIM`变量保存，  
使用那个的习惯比较好。  

复杂化的最近的era中，`RETURN`系列的`RESULT`很快会迷路，  
用`RESULT`接收保存使用可能成为故障原因。  
这可以通过用`#DIM REF`定义的引用型变量解决。  
原本私有变量（`LOCAL`变量）不能在多个函数间共享，  
但如果将这个引用型变量作为参数指定，函数内的赋值等会反映到调用方函数  

建议尽可能使用表达式函数。  

- [系统改造Q&A→基础知识→`RESULT`和表达式函数](erawiki-modification-QandA.md#result)  

在EmueraWiki的"表达式中可用函数"项中  
写着`RESULT`和`RESULTS`不会被赋值  
但有例外。  
「`CHKDATA()`」「`CHKCHARADATA()`」「`FIND_CHARADATA()`」属于此类。  
另外，即使在表达式函数内也不能绝对保证`RESULT`不会被改写，如果使用操作`RESULT`变量的指令，还是会正常改写。  
没有使用`CALL`，也不是赋值，几行代码却莫名其妙不工作时，要考虑`RESULT`误爆。  

这里用于`INPUT`后的分支，  
不用担心被覆盖，所以继续。  

『`RESULT == 0`』意思是『INPUT输入结果为0』  
所以，  
『从头调教』  
被选中时的意思。  

---  

### `RESETDATA`  

看选择『从头调教』时的处理。  

``` { #language-erb title="ERB" }  
RESETDATA  
```  

就是，重置数据的指令。  

- [参考→`RESETDATA`](../Reference/RESETDATA.md)  

不执行这个指令的话，已经玩游戏后  
从『返回标题』回来时，  
其他数据会残留。  

---  

### `ADDDEFCHARA`  

``` { #language-erb title="ERB" }  
;ADDDEFCHARA是为重现eramaker初始化处理而存在的专用函数  
;其他场合请使用ADDCHARA  
```  

写着。  

- [参考→`ADDDEFCHARA`](../Reference/ADDDEFCHARA.md)  

是为保持与eramaker兼容性的指令。一次性注册CSV存在的角色。  

即使在CSV中添加角色数据，  
不这样读取的话角色不会被添加。  

变体中也可能一开始就用`ADDCHARA`设置。  
也可能准备用`ADDVOIDCHARA`创建空角色，之后添加设置制作自定义角色。  

CSV编号可以设置为`1,3,7`等跳过，  
但角色注册时会紧凑注册。  

处理预先准备的角色数据如`CFLAG`或`BASE`等时  
指定的角色编号不是CSV编号，而是注册顺序。  
（CSV编号在EmueraWiki等中也被称为"NO"（Number的含义）。后者也被称为"注册编号"）  

---  

### `BEGINWORD '= "FIRST"`  

看下一行。  

``` { #language-erb title="ERB" }  
BEGINWORD '= "FIRST"  
CALL MAIN_LOOP  
```  

现在看的处理，是从SYSTEM_FLOW.ERB中提取的。  

SYSTEM_FLOW.ERB是引导Emuera一系列流程的文件。  

『`BEGINWORD`』与其说是处理必要的变量，  
不如说是便于引导而创建的变量。  
『`BEGINWORD`』声明的位置是『SYSTEM_FLOW.ERH』。  

扩展名为『.ERH』的文件，  
是写在函数内但想在各处函数使用的`DIM`声明的文件。  

从etc1821文件夹复制SYSTEM_FLOW.ERH，  
粘贴到erakanon文件夹的ERB文件夹可以运行，  
但这里不做。  

这次不是追踪流程，而是制作原版环境，  
改为`BEGIN FIRST`试试。  

``` { #language-erb title="ERB" }  
BEGINWORD '= "FIRST"  
CALL MAIN_LOOP  
```  

改为  

``` { #language-erb title="ERB" }  
BEGIN FIRST  
```  

试试。  

启动游戏，选择『`[0]从头调教`』，  
添加`@SYSTEM_TITLE`后出现的错误消失了，  
游戏应该开始了。  

---  

### `ELSEIF RESULT == 1`  

看下一行。  

``` { #language-erb title="ERB" }  
ELSEIF RESULT == 1  
	CALL LOADGAME_EX  
	GOTO TITLE_SELECT  
	;LOADGAME_EX未进行LOAD就返回时，再次重新选择。  
```  

`ELSEIF RESULT == 1`意思是  
选择  
『`[1] 继续调教`』  
时。  

`CALL XXXX`是调用函数（@某某）的指令。  

意思是调用『`@LOADGAME_EX`』函数。  

这也是SYSTEM_FLOW.ERB内的函数调用，  
如果想借用『`@LOADGAME_EX`』，需要复制过来。  

在Emuera官网etc文件夹外，era变体中  
有很多CC许可证开放的函数，  
通过连同许可证一起复制借用  
通常可以使用。  

从头制作时也建议借用。  

如果想借用原版默认系统，  

``` { #language-erb title="ERB" }  
ELSEIF RESULT == 1  
	LOADGAME  
	GOTO TITLE_SELECT  
```  

这样修改就能运行。  

『`GOTO TITLE_SELECT`』如在『`$TITLE_SELECT`』项所述  
是加载后返回标题画面时，为重新显示而返回的指令。  

---  

### `ELSE`  

``` { #language-erb title="ERB" }  
ELSE  
	REUSELASTLINE 无效值  
	GOTO TITLE_INPUT  
ENDIF  
```  

`ELSE`意思是其他情况。  

这里大概是引导用的『`REUSELASTLINE `』，  
用指定的格式化字符串替换最后一行的指令  
显示无效值。  

- [参考-`REUSELASTLINE`](../Reference/REUSELASTLINE.md)  

如果想忽略手动输入，可以直接返回。  

---  

### `ENDIF`  

`IF`语句用`ENDIF`结束。  

注意，与`SIF`语句不同，必须有对应的`ENDIF`。  

`GOTO TITLE_INPUT`因为与加载不同按钮还在，  
好像只是回到等待输入。  

---  

## 读常见错误  

写了容易错的内容。为卡住时看看。  

[常见错误](https://seesaawiki.jp/eraseries/d/%a4%e8%a4%af%a4%a2%a4%eb%b8%ed%a4%ea)  

---  

## 结语  

制作了添加标题画面连接原版的过程。  
是否能指导eramaker侧处理的调查方法、更新用的废弃变量调查方法、  
Emuera的指令和表达式函数调查方法等？  

写的人现在也有很多不懂的。  
想知道如何调查不懂的内容，我认为这很重要。  
即使习惯了也有盲点。永远不要失去初心。  

era是调教模拟器，原本没有RPG、地图或战略。  
制作游戏，不仅要了解工具用法，  
还要了解关卡设计、路径搜索、思考逻辑等，era不会教这些。  
原版和工具在内，所有都是志愿人士学习后创造的功能。值得称赞。  

愿成为你想做的东西的起点。  

---  

下一页→[ERB制作实践篇](erawiki-ERBmanual.md)  

<!--  
----  
[[▲返回目录>#contents]]  
//  
//(2021/05/12 自定义角色的补充，直接更新修改的人和更新部分重叠，处于不完整状态。  

//忘记了与NO的联动会出大事，从教学中学到，自定义角色可能还为时过早，  

//暂时注释掉了。修正改进，感谢更新。  

//谢谢给出FIND相关更新建议的人。  

//  
//***自定义角色相关的补充  
//创建无csv编号的自定义角色，使其可删除的系统情况下  
//删除角色时注册编号也会紧凑。CFLAG等也联动。  

//不仅是自定义角色，删除CSV存在的角色时编号也会紧凑。  

//这会导致游戏进行中编号变动，  
//无法保存童贞丧失对象是谁等信息。  

//例如，  
//=||  
//;这里CFLAG:0是"记录初次对象ID的东西"  
//;TARGET是"调教对象"的注册编号  
//CFLAG:注册编号:0 = TARGET  
//||=  
//上述示例是，记录"注册编号"角色的首次对象为TARGET。  

//删除角色时CFLAG的注册编号部分会自动处理，这里不用考虑。  

//但是，如果TARGET是1，1号角色名为"Firstko"，2号角色名为"Secondko"，  

//删除Firstko后编号会自动紧凑，Secondko成为注册编号1号角色  

//"CFLAG:注册编号:0"保持1不变，首次对象变成Secondko的错误发生。  

//另外，"SORTCHARA"排序角色处理和"SWAPCHARA"交换注册编号时也会发生同样现象。  

//所以，角色参考，  
//如上项所示使用NO（CSV编号）等，  
//CFLAG:注册编号:0 = NO:TARGET  
//等保存可避免错误。  

//使用ADDVOIDCHARA的自定义角色，所有信息都是全新的（0或空字符串）。NO也不例外，  
//创建角色时需要赋予唯一的NO。  

//如果是原本NO为0的"主人公"或"你"就没问题，但如果自定义角色有多个或全部都是自定义角色，  
//很多场合会引用NO:0，所有地方都会出现"你"的地狱图景。  

//虽然有点难，例如，  
//=||  
//ADDVOIDCHARA  
//NO:(CHARANUM-1) = FLAG:自定义角色人数  
//FLAG:自定义角色人数 += 1  
//||=  
//这样可以分配唯一的NO。  

//关于示例详细（将在未来的下一页）参考。  
//  
//想调用角色时，  
//=||  
//FOR 循环计数器, 0, CHARANUM  
//	IF CFLAG:0 == NO:循环计数器  
//		想要的角色 = 循环计数器  
//		BREAK  
//	ENDIF  
//NEXT  
//||=  
//这样，用循环语句检查所有角色的NO，找出一致的编号处理  
//这样的机制。  

//这些自定义角色机制详细说明：  
//|bgcolor(#F0F0E7):[系统改造Q&A]→实践篇|  
//|https://seesaawiki.jp/eraseries/d/%a5%b7%a5%b9%a5%c6%a5%e0%b2%fe%c2%a4Q%26A#content_2|  
//----  

//想调用角色时，  
//使用表达式中可用的函数『FINDELEMENT(CFLAG:ID, 角色ID)』或『FINDCHARA()』好像更好。  

//|bgcolor(#F0F0E7):EmueraWiki→eramaker basic 开发者信息→Emuera新增扩展语法→表达式中可用函数→FINDELEMENT|  

//|https://ja.osdn.net/projects/emuera/wiki/exmeth#h5-int.20FINDELEMENT.20.28var.20array.2C.20.3F.20value.2C.20int.20start.20.3D.200.2C.20int.20end.20.3D.20.E2.80.BB.2C.20int.20flag.29|  

//|bgcolor(#F0F0E7):EmueraWiki→eramaker basic 开发者信息→Emuera新增扩展语法→表达式中可用函数→FINDCHARA|  

//|https://ja.osdn.net/projects/emuera/wiki/exmeth#h5-int.20FINDCHARA.28var.20key.2C.20.3F.20value.2C.20int.20start.20.3D.200.2C.20int.20end.20.3D.20.E2.80.BB.29|  

//@ID_TO_CHARA的实现，可以比较新版eraRanceK和  

//eratohoK ver1.29.3或era恋姬的。  

//----  
//[[▲返回目录>#contents]]  
//  
-->  