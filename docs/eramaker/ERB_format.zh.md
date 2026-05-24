# eramaker的ERB书写格式

**本页记载的是eramaker的相关信息。与现行Emuera的规格存在部分差异。**

## 基本信息

### 关于ERB文件

- 在eramaker.exe的直下层放置名为ERB的文件夹，将ERB文件放入其中。
- 扩展名为.ERB即可，文件名任意。
- 请使用记事本等文本编辑器进行编辑。

### ERB文件的写法

- 注释与空格

所有ERB文件中：

- 首字符为半角;（分号）时，该行会被忽略。空行也会被忽略。
- 请勿在行尾加分号，也请勿在分号后写注释。
- 行首的半角空格或制表符无论多少个都会被忽略。

**正**

```
;金钱的设定
MONEY = 500
;时刻的设定
DAY = 10
TIME = 1
;游戏开始
PRINT 怎么办？
```

**误**

```
MONEY = 500;
TIME = 5;（从第5天开始）
```

- 半角输入

输入数值、命令、变量名、函数名等时请使用半角字符。

**正**

```
MONEY = 500
PRINT 开始游戏。
```

**误**

```
ＭＯＮＥＹ ＝　５００
ＰＲＩＮＴ 开始游戏。
```

- 字符串的输入

字符串用""包裹后将无法正常运作。

**正**

```
PRINT 一天结束了……
```

**误**

```
PRINT "一天结束了……"
```

- 一行内完成

即使写较长的命令，也不要分成两行以上。

**正**

```
PRINT 名雪的身体很敏感而且经验也很丰富，所以即使稍微粗暴一些也会很高兴。嘴上虽然在否认，名雪却越来越沉沦。不过，睡着这一特殊状况让我在大胆行动时有所犹豫。
```

**误**

```
PRINT
名雪的身体很敏感而且经验也很丰富，所以即使稍微粗暴一些也会很高兴。嘴上虽然在否认，名雪却越来越沉沦。不过，睡着这一特殊状况让我在大胆行动时有所犹豫。
```

## 变量与命令

### 关于变量

在调教SLG中，参数的变化就是生命。因此必须学会使用能够记忆数据并进行加法、乘法等计算的"变量"。

- 向变量赋值

- 使用=（等号）。请输入半角字符。=的前后用半角空格或制表符隔开。
- eramaker中能使用的数值基本上都是整数。请勿输入小数。

**正**

```
MONEY = 500
```

**误**

```
MONEY ＝ 500
MONEY=500
MONEY = 3.14
```

- 向变量代入计算结果

同样使用=。需要注意*是乘法、/是除法、%是取余。
计算结果为小数时会舍去小数部分。

**正**

```
;将MONEY设为74
MONEY = 15+34+25
;将MONEY设为650
MONEY = 150+(100-50)*10
;将MONEY设为3
MONEY = 10/3
;将MONEY设为TIME的10倍
MONEY = TIME*10
;当DAY为0,1,2...时MONEY为0,10,20...超过7则回到0
MONEY = DAY%7*10
```

**误**

```
MONEY = 500×10÷4
```

- 对变量进行加法和乘法等操作

使用+=、-=、*=、/=、%=。

**例**

```
MONEY = 100
TIME = 12
;将MONEY设为150
MONEY += 50
;将MONEY设为750
MONEY *= 7-2
;将MONEY设为80
MONEY -= 670
;将MONEY设为8
MONEY %= TIME
;将MONEY设为1
MONEY /= TIME-4
```

- 关于数组

- 变量可以作为"数组"来访问。"数组"是用相同名称的变量管理多个数据的方式。
- 访问数组使用:（冒号）。请输入半角字符。之间不要加空格。
- 数组后面可以使用的数字最小为0。最大值因变量而异。详见列表。
- 数组后面也可以放变量。但数组后面不能再放数组。

**正**

```
A = 35
;设定FLAG的值
FLAG:0 = 0
FLAG:2 = 10
FLAG:35 = 440
;用FLAG进行计算
FLAG:A += 100/FLAG:2
FLAG:2 *= FLAG:A
FLAG:(FLAG:20) = 10000
```

**误**

```
FLAG：0 = 10
FLAG : 52 = 1000
FLAG:FLAG:20 = 10000
```

- 关于二维数组

- 有些变量可以使用两个冒号来访问。这是涉及角色数据的变量。
- 访问形式为(变量名):(持有角色登记编号 (CharaID)):(变量编号)。

**例**

