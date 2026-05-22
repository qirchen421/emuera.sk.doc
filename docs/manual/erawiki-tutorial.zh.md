# 变体制作/教程

原始页面
[era系列讨论汇总Wiki V3 教程](https://seesaawiki.jp/eraseries/d/%a5%c1%a5%e5%a1%bc%a5%c8%a5%ea%a5%a2%a5%eb)

**※目前，本页面内OSDN的链接难以连接。**

---

- 教程
- [标题准备篇](erawiki-title.zh.md)
- [标题实践篇](erawiki-title2.zh.md)
- [ERB制作实践篇](erawiki-ERBmanual.zh.md)

---

## 前言
这个教程是2021/05/09写入wiki的内容，
内容是尝试将Emuera导入改用的vanilla era。
vanilla是变体的反义词，指的是era的始祖eramaker。

- [漠々ト、獏（R18） サークル獏](http://cbaku.com/)

版权所有者是佐藤敏先生。vanilla即使现在玩也很有趣。感谢。

但是，现在从vanilla的era开始自制新变体并不推荐。
从过去到现在一直在修改的变体中，添加了许多功能。
花费数年时间由志愿者积累的东西，一个人去做是非常困难的。
当然如果有现成的样本和可供借用的处理会容易得多，但即便如此。
（借用时要确认许可证。
　一般来说，个人制作游戏的衍生制作被允许的情况很少。
　era中也有很多不允许衍生的变体）

即便如此，还是冒险尝试建立vanilla修改环境。
了解vanilla有助于理解EmueraWiki。
结果会改变你能做的事情的范围。
写一下从导入Emuera到vanilla，制作标题并连接的初期部分。

---

vanilla在现在的Emuera中使用了许多已废弃的变量
（废弃变量请参见etc1821的VariableSize.CSV等）
这些在现行变体中也广泛使用。
可能最主要的原因是数量太多，个人难以处理。
对初学者来说，易懂性是生死攸关的问题，但不能强迫整理的人去修改。
代码改进就当作是为了让自己工作更轻松而进行的吧。

---

## 读改造入门
- [改造入门](modification-manual.zh.md)

这是标准的调教SLG手册，写明了开始准备需要做的事。
"【易用的文本编辑器】(modification-manual.md#_4)"、"【能GREP的搜索工具】(erawiki-modification-QandA.md#grep)"、"【首先记住这些】(modification-manual.md#_5)"，
先读这些。

---

最近使用的文本编辑器有
容易安装·启动快·有志愿者制作的着色功能的樱花编辑器，
或需要日文化·启动稍慢·GREP快·有志愿者制作的函数跳转功能的Visual Studio Code等。

如果默认编码不是Shift-JIS且自动编码功能关闭，
打开erakanon时可能会出现乱码。
可以考虑暂时用Shift-JIS进行工作，
或者提前寻找免费软件等编码转换工具，将全部转换为带BOM的UTF-8。

<u>不清楚的人先借用樱花编辑器试试吧。</u>
即使无法查找和使用着色功能或GREP等功能，仅仅作为记事本使用也非常方便，而且本来就是日文的。
能显示全角空格·半角空格·制表符的识别功能非常有用。
记事本制作会很痛苦（大多数情况下是其他人），所以尽量避免用记事本制作。
<!--
|bgcolor(#F0F0E7):[[标题实践篇]]→编码是什么？|  
|https://seesaawiki.jp/eraseries/d/%a5%bf%a5%a4%a5%c8%a5%eb%bc%c2%c1%a9%ca%d4#content_2_3|  
//(2021/05/11 被指出不是不支持，在wiki编辑帖子中感谢指正。  
//　修正的笔记为了避免阅读困难  
//　打算等一段时间后再确认时注释掉。也感谢追加信息）  
-->

---

另外，现在樱花编辑器也有了GREP功能，不再需要GREP工具。
<!--速度有差异。听说ripgrep推荐。  -->
<!--//（2021/05/11 在wiki编辑帖子中感谢建议追记）  -->
GREP是能跨越多个文件搜索的系统，有助于查找错误位置。
关于GREP的使用方法，这里有人介绍，可以读一下。

- [系统改造Q&A→基础知识→GREP的使用方法](erawiki-modification-QandA.md#grep)

**而且备份非常重要。**

当今的变体中，用以下方法可能无法添加角色，
但这次是将erakanon和Emuera合并的测试，所以能学到基本部分。

---

另外，如果在资源管理器中设置显示扩展名，
就能看到`文件名.XXX`这样的文件格式。

要修改era的话，ERB、ERH、csv等文件格式如果不了解就很难处理。
不显示扩展名的人搜索『Windows 资源管理器 扩展名显示』
等，设置显示扩展名吧。

---

<!-- 工具集链接已失效，几乎全部失效，所以注释掉
*寻找有用的工具
编辑器分发网站的地址等已成为链接集。
在这里寻找想要的编辑器吧。
|bgcolor(#F0F0E7):[[工具]]|  
|https://seesaawiki.jp/eraseries/d/%a5%c4%a1%bc%a5%eb|  
----  
[[▲返回目录>#contents]]  
//  
//  
//  
-->
## Emuera所需运行环境

|Windows|  
|:-|
|.NET Framework 4.5|  

.NET Framework 4.5是在创建Windows应用程序时，
为Emuera使用的编程语言C#添加各种功能的。

- Windows 11 的话，通常会安装4.8，所以没什么影响
- Windows 10 的话，会安装4.6。运行没问题。
- Windows 8 或 8.1 的话，最初安装的是4.5。
- Windows Vista 或 7 的话，也可以安装。搜索并阅读官方Microsoft下载页面。
- Windows XP的话，无法安装。

EmueraEM+EE还需要最新的.NET。请按照启动时的引导下载&安装。

如果没有问题请继续。

---

## Emuera下载

- [Emuera - emulator of eramaker 下载](https://ja.osdn.net/projects/emuera/releases/)
- [EmueraEM+EE(从主页下载)](../README.zh.md)

这次下载上排的官方Emuera。

>Emuera1824.zip(日期: 2019-01-28, 大小: 253.98 KB)
>etc1821.zip(日期: 2015-11-04, 大小: 8.73 KB)

点击左侧的蓝色按钮下载，解压zip试试。

Emuera1824文件夹

- Emuera_readme.txt
- Emuera1824.exe

etc1821文件夹

- _Replace.csv
- Chara0你.csv
- readme.txt
- SYSTEM_FLOW.ERB
- SYSTEM_FLOW.ERH
- VariableSize.CSV
- VariableSize_0.CSV

里面有这些文件。

先读一下`Emuera_readme.txt`。
Emuera的作者是`MinorShift`先生和`妊）|дﾟ)的人`先生，
MinorShift先生可以打赏支持，Emuera读作emulator，
与eramaker.exe放在同一文件夹启动等使用方法，
运行环境和许可证等内容请确认。

可能有人会觉得奇怪。
写着要把Emuera.exe放在eramaker.exe所在位置。
但大多数era都没有捆绑eramaker.exe。

如果不知道eramaker就从Emuera开始，
读Wiki时往往会"？？？"不知所云。
etc 1821稍后确认，先下载eramaker试试。

---

## eramaker下载

- [漠々ト、獏（R18） サークル獏](http://cbaku.com/)

点击此分类同人游戏，最后面显示的

- [同人游戏 erakanon(eramaker）](https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/)

看看。
读了非常吸引人的介绍文后，

>下载(6/2 ver)

从这里下载erakanon并解压试试。

erakanon文件夹

- eramaker.exe
- erakanor.html
- CSV文件夹
- ERB文件夹

里面有这些。

erakanon是多个对象，购买对象卡片并选择的游戏。
eralight是只有一个对象，没有购买，从开始就选定对象的游戏。
（想修改的人→修改的信息→eramaker的简单示例游戏 eralight）

这里以erakanon为基准继续。

---

## eramaker启动
在erakanon文件夹内，启动eramaker.exe。
启动后会注意到。
"无法用鼠标操作……？"这件事。

用键盘数字键输入命令编号，
按回车键执行的机制。

## Emuera启动
如Emuera_readme.txt中说明，
将Emuera1824文件夹内的Emuera1824.exe
复制粘贴到erakanon文件夹。

关闭eramaker.exe，启动Emuera1824.exe。
会有一些警告，但现在可以不用管。
这次能用鼠标操作了。

<!--
Emuera假设以此流程导入，
所以关于CSV或ERB文件夹的导入及其内容，EmueraWiki侧没有太多说明。
（EmueraWiki的主页有eramaker的链接，
　写着eramaker的内容几乎没写在EmueraWiki中，
　但开始时不了解eramaker和Emuera的关系，容易跳过不读）
-->

接下来，删除eramaker.exe。
再次启动Emuera1824.exe。
与之前无异运行。eralight也一样。

Emuera是eramaker的仿真器（模仿软件），
可以作为"功能增加，变得更方便的替代品"使用。
从Emuera开始的初学者可能因eramaker的规格而困惑，但现在没问题了。

---

## 边玩边看修改信息
再次看看以下页面。

- [同人游戏 erakanon(eramaker）](https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/)

页面稍微往下一点

>想修改的人

有这个标题。
然后有修改信息的链接。

- [eramaker的CSV格式](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)
- [eramaker的era basic结构](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerc.html)
- [eramaker的era basic格式](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerb.html)
- [eramaker的变量列表](https://cbaku2.sakura.ne.jp/b/erakanon/eramavar.html)

<!--
（2021/04/29『eralight的修改方法』链接已失效，所以信息记在评论中）  
//2021/06/16 帖子信息  
//教程内，erakanon官方链接失效的"eralight的修改方法"，  
//位置是http://cbaku2.sakura.ne.jp/b/erakanon/tut000/eramt000.html，  
//处理很纠结，但只是信息提供，  
//也可能是制作者判断暂时移除，所以纠结，记在评论栏。感谢信息  
-->
如各页面所述，一边实际玩游戏一边浏览吧。

---

### eramaker的era basic结构

- [eramaker的era basic结构](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerc.html)

一边玩erakanon，一边读这里容易抓住整体流程和气氛。

- [EmueraWiki flow](https://evilmask.gitlab.io/emuera.em.doc/Emuera/system_flow.html)

更详细的内容在Emuera的流程图。

---

### eramaker的era basic格式

- [eramaker的era basic格式](https://cbaku2.sakura.ne.jp/b/erakanon/eramaerb.html)

为了能让外行人也容易理解。
不懂基础写法的人读一下吧。

---

### eramaker的CSV格式

- [eramaker的CSV格式](https://cbaku2.sakura.ne.jp/b/erakanon/eramacsv.html)

CSV像是信息汇总。
用这个指定状态数据、角色数据等。
说明书里说明了文件名和内容。
erakanon或eralight的CSV文件夹内，扩展名为`.csv`的文件。

有各种名字的CSV。
比如，`Abl.csv`。
"Abl"是"Ability"的缩写，
是设置角色能力状态的文件。

>第1列写能力编号，第2列写能力名。

写着这样，实际打开文件看，

```
0,顺从
```

第一行是这样的。

CSV这样写的话，在ERB处理中

```
ABL:角色编号:0
```

可以写成

```
ABL:角色编号:顺从
```

这样。
比起谁都看不懂的谜之数字（魔法数字）
能一眼看出在做什么（可读性提高）。
当然制作者本人也比只用数字管理不容易忘记。

CSV主要是这样使用。

- [系统改造Q&A→基础知识→消除魔法数字](erawiki-modification-QandA.md#_6)

另外，Emuera中可指定的CSV大幅增加。所以这里写的内容，

- [EmueraWiki→Emuera新增扩展语法→一般→字符串指定数组变量元素](../Emuera/expression.md#string-array-element)

要一起读。
不过，开始时看太多变量名也记不住。
只要记住实际使用时，能查到可用csv的列表在哪就好。

变量也增加了，所以按照说明书

- [Emuera新增扩展语法→常量·变量→csv相关](../Emuera/variables.md#csv)

也想一起确认。
也可以用DIM数组自作CSV中没有的数据。

---

### eramaker的变量列表
变量就是字面意思，可以变化的数字。

游戏因玩家不同状态值会变化。
制作时，无论玩家怎么玩状态值如何变化，
都要事先写好会怎样。
准备箱子贴标签"好感度"命名。
往箱子里放数字，不管内容如何都这样计算，命令。
箱子就是变量。标签上写的名字符号变量名。

- [eramaker的变量列表](https://cbaku2.sakura.ne.jp/b/erakanon/eramavar.html)

`A-Z`现在已废弃，Emuera推荐使用`DIM`变量。
现在是以vanilla环境试验为目的所以不试，
真的从头开始制作新变体的话读一下"etc1821"文件夹内的"VariableSize.CSV"，
将"VariableSize_0.CSV"重命名为"VariableSize.CSV"放入CSV文件夹。
（"VariableSize.CSV"是说明用文件，"VariableSize_0.CSV"是实际使用的文件）

废弃变量从开始就设置为"-1"，自动不能使用。
试试看的话，就知道为最新化vanilla era要改哪里。
（超过1000行警告，全部是一字符变量关闭相关）

熟练的人可能会对`LOCAL`、`LOCALS`不能用感到困惑。
函数多时，作为参数可用的`ARG`或`ARGS`减少会变快
所以这边控制在1。

- [系统改造Q&A→基础知识→关于私有变量(用#DIM而非A～Z或LOCAL)](erawiki-modification-QandA.md#azlocaldim)

---

### 了解有用的事
现在，`***`、`+++`、`///`或与ASCII艺术等不相容所以不太使用。
这个功能可以在config侧设置禁止。
如果ERB侧作为便利功能使用，口上侧就不能使用这种表现。

---

### 读应用篇
各变量范围和内容一览的eratoho汇总 V3页面链接集。

- [应用篇](https://seesaawiki.jp/eraseries/d/%b1%fe%cd%d1%ca%d4)

"EmueraWIki的链接标题，不知道哪个页面有什么说明……"的人从这里的Emuera新增功能一览跳转可能更容易理解。
开发者技术信息是给懂的人看的，告诉eramaker的系统特征。

---

## 修复错误

```
警告Lv2:INFO.ERB:89行:解析语法时发现意外符号':'
    SIF STAIN:MASTER::COUNT & 2
警告Lv2:INFO.ERB:91行:解析语法时发现意外符号':
    SIF STAIN:MASTER::COUNT & 4
警告Lv2:INFO.ERB:93行:解析语法时发现意外符号':
    SIF STAIN:MASTER::COUNT & 8
```

之前说不用管，但用Emuera.exe启动erakanon时，出现这种错误。
修改前先修正好。

打开ERB文件夹有很多文件。
从警告看，`INFO.ERB`有错误原因。
用编辑器打开那个文件。

编辑器显示行号的话，
应该能在指定的89行附近找到问题位置。

``` { #language-erb title="ERB" }
SIF STAIN:MASTER::COUNT & 2
    PRINT <Ｐ>
SIF STAIN:MASTER::COUNT & 4
    PRINT <精>
SIF STAIN:MASTER::COUNT & 8
    PRINT <Ａ>
```

这里MASTER后面的"`:`"多了。

``` { #language-erb title="ERB" }
SIF STAIN:MASTER:COUNT & 2
    PRINT <Ｐ>
SIF STAIN:MASTER:COUNT & 4
    PRINT <精>
SIF STAIN:MASTER:COUNT & 8
    PRINT <Ａ>
```

改写，保存试试。

关闭文件，再次从Emuera1824.exe启动，警告不再显示。

下一页→[标题准备篇](erawiki-title.zh.md)