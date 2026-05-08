# 变体制作/ERB制作实践篇  

原页面  
[era系列相关话题讨论汇总Wiki V3 ERB制作实践篇](https://seesaawiki.jp/eraseries/d/ERB%c0%bd%ba%ee%bc%c2%c1%a9%ca%d4)  

---  

- [教程](erawiki-tutorial.md)  
- [标题准备篇](erawiki-title.md)  
- [标题实践篇](erawiki-title2.md)  
- ERB制作实践篇  

---  

本页是总结了Discord某个服务器发言的内容  

- [Discord - eraEVENT_KXX](https://discord.gg/cuSh6y5j93)  

从[标题实践篇](erawiki-title2.md)继续，说明ERB的实践内容  

---  

## 关于安装VSCode的方法  
也有PDF格式的详细说明，这个更正式也更容易理解  
- [eraVSCode：下载](http://book-shelf-end.com/up/dwlink.cgi?eraRx3299.zip)  

- 1，从官网下载并安装  
[nVisual Studio Code - 代码编辑器 Mirosoft Azure](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)  
<br>  

- 2，从左侧标签中选择扩展功能，搜索erabasic并安装ERB插件  
![](../assets/images/VSCodeSS1.JPG)  

- 3，从左上角的"文件"标签打开变体或口上的文件夹  
![](../assets/images/VSCodeSS2.JPG)  

- 4，此时编辑器环境就完成了，但请保存工作区  
![](../assets/images/VSCodeSS3.JPG)  

- 5.由于有了erabasic扩展功能，ERB文件看起来更容易阅读  
以上说明了"Visual Studio Code(VSCode)"的安装方法，但请注意也有一个类似名称的应用程序叫"Visual Studio"  
Visual Studio是一个集成开发环境(IDE)，用于编译、构建、调试等语言，与作为源代码编辑器的VSCode不同  
如果只是让Emuera读取代码的话，erabasic用VSCode就很好  
由于有志愿者的ERB插件，可以轻松跳转到函数定义处  
（变量和函数）跳转到定义的功能，这意味着可以省去在初次接触的变体中查找"这里调用的`CALL`函数在哪个文件中"的麻烦  
即使许多函数在一个文件中聚合，也可以通过大纲功能实现轻快的制作  
还可以与Git集成  

---  

## 关于变量类型  
对于第一次接触编程的era用户来说，可能会有很多人对"变量是什么？"感到困惑  
变量就像盒子一样的概念已经被反复解释过了，所以不再赘述  
如果搜索"变量"来了解这个概念，会出现`boolean`、`double`、`float`等各种类型，这对初学者来说很容易混淆  
虽然在其他语言中有各种类型的变量，但在Emuera中只使用两种：`str`(`string`)型和`int`(`integer`)型  

>`str`型(`string`型，字符串型) 内容为字符的变量。可以存储包含数字在内的所有数据  
>`int`型(数值型) 内容为数字的变量。只能输入数字，但擅长计算  

只需要记住只有存储文字和存储数字这两种概念，在使用Emuera时可以暂时忘记其他变量  
虽然从一开始就有的Emuera可用变量也有数值型和字符串型，但名称带有STR或S的变量通常暗示着是字符串型。如「`CSTR`」「`LOCALS`」「`ARGS`」「`GLOBALS`」等都是字符串型  

在玩era时也很熟悉的"第○天"或"持有金钱○○圆"等都使用了数值型变量  
而后者使用的有`NAME`和`CALLNAME`等变量。正如变量名所示的角色名和称呼(简称)  
还有`ITEMNAME`(道具名称)和`TRAINNAME`(命令名称)等变量，但在ERB中通常只引用而不赋值，所以一开始不记也没关系。应该是这样  

## `CFLAG`、角色变量、口上中可用的变量  
`CFLAG`在很多情况下会被简写为`CFLAG:XX`，所以看起来和`FLAG:XX`等一样，但它是一个二维数组变量，称为角色变量  
哪些变量是角色变量，在EmueraWiki的变量表中有说明  

- [常量·变量 - 临时规格表](../Emuera/variables.md#_21)  

对于`FLAG`等一维数组，`FLAG:XX`就像横向排列的一排盒子，对于`CFLAG`等二维数组，则是横向和纵向都排列的盒子  
如果是「`CFLAG:3:2`」，则指定第3列从前面数第2个（准确地说是从0开始计数，所以是第4列从前面数第3个）  
当简写为`CFLAG:2`时，会自动补全为「`CFLAG:TARGET:2`」并处理  
对于era来说，经常需要处理`TARGET`（调教对象），这种规格使得编写代码更加容易  

其中角色变量，以上述「`CFLAG:3:2`」为例，3的部分对应角色  
也就是说是"3号角色的第2项状态"  
当然，修改`CFLAG:3:XX`不会影响`CFLAG:1:XX`（1号角色的状态）  
因此，在口上中创建独立事件时，不会影响其他角色  

但是，只有像eraTW那样明确说明"1000~1999的`CFLAG`可以在口上中自由使用"的变体，才能在口上中使用`CFLAG`  
在没有明确说明的变体中，如果在口上中随意改写CFLAG，可能会导致本体运行异常。请注意  

那么接下来，从口上作者和变体作者两个角度来说明"口上中没有可用的`CFLAG`"和"口上使用`CFLAG`会让变体作者困扰"的问题  

解决这个问题的就是"变量定义"和"ERH文件"  

- [用户定义的变量](../Emuera/user_defined_variables.md)  
- [头文件(ERH)](../Emuera/ERH.md)  

如果想在口上中创建在一个函数内完成，且不需要保存进度的单发事件，可以在函数名下面使用`DIM`创建变量，这样很方便  
例如，在"今天是圣诞节"这样的场景中创建分支时，创建名为"CHRISTMAS"的变量  

``` { #language-erb title="ERB" }  
@XXXX;口上用的函数  
#DIM DYNAMIC CHRISTMAS  
```  

"如果一个函数还不够，想跨多个函数创建更大规模的事件"时使用ERH文件  
使用此文件可以创建可在任何函数中使用且可保存的变量  
例如，记录"执行特定命令的次数"，用于让角色说"看来你喜欢这种命令呢"的分支  

以下是为3号角色的口上中使用的变量在ERH文件中定义的例子  

``` { #language-erb title="ERB" }  
#DIM SAVEDATA KOJOFLAG3, 10  
```  

上面的例子定义了一个名为"KOJOFLAG3"的可保存变量，使其能够使用0到9  
只需准备一个扩展名为ERH的文件并将这一行添加进去，变量定义就完成了  
有些变体事先准备了口上可用的标志，如果没有的话，自己准备也是一种口上制作技巧  

当变体作者想为口上预先准备标志时，也会使用ERH。只是定义口上可用的角色变量  
例如，eratohoЯeverse提供了`KFLAG`变量供口上使用  
在ERH文件中写下  

``` { #language-erb title="ERB" }  
#DIM SAVEDATA CHARADATA KOJOFLAG, 100  
```  

并在readme等处写上"0~99的`KOJOFLAG`可以在口上中自由使用"即可解决问题  
上面的例子因为是角色变量，所以在不是单个角色有多个口上的情况下，可以避免变量冲突  

使用`CHARADATA`创建角色变量时，如果不同时写`SAVEDATA`，则会成为不保存的角色变量，请注意。大多数口上应该希望变量能够保存  

---  

## IF～ENDIF、SELECTCASE～ENDSELECT以及缩进  
在era中创建分支时，首先学习的是`IF`和`ENDIF`  
这两个必须成对使用，否则会报错。同样适用于应用的`SELECTCASE～ENDSELECT`  
使用一个`IF`，就需要一个`ENDIF`。使用5个`IF`当然需要5个`ENDIF`  
"我不想为了写代码特意数用了多少个！"这种意见很合理。为了解决这个问题，有一种叫做缩进的对齐方式  

在大多数编辑器中，按Tab键可以插入相当于4个半角空格的空白  
这些对源代码的运行完全没有影响  
为了避免"用了几个？"变得模糊不清，最好用缩进对齐一对的`IF`和`ENDIF`，这样比较容易理解  

与`IF～ENDIF`同样频繁使用的`SELECTCASE～ENDSELECT`，写法是`SELECTCASE～CASE～ENDSELECT`三者一体  
让我们实际看看`IF`语句和`SELECTCASE`语句的缩进有什么不同 这个例子中使用了`FLAG:0`  

``` { #language-erb title="ERB" }  
IF FLAG:0 == 0  
  PRINTW FLAG:0的内容是0  
ELSEIF FLAG:0 == 1  
  PRINTW FLAG:0的内容是1  
ELSE  
  PRINTW FLAG:0的内容既不是0也不是1  
ENDIF  

SELECTCASE FLAG:0  
  CASE 0  
      PRINTW FLAG:0的内容是0  
  CASE 1  
      PRINTW FLAG:0的内容是1  
  CASEELSE  
      PRINTW FLAG:0的内容既不是0也不是1  
ENDSELECT  
```  

正如这样，`IF`语句和`SELECTCASE`语句的缩进略有不同  
这种细微差别对初学者来说可能相当难以理解  
所以如果"不使用口上模板"或"即使使用模板也想加入自己的分支"，最好一开始就统一使用`IF～ENDIF`。这不仅适用于口上，也适用于变体侧  

基本上`SELECTCASE`能做到的所有事情`IF`也能做到，所以不熟悉的时候没有必要勉强使用`SELECTCASE`  
使用缩进和使用`SELECTCASE`都是为了"使源代码更易于查看"，一开始就追求好看的形式对初学者来说难度较高。边与错误搏斗边学习吧  

写代码时不要逐行从上往下写，而是先写好函数或分支等结构比较好  
在写`PRINTW`等内容之前先写好`IF`、`ELSEIF`和`ENDIF`，就不会忘记闭合  

关于`IF`和`SELECTCASE`的参考资料  

- [系统修改Q&A - IF·ELSEIF的组合是否可以用SELECTCASE语句代替](erawiki-modification-QandA.md#ifelseifselectcase)  

---  

## 函数和`CALL`  
ERB文件中有一些以"@"开头的行，如"@XXX"  

官方"关于函数"的章节比较容易理解  

- [eramaker的era basic格式](../eramaker/ERB_format.md#_4)  

>从程序开始到结束连续写下来会很难懂。  
>为了将各个部分切分开来使之更清晰，使用"函数"。  

函数可以在任何ERB文件中创建。由于在Emuera启动时会加载目录中的所有ERB文件，所以目录（文件夹）结构也没有关系  
现在大多数变体都清楚地按文件夹分类。如图所示，文件夹下的ERB文件也会被加载  
函数是通过`CALL`指令实际使用的  
游戏开始的函数是`@SYSTEM_TITLE`，从这里开始游戏展开  
文件名完全无关，加载的是ERB文件中的各个函数  
文件夹中的ERB文件，以及ERB文件中的函数，可以类比为文件夹和其中的文件  

调用这些函数的就是`CALL`指令  

``` { #language-erb title="ERB" }  
PRINTFORMW 这是口上  
```  

这种写法是"显示文本"，使用`PRINT`指令的一行代码  

``` { #language-erb title="ERB" }  
CALL KANSUU  

@KANSUU  
PRINTFORMW 函数被调用了  
```  

这种写法是"调用"名为"@KANSUU"的函数，然后"显示"函数被调用了"这句话  

像这样，"显示文本"、"调用函数"等动作被称为"指令"代码  
`PRINTFORMW`和`CALL`都是指令，根据后续代码进行相应操作  
这个指令概念很重要。理解后，就会意识到上面说明的`IF～～`或`SELECTCASE～～`也是指令  
变量、函数、指令，这是制作era的重要概念。理解这三个概念会大幅增加能做的事情  

接下来说明函数的创建方法  
"用`CALL`调用函数很方便！""那么函数是怎么创建的？难吗？"不，一点都不难  

在ERB文件中只要写上"@～～"，函数就创建好了。真的就这么简单  

在上面的例子中  

``` { #language-erb title="ERB" }  
@KANSUU  
```  

仅这一行就创建了函数。完全没有困难，只要给一个不与其他函数重复的名称，用`CALL`调用就基本掌握了  
如前所述，函数相当于文件夹中的文件，注意不要在其他函数中间插入函数  
确认函数以"@～～"为一节后再创建  
当然，如果担心"修改别人创建的ERB文件！"，也可以自己创建ERB文件并在其中创建函数  

至此已说明了函数的概念和创建方法。这样就足以使用`CALL`进行实践，但还是列举一些注意事项  
一个是"用`CALL`调用其他函数后，会返回到原来的`CALL`位置"  

``` { #language-erb title="ERB" }  
PRINTFORMW 离开家到达羽田机场  
CALL USA  
PRINTFORMW 从羽田机场回到家  

@USA  
PRINTFORMW 乘坐国际航班去美国旅行并回来了  
```  

以旅行者为比喻的处理流程就是这样运作的  

另一个是，函数名也可以使用日文  
不过这只是"这样看可能更清楚"的程度，所以不需要勉强使用日文  

``` { #language-erb title="ERB" }  
CALL 函数  

@函数  
PRINTFORMW 函数被调用了  
```  

上面只是将`@KANSUU`的例子替换为日文。这样做没有问题，会进行同样的操作  

最后，虽然在这个解释中只说明了`CALL`，但还有同样调用函数的指令如`JUMP`、`CALLFORM`、`TRYCCALLFORM`等高级怪物般的指令。这些一开始不需要掌握，当想到"想创建这样的处理"时再研究一下吧  

---  

## 变量和赋值、运算  
※以下如果"运算"这个词听上去陌生的人，可以理解为与"计算"同义  

已经说明了变量的类型。这次想说明改变这些变量内容的各种方法  
首先要注意，数值型变量只能赋值数值，字符串型变量只能赋值字符串  
赋值是指向变量中放入特定值的处理，数值型和字符串型都使用"="  

``` { #language-erb title="ERB" }  
@TEST  
#DIM INT  

INT = 123  
STR = ABC  

PRINTFORMW {INT} %STR%  
```  

`#DIM`的用法如本页所述。调用`@TEST`函数时应该显示"123 ABC"  
因为向变量`INT`赋值`123`，向变量`STR`赋值`ABC`。修改赋值部分，显示的文本也会改变  

这里还能说明另一个`PRINTFORMW`显示变量内容的方法  
数值型变量用"{}"包围，字符串型变量用"%%"包围，可以显示其内容  
在显示天数或持有金钱时  

``` { #language-erb title="ERB" }  
PRINTFORML 主人:%CALLNAME:MASTER% {DAY}天目 持有钱:{MONEY}日元  
```  

这样写就能显示所需的信息。`PRINTFORML`是不需要点击等待的情况  

另外，像上述"123"和"ABC"这样的指定值，可以使用运算符  
运算符是算术或数学中的计算符号。如"+"、"-"乘法是"*"除法是"/"等  

``` { #language-erb title="ERB" }  
@TEST  
#DIM INT  
#DIM PLUS  

PLUS = 45  
INT = 123+PLUS  

PRINTFORMW {INT}  
```  

上面的例子显示的是168。显示123+45的结果  

``` { #language-erb title="ERB" }  
@TEST  
#DIM INT  
#DIM PLUS  

PLUS = 45  
INT = 123  

PRINTFORMW {INT+PLUS}  
```  

这样的写法也可以。结果同样是168  
由于处理是从上到下的，所以先给`PLUS`变量赋值是很重要的  

基本是上述的"+""-""*""/"这四个运算符。虽然简单，但这些会在era开发中一直使用，所以想掌握  
其他运算符将在下一项说明  

---  

## 比较运算符与`true`、`false`  
在编程中，从古至今就有`true`和`false`的概念。这对应于"变量类型"项中提到的`boolean`  
`true`和`false`是变量中的值，但如上述，erabasic中只有int型变量和str型变量  
在Emuera中，数值型变量内容为0时视为`false`，其他全部视为`true`  

基于此，我们来说明比较运算符  
主要用于`IF`。以下代码是在era中到处使用的主流例子  

``` { #language-erb title="ERB" }  
IF CFLAG:0 >= 1  
PRINTFORMW CFLAG:TARGET:0是1以上  
ELSE  
PRINTFORMW CFLAG:TARGET:0是0以下  
ENDIF  
```  

比较运算符用于`IF`之后，变量、运算符及另一变量或数值的组合  
这表示当`CFLAG:0`为1以上时执行上面的分支，其他情况执行下面的分支  
如果说是与英语`IF`和`ELSE`含义相同的话，可能更容易想象  

官方"条件判断"项中记载了基础知识  
[eramaker的era basic格式](../eramaker/ERB_format.md)  

如果对`IF`不太理解的话，建议也读一下这个  
[标题实践篇 - IF](erawiki-title2.md#if)  

如前所述，满足`IF`后的条件表达式时，执行`IF`下的处理  

可用的比较运算符如下  

>X < Y , X小于Y的情况  
>X > Y , Y小于X的情况  
>X >= Y , X大于等于Y的情况  
>X <= Y , Y大于等于X的情况  
>X == Y , X与Y相等的情况  
>X != Y , X与Y不相等的情况  

">"和">="略有不同，注意。两者相同时，结果会不同  
"=="与上述赋值处理完全不同  
上述6个比较运算符，由于基本上是比较两个值，所以在一个条件中原则上只能使用1个。其他的不进行比较的运算符可以使用  

``` { #language-erb title="ERB" }  
IF X+Y >= 10  
PRINTFORMW {X}+{Y}是10以上  
ELSE  
PRINTFORMW {X}+{Y}是10以下  
ENDIF  
```  

这样，可以使用前一项说明的运算符，而不是比较运算符  

`IF`后的条件表达式也可以设置多个。这时会使用"&&"、"||"等其他种类的运算符。这将在下一项说明  

"那么，开头提到的`true`和`false`到底是什么呢？"有些人可能会这样想  
满足`IF`后的条件时为`true`(`1`)，不满足时为`false`(`0`)  
所以极端的写法是  

``` { #language-erb title="ERB" }  
IF 1  
PRINTFORMW 是true  
ELSE  
PRINTFORMW 是false  
ENDIF  
```  

会变成这样  

当然，由于`1`是`true`，始终满足`IF`的条件，所以`ELSE`下的"false"永远不会显示  
如果将`0`(`false`)作为条件表达式，情况也相同  

``` { #language-erb title="ERB" }  
IF 0  
PRINTFORMW 是false  
ELSE  
PRINTFORMW 是true  
ENDIF  
```  

ELSE下绝对不(ry  

如开头所述，只有`0`是`false`，其他（即使是负数）都视为`true`，所以"我在用`IF`但没有比较运算符！"的情况下就是使用了这种机制  

``` { #language-erb title="ERB" }  
IF MONEY  
PRINTFORMW 有钱 持有钱是{MONEY}日元  
ELSE  
PRINTFORMW 持有钱是0日元  
ENDIF  
```  

像`MONEY`变量这样取大值的变量很少使用，但省略比较运算符时的含义就是这样  
用于判断标志是否成立等简单分支  

---  

## 在一个`IF`分支中指定多个条件的方法  
比较运算符只能在一个条件表达式中使用一个，而算术运算符如"+"或"-"则无限制  
这次说明的是这些之外的逻辑运算符  

基本如下3种  

|运算|说明|  
|:-|:-|  
| 条件表达式1 `&&` 条件表达式2 | 满足条件表达式1和2两者时执行分支(true)|  
| 条件表达式1 `\|\|` 条件表达式2 | 满足条件表达式1或2任意一个时执行分支|  
|`!`条件表达式 | 满足条件时为false，不满足时为true|  

这些用于直接增加条件表达式的数量，所以也适用于上述"每个条件表达式只能使用一个比较运算符"的规则，并分别应用于条件表达式1和2  
使用`&&`和`||`运算符可以无限增加条件表达式  

``` { #language-erb title="ERB" }  
IF CFLAG:0 == 0 && FLAG:0 == 0 && STR:0 == ""  
PRINTFORMW CFLAG:0、FLAG:0和STR:0都没有赋值  
ENDIF  
```  

这是使用`&&`(AND,逻辑积)的表达式。当所有条件都满足时进行分支  
这样可以设置3个以上条件表达式，或将数值型条件与字符串型条件一起使用  

``` { #language-erb title="ERB" }  
IF CFLAG:0 != 0 || FLAG:0 != 0 || STR:0 != ""  
PRINTFORMW CFLAG:0、FLAG:0和STR:0中至少有一个有值  
ENDIF  
```  

这个表达式使用`||`(OR,逻辑和)。满足任一条件时进行分支  

如您所见，`&&`条件较严格，所以`||`更容易通过分支  
换句话说，也可能导致意外的分支执行代码  
例如  

``` { #language-erb title="ERB" }  
IF (CFLAG:0 == 0 || (FLAG:0 == 0 && STR:0 == "") || TEQUIP:0 == 0) && (CSTR:0 == "" || TFLAG:0 == 0)  
PRINTFORMW ???  
ENDIF  
```  

这样下去，写的人和看的人都很难理解执行什么处理  

可以在一个`IF`分支中同时使用`&&`和`||`。但由于使用过多会显著降低可读性，不推荐  
特别是对初学者来说，信息增加过多会导致连哪里错了都判断不出来。建议先以3个左右的条件表达式为上限进行尝试  
条件表达式3个混合使用`&&`和`||`的例子是  

``` { #language-erb title="ERB" }  
IF (CFLAG:0 == 0 || FLAG:0 == 0) && STR:0 == ""  
PRINTFORMW CFLAG:0和FLAG:0中有一个为0，且STR:0是空字符串  
ENDIF  
```  

使用`||`的OR分支基本上需要用括号括起来。与乘法和除法一样，这是为了遵守计算顺序  

---  

## 字符串变量的运算  
到现在为止说明了数值型变量的运算。这一项说明字符串型变量的运算  
首先共同的是，赋值与数值型一样使用"="  
但这种赋值格式有点特殊，有几个规则  

``` { #language-erb title="ERB" }  
@TEST  
#DIM DYNAMIC INT  

INT = 1  
STR = AAA  
PRINTFORMW INT是{INT} STR是%STR%  
```  

这个结果读到这里的人应该能大致预测  
显示变量`INT`和`STR`的内容  
那么下一个例子呢？  

``` { #language-erb title="ERB" }  
@TEST  
#DIM DYNAMIC INT, 2  

INT:0 = 1  
INT:1 = INT:0  

STR:0 = AAA  
STR:1 = STR:0  

PRINTFORMW INT:1是{INT:1} STR:1是%STR:1%  
```  

"复习"一下数组。`INT:0`和`INT:1`是不同的变量，可以放入不同的值，如上所述，可以将`INT:0`的内容复制(赋值)到`INT:1`  
"结果不和之前一样吗？"可能有人这么想，但不一样  

`INT`是数值型变量，所以`INT:0`被自动解释为变量，`INT:1`中也会放入1  
但是字符串型的赋值不会将变量解释为变量，所以`STR:1`的内容不是"AAA"而是字符串"STR:0"本身  

如果想"引用变量内容！"，有几种语法  
首先是与`PRINTFORMW`系列相同的用"%%"括起来赋值  
将上述例子  

``` { #language-erb title="ERB" }  
STR:1 = STR:0  
;↓  
STR:1 = %STR:0%  
```  

改为这样，`STR:0`会被解释为变量，`STR:1`中会赋入"AAA"  
这种赋值即使变量和非变量混合也能运行 数值型也是如此  

``` { #language-erb title="ERB" }  
@TEST  
#DIM DYNAMIC INT, 2  

INT:0 = 1  
INT:1 = INT:0+3  

STR:0 = AAA  
STR:1 = BBB%STR:0%CCC  

PRINTFORMW INT:1是{INT:1} STR:1是%STR:1%  
```  

这样写的话，`INT:1`中会有1+3的"4"，`STR:1`中会有"BBBAAACCC"这样的字符串  

字符串型的赋值还有另一种方法 使用"'="  

``` { #language-erb title="ERB" }  
STR:0 = AAA  
STR:1 '= STR:0  

PRINTFORMW STR:1是%STR:1%  
```  

这种写法即使不用%%括起来也能被解释为变量，所以`STR:1`的内容是"AAA"  

坦率地说，有两种相似却不同的语法，必然会混淆。建议一开始就决定使用哪种，暂时忘记另一种  
"用'`'=`'如何写上面BBBAAACCC那样的？"这样的问题也会出现  
在这种情况下，  

``` { #language-erb title="ERB" }  
STR:0 = AAA  
STR:1 '= @"BBB%STR:0%CCC"  

PRINTFORMW STR:1是%STR:1%  
```  

这样写 `"～～"`括起来的文字与`PRINTFORM`系列一样处理  
因为@符号与"现在开始使用变量！"一样，预先告诉era侧，所以不能忘记@符号  

``` { #language-erb title="ERB" }  
STR:0 = AAA  
STR:1 '= "BBB%STR:0%CCC"  

PRINTFORMW STR:1是%STR:1%  
```  

这样写的话，内容会变成"BBB%STR:0%CCC"。`STR:0`不会展开  

稍微跳跃一下话题，说明"字符串型变量能否使用其他运算符？"  
可以使用数值型变量使用的部分运算符  
首先是6种比较运算符，这些都能用  

"=="和"!="比较容易理解。是比较双方是否相同  

``` { #language-erb title="ERB" }  
@TEST  
STR = AAA  

IF STR == "AAA"  
PRINTFORMW STR是AAA  
ELSEIF STR != "AAA"  
PRINTFORMW STR不是AAA  
ENDIF  
```  

使用比较运算符时，如果使用非变量值，仍需用"`～～`"括起来  

``` { #language-erb title="ERB" }  
@TEST  
STR:0 = AAA  
STR:1 = AAA  

IF STR:0 == STR:1  
PRINTFORMW STR:0是%STR:1%  
ELSEIF STR:0 != STR:1  
PRINTFORMW STR:0不是%STR:1%  
ENDIF  
```  

但如果比较变量之间则不需要"`～～`"  

看看字符串型运算中，除了比较运算符外还能用什么  
可用的是"+"和"*"运算符。加法和乘法  

乘法在这里有说明  

- [Emuera Wiki - 运算](../Emuera/operand.md)  

``` { #language-erb title="ERB" }  
  STR:0 = % "啊" * 10 %  
  PRINTFORML STR:0 = "%STR:0%"  
  WAIT  
　;结果  
　STR:0 = "啊啊啊啊啊啊啊啊啊啊"  
```  

※引用上述页面  

`STR:0`中代入"啊"的10倍，即"啊"的10个  

关于加法  

``` { #language-erb title="ERB" }  
STR:0 = AAA  
STR:1 = BBB  
STR:2 = %STR:0+STR:1%  

PRINTFORMW STR:2是%STR:2%  
```  

这样写`STR:0`和`STR:1`会连接成"AAABBB"  
读了本项说明的人可能会想  

``` { #language-erb title="ERB" }  
STR:2 = %STR:0%%STR:1%  
```  

这样写不就行了吗？完全正确。两者结果相同  

那么什么时候可以使用加法运算符呢？是在现有字符串变量上添加内容的时候  

``` { #language-erb title="ERB" }  
STR = AAA  
STR += "BBB"  
STR += "CCC"  

PRINTFORMW STR是%STR%  
```  

这是将`STR`赋值为`AAA`，然后用加法运算符添加`BBB`和`CCC`，最终成为"AAABBBCCC"的一句话  
这里添加时原则上要用"`～～`"括起来，注意这一点  
这样的话，一开始就赋值为AAABBBCCC不就好了吗？确实如此  

但是如果在条件下变化呢？  

``` { #language-erb title="ERB" }  
STR = 今天是  

IF RAND:2  
STR += "咖喱"  
ELSE  
STR += "蛋包饭"  
ENDIF  

STR += "想吃"  

PRINTFORMW %STR%  
```  

这样，在条件下改变字符串变量内容时可以使用  
虽然用`PRINT`系列的组合也足够书写口上或正文，但要进一步使用复杂指令，这个字符串变量加法运算符是必需的。特别是`HTML_PRINT`等  

本项说明了字符串型变量的运算。根据使用的运算符，"`～～`"的有无会变化，努力记住或尽量统一记述  

---  

## `PRINT`命令的种类  
era是文字游戏，所以用来显示文字的`PRINT`系列命令是游戏的核心  
极端地说，只要有`PRINTFORML`和`PRINTFORMW`就足够了，但除此之外还有什么，能做什么，我们来看一下  

参考链接  

- [标题实践篇 - 什么是PRINTFORML？](erawiki-title2.md#printforml)  
- [参考 - PRINT系列](../Reference/PRINT.md)  

现在最常见的是`PRINT(L|W)`和`PRINTFORM(L|W)`  
`PRINT(L|W)`是直接显示指定的文章，而`PRINTFORM(L|W)`是展开变量和式中函数后显示  
加上`L`则换行，加上`W`则换行并等待（输入等待），都不加则不换行  

``` { #language-erb title="ERB" }  
PRINTL 换行显示  
PRINTW 换行并等待  

PRINT 不换行  
PRINTL 继续上面的行显示，然后换行  
```  

是否展开变量的点，和字符串变量赋值时说明的相同  

``` { #language-erb title="ERB" }  
STR = AAA  

PRINTW STR的内容是%STR%  
PRINTFORMW STR的内容是%STR%  
```  

两个在代码上是一样的，但只有后者才正确显示`STR`的内容，实际显示是  

``` { #language-erb title="ERB" }  
STR的内容是%STR%  
STR的内容是AAA  
```  

前者相当于字符串变量的`"～～"`（仅双引号括起），后者相当于`@"～～"`（带@符号的双引号）  

"那就只用功能丰富的`FORM`就好了！"这也没错  
分开使用也好，统一使用也好，因人而异  

"在`PRINTFORM`中使用`%`或`{`时会被当作变量导致错误！"这时使用转义字符  
系统上，`FORM`内部有几个用于识别变量的字符，如果想把这些当作普通字符使用，需要告诉系统"这只是普通字符"  

``` { #language-erb title="ERB" }  
PRINTFORMW 显示百分号 \%  
PRINTFORMW 显示花括号 \{  
```  

这样，键盘上使用反斜杠右边的"\"字符  
BackSpace左边的"￥"符号也具有相同作用  
不仅在era，在程序的各个场合都会使用这种转义字符。记住没有坏处  

上述参考资料中有一些PRINT系列命令的说明，分类别说明，功能各不相同  

- `PRINTSINGLE`系列  
不会在屏幕边缘换行的`PRINT`。用于防止万一字符串超出范围破坏显示，但文字超出屏幕边缘本身就已经破坏显示了，所以建议重新调整屏幕尺寸  

- `PRINTC`系列  
对想要整齐排列命令或选项的细心制作者来说很重要  
<!--待确认-->  
显示指定数量的配置后自动换行。但非按钮文字不会自动换行  

- `PRINTDATA`系列  
从多条句子中随机显示一条  
可以使使用`RAND:XX`的随机分支稍显智能，但无法进行变量赋值或计算，也无法插入其他命令，所以只在真正只需要显示一句话的场合使用（如口上等）  

- `PRINTBUTTON`系列  
在era中，用`[]`括起来的数字会自动成为鼠标点击对应的按钮  
比如`[1]`就代表数字1的按钮，原本只能指定数字的按钮，可以设置为返回字符串类型  

- `PRINTPLAIN`系列  
上述按钮化的设定适用于整行。因此，如果用`PRINT`（既不是`L`也不是`W`）在一行中显示多个句子，会自动汇总为按钮  
为防止按钮化，使用`PRINTPLAIN`  

另外，以`PRINT`开头的命令还有`DEBUGPRINT`和`HTML_PRINT`，但它们完全是不同的东西，所以在此省略  

---  

## 调试方法  
不限于era，程序都会有bug  
极少数情况下可能没有bug，但如今越来越复杂庞大的源代码几乎都会有bug  
修复bug的过程叫做bug修复，也就是调试  
找出bug的调试和修复bug的bug修复  
那么怎么找bug，从简单的开始说明  

首先要做的是启用Emuera的调试模式  
右击使用的Emuera，选择"创建快捷方式"  

![](../assets/images/debugSS1.JPG)  

从创建的快捷方式属性中，在目标末尾加上"-debug"，注意需要半角空格  

![](../assets/images/debugSS2.JPG)  

通过此快捷方式启动Emuera，就可以以调试模式开始  

- [调试模式](../Emuera/debug.md)  

调试模式时出现的调试窗口有3个标签："变量监视"、"堆栈跟踪"、"控制台"  
如上述页面所述，可以确认变量的变化（内容），检查函数调用链`CALL`到了哪里，甚至可以直接修改变量  
制作口上暂且不提，制作补丁时是必需的，所以准备好能以调试模式启动的快捷方式吧  

还有一个最简便的调试方法  
帮助→设置→分析标签中选择"设为开发者设置"  

![](../assets/images/debugSS3.JPG)  

最重要的是"0.非标准语法"部分  
在Emuera中加载启动，即使在加载画面没有错误的ERB文件，实际执行到该代码时也可能出错  
这个设置就是为了减少这种情况。扩大错误警告范围，便于知道bug在哪里  
但并不是所有bug都能找到，即使10个bug减少到5个左右，也不能因为不再出错就掉以轻心  
调试模式和开发者设置这两个功能开启后对调试没有坏处，开发时建议启用  

接下来是进阶篇。边玩边调试  
在Emuera中最多的bug是"语法错误"和"意料之外的变量变化"  
前者可以通过上述开发者设置一定程度解决，但后者不动起来是不会知道的  
例如  

``` { #language-erb title="ERB" }  
@TEST  
PRINTL 请输入数字  
INPUT  
PRINTFORML 确认{RESULT}吗？  
[0] - 是  
[1] - 否  
INPUT  
SIF RESULT == 1  
	RESTART  
PRINTFORMW 您输入的数字是{RESULT}  
```  

如果有上述代码，这是无法正常运行的。因为在确认选项中`RESULT`的内容被改写了  
熟练后会知道"原因在这里"，但在开发过程中或者作为初学者，有时并不知道。即使这是简单的例子，复杂代码中发生这种现象，即使是高手也一样  

此代码中第三行显示的`RESULT`显示不正常，为了找出原因，介绍几种调试方法  

首先是使用变量监视的方法 在变量监视的"对象"部分写上`RESULT`  

![](../assets/images/debugSS4.JPG)  

这样就能随时看到`RESULT`的内容  
在此状态下运行刚才的代码。在确认选项中可以看到`RESULT`是输入的值。选项之后`RESULT`的内容应该变得奇怪  
也就是说，问题出现在选项部分，源代码第7行之后  
基于此解读，就会明白"重复`INPUT`是原因！"，应该是这样  

再介绍一种方法。使用`DEBUGPRINT`和控制台  

``` { #language-erb title="ERB" }  
@TEST  
PRINTL 请输入数字  
INPUT  
DEBUGPRINTFORML 第5行时的RESULT是{RESULT}  
PRINTFORML 确认{RESULT}吗？  
[0] - 是  
[1] - 否  
INPUT  
DEBUGPRINTFORML 第10行时的RESULT是{RESULT}  
SIF RESULT == 1  
	RESTART  
PRINTFORMW 您输入的数字是{RESULT}  
```  

在要点处使用`DEBUGPRINTFORML`  
在Emuera画面上没有变化，但在调试窗口的控制台中会显示`DEBUGPRINTFORML`的文本  
这样可以在不改变实际处理的情况下确认变量内容。这样即使发布时忘记删除调试处理也没有问题  
代码本身和刚才相同，所以还是能看出选项有问题。以下相同  

顺便说一下，要写正确运行的代码，一般会先把`RESULT`的内容备份到其他变量  

``` { #language-erb title="ERB" }  
@TEST  
#DIM DYNAMIC NUMBER  
PRINTL 请输入数字  
INPUT  
NUMBER = RESULT  
PRINTFORML 确认{RESULT}吗？  
[0] - 是  
[1] - 否  
INPUT  
SIF RESULT == 1  
RESTART  
PRINTFORMW 您输入的数字是{NUMBER}  
```  

这样在确认选项之前`RESULT`的值已复制到`NUMBER`，所以能正常显示  

变量监视在`INPUT`、`PRINTW`、`WAIT`等玩家输入等待以外的部分无法确认变量内容  
这种情况使用`DEBUGPRINT`逐一将变量内容显示到控制台，便于了解bug在哪里  
根据源代码选择使用。如果没有信心区分使用，全部用`DEBUGPRINT`显示主要变量  

---  

## 随机显示口上的制作方法  
如果理解了`IF`和`SELECTCASE`，想必很多人已经在使用`IF RAND:XX`或`SELECTCASE RAND:XX`等分支  
这个"`RAND:XX`"称为随机数，写法和变量相同，但内容总是随机变化  
`RAND:3`的话，从3个候选中随机选出1个  
"1~3随机选择！"可能会这么想，但大多数编程语言从0开始计数，所以是从0~2的3种中选择  

使用随机数，可以给之前在相同条件下只产生相同结果的东西赋予不同结果的可能性  
在口上中即使选择相同命令也显示不同台词，大多是使用了随机数  
那么实际用随机数写口上的例子如下  

``` { #language-erb title="ERB" }  
;使用IF的情况  
IF RAND:3 == 0  
PRINTW "今天想吃咖喱"  
ELSEIF RAND:2 == 0  
PRINTW "今天想吃蛋包饭"  
ELSE  
PRINTW "今天想吃意大利面"  
ENDIF  
```  

这是等概率显示各分支的正确语法。但有没有注意到什么违和感  
第一个`IF`是`RAND:3`，第二个`IF`却是`RAND:2`  
"这样不对吧，应该是这样写才对"  

``` { #language-erb title="ERB" }  
IF RAND:3 == 0  
PRINTW "今天想吃咖喱"  
ELSEIF RAND:3 == 1  
PRINTW "今天想吃蛋包饭"  
ELSE  
PRINTW "今天想吃意大利面"  
ENDIF  
```  

会有想修正的心情吧，但这样就不等概率了  
因为随机数"总是"变化，第一个`IF RAND:3`和第二个`IF RAND:3`结果不一定相同  
第一个例子是33%:33%:33%的概率，而第二个例子是33%:22%:44%的概率。也就是说显示的口上会偏颇  
3个随机分支的话，第一个分支以33%(`RAND:3`)显示，剩余分支有2个，所以第二个分支以50%(`RAND:2`)显示，其余情况显示`ELSE`分支，这样才是等概率  

这类似于一个小逻辑谜题，知道的话很方便，但说实话用程序写并不实用  
所以建议随机分支使用`SELECTCASE`  

``` { #language-erb title="ERB" }  
SELECTCASE RAND:3  
CASE 0  
  PRINTW "今天想吃咖喱"  
CASE 1  
  PRINTW "今天想吃蛋包饭"  
CASE 2  
  PRINTW "今天想吃意大利面"  
ENDSELECT  
```  

这样在最初的`SELECTCASE`时分支用的随机数就固定了，所以只要在`CASE`中指定`RAND:3`返回的候选(0~2)就能等概率  

仅限这种随机分支，除了`IF`和`SELECTCASE`还有可用的方法  
`PRINTDATA`这个命令可以从多个候选中等概率选择一句  

``` { #language-erb title="ERB" }  
PRINTDATAW  
DATA "今天想吃咖喱"  
DATA "今天想吃蛋包饭"  
DATA "今天想吃意大利面"  
ENDDATA  
```  

上述例子和前面`IF`和`SELECTCASE`例子的动作相同  
即使使用`SELECTCASE`，添加分支时也需要改写`RAND:X`并增加`CASE`，比较麻烦，但使用`PRINTDATA`只需在`DATA`后添加一行即可  
在`PRINTDATAW～ENDDATA`之间  

``` { #language-erb title="ERB" }  
DATA "今天想吃炒饭"  
```  

只需添加这一行，就能增加随机分支的候选  

本项说明了在口上中使用随机数的情况，随机数也可用于计算处理给予随机性，用途很多。相关内容将在计划补充的其他项目中说明  

---  

## 让文字变色  
通过之前的说明，应该大致能使用显示文字的方法，`PRINT`系列  
现在说明近年来变体中常见的，给文字着色美化的方法  
最简单的方法是使用"`SETCOLOR`"命令  

- [参考 - SETCOLOR](../Reference/SETCOLOR.md)  

如其所述，SETCOLOR有几种写法  

``` { #language-erb title="ERB" }  
SETCOLOR 255, 0, 0  
PRINTW 这是红色文字  
SETCOLOR 0x00FF00  
PRINTW 这是绿色文字  
```  

有`RGB`格式和十六进制方式两种写法  
在emuera中，从"`0x`"开始写可以表示十六进制。根据情况，十六进制可能更容易理解和使用。不知道十六进制的人请看其他项目说明  

对于觉得"数字难以想象颜色~"的人，还有"`SETCOLORBYNAME`"这个命令  
用法如下  

``` { #language-erb title="ERB" }  
SETCOLORBYNAME blue  
PRINTW 这是蓝色文字  
SETCOLORBYNAME yellow  
PRINTW 这是黄色文字  
```  

这里可指定的颜色仅限Emuera使用的C#中定义的颜色  

- [KnownColor 枚举 (System.Drawing) - Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/api/system.drawing.knowncolor?redirectedfrom=MSDN&view=net-5.0)  

坦白说上述微软页面难以理解，看这个会更清楚  

- [WEB色彩样本 原色大辞典 - HTML颜色代码](https://www.colordic.org/)  

像`cyan`、`lime`、`purple`这样用名字写的，容易想象"这个`SETCOLOR`会变成这种颜色"，所以推荐  
但只能指定已定义的颜色，指定原创颜色名或拼写错误会出错  
使用[`COLOR_FROMNAME`](../Reference/COLOR_FROM.md)这个式中函数可以确认颜色名是否存在，不确定时先测试一下吧  

``` { #language-erb title="ERB" }  
SIF COLOR_FROMNAME("yelow") == -1  
PRINTW 拼写错误  
```  

这些当然也能在口上中使用，有助于强调特定句子  
但请勿忘记，一旦使用`SETCOLOR`，直到`RESETCOLOR`为止都会以该颜色`PRINT`  
在口上中使用`SETCOLOR`表示"这个角色是这种形象色"是个好主意，但忘记`RESETCOLOR`会破坏整个游戏的外观，所以和`IF～ENDIF`一样，`SETCOLOR`和`RESETCOLOR`要成套使用  

不仅能改变文字颜色，还能改变字体  

[参考 - FONTBOLD、FONTITALIC、FONTREGULAR](../Reference/FONT_OPERATION.md)  

`FONTBOLD`变粗体，`FONTITALIC`变斜体，`FONTSTYLE`指定4为删除线，8为下划线  
`FONTSTYLE`使用位数，如果不懂这部分现在最好别碰  
总之记住像使用`SETCOLOR`一样使用`FONTBOLD`和`FONTITALIC`，同样像使用`RESETCOLOR`一样使用`FONTREGULAR`吧  
这边也别忘了`FONTREGULAR`，不然显示会损坏  

---  

## 位数相关  
要处理上述`FONTSTYLE`，需要理解位数概念  
首先想象家庭用断路器的开关并排的样子  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)  

4个开关都是OFF。十进制说是0的状态。二进制说是0000  
位数就是二进制的应用，同时说明  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)  

只有第一位ON了 这是二进制的0001，十进制是1  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)![](../assets/images/off.png)  

这是二进制的0010的例子。十进制是2  
这样0110或1100等，各开关的ON/OFF都可以转换为二进制  
那么什么是二进制，十进制不行吗，为什么位运算要用二进制，说明如下  

二进制如上所述，由各开关的ON/OFF，即0和1构成的计数方式  
有4个开关，所以模式是2的4次方=16种  
这叫4位数 可处理数字是0~15 15(1111)再加1就会溢出（因开关不足的循环）回到0(0000)  
第一位ON变成1，接着要表示2的话，第二位ON第一位OFF，要表示3的话再次第一位ON。和十进制达到10时个位变0一样  

下面是3的例子(0011)  
![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)![](../assets/images/on.png)  

同样要表示4的话，升第三位第一二位OFF(0100)  

![](../assets/images/off.png)![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/off.png)  

只用第一二位的2个开关就能处理0~3的4个数字，所以第三位ON的状态下，用第一二位的ON/OFF可以+4，即处理0~7的数字  
同样8(1000)  

![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)  

这也和4时一样，下3位可处理0~7的数值，+8可处理0~15的数字  
理解到这里，就知道要解决16以上溢出问题怎么办了  
答案很简单。增加开关  

![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)  

这样可处理16(10000) 下4位0~15+16变成0~31，即能处理两倍的数字  
这样只有1和0的二进制，增加位数也能表示巨大数字  
基于此，说明在程序中使用位数的理由  

迄今为止说明的数值型变量用法，是以十进制为前提的用法 如向变量1中放入3，变量2中放入5，变量1和2相加得8等  
从根本上颠覆这种想法，用二进制思考 说明过的，二进制计数方式也有对应的十进制数字，所以可以直接放入数值型变量  

在era中，很多变体在"污渍"系统中使用了这种位数。为什么呢  
是为了在单一部位保存多种污渍（精液污渍、爱液污渍）等信息  
这里简化为3种污渍类型来说明。精液污渍、爱液污渍、肛门污渍  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)  

将其作为从右到左分别对应**精液**、**爱液**、**肛门污垢**的开关。  
首先假设被精液弄脏了。将此状态设为 `001`（十进制的 1）。  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/on.png)  

接着假设肛门污垢增加了。此状态为 `101`（十进制的 5）。  

![](../assets/images/on.png)![](../assets/images/off.png)![](../assets/images/on.png)  

最后假设所有污垢都沾上了。此状态为 `111`（十进制的 7）。  

![](../assets/images/on.png)![](../assets/images/on.png)![](../assets/images/on.png)  

这种污垢状态主要以十进制数值的形式存储在 `STAIN` 标志中。  
仅用 3 位二进制能表示的 0～7 这几个数字，就能持有“三种污垢各自有无”这多个信息。  
例如，如果是 `010`（这里原文可能有误，二进制 010 是十进制 2，而原文写的是十进制 3，通常 3 是 011。根据上下文逻辑，若只有爱液污垢，可能是指中间位。若按原文“010(十进制3)”理解可能存在笔误，通常 3 对应二进制 011。但在位运算讲解中，重点在于**每个位代表一种状态**）。  
*修正理解*：原文意图是举例说明不同组合。若二进制是 `010`，则是十进制 2；若十进制是 3，则是二进制 `011`。此处核心意思是：**0～7 的每个数字都被分配了特定的模式**。  
只要对这些 0～7 的数字进行位运算加法，就能赋予精液污垢和肛门污垢的信息。  
如果要持有其他污垢的信息，可以想象为增加对应的开关即可。  
<!-- 用十进制也能做同样的事。给每一位赋予信息，比如像买某种数字彩票选了 14072358 (14, 7, 23, 58) 那样。这只是题外话，暂时忘掉也没关系 -->  

这个位数仅用于判别各信息的开与关（ON/OFF），即 `true` 和 `false`。  
如果能理解到这里，应该也能理解最初提到的 `FONTSTYLE` 的说明了。  
引用自 `FONTSTYLE` 命令的解说：  

``` { #language-erb title="ERB" }  
0则为通常，1则加粗，2则斜体，4则删除线，8则下划线。  
```  

这是因为可以组合 4 种字体变更，所以使用了 4 位二进制数。  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)  

遵循二进制语法，从右到左分别是**加粗**开关、**斜体**开关、**删除线**开关、**下划线**开关。  
根据需要打开这些开关，就能实现组合后的字体变更。  
如果是“斜体且加删除线”的情况，即为 `0110`（十进制的 6）。也就是说 `FONTSTYLE 6` 是正确的。  
平时习惯了十进制的人可能会对二进制概念感到困惑，但这是支撑计算机核心的重要概念，即使不需要完全理解，也请记住有这种用法。  
<!-- 当然也可以进行二进制运算，但那属于更高阶的话题，留待以后再说 -->  
本次说明了在命令中使用位数，以及在污垢等情况下使用位数更方便且成为惯例的模式所需的最低限度知识。下一项将介绍简化这种位数处理的 `SETBIT`、`GETBIT` 等指令。  

---  

## 可用于位运算的指令和表达式函数  
主要有 4 种：`SETBIT`、`CLEARBIT`、`INVERTBIT`、`GETBIT`。  

- [参考 - 位操作系](../Reference/BIT_OPERATION.md)  

在前述的位数中，例如只想打开从右数第 3 个开关时，只需给变量代入 4 即可（二进制 `0100`）。  
但是，如果直接代入，该变量的位数记录会被全部初始化。  
所以，如果想在已经使用的状态下打开从右数第 3 个开关，就不能代入，而是要加上 4。  
然而，这样做的话，如果第 3 个开关已经是开启状态，就会发生重复开启，导致位数变得乱七八糟。  
解决这个问题的就是 `SETBIT` 指令。  

``` { #language-erb title="ERB" }  
;打开第 0 位比特  
INT += 1  
;打开第 2 位比特  
INT += 4  

;想打开第 1 位比特，但不知道当前的开关状态  
SETBIT INT, 1  
```  

上述代码用于在不知道从右数第 2 个（从 0 开始数是第 1 个）开关的 ON/OFF 状态，却想要确保将其设为 ON 的情况。  
虽然加上 2 也可以，但如前所述，如果已经是 ON 状态，就会变成 9（二进制 `1001`），导致错误。  
这个 `SETBIT` 指令会判断该比特是否已经开启，并自动执行加法操作。  
当然，如果已经是 ON 状态，变量 `INT` 不会发生变化。  

`CLEARBIT` 顾名思义，是消除指定比特的指令。  

``` { #language-erb title="ERB" }  
;设置第 0, 1, 2 位比特 (0111 = 7)  
INT = 7  

;关闭第 0 位比特  
INT -= 1  

;关闭第 2 位比特  
INT -= 4  

;关闭第 1 位比特 这里试试使用 CLEARBIT  
CLEARBIT INT, 1  
```  

最后的 `CLEARBIT` 会将对应 2 的比特关闭并减去 2，因此 `INT` 变为 0。  
这也用于在不知道 ON/OFF 状态的情况下，想要确保将其设为 OFF 的情况。如果已经是 OFF 状态，则不会发生变化。  

`INVERTBIT` 是用于切换这些状态的指令。也就是说，用开关来比喻很容易理解。  

![](../assets/images/off.png)![](../assets/images/off.png)![](../assets/images/off.png)  

对于从右数第 0、1、2 位比特，指定 `INVERTBIT INT, 0～2` 即可切换它们的 ON/OFF 状态。  
这个指令不会出现“什么都不发生”的情况，一定会根据指定的比特数量进行加法或减法操作。  

最后是 `GETBIT`。这不是指令，而是表达式函数。  

``` { #language-erb title="ERB" }  
;打开第 0 位和第 2 位比特 (0101 = 5)  
INT = 5  

IF GETBIT(INT, 0)  
PRINTW 第 0 位比特是 ON  
ELSE  
PRINTW 第 0 位比特是 OFF  
ENDIF  

IF GETBIT(INT, 1)  
PRINTW 第 1 位比特是 ON  
ELSE  
PRINTW 第 1 位比特是 OFF  
ENDIF  

IF GETBIT(INT, 2)  
PRINTW 第 2 位比特是 ON  
ELSE  
PRINTW 第 2 位比特是 OFF  
ENDIF  
```  

因为这是按照最初代入的状态，开启了 0 和 2 位比特，所以结果是：0=ON，1=OFF，2=ON。  
参考本次说明，尝试在上述例句中组合使用 `SETBIT`、`CLEARBIT`、`INVERTBIT` 可能会很有趣。  
应用这些，就可以在 era 中进行污垢 (`BIT`) 的设置 (`SET`)、清除 (`CLEAR`)、获取 (`GET`)。反転 (`INVERT`) 虽然不太常用，但在其他场合也会用到位运算，所以记住没有坏处。  

*无限循环的小窍门  
Emuera Ver1.823 实装了名为 `AWAIT` 的指令。  
如果制作了循环次数过多的处理，Emuera 有时会弹出对话框提示：“这看起来像是无限循环……”。  

![](../assets/images/inifinite_loopSS.JPG)  

出现这个提示大多数情况是真的发生了无限循环，但根据电脑的性能，沉重的处理也可能被当作无限循环处理。  
在循环处理中加入 `AWAIT` 指令，可以防止这种误判。  

[参考 - AWAIT](../Reference/AWAIT.md)  

正如 EmueraWiki 所述，如果频繁插入 `AWAIT`，处理速度会肉眼可见地变慢。因此可以下功夫，例如每循环 100 次插入一次 `AWAIT`，或者每整体进度的 10% 插入一次等。这样既能利用 `AWAIT` 防止误判，又能实现轻量级的处理。  

---  

## 关于文字编码  
最近随着 HTML 标准的进化和文字编码的统一化，见到乱码的机会减少了，但想必大家都经历过一次乱码现象。  
造成这种现象的原因是**文字编码**。  

众所周知，程序是由 0 和 1 构成的，透过电脑或手机正在阅读的这篇文章，追根究底也是由 0 和 1 的组合构成的。  
为了将这些 0 和 1 的组合转换为文字，使用了文字编码。  

日本主要使用的文字编码有 **Shift-JIS** 和 **Unicode**（含 UTF 系）。  
前者 Shift-JIS 略称为 SJIS，原本是为了擅长处理日语而制作的文字编码。  
然而，随着 IT 的普及，为了处理 SJIS 无法支持的各国特有的文字和符号，**Unicode** 这一文字编码得到了普及。  

那么，为什么这些文字编码的差异会导致乱码呢？那是因为**转换表不同**。  
如前所述，程序本身是由 0 和 1 构成的，但例如同样的 `10101011`，根据文字编码的不同，对应的字符也不同。  
如果用 SJIS 编写的文件用 Unicode 打开，就会发生乱码，反之亦然。  

这在 era 中也是可能发生的问题，但值得庆幸的是，Emuera 拥有即使 SJIS 文件和 Unicode 系文件混存也能运行的高科技规格。  
不过，文字编码除了 SJIS、Unicode 之外还有各种种类，并不能保证把它们像“黑暗火锅”（大杂烩）一样混在一起也能运行。  
尽可能统一文件的文字编码是理想的。也有可以进行批量转换的免费软件，请加以利用。  
如前所述，Unicode 系在处理符号方面很强。如果想使用特殊字符编写文本，请使用 Unicode 系的文字编码。  

---  

※今后也计划增加项目  