```
A = 2 ;将第5个角色的第0项能力设为LV3
ABL:5:0 = 3
;将第A（2）个角色的第1项经验+1
EXP:A:1 += 2
```

- 将变量显示在画面上

- 最简单的方法是使用PRINTV和PRINTVL命令。关于命令将在后面详细说明。

**例**

```
A = 2
PRINTV A
A = 30
PRINTVL A
B = 400
PRINTVL B
```

**输出结果**

```
230
400
```

- 关于字符串变量

- 普通变量只能处理整数，但也有能够处理字符串的字符串变量。不过功能有限。
- 要在画面上显示字符串变量，请使用PRINTS或PRINTSL命令。

**正**

```
STR:0 = 字符串
PRINTSL STR:0
```

**误**

```
;不能用+=来追加
STR:0 += 字符串
```

- 变量列表

- 请参阅[此处](variables.zh.md)。

### 关于命令（基础）

通过使用命令，可以在画面上显示文字、进行条件判断等。

- 命令的写法

- 基本写法为(命令名) (命令内容)。(命令名)和(命令内容)之间用半角空格或制表符隔开。
- 如果没有(命令内容)，直接换行即可。

**正**

```
PRINT 这是测试。
SIF 3 == 1+2
PRINT 理所当然。
WAIT
```

**误**

```
PRINT这是测试。
;输入等待
WAIT 0
```

- 显示文字

- [PRINT](../Reference/PRINT.zh.md)是显示文字的命令。PRINTL显示文字并换行。PRINTW显示文字并等待输入。
- [PRINTV](../Reference/PRINT.zh.md)是显示变量内容的命令。PRINTVL显示变量内容并换行。PRINTVW显示变量内容并等待输入。
- [PRINTS](../Reference/PRINT.zh.md)是显示字符串变量内容的命令。PRINTSL显示字符串变量内容并换行。PRINTSW显示字符串变量内容并等待输入。
- [PRINTFORM](../Reference/PRINT.zh.md)可以显示文字、变量、字符串变量等的组合。PRINTFORML在此基础上换行，PRINTFORMW在此基础上等待输入。
- [PRINTFORMS](../Reference/PRINT.zh.md)与PRINTFORM一样转换并显示字符串变量的内容。PRINTFORMSL在此基础上换行，PRINTFORMSW在此基础上等待输入。
- （末尾带W的命令在等待输入时，按Enter即可继续，所以最终会换行）

**例**

```
MONEY = 500
NAME:0 = 佐藤
PRINT 金钱是
PRINTV MONEY
PRINTL 日元。
PRINT 名字是
PRINTS NAME:0
PRINTL 。
PRINTFORML 重复的话，名字是%NAME:0%，金钱是{MONEY}日元。
PRINTFORMW 收到1000日元并支付600日元的话，剩下{MONEY+1000-600}日元。
STR:0 = 如果将那笔钱乘以5，就是{(MONEY+1000-600)*5}日元。
PRINTFORMSW STR:0
```

**输出结果**

```
金钱是500日元。
名字是佐藤。
重复的话，名字是佐藤，金钱是500日元。
收到1000日元并支付600日元的话，剩下900日元。
如果将那笔钱乘以5，就是4500日元。
```

- 条件判断

- 条件判断看例子理解最快。
- [SIF](../Reference/IF.zh.md)在条件表达式不为0（成立）时执行下一行。为0（不成立）时，跳过下一行。
- [IF](../Reference/IF.zh.md)在条件表达式不为0（成立）时，从下一行开始执行直到遇到ELSE、ELSEIF、ENDIF。为0（不成立）时，跳过直到遇到ELSE、ELSEIF、ENDIF。（如果是ELSE，则从下一行开始执行直到遇到ENDIF。ELSEIF中条件表达式成立时，从下一行开始执行直到遇到ELSE、ELSEIF、ENDIF。不成立时，跳过直到遇到ELSE、ELSEIF、ENDIF，并重复同样的过程）

**例**

```
A = 1
B = 2
C = 4

SIF A == 1
	PRINTL 测试１
SIF B != 1
	PRINTL 测试２
SIF C < 5
	PRINTL 测试３
IF A+B > 2
	IF C >= 6
		PRINTL 测试４
	ELSE
		PRINTL 测试５
	ENDIF
	IF A == 1 && B == 3
		PRINTL 测试６
	ELSEIF A == 1 || B == 3
		PRINTL 测试７
	ELSEIF A > 1 || (B > 2 && C > 2)
		PRINTL 测试８
	ENDIF
ELSEIF A+B == 2
	PRINTL 测试９
ELSE
	PRINTL 测试１０
ENDIF
```

