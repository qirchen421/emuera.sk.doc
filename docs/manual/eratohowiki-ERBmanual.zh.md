# ERB语法讲座  

<!--  
这部分几乎是直接复制过来的，需要调整  
需要补充关于PRINTC的内容  
-->  

原页面  
eratoho汇总 V3 ERB语法讲座  

[前编 基础、变量、显示](https://seesaawiki.jp/eratoho/d/ERB%b9%bd%ca%b8%b9%d6%ba%c2)  
[后编 分支与循环、函数与函数调用、标签与按键输入、其他](https://seesaawiki.jp/eratoho/d/ERB%b9%bd%ca%b8%b9%d6%ba%c22)  
[特别篇 关于位运算](https://seesaawiki.jp/eratoho/d/ERB%b9%bd%ca%b8%b9%d6%ba%c23)  
[参考 ERB文件创建和修改时常出现的错误问答](https://seesaawiki.jp/eratoho/d/ERB%ca%d4%bd%b8%a4%cb%a4%aa%a4%b1%a4%eb%c2%e5%c9%bd%c5%aa%a4%ca%a5%a8%a5%e9%a1%bc)  

---  

## 基础  
这是语法之前的部分。出现`未知～`等错误时，可能是这部分有问题。  

---  

### 语法描述需使用半角字符  
除了日文句子外的所有部分都应该使用半角字符输入。  
容易遗漏的是全角空格。使用文本编辑器的搜索功能  
搜索全角空格就可以轻松找到。  

---  

### 分支和循环应使用缩进  
这不会直接导致错误，但在使用下面提到的分支和循环时  
应该使用缩进。缩进是指在行首放置固定数量的空白  
来调整描述的位置，使得从这里到这里是一块  
处理变得清晰易懂。缩进的空白使用TAB键。  
虽然缩进没有处理上的效果，但在调试时自己重新查看或者  
给别人看的时候都会有帮助。即使觉得不需要也最好加上。  

---  

### 注释行的行首加上`;`(半角分号)  
在语法行首加上`;`可以将该行注释化。这称为注释掉。  
注释是指写在那里但不执行的处理部分  
有时用来临时禁用某个处理，或者作为附近处理的  
备忘录使用。另外，在注释中使用全角字符也没关系。  

``` { #language-erb title="ERB" }  
;这里只是注释所以不会执行！  
```  

从Emuera1.807开始的新功能，现在也可以在语法中途添加注释了。  
但要注意，`PRINT`系列指令后面跟着的`;`不会被识别为注释，而是直接作为字符串显示。  

``` { #language-erb title="ERB" }  
A = A + B ;这里是注释  
PRINT ほげほげ ;但这里不会被注释掉  
```  

---  

### 应详细准确地添加注释  
正确添加注释可以更容易应对问题发生时的情况。  
同时也有助于自己或他人重新审视源代码时的理解。  
调试和修改也很有用，所以尽量添加注释比较好。  
不过，注释内容本身不能有错误。  
注释的内容也需要仔细检查。  

<details><summary>eramaker的特性</summary>  

### 每个文件的最后一行必须至少有一行空行  
由于`eramaker`的规格问题，如果文件最后没有空行<br/>  
其前一行将无法被识别。<br/>  
这是`ENDIF～`类错误的常见原因之一。<br/>  
（在Emuera中不会发生这个问题。）<br/>  
</details>  

---  

## 变量  
关于在计算等处理中使用的变量。  

### 什么是变量？  
变量就像一个容器，用于保存计算结果或比较两个数值等。  
仅凭文字说明难以理解，请看一个例子。  

``` { #language-erb title="ERB" }  
A = 0  
B = 0  
C = 0  
```  

`A = 0`表示将`0`赋值给变量`A`。  
上面的`A`、`B`、`C`分别是变量。目前每个变量中都是`0`。  

``` { #language-erb title="ERB" }  
B = A + 1  
C = A + 2  
```  

`B = A + 1`表示将`A + 1`的结果赋值给变量`B`。  
这里进行了计算，`B`和`C`的内容被改写了。由于`A`是`0`，  
`B`是`0 + 1`等于`1`，`C`是`0 + 2`等于`2`。`A`仍为`0`不变。  

``` { #language-erb title="ERB" }  
A = C  
A = B  
```  

接下来`A`被赋值为`C`，即`2`。这样`A`变成了`2`。  
但是，下一行将`A`赋值为`B`，即`1`，所以`A`变成了`1`。  
这样，同一个变量被多次赋值时结果会被覆盖。  

``` { #language-erb title="ERB" }  
C = C + 2  
A = B + C  
```  

接下来，`C`被赋值为`C + 2`。  
计算前`C`是`2`，所以计算后`C`是`2 + 2`等于`4`。  
然后`A`被赋值为`B + C`，即`1 + 4`。  
到目前为止的处理结果是`A`为`5`，`B`为`1`，`C`为`4`。  

---  

### 变量的种类  
变量大致分为两种。  
像上面的`A`、`B`、`C`那样存储数字的『数值型变量(int型)』和  
存储文字的『字符串型变量(string型)』。  
数值变量用于计算和条件判断，字符串变量主要用于显示文本。  
此外，变量还有一个『数组』的概念。通过使用数组，可以将多个值  
存储在一个变量中。例如`A`这个变量的数组是`A:0`、`A:1`、`A:2`、`A:3`、…这样  
用`（变量名）:（数组编号）`来表示。（`:`使用半角冒号）  

``` { #language-erb title="ERB" }  
A:0 = 0  
A:1 = 1  
A:2 = 2  
A:3 = 0  

A:3 = A:0 + A:1 + A:2  
```  

这个式子表示将`A:0 + A:1 + A:2`的结果，即`0 + 1 + 2`赋值给`A:3`。  
处理结果，`A:3`变成`3`。  

有些变量还有二维数组这种形式。二维数组  
用`A:0:0`、`A:0:1`、…、`A:1:0`、`A:1:1`、…这样的方式表示，可以存储更多值。  

哪个变量是哪种数组形式，可以参考[eramaker变量列表](../eramaker/variables.zh.md)或[Emuera常量・变量](../Emuera/variables.zh.md)。  

---  

### 变量的使用方法  
基本上和[eramaker变量列表页面](../eramaker/variables.zh.md)上写的相同。  
这里主要介绍需要注意的部分。  

- `A - Z`  
上述页面没有提及，但可以作为数组使用。  
`A`和`A:0`相同。  
也就是说，改变`A:0`的值后，`A`的值也会相应变化。  

- `FLAG`/`TFLAG`/`CFLAG`  
`FLAG`・`TFLAG`用于游戏系统相关部分  
管理特定角色专用标记时请使用CFLAG。另外，这些很容易重复，使用时请务必确认标记列表。标记列表请查看各变体附带的"变量资料.txt"等。  

<details><summary>eramaker的特性</summary>  

另外，`eramaker`的规格中说可以使用0～999的1000个数字，但实际上由于bug只能使用0～998的999个。<br/>  
使用999会导致存档损坏，绝对不要使用。<br/>  
注意TFLAG会在每次调教时重置。<br/>  
（使用Emuera时，即使使用CFLAG:999也不会导致存档损坏。另外，通过设置还可以使用超过1000个数字。）<br/>  
</details>  

- `TEQUIP`  
和上面的标记系统一样容易重复，使用时请确认标记列表。  

---  

### 关于二维数组  
二维数组格式的变量主要用于角色相关数据。  
因此，二维数组变量的读取方式通常是这样的：  
``` { #language-erb title="ERB" }  
;变量「ABL」、「TALENT」等的例子  
（能力类型）:（角色注册编号）:（能力编号）  

```  

- `TALENT:5:20`  
这表示注册编号`5`的角色的`20`号素质。(`20`部分可以用talent.csv中定义的名称替代)  
这里需要注意角色的注册编号(`ID`)和角色编号(`NO`)的区别。  
在eratoho中角色编号5是琪露诺，但  
注册编号5不一定总是指琪露诺。  
注册编号是在`SHOP`购买角色(`ADDCHARA`)等变为可调教状态时  
分配的编号，表示角色列表的排列顺序。  
比如首先购买灵梦，然后购买琪露诺的情况下  
琪露诺的注册编号是2，这时如果出售灵梦(`DELCHARA`)的话列表整体  
向前移动一位，琪露诺的注册编号变成1。  

- `TALENT:100`  
看起来这不是二维数组。  
但这是`TALENT:TARGET:100`的简写形式，表示当前正在调教或  
准备调教的角色的`100`号素质。  
`TARGET`是表示当前正在调教或准备调教的角色注册编号的变量。  
`TARGET`因为经常被指定所以可以省略。  

<details><summary>eramaker的特性</summary>  

顺便说一下，上面提到了`TALENT:5:20`<br/>  
由于eramaker的规格问题，实际上这样写也无法表示注册编号5的<br/>  
角色的20号素质。<br/>  
原因是这个`TARGET`的简写，在读取到`TALENT:5`时<br/>  
就被判断为`TALENT:TARGET:5`的简写形式<br/>  
从而成为错误的原因。<br/>  
实际想表示注册编号5的角色的20号素质时<br/>  
```  
A = 5  
TALENT:A:20  
```  
需要像这样先将注册编号存储到变量中等方法。<br/>  
（使用Emuera时不会发生这个问题。`TALENT:5:20`也能按预期使用。）<br/>  
</details>  

<!--  
//信息太旧了所以注释掉了  
有关变量的详细信息也可参考[eramaker变量信息](https://seesaawiki.jp/eratoho/d/eramaker%ca%d1%bf%f4%be%f0%ca%f3)。  
-->  

---  

## 运算  
数值处理不可缺少的计算方法。  

### 基本四则运算  
四则运算的基本运算符  

|代码  |结果|  
|:--     |:-- |  
|`A + B` |求A和B的和。（加法）|  
|`A - B` |求A和B的差。（减法）|  
|`A * B` |求A和B的积。（乘法）|  
|`A / B` |求A和B的商。（除法）小数点以下舍去。|  
|`A % B` |求A除以B的余数。（取模）|  

---  
### 对自身的四则运算  
像`A = A + B`这样的形式可以简化如下。  

|代码  |结果|  
|:--     |:--|  
|`A += B`|和`A = A + B`相同。|  
|`A -= B`|和`A = A - B`相同。|  
|`A *= B`|和`A = A * B`相同。|  
|`A /= B`|和`A = A / B`相同。|  
|`A %= B`|和`A = A % B`相同。|  

---  
### 逻辑运算符  
用于位运算的特殊运算符。  

|代码  |结果|  
|:--     |:--|  
|`A \| B`|返回A和B的OR运算结果。|  
|`A & B` |返回A和B的AND运算结果。|  

---  

## 显示  
主要用于口上，在屏幕上显示文字等内容的[`PRINT`](../Reference/PRINT.zh.md)系列语法。  

### `PRINT`系列指令的种类  
`PRINT`系列指令主要有以下几种。  

|语法|概要|  
|:--|:--|  
|`PRINT`|显示普通字符串。不能使用变量等。|  
|`PRINTV`|显示数值变量。|  
|`PRINTS`|显示字符串变量。|  
|`PRINTFORM`|在普通字符串中复合显示数值・字符串变量。|  

不太常用的是以下几种。  

|语法|概要|  
|:--|:--|  
|`PRINTFORMS`|显示字符串变量。|  
|`PUTFORM`|和`PRINTFORM`类似，但专门用于存档数据。|  

在各个指令后加上`L`或`W`可以  
进行换行或等待输入（直到按下Enter键才继续）等。例如：  

``` { #language-erb title="ERB" }  
PRINT あ  
PRINT い  
PRINTL う  
PRINTW え  
PRINTL お  
```  

这样描述的话，首先  

```  
あいう  
え  
```  

这样显示，并进入等待输入状态。  
在这里按下Enter键后剩余部分也会显示  

```  
あいう  
え  
お  
```  

这样显示。  

---  

### PRINT系列指令的用法  
如上所述，`PRINT`系列指令各有用途，  
但实际上`PRINTFORM`可以替代大部分功能。  
要显示普通文章的话  

``` { #language-erb title="ERB" }  
PRINTFORM あいうえお  
```  

像这样直接描述即可。这时，不要忘记在`PRINTFORM`和要显示的文章之间  
留出半角空格。  

要组合显示数值变量的话  

``` { #language-erb title="ERB" }  
A = 5  
PRINTFORM 变量A是｛A｝  
```  

像这样用半角的`{~~~}`将变量名括起来描述。  

对于字符串变量  

``` { #language-erb title="ERB" }  
STR:0 = かきくけこ  
PRINTFORM あいうえお%STR:0%さしすせそ  
```  

像这样用`%~~~%`将变量名括起来描述。  

`PRINTFORM`后面加上`L`、`W`的话，  

- `PRINTFORML`：换行但不等待输入，继续显示下一行  
- `PRINTFORMW`：换行并在该行停止显示  

可以区分使用。  

只有存档数据显示的`PUTFORM`不能用`PRINTFORM`替代，  
但由于修改存档显示的机会较少，这里就不详述了。  
详情请参阅[`PUTFORM`](../Reference/PUTFORM.zh.md)页面。  

---  

### 其他显示  
要在显示文字后换行的话使用`PRINTFORML`，  
但如果只想换行而不显示文字，即想显示空行的话  
也可以使用`PRINTL`、`PRINTFORML`。  

``` { #language-erb title="ERB" }  
PRINTFORML あいう  
PRINTFORML  
PRINTFORML えお  
```  

第二行在`PRINTFORML`后只输入了半角空格，这样  

```  
あいう  

えお  
```  

就能显示出空行。用`PRINTL`也能得到完全相同的显示。  

另外，使用`DRAWLINE`可以  
```  
-------------------------------------------------------------------------------  
```  
这样显示长横线。  

---  

## 分支与循环  

### 条件式  
在分支和循环之前，关于它们执行基准的条件式。  

#### 比较运算符  
条件式比较变量与变量、变量与数值的大小等，并判断是否正确。  
用于比较的就是『比较运算符』，有`==`、`!=`、`<`、`>`、`<=`、`>=`等。  
`==`表示相等，`!=`表示不相等，不等号各自代表原来的含义。例如，`A = 0`、`B = 1`、`C = 0`时  

|式子|真假(在Emuera中真为1，假为0)|  
|:--|:--|  
|`A == B`|假（`false`，不正确）|  
|`A == C`|真（`true`，正确）|  
|`A != C`|假|  
|`A > B`|假|  
|`B > C`|真|  
|`B <= A`|假|  
|`A >= C`|真|  

会得出这样的结果。  

另外，也可以通过写`0`或其他数字来代替使用比较运算符的条件式  
表示真假。在这种情况下，`0`为假，其他为真。  

<!--（相关文章：[[ERB编辑中的典型错误#!= 0包含-1]]）-->  

#### 否定运算符  
在Emuera中，除了比较运算符之外还有『否定运算符』，用`!`（感叹号）表示。  
这具有将紧跟其后的条件式结果反转的效果。以上面的例子来说，  
`!(A > B)`为真，`!(A <= C)`为假。  

#### 条件式的结合  
使用多个条件式时，在条件式与条件式之间写入`&&`或`||`。  
`&&`用于"○○且××"，`||`用于"○○或××"。例如，`A == 0`且`B == 1`的条件是  
``` { #language-erb title="ERB" }  
A == 0 && B == 1  
```  

这样。  

`A == 0`或`B == 0`的条件则是  

``` { #language-erb title="ERB" }  
A == 0 || B == 0  
```  

这样。  

更复杂一点，`A == 0`且`B == 1`，或`A == 0`且`C == 1`的话  

``` { #language-erb title="ERB" }  
(A == 0 && B == 1) || (A == 0 && C == 1) 或者  
A == 0 && (B == 1 || C == 1)  
```  

这样。  

---  

#### 判断角色能力和资质  
常用的条件式中，有判断角色能力和资质的。例如，正在调教的角色是处女时，`TALENT:TARGET:处女 == 1`成立。资质拥有时为`1`，没有时为`0`，所以在条件式中只写`TALENT:TARGET:处女`的话，就和"正在调教的角色是处女"这个条件意思相同。  

反过来，`TALENT:TARGET:处女 == 0`（或`!TALENT:TARGET:处女`）的话，  
意思是"正在调教的角色不是处女"。  

正在调教的角色顺从达到Lv3以上时，`ABL:TARGET:顺从 >= 3`成立。能力和刻印等级就是数值。体力和经验等不以等级表示的能力，值直接使用。表示正在调教的角色V经验达到10以上的条件的话，`EXP:TARGET:V经验 >= 10`。  

---  

#### 随机(随机数)  
通过写`RAND:（数值或数值变量）`，可以从一定范围内  
随机决定数值。例如，写`A = RAND:10`的话，变量`A`会是0到9（从0开始计数，所以上限是9）之间的任意整数。另外，  

``` { #language-erb title="ERB" }  
A = 5  
B = RAND:A  
```  

这种情况，变量`B`会是0到4（从0开始计数，所以上限是4）之间的任意整数。  

<!--（相关文章：[[ERB编辑中的典型错误#RAND的用法]]）-->  

---  

### 分支  
像"当○○时□□显示"这样的处理就是分支。分支使用的语法主要有`IF`、`SIF`、`SELECTCASE`等。  

#### `IF - ELSEIF - ELSE - ENDIF`  
"如果○○"这种处理最常用的是这个语法。  

[`IF`的参考页面](../Reference/IF.zh.md)  

``` { #language-erb title="ERB" }  
IF A == 0  
    PRINTFORML 变量A是0。  
ELSEIF B == 0  
    PRINTFORML 变量A不是0，变量B是0。  
ELSE  
    PRINTFORML 变量A不是0，变量B也不是0。  
ENDIF  
```  

上面是`IF - ELSEIF - ELSE - ENDIF`语法的基本形式。上面的语法是  

- 如果变量`A`是`0`（`IF A == 0`），显示"变量A是0。"  
- 变量`A`不是`0`而变量`B`是`0`时（`ELSEIF B == 0`），显示"变量A不是0，变量B是0。"  
- 不符合任何条件时（`ELSE`），显示"变量A不是0，变量B也不是0。"  

这样，在一个`IF - ENDIF`之间从上到下判断条件式，  
只执行符合条件部分之后的处理。上面的例子中处理部分只有一行，但实际中  
从下一个`ELSEIF`、`ELSE`、`ENDIF`之前的处理都会全部执行。  

``` { #language-erb title="ERB" }  
IF 条件式1  
    处理1  
    处理2  
    处理3  
ELSEIF 条件式2  
    处理4  
    处理5  
ELSE  
    处理6  
ENDIF  
```  

（条件式1成立时执行处理1～3，条件式1不成立而条件式2成立时执行处理4和5，都不成立时只执行处理6）  

想判断的条件有3个以上时，可以不断增加`ELSEIF`。  

``` { #language-erb title="ERB" }  
IF A == 0  
    PRINTFORML 变量A是0。  
ELSEIF B == 0  
    PRINTFORML 变量A不是0，变量B是0。  
ELSEIF C == 0  
    PRINTFORML 变量A、B不是0，变量C是0。  
ELSE  
    PRINTFORML 变量A、B、C都不是0。  
ENDIF  
```  

想判断的条件只有一个时，`ELSEIF`以下的部分可以没有。  

``` { #language-erb title="ERB" }  
IF A == 0  
    PRINTFORML 变量A是0。  
ELSE  
    PRINTFORML 变量A不是0。  
ENDIF  
```  

不符合条件时不做什么的话，`ELSE`以下的部分可以没有。  

``` { #language-erb title="ERB" }  
IF A == 0  
    PRINTFORML 变量A是0。  
ELSEIF B == 0  
    PRINTFORML 变量A不是0，变量B是0。  
ENDIF  
```  

**`IF`和`ENDIF`是必需的。** 注意不要忘记写`ENDIF`，否则会引起错误。  

<!--  
（相关文章：[[ERB编辑中的典型错误#把ELSEIF当作ELSE/或当作ELSE IF]]）  
（相关文章：[[ERB编辑中的典型错误#你已死了分支]]）  
-->  

---  

#### `SIF`  
将上面的`IF - ENDIF`简化后就是`SIF`。  

[`SIF`的参考页面](../Reference/IF.zh.md)  

``` { #language-erb title="ERB" }  
SIF A == 0  
    PRINTFORML 变量A是0。  
```  

`SIF`的特点是不需要`ENDIF`，不能使用`ELSEIF`或`ELSE`，  
只能执行下一行，等等。例如  
``` { #language-erb title="ERB" }  
SIF 条件式  
    处理1  
    处理2  
```  

这样写的话，不管条件式的真假，处理2都会被执行，  
请注意。执行两个以上处理时使用上面的`IF - ELSEIF - ELSE - ENDIF`。  

<!--（相关文章：[[ERB编辑中的典型错误#试图在SIF语句中包含多行]]）-->  

<details><summary>eramaker的特性</summary>  

另外，在eramaker中<br/>  
```  
SIF 条件式  
    ;注释  
    处理1  
```  
像这样，在SIF后面紧接着注释行的话，处理1一定会被执行，这也需要注意。<br/>  
（在Emuera中注释行会被正确忽略，只有条件式为真时才会执行处理1。）<br/>  
<!--（相关文章：[[ERB编辑中的典型错误#在SIF后紧接着放注释很危险]]）-->  
</details>  

---  

#### `IF`和`SIF`的组合  
``` { #language-erb title="ERB" }  
IF 条件式1  
    SIF 条件式2  
        处理1  
    处理2  
    处理3  
ENDIF  
```  

这样写的话，条件式1和条件式2都为真时执行处理1到3全部，  
只有条件式2成立时执行处理2和3。  

``` { #language-erb title="ERB" }  
SIF 条件式1  
    IF 条件式2  
        处理1  
        处理2  
    ENDIF  
```  
相反这样写的话，条件式1不成立时会发生错误。  

（条件式1为假时只跳过`IF 条件式2`这一行，就会出现"没有与`ENDIF`对应的`IF`！"的错误）  
不要在`SIF`后紧接着写`IF`或`SIF`等分支或循环语句。  

---  

#### `SELECTCASE - CASE - CASEELSE - ENDSELECT`  
与IF语句功能类似的语法有`SELECTCASE - CASE - CASEELSE - ENDSELECT`。  

用于根据单个数值变量的值进行处理分支。例如在随机数分支时很方便的语法。  

[`SELECTCASE`的参考页面](../Reference/SELECTCASE.zh.md)  

``` { #language-erb title="ERB" }  
SELECTCASE A  
    CASE 0  
        PRINTFORML 变量A是0。  
    CASE 1  
        PRINTFORML 变量A是1。  
    CASEELSE  
        PRINTFORML 变量A既不是0也不是1。  
ENDSELECT  
```  

这与下面的`IF`语句意义相同。  

``` { #language-erb title="ERB" }  
IF A == 0  
    PRINTFORML 变量A是0。  
ELSEIF A == 1  
    PRINTFORML 变量A是1。  
ELSE  
    PRINTFORML 变量A既不是0也不是1。  
ENDIF  
```  

`SELECTCASE`语句判断`CASE`后面写的数值与`SELECTCASE`后面写的数值变量（这个例子中是`A`）是否相等来分支。  

`CASE`还可以这样写：  

``` { #language-erb title="ERB" }  
SELECTCASE A  
    CASE 1, 2, 3  
        PRINTFORML 变量A是1、2、3中的任意一个。  
    CASE 4 TO 9  
        PRINTFORML 变量A是4以上9以下。  
    CASE IS >= 50  
        PRINTFORML 变量A是50以上。  
    CASE 10 TO 20, IS >= 40  
        PRINTFORML 变量A不是50以上。  
        PRINTFORML 变量A是10以上20以下，或者是40以上（且49以下）。  
    CASEELSE  
        PRINTFORML 变量A是0以下（不满足上述条件）。  
ENDSELECT  
```  

`CASE X TO Y`是指数值变量在`X`以上`Y`以下时进入分支。  

`CASE IS >= X`是指数值变量在`X`以上时进入分支。  

另外，`CASE`中写的条件可以用逗号分隔指定多个。  

所以这个`SELECTCASE`语句与下面的`IF`语句意义相同。  

``` { #language-erb title="ERB" }  
IF A == 1 || A == 2 || A == 3  
    PRINTFORML 变量A是1、2、3中的任意一个。  
ELSEIF A >= 4 && A <= 9  
    PRINTFORML 变量A是4以上9以下。  
ELSEIF A >= 50  
    PRINTFORML 变量A是50以上。  
ELSEIF (A >= 10 && A <= 20) || A >= 40  
    PRINTFORML 变量A不是50以上。  
    PRINTFORML 变量A是10以上20以下，或者是40以上（且49以下）。  
ELSE  
    PRINTFORML 变量A是0以下（不满足上述条件）。  
ENDIF  
```  
<!--（相关文章：[[Emuera补充#应该使用IF还是SELECTCASE]]）-->  

---  

#### 三元运算符  
严格来说三元运算符不是分支语句，而是从`IF`语句衍生出来的运算符，所以在这里说明。  

三元运算符采用这样的形式：  

``` { #language-erb title="ERB" }  
<赋值目标变量> = <条件式> ? <真时的赋值> # <假时的赋值>  
```  

例如，变量`A`大于等于3时赋值1，否则赋值0给变量`B`的操作，使用`IF`语句是这样的：  

``` { #language-erb title="ERB" }  
IF A >= 3  
    B = 1  
ELSE  
    B = 0  
ENDIF  
```  
用三元运算符表示的话，可以写成一行：  

``` { #language-erb title="ERB" }  
B = A >= 3 ? 1 # 0  
```  

三元运算符也可以用于字符串变量。处理字符串时，需要用`\@ ～ \@`包围三元运算符。  

``` { #language-erb title="ERB" }  
PRINTFORML %CALLNAME:TARGET%是\@ TALENT:处女 ? 是处女。 # 不是处女。 \@  
```  

上面这句话是，`TALENT:TARGET:处女`不为0时输出"（TARGET的称呼）是处女。"，  
`TALENT:TARGET:处女`为0时输出"（TARGET的称呼）不是处女。"。  

---  

#### 三元运算符与`SELECTCASE`的组合  
在`SELECTCASE`语句中组合三元运算符，可以进一步分支条件式。  

``` { #language-erb title="ERB" }  
SELECTCASE RAND:(TALENT:处女 ? 3 # 2)  
    CASE 0  
        PRINTFORMW 无条件1  
    CASE 1  
        PRINTFORMW 无条件2  
    CASE 2  
        PRINTFORMW 仅限处女  
ENDSELECT  
```  

在这个语法中，根据对象的处女资质（`TALENT:处女`）来分支条件式。  

条件式为真时处理`RAND:3`，为假时处理`RAND:2`。  

执行时，`CASE 0`、`CASE 1`无条件成为`RAND`选择的对象，而`CASE 2`只有对象是处女时才不会被`RAND`选择排除。  

这个`SELECTCASE`语句与下面的`IF`语句意义相同。  

``` { #language-erb title="ERB" }  
IF RAND:3 == 0 && TALENT:0 == 1  
    PRINTFORMW 仅限处女  
ELSEIF RAND:2 == 0  
    PRINTFORMW 无条件2  
ELSE  
    PRINTFORMW 无条件1  
ENDIF  
```  

---  

### 循环  
重复相同处理时使用的是循环（循环处理）。  

---  

#### `REPEAT - REND`  
[`REPEAT`的参考页面](../Reference/REPEAT.zh.md)  

``` { #language-erb title="ERB" }  
REPEAT 表达式  
    处理  
REND  
```  

重复执行`REPEAT - REND`之间的处理。  

重复次数是`REPEAT`后面的数值，或数值变量中存储的值。也可以放`A + 1`等表达式。  

例如，  

``` { #language-erb title="ERB" }  
REPEAT 10  
    PRINTFORML あ  
REND  
```  
这样写的话，"あ"会显示10行。  

---  

##### `COUNT`  
变量`COUNT`存储到目前为止重复了多少次。  

在`REPEAT - REND`内第一次执行处理时，还在第1次重复的过程中（第1次重复还没结束）  

``` { #language-erb title="ERB" }  
REPEAT 10  
    PRINTFORML 当前{COUNT}次  
REND  
```  

这样写的话，显示的是从0次到9次。  

记住**`COUNT`的值是从0到`REPEAT`后面的数值 - 1**。  

另外，向`COUNT`赋值会导致错误，请注意。  

<!--（相关文章：[[ERB编辑中的典型错误#注意REPEAT循环]]）-->  

##### `REPEAT`与`IF`、`SIF`的组合  
在`REPEAT - REND`之间也可以使用`IF`或`SIF`。  

``` { #language-erb title="ERB" }  
REPEAT 10  
    IF COUNT == 5  
        PRINTFORML 第6次吗？  
    ELSE  
        PRINTFORML {COUNT + 1}次  
    ENDIF  
REND  
```  

这样写的话，`COUNT`为5，也就是第6次时最后显示"？"。  

另外，在`REPEAT - REND`之间再使用一个`REPEAT - REND`（嵌套）是可以的，  
但`COUNT`的值会被第二个`REPEAT - REND`更改，  
所以这样无法正常工作。  

如果想嵌套`REPEAT - REND`，需要在内层`REPEAT - REND`前后对`COUNT`的值进行  
保存和恢复处理等，或  
使用后面说明的`FOR - NEXT`替代。  

``` { #language-erb title="ERB" }  
;嵌套REPEAT的例子  
REPEAT 10  
    COUNT:1 = COUNT  
    REPEAT 10  
        处理  
    REND  
    COUNT = COUNT:1  
REND  
```  
<!--（相关文章：[[ERB编辑中的典型错误#双重REPEAT语句]]） -->  

---  

##### `CONTINUE`和`BREAK`  
在`REPEAT - REND`之间，不执行后续处理而进入下次重复时使用`CONTINUE`，  
不执行后续处理而结束整个循环时使用`BREAK`。  

``` { #language-erb title="ERB" }  
REPEAT 10  
    A = COUNT  
    IF A == 5  
        CONTINUE  
    ENDIF  
    PRINTFORM {A}:  
REND  
```  

执行这个的话，`COUNT`为5时`CONTINUE`被执行，实际显示的是  

```  
0:1:2:3:4:6:7:8:9:  
```  

变成这样。另外，  

``` { #language-erb title="ERB" }  
REPEAT 10  
    A = COUNT  
    IF A == 5  
        BREAK  
    ENDIF  
    PRINTFORM {A}:  
REND  
```  

执行这个的话，`COUNT`为5时`BREAK`被执行并脱离`REPEAT - REND`，实际显示的是  

```  
0:1:2:3:4:  
```  

到此为止。  

---  

#### `FOR - NEXT`  
[`FOR-NEXT`的参考页面](../Reference/FOR.zh.md)  

``` { #language-erb title="ERB" }  
FOR <计数器数值变量>, <表达式>, <表达式>[, <表达式>]  
    处理  
NEXT  
```  

`FOR - NEXT`是`REPEAT - REND`的功能强化版。  

例如，下面两个脚本完全相同：  

``` { #language-erb title="ERB" }  
FOR COUNT, 0, 10  
    PRINTFORML {COUNT}次  
NEXT  
```  

``` { #language-erb title="ERB" }  
REPEAT 10  
    PRINTFORML {COUNT}次  
REND  
```  

`FOR`后面的`<计数器数值变量>`相当于`REPEAT`中的`COUNT`。  

在`REPEAT`中计数重复次数的变量固定为`COUNT`，而在`FOR`中可以将这个变量设置为任意变量。  

通过使用不同的计数器变量，可以简单实现`REPEAT`中较为麻烦的循环嵌套。  

``` { #language-erb title="ERB" }  
;嵌套的例子  
FOR A, 0, 10  
    FOR B, 0, 10  
        处理  
    NEXT  
NEXT  
```  

`FOR`后面第二个`<表达式>`设置重复开始时`<计数器数值变量>`的值。  

第三个`<表达式>`指定重复结束时`<计数器数值变量>`的值。例如：  

``` { #language-erb title="ERB" }  
FOR COUNT, 3, 8  
    PRINTFORM {COUNT}:  
NEXT  
```  

执行这个的话，显示为：  

```  
3:4:5:6:7:  
```  

`FOR`后面第四个`<表达式>`可以设置每次循环迭代时加到计数器变量上的值。如果省略，则自动设置为1。  

例如：  

``` { #language-erb title="ERB" }  
FOR COUNT, 0, 10, 2  
    PRINTFORM {COUNT}:  
NEXT  
```  

执行这个的话，显示为：  

```  
0:2:4:6:8:  
```  

另外，与`REPEAT - REND`同样，`CONTINUE`和`BREAK`也可以使用。  

---  

#### `WHILE - WEND`  
[`WHILE-WEND`的参考页面](../Reference/WHILE.zh.md)  

``` { #language-erb title="ERB" }  
WHILE 条件式  
    处理  
WEND  
```  

只要条件式为真，就重复循环。  

例如，下面的脚本显示"あ"10行：  

``` { #language-erb title="ERB" }  
A = 0  
WHILE A < 10  
    PRINTFORML あ  
    A += 1  
WEND  
```  

这时，如果忘记写`A += 1`这行，变量`A`的值会一直保持0，  
`A < 10`会永远为真，从而陷入无限循环，请注意。  

`WHILE - WEND`中也可以使用`CONTINUE`和`BREAK`。  

---  

#### `DO - LOOP`  
[`DO-LOOP`的参考页面](../Reference/DO.zh.md)  

``` { #language-erb title="ERB" }  
DO  
    处理  
LOOP 条件式  
```  

只要条件式为真，就重复循环。  

与`WHILE - WEND`相比，外观上唯一的区别是条件式的位置不同，但它有一个特点是初始循环一定会执行。  

请比较这两个脚本：  

``` { #language-erb title="ERB" }  
A = 0  
WHILE A < 0  
    PRINTFORML あ  
WEND  
```  

``` { #language-erb title="ERB" }  
A = 0  
DO  
    PRINTFORML あ  
LOOP A < 0  
```  

`WHILE`语句在循环开始时判断条件式是否为真，所以这种情况下`PRINTFORML`一次都不会执行。  

另一方面，`DO - LOOP`在循环结束时判断条件式，所以在这个例子中`PRINTFORML`会执行1次，然后判断表达式并退出循环。  

<!--（相关文章：[[Emuera补充#DO～LOOP指令]]） -->  

另外，请注意在`DO - LOOP`内调用`CONTINUE`语句时，会跳转到`LOOP`而不是`DO`。  

下面的脚本（不是`DO → CONTINUE → DO`而是）按`DO → CONTINUE → LOOP 0`顺序执行，所以不会无限循环。  

``` { #language-erb title="ERB" }  
DO  
    CONTINUE  
LOOP 0  
```  
<!-- （相关文章：[[Emuera补充#关于CONTINUE处理]]） -->  

## 函数与函数调用  
从这里开始主要是创建功能补丁或变体时使用的内容。  

### 什么是函数？  
想要执行一些固定的处理时，预先将其写在别的地方，  
从任意位置都可以使用的称为函数。作为例子，我们来创建一个将变量`A`的值乘以10的函数。  

``` { #language-erb title="ERB" }  
@A_TEN_TIMES  
A = A * 10  
```  

在`@`后使用半角字母数字和`_`（下划线）来命名函数。之后的处理就是函数的内容。  

``` { #language-erb title="ERB" }  
A = 0  
CALL A_TEN_TIMES  
PRINTFORML 变量A是{A}。  

A = 5  
CALL A_TEN_TIMES  
PRINTFORML 变量A是{A}。  
```  

要使用创建的函数（调用），请写`CALL <函数名>`。这样，上面显示"变量A是0。"，下面显示"变量A是50。"。另外，有时也用`JUMP <函数名>`来调用函数。`CALL`和`JUMP`的区别在于执行函数中的处理后是否返回原来的位置，`CALL`会返回，`JUMP`则不会返回。  

注意，如果有多个同名函数，则只会调用其中一个（事件函数这种特殊函数除外）。函数名要注意不要与其他函数重复。  

<!-- （相关文章：[[ERB编辑中的典型错误#（函数）冲突了！？]]） -->  

---  

### `RETURN`和返回值  
当满足某个条件时，想要在函数中途结束时，  
写 RETURN <数值>。  

``` { #language-erb title="ERB" }  
@TEST  
SIF A == 0  
    RETURN 0  
A = A * 5  
```  

这种情况下，当调用函数`@TEST`时，如果`A`为0则什么也不做，否则`A`的值会乘以5。另外，当函数通过`RETURN`语句结束并返回原位置时，变量`RESULT`会被改为`RETURN`指定的数值。此时，称`RESULT`为函数的**返回值**。例如：  

``` { #language-erb title="ERB" }  
@TEST2  
IF A == 0  
    RETURN 0  
ELSEIF A == 1  
    RETURN 1  
ELSEIF A == 2  
    RETURN 2  
ELSE  
    RETURN 9  
ENDIF  
```  

创建这样的函数，并从其他地方调用：  

``` { #language-erb title="ERB" }  
A = 0  
CALL TEST2  
PRINTFORML {RESULT}  

A = 2  
CALL TEST2  
PRINTFORML {RESULT}  

A = 3  
CALL TEST2  
PRINTFORML {RESULT}  
```  

从上到下依次显示`0`、`2`、`9`。在Emuera中，`RETURN`语句还可以指定数值变量或表达式，也可以用逗号分隔指定多个返回值。  

---  

### 参数  
在Emuera中，函数可以接受**参数**。参数是指在用`CALL`调用函数时传递给函数的变量。将上面写的函数`@TEST2`改为接收参数的形式，如下例所示。  

``` { #language-erb title="ERB" }  
@TEST2, ARG  
IF ARG == 0  
    RETURN 0  
ELSEIF ARG == 1  
    RETURN 1  
ELSEIF ARG == 2  
    RETURN 2  
ELSE  
    RETURN 9  
ENDIF  
```  

调用时这样写：  

``` { #language-erb title="ERB" }  
CALL TEST2, 0  
PRINTFORML {RESULT}  

CALL TEST2, 2  
PRINTFORML {RESULT}  

CALL TEST2, 3  
PRINTFORML {RESULT}  
```  

执行`CALL TEST2, 0`时，`ARG`被赋值为0，可以在函数中引用`ARG`。参数可以接收多个，这种情况下定义为`ARG, ARG:1, ARG:2, …`。  

``` { #language-erb title="ERB" }  
@TEST3, ARG, ARG:1, ARG:2  
（略）  
```  

``` { #language-erb title="ERB" }  
CALL TEST3, 0, 7, 3  
```  

参数也可以接收字符串变量，这时使用 ARGS。  

---  

### 局部变量  
像`A`、`B`这样的单字母变量和`COUNT`等许多变量，在整个程序中都共享使用同一个变量。但有时这可能会导致错误。  

``` { #language-erb title="ERB" }  
@MAIN  
FOR COUNT, 0, 10  
    CALL FUNC  
NEXT  

@FUNC  
FOR COUNT, 0, 3  
    （某种处理）  
NEXT  
```  

在上面的例子中，执行`@MAIN`函数时，每次调用`@FUNC`，`COUNT`都会被设置为3，从而陷入无限循环。在这个例子中，将`@FUNC`内的`FOR`循环的计数器变量改为`COUNT:1`就可以解决问题，但在一个变体中使用的函数可能超过1000个，所以总会在某处发生这样的问题。  

因此，如果准备只能在某个函数中使用的变量（局部变量），就可以解决这个问题。这种局部变量就是`LOCAL`和`LOCALS`。请看以下例子：  

``` { #language-erb title="ERB" }  
@EVENTFIRST  
    LOCAL = 123  
    CALL FUNC001  
    PRINTFORML {LOCAL}  

@FUNC001  
    LOCAL = 567  
    RETURN  
```  

乍一看似乎是在同一个`LOCAL`变量中赋值，但"在`@EVENTFIRST`中使用的`LOCAL`"和"在`@FUNC001`中使用的`LOCAL`"被当作不同的变量处理，因此`PRINTFORML`语句的结果会输出"`123`"。  

另外，`LOCALS`是`LOCAL`的字符串变量版本。前面提到的`ARG`和`ARGS`也被当作局部变量处理。  

---  

#### 注意LOCAL, ARG的初始化时机  
对于有其他语言编程经验的人尤其需要注意，**`LOCAL`和`ARG`不是在函数被调用时初始化的**，**函数每次被调用时都会重复使用相同的`LOCAL`、`ARG`**，这两点需要注意。这个特点在使用函数递归等情况时需要注意。  

``` { #language-erb title="ERB" }  
@SAMPLE  
LOCAL += 1  
IF LOCAL < 10  
    CALL SAMPLE  
ENDIF  
```  

对于编程有经验的人来说，上面的代码可能看起来像是"因为`LOCAL`是局部变量，在调用时会初始化为0，所以`LOCAL`会一直保持1，形成无限循环，最终栈溢出"。但实际上调用`@SAMPLE`时，**第一次从外部调用时SAMPLE会被递归调用9次，第二次及以后不会再进行递归调用。** 因为在第一次调用时给`LOCAL`赋值1后，再次递归调用时`LOCAL`不会被初始化为0，而是保持1的值。另外，在递归完成后退出`@SAMPLE`函数后，`LOCAL`的最终值10也会继续保持，所以之后从外部调用时也不会再进行递归。  

`ARG`也是如此。  

``` { #language-erb title="ERB" }  
@SAMPLE2, ARG  
SIF ARG >= 10  
    RETURN  
CALL SAMPLE2, ARG + 1  
PRINTVL ARG  
```  

编写上面的代码并执行CALL SAMPLE2, 0，会''显示10次10''。  

<details><summary>程序员相关内容</summary>  

在Emuera内部，`LOCAL`在Emuera内部被定义为"`函数名@LOCAL`"这样的变量名。<br/>  
换句话说，erabasic的局部变量就是一种只能在特定函数中引用的全局变量（类似的东西）。<br/>  
在C#中相当于以下代码：<br/>  
```  
class SampleClass  
{  
    int SAMPLE@LOCAL = 0; // 作为全局变量声明  
    void SAMPLE()  
    {  
        SAMPLE@LOCAL += 1;  
        if (SAMPLE@LOCAL < 10)  
        {  
            SAMPLE();  
        }  
    }  
}  
```  
</details>  
<!--（相关文章：[[Emuera补充#即使是LOCAL变量也应避免的事项]]） -->  

---  

### 表达式中可用的函数  
在erabasic中，返回值的指令的返回值通过`RESULT`接收。例如，使用返回给定表达式绝对值的`ABS`指令，将变量`A`的绝对值存储到`LOCAL`中的写法如下：  

``` { #language-erb title="ERB" }  
ABS A  
LOCAL = RESULT  
```  

相比之下，使用名为`ABS`的"表达式中可用的函数（以下称为表达式函数）"，上面的脚本可以这样写：  

``` { #language-erb title="ERB" }  
LOCAL = ABS(A)  
```  

正如"表达式函数"这个名字所示，可以直接从赋值表达式中调用函数，无需通过`RESULT`，直接将返回值赋给`LOCAL`。在表达式函数中，参数用`(A)`这样的圆括号包围。如果参数有多个，用`(A, B, C)`这样的形式在括号内用逗号分隔写入。反之，如果没有参数，则只写`()`圆括号。即使没有参数也不能省略圆括号。  

[`ABS`的参考页面](../Reference/ABS.zh.md)  

对于返回字符串的指令，也可以写成类似的方式。  

``` { #language-erb title="ERB" }  
STRLENS STR:0  
IF RESULT > A  
    SUBSTRING STR:0, A, 1  
    LOCALS:0 = %RESULTS:0%  
ENDIF  
```  
``` { #language-erb title="ERB" }  
IF STRLENS(STR:0) > A  
    LOCALS:0 = %SUBSTRING(STR:0, A, 1)%  
ENDIF  
```  
上面两个例子的行为相同。表达式函数的列表可在[指令·表达式函数页面](../Reference/README.zh.md)查看。  

---  

#### 自定义表达式函数  
可以自己定义表达式函数。在定义函数的`@`行后直接写`#FUNCTION`，并将`RETURN`替换为`RETURNF`，这样函数就成为表达式函数。  

``` { #language-erb title="ERB" }  
;下一行也可以写成 @TEST2, ARG，但按照惯例通常这样写  
@TEST2(ARG)  
#FUNCTION  
IF ARG == 0  
    RETURNF 0  
ELSEIF ARG == 1  
    RETURNF 1  
ELSEIF ARG == 2  
    RETURNF 2  
ELSE  
    RETURNF 9  
ENDIF  
```  

调用时这样写：  

``` { #language-erb title="ERB" }  
PRINTFORML {TEST2(0)}  
PRINTFORML {TEST2(2)}  
PRINTFORML {TEST2(3)}  
```  

如果要创建返回字符串的表达式函数，则写`#FUNCTIONS`。但要注意，`RETURNF`的写法与其他指令（如`PRINTFORM`等）有所不同。  

相关页面：[用户定义的表达式函数](../Emuera/user_defined_in_expression_function.zh.md)  
<!--（相关文章：[[Emuera补充#关于字符串和RETURNF的奇怪规范]]） -->  

---  

## 标签和按键输入  
主要用于选项分支的是标签和按键输入。  

``` { #language-erb title="ERB" }  
PRINTFORML 请选择  
PRINTFORML [0] 选项1  
PRINTFORML [1] 选项2  
;Emuera会自动将[ ]包围的数字转换为按钮  

$INPUT_LOOP  
INPUT  

IF RESULT != 0 && RESULT != 1  
    GOTO INPUT_LOOP  
ELSEIF RESULT == 0  
    处理1  
ELSEIF RESULT == 1  
    处理2  
ENDIF  
```  

`INPUT`等待按键输入（或按钮操作），将输入的数值存储到`RESULT`中。这种情况下，输入`0`则执行处理1，输入`1`则执行处理2。如果输入不是0也不是1的数值，`RESULT != 0 && RESULT != 1`成立，执行`GOTO INPUT_LOOP`。`GOTO （标签名）`跳转到`$（标签名）`的处理，类似于`CALL`或`JUMP`与`@`的关系，但`GOTO`和`$`必须在同一函数内。`GOTO INPUT_LOOP`跳转到`$INPUT_LOOP`后再次执行`INPUT`，因此这一系列处理会一直重复直到输入0或1。  

另外，在一个函数内使用多个`$`和`GOTO`的组合时，可能会出现"与`IF`对应的`ELSEIF`、`ELSE`、`ENDIF`不存在"的错误。这种情况下，建议将第二个输入处理移到另一个函数中。  

<!--  
（相关文章：[[ERB编辑中的典型错误#使用GOTO跳转后忘记原来的位置。]]）  
（相关文章：[[ERB编辑中的典型错误#不要使用相同的GOTO标签名。(INPUT_LOOP相关的错误)]]）  
-->  

---  

## 其他注意事项等  

### 角色的添加和删除  
角色的添加和删除使用`ADDCHARA`和`DELCHARA`。  

[`ADDCHARA`的参考页面](../Reference/ADDCHARA.zh.md)  
[`DELCHARA`的参考页面](../Reference/DELCHARA.zh.md)  

``` { #language-erb title="ERB" }  
ADDCHARA 1  
ADDCHARA 5  
ADDCHARA 9  
```  

在Emuera中可以这样写：  

``` { #language-erb title="ERB" }  
ADDCHARA 1, 5, 9  
```  

`ADDCHARA`引用CSV中的角色编号。  

``` { #language-erb title="ERB" }  
DELCHARA 3  
DELCHARA 1  
```  

`DELCHARA`引用的不是角色编号(`NO`)，而是角色的注册编号(`ID`)。经过上述处理后，角色编号(`NO`)为1(`ID=1`)、5(`ID=2`)、9(`ID=3`)的角色被添加，接着注册编号(`ID`)为3号，即角色编号(`NO`)为9的角色被删除，随后注册编号(`ID`)为1号，即角色编号(`NO`)为1的角色被删除，最后只剩下角色编号(`NO`)为5的角色。连续使用`DELCHARA`时，注意删除的注册编号之后的角色会向前移动。  

另外，进行角色添加·删除时，要确认调教中的角色、助手等的状态。例如，即使助手角色被`DELCHARA`删除，保存助手注册编号的`ASSI`也不会变化。但整体的注册编号会向前移动，可能导致不符合助手条件的角色成为助手。  

---  

### 图形显示  
使用`BAR`（`BARL`）可以视觉化地显示数值。写成`BAR （数值或变量）,（数值或变量）,（图形长度）`的形式：  

``` { #language-erb title="ERB" }  
A = 80  
B = 100  
BAR A, B, 10  
```  

则显示：  

```  
[********..]  
```  

将`A`作为当前值，`B`作为最大值，常用于显示当前值占最大值的比例。记住`BARL`会在显示后换行。  

---  

### 小数乘法  
虽然erabasic中变量等都按整数处理，但有个例外，  
使用`TIMES`可以进行小数计算。  

[`TIMES`的参考页面](../Reference/TIMES.zh.md)  

``` { #language-erb title="ERB" }  
A = 1000  
TIMES A, 1.5  
```  

这样变量`A`变成`1000×1.5`的`1500`。注意，即使`TIMES`的计算结果是小数，也会被四舍五入为整数。  

---  

### 其他指令  
[`WAIT`](../Reference/WAIT.zh.md)…只进行输入等待。`RESULT`中不存储值。  
[`QUIT`](../Reference/QUIT.zh.md)…退出eramaker。主要用于游戏结束等情况。  

---  

## 关于位运算  

```  
anonymous>喂，配置中经常用到的那个单独的&符号是什么意思？是不是应该是&&？  
anonymous>啊，那是位运算。[这里](../eramaker/variables.zh.md)有详细介绍  
anonymous>就在最下面  
 ---------------------------------------  
anonymous>……好吧，完全不明白  
anonymous>我就知道。平时谁用二进制啊  
anonymous>话说回来，二进制？那好吃吗？我毫无头绪  
anonymous>没办法，先给你解释一下吧  
```  

### 二进制  

#### 什么是二进制  
如果不研究这方面，二进制可能不太熟悉，但要使用位运算的话最好掌握一下。  

日常经常使用的数字`0,1,2,...,9,10,11,...99,100,101,...`等被称为十进制。是这样吗  
虽然还有其他进制的数字表示方法，但区分方法是记住进位的时机。十进制的话是`0,1,2,3,4,5,6,7,8,9,10,11,...`这样，9之后变成两位数。因为从10开始进位，所以叫十进制。也就是说二进制的话会在2时进位。具体来说1之后是"10"这种表示。十进制的"2"和二进制的"10"表示相同数值。为了避免与十进制的"10"混淆，二进制的"10"通常读作"一零"。  

```  
 0 - 0  
 1 - 1  
10 - 2  
11 - 3  
 100 - 4  
 101 - 5  
 110 - 6  
 111 - 7  
1000 - 8  
```  

上面列出的9个数字是用二进制和十进制表示的相同数值。右边列的是熟悉的十进制。左边的二进制列可以看出，每到2的X次方的数，如2,4,8等，就会增加一位数。这就是二进制表示的基本原理。  

关于二进制：  

- 所有位始终是0或1  
- 每到2的X次方就会增加一位  

记住这两点。  

---  

#### 二进制→十进制转换方法  
因为位数涉及2的X次方等概念，转换二进制到十进制时可以这样看待：  

例）  

1011011→(64***1**+32***0**+16***1**+8***1**+4***0**+2***1**+1***1**)  
      →(64+16+8+2+1)→91  

---  

```  
anonymous>就这样  
anonymous>嗯……大概明白了……吧  
anonymous>但是，这跟配置有什么关系呢？  
anonymous>嗯。era的配置是通过开启/关闭功能来设置的对吧？  
anonymous>是的。各项都有ON或OFF之类的  
anonymous>二进制只用1或0，这点刚才理解了吧？  
anonymous>是的，我记得  
anonymous>那么？  
入室 anonymous anonymous!anonymous@anonymous.  
anonymous>忍  
anonymous>神  
anonymous>搜  
anonymous>原来如此。把各功能的ON对应1，OFF对应0来看  
anonymous>就是这样  
anonymous>接下来是如何实际编写的问题了  
```  

---  

### 位运算  

#### 什么是位运算  
前面学习了二进制是各位用1或0表示的数值。位运算通过判断各位是否为1来用于条件分支。  

``` { #language-erb title="ERB" }  
FLAG:1 = 0  
FLAG:2 = 1  

IF FLAG:1 & 1  
        PRINTFORML FLAG:1是ON。  
ELSE  
        PRINTFORML FLAG:1是OFF。  
ENDIF  
IF FLAG:2 & 1  
        PRINTFORML FLAG:2是ON。  
ELSE  
        PRINTFORML FLAG:2是OFF。  
ENDIF  
```  

`&`将前后数值转换为二进制，相同位都是`1`的设为`1`，其他位设为`0`，将结果作为十进制表示。看`FLAG:1 & 1`，首先`FLAG:1`的值是`0`，二进制也是`0`。与之比较的`1`在二进制中也是`1`，所以`0`和`1`不匹配。也就是说，`FLAG:1 & 1`是`0`。另一方面，`FLAG:2 & 1`中，`FLAG:2`和`1`在二进制中都是`1`。因为都是第一位为`1`，所以`FLAG:2 & 1`是`1`。将这个应用到上面的`IF`语句中：  

``` { #language-erb title="ERB" }  
IF 0  
        PRINTFORML FLAG:1是ON。  
ELSE  
        PRINTFORML FLAG:1是OFF。  
ENDIF  
IF 1  
        PRINTFORML FLAG:2是ON。  
ELSE  
        PRINTFORML FLAG:2是OFF。  
ENDIF  
```  

结果显示如下：  

```  
FLAG:1是OFF。  
FLAG:2是ON。  
```  

---  

#### 判断多个条件  
上面的例子说明了如何分别判断`FLAG:1`、`FLAG:2`的单一条件，但使用位运算可以在一个标志中判断多个条件。  

``` { #language-erb title="ERB" }  
IF FLAG:1 & 1  
        PRINTFORML 条件1是ON。  
ELSE  
        PRINTFORML 条件1是OFF。  
ENDIF  
IF FLAG:1 & 2  
        PRINTFORML 条件2是ON。  
ELSE  
        PRINTFORML 条件2是OFF。  
ENDIF  
IF FLAG:1 & 4  
        PRINTFORML 条件3是ON。  
ELSE  
        PRINTFORML 条件3是OFF。  
ENDIF  
```  

有这样的`IF`语句时，`FLAG:1`的值会如何影响结果？首先，如之前的例子，当`FLAG:1`为`0`时，`FLAG:1 & 1`是`0`。看`FLAG:1 & 2`，`0(00)`和`2(10)`都没有相同位为`1`，所以仍然是`0`。`FLAG:1 & 4`也是`0(000)`和`4(100)`为`0`。  

接下来，当`FLAG:1`为`1`时，如之前的例子，`FLAG:1 & 1`是`1`。`FLAG:1 & 2`是`1(01)`和`2(10)`所以是`0`，`FLAG:1 & 4`也是`1(001)`和`4(100)`为`0`。  

当`FLAG:1`为`2`时，`FLAG:1 & 1`是`2(10)`和`1(01)`所以是`0`。`FLAG:1 & 2`是`2(10)`和`2(10)`，第二位都是`1`，所以`FLAG:1 & 2`在二进制中是`10`，即`2`。`FLAG:1 & 4`是`2(010)`和`4(100)`为`0`。  

当`FLAG:1`为`3`时，`FLAG:1 & 1`是`3(11)`和`1(01)`，第一位匹配所以是`1`。`FLAG:1 & 2`是`3(11)`和`2(10)`，第二位匹配所以是`2`。`FLAG:1 & 4`是`3(011)`和`4(100)`为`0`。  

当`FLAG:1`为`3`时的结果显示如下：  

```  
条件1是ON。  
条件2是ON。  
条件3是OFF。  
```  

这样，通过位运算可以将多个条件的组合用一个标志表示。但要注意，可判断的条件仅限于ON/OFF或有/无等二选一的情况。另外，每个条件判断表达式中&后面的数值要使用2的X次方值。原因在后面章节说明。  

---  

#### 如何设置位运算使用的值  
到目前为止介绍了位运算判断部分的说明。但实际上在处理中使用位运算时，还需要能够改变判断值的方法。像`FLAG:1 += 1`或`FLAG:1 -= 2`这样的计算也可以，但这种方法可能会出现问题。  

``` { #language-erb title="ERB" }  
FLAG:1 = 0  

@CONFIG_1  
PRINTFORML [0]打开功能1  
PRINTFORML [1]关闭功能1  

INPUT  

IF RESULT == 0  
        PRINTFORML 打开功能1。  
        FLAG:1 += 1  
ELSEIF RESULT == 1  
        PRINTFORML 关闭功能1。  
        FLAG:1 -= 1  
ENDIF  


@PRINT_CONFIG  
SIF FLAG:1 & 1  
        PRINTFORML 功能1是ON。  
SIF FLAG:1 & 2  
        PRINTFORML 功能2是ON。  
SIF FLAG:1 & 4  
        PRINTFORML 功能3是ON。  
;・・・（以下省略）  
```  

有这样的处理时，如果执行"打开功能1"命令两次以上，`FLAG:1`的值会不断递增为`2,3,4,...`，可能导致无法正确运行。  

因此，用于位运算判断变量计算的是`|`。`|`将前后数值转换为二进制时，相同位只要有一个是1就将该位设为1进行计算。例如，`5(101) | 3(011)`的话所有三位都是1，结果在二进制中是`111`，即十进制的`7`。  

``` { #language-erb title="ERB" }  
A = 5  
B = 3  

C = A | B  

PRINTFORML 变量C是{C}。  
```  

 ↓  

```  
变量C是7。  
```  

另外，`A = A | B`可以写成`A |= B`。因为位运算中变量经常会覆盖原值，所以一定要记住。  

那反向如何关闭功能呢？上面的例子中，这次假设功能1、2、3都为ON，考虑从那里关闭功能2的方法。首先，功能1～3都为ON意味着`FLAG:1 & 1`、`FLAG:1 & 2`、`FLAG:1 & 4`都不是`0`，也就是说`FLAG:1`用二进制表示时的最低三位是`111`。从这里关闭功能2，需要其他位不变，让`FLAG:1 & 2`为`0`，即从低位开始第二位设为`0`。将第二位设为`0`需要减去二进制的`10`，即十进制的`2`，但这样如果像之前例子中那样执行两次以上，数值会变得不正确。  

这时再次使用&。`7(111) & 5(101)`的结果在二进制中是`101`，可以保持其他位不变，只将第二位设为0。  

从功能1、2都为ON的状态关闭功能2，需要将`011`变为`001`，这也可以用`3(011) & 5(101)`实现。  

那么，`&`后面拿来的`5(101)`是什么样的值呢？二进制看，可以说是要将第二位设为`0`以外都是`1`的数值。即使切换功能总数增加也是一样，5个功能中的第4个关闭需要`10111`，10个功能中的第3个关闭需要`1111111011`放在`&`后面。  

考虑到这些，重写前面例子的ON/OFF部分：  

``` { #language-erb title="ERB" }  
@CONFIG_1  
PRINTFORML [0]打开功能1  
PRINTFORML [1]关闭功能1  

INPUT  

IF RESULT == 0  
        PRINTFORML 打开功能1。  
        FLAG:1 |= 1  
ELSEIF RESULT == 1  
        PRINTFORML 关闭功能1。  
        FLAG:1 &= 6(→110→2+4)  
ENDIF  

这样写。  
（FLAG:1 &= 6 与 FLAG:1 = FLAG:1 & 6 是相同处理）  
```  

---  

```  
anonymous>就是这样。明白了吗？  
anonymous>………………  
anonymous>……嗯，说实话我自己也觉得没解释清楚  
anonymous>剩下的只能靠你自己了  
anonymous>边看说明边自己试着编写，或者研究一下现有的变体或补丁的语法，方法很多  
anonymous>嗯……  
退出 anonymous 灵梦大人是我的ｙ……主 anony!anony@anony.  
anonymous>橙说，不懂的话问人，不，问别人  
anonymous>IRC或帖子上，如果有热心的工匠就会回答  
anonymous>是啊……我会努力的  
anonymous>好。不知道是什么，等着你的完成  
```  

---  

## ERB编辑中的典型错误  

**以下说明较多依赖eratoho或eramaker**  

这一项说明在eramaker及Emuera中使用的ERB文件创建和修改过程中可能出现的各种错误和故障，供后来者参考。基本标准是eramaker，但也描述Emuera中的错误。  

<!-- 此项以理解ERB基本语法为前提。先浏览[[各种语法讲座>开发工具汇总]] -->  

<!--「开发工具汇总」链接将在页面创建后添加 -->  
另外，使用开发工具汇总中介绍的各种工具可以更容易发现基本错误，所以建议安装。但有些错误如TALENT引用错误或死分支等无法发现，所以不能大意，用自己的眼睛重新检查确认很重要。另外，提前阅读上面页面中介绍的各种语法讲座可以预防基本错误。  

以下示例中`[EOF]`表示文件在此结束，`[CR]`表示换行，`□`表示全角空格（空格）。这些都不能按字面意思输入。另外，记事本特别无法识别`[CR]`和`□`。  

---  

### 忘记循环结尾  
如果未适当设置缩进，写出难看的源码时，往往会变成这种情况。具体来说：  

``` { #language-erb title="ERB" }  
IF A == 2  
    IF B == 3  
    IF C == 4  
        PRINTL A是2，B是3，C是4。  
    ELSE  
        PRINTL A是2，B是3，但C不是4。  
    ENDIF  
    PRINT A是2，B不是3。  
ELSE  
ENDIF  
```  

上面的例子中，第三个IF的缩进不合适，所以缺少一个ENDIF。执行这个会导致错误而无法运行。也就是说，人类容易犯错，所以为了清晰可见，最好好好设置缩进。  

---  

### 循环结尾过多  
如果ENDIF不够会被告知，但认为多放几个就没事的想法也是不对的。应该适当地配置。  

``` { #language-erb title="ERB" }  
IF A == 2  
    IF B == 3  
        PRINTL A是2，B是3。  
    ENDIF  
    ENDIF  
ENDIF  
```  

也许你以为这样就没问题了，但在eramaker（或Emuera）内部，如果出现逻辑不一致，会出现意外行为，导致在奇怪的地方崩溃或破坏标志，从而使后续语法全部无法执行，后果很严重。  

---  

### 在`SIF`语句后添加了`ENDIF`  
`SIF`语句只需要下一行就能完成，不需要用ENDIF结束。这是因为将`IF`语句改为`SIF`语句后忘记删除后面的`ENDIF`而导致的。  

``` { #language-erb title="ERB" }  
 SIF A == 2  
     PRINTL A是2。  
 ENDIF  
```  

也许最后再检查一遍或通过某种检查器就能发现，但无论如何都需要注意。  

---  

### 试图在`SIF`语句中放入多行  
如前所述，`SIF`语句只需下一行就能完成。也就是说，不能用`IF～ENDIF`的方式在`SIF`语句中分支多行。这在向`SIF`语句创建的分支添加新处理时容易出错。  

``` { #language-erb title="ERB" }  
 SIF TALENT:MASTER:117  
     A += 100  
     B += 100  
```  

在上面的例子中，`B += 100`无论`TALENT:MASTER:117`是否存在都会执行。检查器无法检测到此类错误，所以要特别注意。  

``` { #language-erb title="ERB" }  
 SIF TALENT:MASTER:117  
     A += 100  
 SIF TALENT:MASTER:117  
     B += 100  
```  

这样写的话可以按预期执行，但不如一开始就用`IF`语句写更快更清楚。从根本上说，最好的对策是不要使用`SIF`语句。  

---  

### 在`SIF`后立即放置注释很危险  
`SIF`语句在分支为真时执行下一行，但在Emuera中，如果下一行是注释行则不计算，而是执行之后第一个非注释行。然而，eramaker会"执行"下一行的注释，因此两者行为不同。请注意这一点。关于注释，如果可能的话最好放在`SIF`的前一行。  

---  

### 把`ELSEIF`写成`ELSE`/或写成`ELSE IF`  
在`IF～ELSE～ENDIF`语句中有时会写下以下内容导致错误：  

``` { #language-erb title="ERB" }  
 IF TALENT:120  
     PRINTL 是男人啊！  
 ELSE TALENT:121  
     PRINTL 是双性人啊！  
 ELSE IF TALENT:122 || TALENT:123  
     PRINTL 说不定以后会长出来？  
 ENDIF  
```  

那么，上面的例子中两个`ELSE`都是错误的。第一个是忘记了`IF`。第二个是`ELSE`和`IF`分离了。因为`ELSE`不能附加条件语句，所以两者都无法正常判断。无论如何都应该避免这种情况。  

---  

### 已死的分支  
在`IF～ELSE～ENDIF`结构中容易犯的一个错误是"死分支"。虽然它本身可能不会导致崩溃，但能避免的话还是避免比较好。  

``` { #language-erb title="ERB" }  
 IF TALENT:120 == 1 || TALENT:121 == 1  
    PRINTL 有阴茎哦！  
 ELSE TALENT:121  
    PRINTL 是双性人哦！  
 ELSEIF TALENT:120 == 1  
    PRINTL 是男人哦！  
 ENDIF  
```  

在上面的例子中，`ELSEIF TALENT:120 == 1` 这一行绝对不可能成立并执行。也就是说，这部分是“死分支”。  
这是因为，只要 `TALENT:120` 存在，第一个 `IF` 就会被执行，接下来的 `ELSEIF` 判断就永远不会被执行。  

``` { #language-erb title="ERB" }  
IF TALENT:120 == 1 && TALENT:121 == 1  
    PRINTL 既是男人又是双性人哦。  
ELSEIF TALENT:120 == 1  
    PRINTL 是男人哦！  
ENDIF  
```  

那么如果写成上面这样呢？  
当然，这样的话下面的 `ELSEIF` 条件就不再是“死分支”了。但是……既是男人又是双性人到底是什么？这在规格上是不可能的条件，所以第一个 IF 语句变成了“死分支”。  
如果在某个世界观设定中“男人”和“双性人”可以共存，那就不是“死分支”，但这方面需要考虑背景设定和世界观，总之要注意这种“死分支”。  

---  

### 在看助手之前先确认助手是否存在  
在 erabasic 中，角色注册编号都是包含 0 的自然数，不可能是负数。  
但是，如果 `ASSI`（助手变量）不存在，由于不能代入空白，会暂时被代入 `-1`。  
因此，如果在没有助手的情况下尝试确认助手的编号或状态，会显示 `第 1 参数 (-1) 超出角色注册编号范围` 并报错。  
无论以何种形式引用助手，务必在该条件式之前加上 `IF ASSI > 0` 这一条件式，以排除助手不存在的情况。  

``` { #language-erb title="ERB" }  
IF ASSI >= 0  
    SIF TALENT:ASSI:0 == 1  
        PRINTL 助手是处女。  
ENDIF  
```  

另外，在口上模板中，有时会假设特定角色是助手，并将助手编号假定为 `Y1`。  
如上所述，`ASSI` 只能放入自然数，所以如果有 `IF ASSI:NO == Y1` 这样的式子，就会报错。  
通常这部分应该是被注释掉的，如果不指定助手编号，请不要去掉行头的 `;`，保持原样即可。  

---  

### eramaker 不进行短路求值  
在 Emuera 中，`IF` 语句实现了短路求值（如果前面的条件为假，则不再进行后续的条件判断），但 eramaker 没有实现这一点。  
因此需要编写稍微繁琐一些的语法。特别是先在可以使用便利扩展语法的 Emuera 专用变体中制作，然后再在 eramaker 变体中制作时，往往会忽略这一点。  

``` { #language-erb title="ERB" }  
SIF ASSI >= 0 && TALENT:ASSI:0  
    PRINTL 助手是处女。  
```  

上面的例子在 Emuera 中，如果 `ASSI` 是 `-1`（不存在），`IF` 显然不成立，因此不会评估后面的 `TALENT:ASSI:0` 而直接忽略。所以不会因为尝试引用不存在的助手能力而报错停止。  
但在 eramaker 中，`IF` 语句的所有条件都会被检查，所以即使助手不存在，也会尝试引用助手的 `TALENT` 从而发生错误。  
因此，如前项所述，必须先判断助手是否存在，仅在助手存在的情况下才引用 `TALENT` 等。  

---  

### `!= 0` 也包含 -1  
`!=` 是“不包含○○”的条件式，也就是说除了该数值以外的所有数值都为真。  
其实此时负值也包含在范围内，例如 `ASSI != 0`（助手不是“你”），当助手不存在时 (`ASSI == -1`) 也会被判定为真。  
这可能成为穿过范围指定的原因，导致在后续部分报错，请注意。  
另外，像 `IF TALENT:0` 这样省略写的条件式，在 erabasic 中会被解释为 `IF TALENT:0 != 0`。  
也就是说负值也被视为真，所以 `IF ASSI` 这样的条件式无法排除助手不存在的情况，请注意。一定要写成 `IF ASSI > 0`。  

---  

### 注意 `REPEAT` 循环  
`REPEAT` 语句在处理重复操作时很方便。不过，可能有人存在误解。  

``` { #language-erb title="ERB" }  
REPEAT 4  
    SIF COUNT == 4  
        PRINTL 第 4 个  
REND  
```  

在上面的语句中，第 4 个是绝对不会被 `PRINT` 出来的。因为 `REPEAT 4` 并不是 `COUNT` 从 `1` 循环到 `4`，而是从 `0` 循环到 `3`。  
也就是说，`REPEAT n` 中的 `n` 是重复次数，最后一次循环是 `COUNT` 的最终值减 1。  
如果不知道这一点，就会制造出各种死分支，请注意。  
啊，还有，不要因为循环结束了就用 `ENDIF` 来关闭而不是 `REND`，这种新奇的做法是不行的。`REPEAT` 只能用 `REND` 关闭，`IF` 只能用 `ENDIF` 关闭。  

---  

### 双重 `REPEAT` 语句  
`REPEAT` 语句使用名为 `COUNT` 的专用变量进行控制，但 `COUNT` 本身在整个程序中同时只能使用一个，所以在 eramaker 中无法执行嵌套的双重 `REPEAT`。  
但是，如果在 `REPEAT～REND` 之间使用 `CALL` 命令调用执行 `REPEAT` 语句的函数，就可以制造出双重 `REPEAT`。  

``` { #language-erb title="ERB" }  
REPEAT 10  
    CALL FUNC  
 REND  
 @FUNC  
 REPEAT 3  
 REND  
```  

如果制造出双重 `REPEAT` 语句，内部的 `REPEAT` 语句会覆盖外部 `REPEAT` 语句的信息，最坏的情况下会导致无限循环。  
例如上面的例子，在 `@FUNC` 结束时 `COUNT` 必然变成 `3`，导致无法从调用源的 `REPEAT` 语句中脱出。  
如果在调用函数时将 `COUNT` 保存到别的变量中就可以避免问题，但在 eramaker 中没有可靠的保存位置，所以无法根本解决。  
如果是 Emuera，可以使用 `LOCAL` 变量作为保存位置，或者将 `REPEAT` 语句替换为使用 `LOCAL` 变量作为计数器的 `FOR～NEXT` 语句来解决。  

---  

### 注意注释行  
如果适当配置和书写注释行，可以帮助调试和改造，但有时也会出错。  
比如本想写注释行却不小心忘记或删除了开头的 `;`。  
当然，这种情况下通常会在那里报错，但根据注释内容的不同，也有不报错的情况。例如：  

``` { #language-erb title="ERB" }  
;调试时如果按以下这样做钱就不会减少  
;另外 MONEY:1 设为花费的经费  
;MONEY:1 = 0  
MONEY -= MONEY:1  
```  

如果想写的代码如上所示，却变成了下面这样：  

``` { #language-erb title="ERB" }  
;调试时如果按以下这样做钱就不会减少  
;另外 MONEY:1 设为花费的经费  
MONEY:1 = 0  
MONEY -= MONEY:1  
```  

从 ERB 语法上来说并没有错误，所以下面的写法也不会报错。  
但是，内部行为完全不同，无法得到作者期望的结果。这种 bug 也很可怕。  
<!-- 使用  中介绍的 Emuera 开发用 Sakura 编辑器设置文件集等进行颜色区分，以便一眼就能判断是否为注释行，会很方便。 -->  

---  

### `PRINTFORM` 中的 `FORM` 很重要  
常见错误是在显示 `%CALLNAME:MASTER%` 等名字时写成下面这样：  

``` { #language-erb title="ERB" }  
PRINTL %CALLNAME:MASTER% 抱住了 %CALLNAME:TARGET%  
```  

`%CALLNAME:MASTER%` 是字符串变量，要显示其内容必须使用 `PRINTFORM`（转换变量后显示），而不是 `PRINT`（原样显示文本）。顺便一提，上面的例子会显示为：  

```  
%CALLNAME:MASTER% 抱住了 %CALLNAME:TARGET%  
```  

基本上 `PRINTFORM` 是 `PRINT` 的完全上位互换，如果不太清楚的话，使用 `PRINTFORM` 就没问题。  
另外关于无印、`L`、`W` 的区别，请记住：`PRINTFORM` 不换行且显示不停止，`PRINTFORML` 换行但不停止继续显示下一行，`PRINTFORMW` 换行并在该行停止显示。  

---  

### （函数）冲突了！？  
在 eramaker 中，即使定义了多个同名函数也不会被检测为错误。因此，如果函数名冲突，虽然不会报错，但会出现“没什么错但就是不对劲”这种最让人困扰的状况。  
因此，除非有系统函数等无法更改的特殊情况，否则不要使用相同的函数名。  
当通过 `CALL` 等调用同名函数时，优先级取决于文件读取顺序。在同一文件内，靠近文件顶部的会被调用。文件读取顺序在 eramaker 中依赖于文件系统，但在 Emuera 中可以通过配置进行一定程度的控制。  
RR 系列的口上调用正是利用了这个规格。  
另外，如果在口上内制作独自函数，万一别的口上也使用了相同的函数名，就会导致误动作。建议在函数名中加入 K(角色编号) 等以避免冲突。  
事件函数与普通函数不同，即使有多个相同的也会全部执行（如果有 `#SINGLE` 则是特殊情况）。关于哪些是事件函数，请参考 wiki 的其他描述或本家的描述。  

---  

### RAND的使用方法  
`RAND`（随机数选出）特别是在撰写口上时经常使用的便利语法，但使用时有需要注意的点。  
首先 `RAND:X` 选出的数值范围是 `0～(X-1)`，不会选出 `X` 这个数值。也就是说，即使制作 `IF RAND:3 == 3` 这样的分支，条件也绝对无法满足，成为死分支。  
另外，也容易犯如下错误：  

``` { #language-erb title="ERB" }  
IF RAND:3 == 0  
    PRINTFORMW 「啊」  
ELSEIF RAND:3 == 1  
    PRINTFORMW 「伊」  
ELSEIF RAND:3 == 2  
    PRINTFORMW 「乌」  
ENDIF  
```  

乍一看似乎各自以 1/3 的概率显示，但实际上这种写法概率并不相等。  
因为 `RAND` 每次使用都会重新选出乱数，这种情况下「啊」显示的概率是 `1/3`，「伊」显示的概率是 `(1-1/3)×1/3＝2/9`，「乌」显示的概率是 `{1-(1/3+2/9)}×1/3＝4/27`，并有 `8/27` 的概率什么都不显示。  
如果想要以相等概率显示，需要写成以下两种形式之一：  

``` { #language-erb title="ERB" }  
IF RAND:3 == 0  
    PRINTFORMW 「啊」  
ELSEIF RAND:2 == 0  
    PRINTFORMW 「伊」  
ELSE  
    PRINTFORMW 「乌」  
ENDIF  
```  

这样的话「啊」是 `1/3`，「伊」是 `(1-1/3)×1/2＝1/3`，「乌」是剩下的 `1/3`，即以相同的 1/3 概率显示。  
如果使用变量的话如下所示。但要注意变量不要与本体或补丁在该部分处理中使用的变量冲突。  

``` { #language-erb title="ERB" }  
A = RAND:3  
IF A == 0  
    PRINTFORMW 「啊」  
ELSEIF A == 1  
    PRINTFORMW 「伊」  
ELSE  
    PRINTFORMW 「乌」  
ENDIF  
```  

另外，如果是 Emuera 专用，可以使用扩展语法进行如下记述。当然在 eramaker 中不能使用，请注意。  
例）使用 `SELECTCASE` 的处理  

``` { #language-erb title="ERB" }  
SELECTCASE RAND:3  
    CASE 0  
        PRINTFORMW 「啊」  
    CASE 1  
        PRINTFORMW 「伊」  
    CASEELSE  
        PRINTFORMW 「乌」  
ENDSELECT  
```  

例）使用 `PRINTDATA` 的处理  

``` { #language-erb title="ERB" }  
PRINTDATAW  
    DATAFORM 「啊」  
    DATAFORM 「伊」  
    DATAFORM 「乌」  
ENDDATA  
```  

---  

### 最后的换行很重要  
在 eramaker 中，无论是 ERB 文件还是 CSV 文件，最后一行都不会被读取。也就是说，请在最后换行后再结束。  
以下是某个 ERB 文件的末尾。以最终的 `ENDIF` 整齐地结束。  

``` { #language-erb title="ERB" }  
IF RESULT == 0  
    CALL REPLAY_GAME  
ELSEIF RESULT != 1  
    GOTO INPUT_LOOP  
ENDIF[EOF]  
```  

看上面的例子。在 Emuera 中没有任何问题，但在 eramaker 中，最最终行的 `ENDIF` 无法被识别从而报错。务必在 `ENDIF` 之后换行再保存。这样就不会报错了。也就是说：  

``` { #language-erb title="ERB" }  
IF RESULT == 0  
    CALL REPLAY_GAME  
ELSEIF RESULT != 1  
    GOTO INPUT_LOOP  
ENDIF[CR]  
[EOF]  
```  

这样就可以了。  

---  

### 命令文和条件文要用半角空格分隔  
各命令文的后面必须放入半角空格。  
为了便于理解，本项中将半角空格记为 `_`，全角空格记为 `□`，但实际书写时请写「` `」而不是「`_`」。  

``` { #language-erb title="ERB" }  
PRINTL_加载  
```  

下面的两个例子 eramaker 都无法正常解释并会报错。  
前者是因为 `PRINTL` 后面没有空格，后者是因为 `PRINTL` 后面放的是全角空格而不是半角空格，导致无法将 `PRINTL` 识别为命令文。  

``` { #language-erb title="ERB" }  
PRINTL 加载  
PRINTL□加载  
```  

另外，排列多个条件文时，各自之间也必须放入半角空格。  

``` { #language-erb title="ERB" }  
○：IF TALENT:85 _&&_ TALENT:88  
×：IF TALENT:85□&&TALENT:88  
```  

即使出现这种错误，往往也只是警告而不会崩溃，但结果可能导致 IF-ENDIF 关系崩坏，进而引发后续动作不稳定、意外的标志破坏等情况。  

---  

### 用 GOTO 跳转后会忘记自己所在的位置  
在根据输入的数字或特定条件决定分支去向时，有不使用嵌套写法，而是利用独自函数或标签作为独立项目进行管理的方法。  
虽然有即使复杂的分支也容易把握整体的优点，但此时有一点需要注意。  
如果使用以 `$` 开头的标签并用 `GOTO` 命令跳转到该标签，erabasic 会忘记自己之前在哪里。  
因此，如果将标签放在原来的 `IF` 语法之外，就无法回到原来的位置，可能会发生致命错误。  
使用标签最好仅限于输入意外数字时返回选择画面这种简单的处理，如果打算在分支目的地再次发生分支等复杂处理，最好作为以 `@` 开头的函数用 `CALL` 调用。  

---  

### 不要使用相同的 `GOTO` 标签名。（关于 `INPUT_LOOP` 的 bug）  
如果在同一函数内存在相同名称的标签，eramaker 不会跳转到前一个标签，而是跳转到该函数最开始的标签。  
因此可能导致无法按意图动作，所以在现行的 Emuera 中被当作严重 bug 处理。  
请像 `$INPUT_LOOP_01` 那样加上编号，或者像 `$EXTRAMODE_VIRGIN` 那样起一个易懂的独自名称，设法避免冲突。  

---  

### eramaker 读取 ERB 文件夹内的 ERB 文件和 CSV 文件夹内的 CSV 文件  
CSV 文件和 ERB 文件的实体虽然是文本文件，但不能因此就像普通文本文件一样命名为 `～～～.TXT`。  
eramaker 和 Emuera 只认识 CSV 文件、ERB 文件（以及 config 文件和 ERH 文件），即使里面写了语法，如果是其他文件名也会被视为不存在。  
另外 eramaker 只读取 CSV 文件夹直下和 ERB 文件夹直下的文件，所以即使将 CSV 文件或 ERB 文件保存在子文件夹内也会被无视（如果是 Emuera，可以将 `搜索子目录` 选项设为 YES 来使其识别）。  
此外，eramaker 和 Emuera 在启动时会读取所有能识别的文件，无论文件名或内容如何。  
在进行改造等操作时，如果为了备份而在同一文件夹内复制，会导致函数冲突，所以务必备份到其他文件夹。  
也不要忘记，如果不重启 eramaker 或 Emuera，改造结果不会反映出来。  
在此，强烈警告那些在“我的电脑”或资源管理器中不显示 ERB、CSV、TXT 等扩展名的人。这些是表示文件属性的扩展名，无论出于何种理由，都强烈建议“显示它们”。甚至可以说应该义务化。  
扩展子是表示文件属性一部分的非常重要的东西，但在 WINDOWS 的初始设置中，不知为何有时被设定为不显示，如果保持这样会非常不便、危险且给他人带来麻烦，所以请务必让其显示。显示扩展名的方法随 WINDOWS 版本而异，例如在 XP 中，可以从“我的电脑”或资源管理器的文件夹选项的“查看”标签的详细设置中，取消勾选 `隐藏已知文件类型的扩展名` 这一项。  

---  

### 即使是 Emuera，读取 CSV 时也要注意  
如前项所述，在 Emuera 中，当配置设置的 `搜索子目录` 选项为 Yes 时，CSV 文件也能没问题地读取子目录……并非如此。  
除了 `Chara**.csv` 以外的 CSV 文件，如果不放在 CSV 文件夹直下是无法读取的。这是 Emuera 的规格，没办法。  

---  

### 读取 `CharaXX.CSV` 仅在 `ADDCHARA` 时  
即使改写角色 csv 并重启，已存在角色的数据也不会被改写。乍一看似乎不方便，但角色 csv 是定义角色初始状态的，如果现有角色与 csv 同步，就会发生“好不容易提升的蕾丝气下降了”之类的事情。不过，eramaker（和 Emuera）不会那样做。它们是讲道理的家伙。  
另外，利用这个规格，如果想让某个角色回到初始状态，可以不用一点点地弄标志，而是 `ADDCHARA` 添加，替换掉，然后 `DELCHARA` 删除旧的，这样就能神奇地恢复原状。只不过，`TARGET` 及其他周边变量需要相应地进行改写……。  

---  

### 避免使用 `CFLAG:999`  
在本 wiki 的 [eramaker 变量信息](../eramaker//variables.zh.md) 中写有 eramaker 可利用的元素数量范围，但有一点需要注意。  
其实 eramaker 有一个 bug：如果像 `CFLAG:999` 这样的数组变量的最后一个元素不为 0，在保存/加载后数据会被破坏。  
所以实际上能使用的是元素数 -2 为止（`CFLAG` 的话到 `998` 为止）。  
不过在 Emuera 中这个 bug 已被修正。利用 `VariableSize.CSV` 还可以增加元素数量本身，所以如果是 Emuera 专用变体可以放心使用。  

---  

### 不要用 Excel 编辑 CSV 文件  
很多人的 PC 安装了 Office 等软件，CSV 文件也与 Excel 等表格计算软件关联。  
但是 **eramaker 变体的 CSV 文件务必用文本编辑器编辑**。  
因为 Excel 会擅自添加段落分隔等符号以便于自己处理，导致 eramaker 无法正常读取。  
话说回来，把 CSV 文件的关联本身改为文本编辑器对很多人来说也不方便，所以可以在右键点击文件时显示的上下文菜单的“发送到”中注册文本编辑器，或者在文件类型设置中创建从文本编辑器打开的项目。  

---  

### 注意 RAND:0  

如果设为 `RAND:0`，在 eramaker 中会返回 0。但在 Emuera 中会报错退出。  
虽然看起来是简单的问题，但如果写成 `RAND:变量`，而该变量在其他地方被代入或计算后才来到该处理时，在 Emuera 中务必在此之前确认该变量大于 0。  

---  

### 关于 `TALENT:0` (处女) 导致的分支  

**取决于变体的规格**  

俗称初次体验时的口上撰写时容易犯的 mistake 是试图用 `TALENT:0` (处女) 的有无来进行分支。  
很多人会疑问“那有什么不好的？”，但对于像 Vibrator 或性交等会导致丧失处女的命令，大多数变体基本上都是按照 丧失处女处理 → 调用口上 的顺序处理的，因此在口上被调用时素质：处女已经丧失了，所以无法用于分支。  
因此，如果想写丧失处女时的口上，请使用 `EXP:0(V 经验) == 1` 作为条件。不过，关于 YMrev.6，因为 EXP 加算被移到了 TurnLast，所以这个条件必须写成 `EXP:0(V 经验) == 0 && TCVAR:0(V 经验) > 0`。  
此外，这个方法仅适用于纯种处女，无法对应再生处女。  
如果无论如何都想制作再生处女时的分支，可以在调教开始时如果存在处女就代入适当的 `CFLAG` 数值，然后通过判断 V 经验是否变为该数值 +1 来判别等工夫。  
在 A 开发时等不会丧失处女的命令以外的场合，当然可以正常使用 `TALENT:0` 作为分支条件。  

<!--  
* まだまだ何かありそうだ。  
　以上の例のほかにもまだまだありそうなので気づいたらどんどん加筆していく予定である。  
-->  