**输出结果**

```
测试１
测试２
测试３
测试５
测试７
```

- "相等"用==，"不相等"用!=，"左边大"用>，"左边大于等于"用>=，"右边大"用<，"右边大于等于"用<=。全部使用半角字符。
- "且"用&&，"或"用||。全部使用半角字符。
- 可以使用括号来描述复杂条件。

- 输入与输入等待

- 要显示文章等并等待输入时，使用WAIT。
- （※通常使用PRINTW等，可以用更少的行数来表示，更容易阅读）
- 要让玩家输入整数时，使用INPUT。输入结果存入RESULT变量。
- 要让玩家输入字符串时，使用INPUTS。输入结果存入RESULTS变量。

**例**

```
PRINT 数据输入开始。
WAIT
PRINTL 请输入年龄。
INPUT
PRINTL 请输入名字。
INPUTS
PRINTFORML %RESULTS%是{RESULT}岁对吧。
```

- 循环与GOTO

- 想重复执行相同命令时，使用[REPEAT](../Reference/REPEAT.zh.md)。重复到REND为止。重复次数存入COUNT。
- 请注意REPEAT内部不能再创建REPEAT。
- 从REPEAT到REND的途中使用[CONTINUE](../Reference/CONTINUE.zh.md)会回到REPEAT所在处。使用[BREAK](../Reference/CONTINUE.zh.md)会结束循环并跳到REND的下一行。
- 想一下子跳到其他地方时，使用[GOTO](../Reference/GOTO.zh.md)。使用GOTO时，需要用$注册"标签"。

**例１**

```
REPEAT 10
PRINT 字符
REND
;用PRINTL写0个字符来换行
PRINTL
REPEAT 5
PRINTFORML 分数：{COUNT*5}
REND
```

**例１的输出结果**

```
字符字符字符字符字符字符字符字符字符字符
分数：0
分数：5
分数：10
分数：15
分数：20
```

**例２**

```
MONEY = 300
REPEAT 5
	SIF MONEY <= COUNT*100
		BREAK
	PRINTFORML 比{COUNT*100}日元更有钱。
REND
REPEAT 5
	SIF MONEY == COUNT*100
		CONTINUE
	PRINTFORML 持有金钱不是{COUNT*100}日元。
REND
```

**例２的输出结果**

```
比0日元更有钱。
比100日元更有钱。
比200日元更有钱。
持有金钱不是0日元。
持有金钱不是100日元。
持有金钱不是200日元。
持有金钱不是400日元。
```

**例３**

```
$INPUT_LOOP
PRINTL 请输入0到9的数字。
INPUT
SIF RESULT < 0 || RESULT > 9
	GOTO INPUT_LOOP
PRINTFORML 输入了{RESULT}。
```

- 关于函数

- 如果把程序从头到尾连续写下来会很难理解。
- 要把各个部分切分开来使其更容易理解，就要使用"函数"。
- 函数使用@来注册。在@之后，用英文字母和_（下划线）书写函数名。函数名请使用半角字符输入。
- 游戏开始时调用的函数名为"EVENTFIRST"（之后会详细说明）。
- 要跳转到其他函数时，使用[JUMP](../Reference/JUMP.zh.md)。
- 要跳转到其他函数，并在该函数结束后回到原位置继续执行时，使用[CALL](../Reference/CALL.zh.md)。
- 在被CALL调用的函数中使用[RETURN](../Reference/RETURN.zh.md)，可以中途结束该函数。这时，RETURN指定的数值会存入RESULT。如果没有使用RETURN而结束函数，RESULT会被设为0。
- 使用[RESTART](../Reference/RESTART.zh.md)会从该函数的开头重新开始。

**例**

```
@EVENTFIRST
PRINTW 游戏开始。

CALL OPENING
PRINTFORMW 开头的结果是{RESULT}。
CALL GAME_MAIN
PRINTFORMW 游戏的结果是{RESULT}。
JUMP ENDING

PRINTL 因为使用了JUMP所以不会显示这部分。

@OPENING
PRINTW 开场。
RETURN 25

@GAME_MAIN
PRINTW 游戏中。
PRINTL 没有RETURN就结束了。

@ENDING
PRINTW 结尾。
RESTART
```

**输出结果**

```
游戏开始。
开场。
开头的结果是25。
游戏中。
没有RETURN就结束了。
游戏的结果是0。
结尾。
结尾。
结尾。
结尾。
结尾。
.......（以下无限循环）
```

- 其他基础命令

- 使用[QUIT](../Reference/QUIT.zh.md)可以结束游戏。
- 使用[DRAWLINE](../Reference/DRAWLINE.zh.md)可以从画面左端到右端画一条----线。
- 使用[TIMES](../Reference/TIMES.zh.md)可以进行小数乘法。eramaker基本上以整数处理数值，所以要涉及小数时请使用此命令。使用形式为TIMES (变量) , (小数值)。
- 使用[BAR](../Reference/BAR.zh.md)可以显示`[*****....]`这样的图表。BARL的情况下会换行。使用形式为BAR (变量) , (最大值), (长度)。

**例**

```
MONEY = 500
DRAWLINE
BARL MONEY , 1000 , 20
PRINTFORMW 持有{MONEY}日元。
DRAWLINE
TIMES MONEY , 1.25
BARL MONEY , 1000 , 20
PRINTFORMW 变成了{MONEY}日元。游戏结束。
QUIT
```

**输出结果**

```
---------------------------------------------------------------------
[**********..........]
持有500日元。
---------------------------------------------------------------------
[************........]
变成了625日元。游戏结束。
```

### 关于命令（调教用）

eramaker中有几个用于调教的特殊命令。

- 调教用数据的显示

- [PRINT_ABL](../Reference/PRINT_STATUS.zh.md)显示角色的能力。
- [PRINT_TALENT](../Reference/PRINT_STATUS.zh.md)显示角色的资质。
- [PRINT_MARK](../Reference/PRINT_STATUS.zh.md)显示角色的刻印。
- [PRINT_EXP](../Reference/PRINT_STATUS.zh.md)显示角色的经验。
- [PRINT_PALAM](../Reference/PRINT_STATUS.zh.md)显示角色的调教中参数。
- 使用以上命令时，请指定要显示哪个角色的数据。例如PRINT_ABL 0的话，基本上就是显示主角的能力。

- [PRINT_ITEM](../Reference/PRINT_STATUS.zh.md)显示持有的道具。
- [PRINT_SHOPITEM](../Reference/PRINT_STATUS.zh.md)显示商店中出售的道具。

- [UPCHECK](../Reference/UPCHECK.zh.md)显示调教命令导致的调教中参数变化。

- 角色的管理

- [ADDCHARA](../Reference/ADDCHARA.zh.md)添加角色。想添加角色注册编号 (NO) 3的角色时，像ADDCHARA 3这样写。
- ADDSPCHARA添加SP角色。想添加角色注册编号 (NO) 3的SP角色时，像ADDSPCHARA 3这样写。
（SP角色是指角色标志的0号为1的角色）
- [DELCHARA](../Reference/DELCHARA.zh.md)删除通过ADDCHARA等添加的角色。

**例**

```
;登记编号 (CharaID) 0的角色名字是浩之，是主角。
;假设角色注册编号 (NO) 3的名字是智子、5的名字是蕾米、6的名字是琴音
PRINTFORML 现在有{CHARANUM}个角色。
ADDCHARA 3
ADDCHARA 5
ADDCHARA 6
PRINTFORML 现在有{CHARANUM}个角色。
REPEAT CHARANUM
	PRINTFORML 第{COUNT}个是%NAME:COUNT%。
REND
DELCHARA 2
PRINTFORML 现在有{CHARANUM}个角色。
REPEAT CHARANUM
	PRINTFORML 第{COUNT}个是%NAME:COUNT%。
REND
```

**输出结果**

```
现在有1个角色。
现在有4个角色。
第0个是浩之。
第1个是智子。
第2个是蕾米。
第3个是琴音。
现在有3个角色。
第0个是浩之。
第1个是智子。
第2个是琴音。
```

- 保存相关

- [SAVEGAME](../Reference/SAVEGAME.zh.md)调用存档画面，[LOADGAME](../Reference/SAVEGAME.zh.md)调用读档画面。两者都只能在SHOP中调用。
- PUTFORM只能在@SAVEINFO这个特殊函数中使用。用与PRINTFORM相同的格式书写，可以给存档数据加上概要。最好写入第几天、角色能力如何、正在调教哪个角色等数据。

- BEGIN

- [BEGIN](../Reference/BEGIN.zh.md)通过调用各种系统命令来推进游戏。
- 调用BEGIN时，正在执行的函数会结束。即使是被CALL调用过来的，也不会回到原来的函数。

- BEGIN TRAIN开始调教。
- BEGIN AFTERTRAIN结束调教。
- BEGIN ABLUP调用能力提升画面。
- BEGIN TURNEND结束该回合。
- BEGIN SHOP调用SHOP。
