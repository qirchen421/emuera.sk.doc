# 变量的规格和一览  
结合EmueraEM+EE的规格补充内容  

## 角色编号系统说明

### 核心概念区分

Emuera中有两种不同的"角色编号"概念，理解它们的区别对于正确操作角色数据至关重要：

| 概念 | 标识符 | 日文原文 | 定义 | 特点 |
|------|--------|---------|------|------|
| **角色登记编号 (CharaID)** | `MASTER`/`TARGET`/`ASSI`/`PLAYER` | キャラ登録番号 | 当前游戏状态中动态分配的索引 | 从0开始连续，随角色增删而变化 |
| **角色注册编号 (NO)** | `NO` | キャラ番号 | CharaXX.CSV中定义的固定编号 | 静态不变，用于标识角色模板 |

### 详细说明

#### 角色登记编号 (CharaID)（动态索引）

**`MASTER`** `[VariableCode.MASTER]` — 主角的登记编号 (CharaID)，通常为 `0`

**`TARGET`** `[VariableCode.TARGET]` — 当前调教中角色的登记编号 (CharaID)

**`ASSI`** `[VariableCode.ASSI]` — 助手角色的登记编号 (CharaID)，无助手时为 `-1`

登记编号 (CharaID) 的特点：
- 游戏启动时，主角自动登记，登记编号 (CharaID) 为 `0`
- 通过 `ADDCHARA` 指令登记新角色时，分配下一个连续的编号
- 通过 `DELCHARA` 指令删除角色后，后续角色的登记编号 (CharaID) 会重新排列
- 始终从 `0` 开始连续分配（如：0, 1, 2, 3...）

#### 角色注册编号 (NO)（静态编号）

**`NO`** `[VariableCode.NO]` — 角色在 CSV 文件中定义的固定编号

角色注册编号 (NO) 的特点：
- 在 `CharaXX.CSV` 文件的第一列（编号列）中定义
- 不会随角色的添加/删除而改变
- 用于标识角色的模板定义
- `ADDCHARA` 指令使用此编号指定要添加的角色模板

#### 访问方式对比

```erb
; 通过登记编号 (CharaID) 访问（动态索引）
BASE:TARGET:0      ; 读取调教中角色的基础参数0
EX:MASTER:5        ; 读取主角的经验值5

; 通过角色注册编号 (NO) 访问（静态编号）
; 使用 GETCHARA 函数获取登记编号 (CharaID)
#DIM L_REG_NO
L_REG_NO = GETCHARA(5)      ; 获取角色注册编号 (NO) 为5的角色的登记编号 (CharaID)
BASE:L_REG_NO:0     ; 读取该角色的基础参数0

; RELATION 是特殊情况，第二参数是角色注册编号 (NO) 而非登记编号 (CharaID)
RELATION:TARGET:3   ; 调教中角色与角色注册编号 (NO) 为3的角色的相性
```

### 常用操作

```erb
; 遍历所有已登记角色
REPEAT CHARANUM
    ; COUNT 为当前角色的登记编号 (CharaID)（0 ~ CHARANUM-1）
    PRINTFORML 登记编号(CharaID)={COUNT}, 注册编号(NO)={NO:COUNT}
REND

; 查找指定角色注册编号 (NO) 的登记编号 (CharaID)
#DIM L_FIND
L_FIND = GETCHARA(10)   ; 查找角色注册编号 (NO) 为10的角色
IF L_FIND >= 0
    PRINTFORML 找到角色，登记编号(CharaID)={L_FIND}
ELSE
    PRINTL 角色不存在
ENDIF
```

---

## 常量(字面量)  
### 常量表示  
在Emuera中，除了八进制表示外，可以直接使用吉里吉里中可用的常量表示。  
例如以下各行都具有相同含义。  

	X = 32  
	X = 0b100000  
	X = 0x20  
	X = 1p5  

从上到下依次为普通`十进制表示`、`二进制`、`十六进制`、`1×2的5次方`。  
像`1p5`这样的表示在与位运算符结合使用、获取或设置各位时很方便。  
例如以下条件语句在`A`的第0位或第3位为1时为真。  

	IF (A & 1p0) || (A & 1p3)  

另外，使用`e`代替`p`可以表示`n×10的m次方`。  
例如`13e3`等于`13000`。  
以上都只是常量的表示，不能使用表达式。  
以下表示会出错。  

	X = 13e(A + 1)  

由于与eramaker的兼容性问题，没有采用`八进制表示`。  
`012`被解释为`12`而不是`10`。  

## 变量  
### 变量大小指定  
在Emuera中，可以在csv文件夹中放置名为`VariableSize.csv`的文件来指定现有变量的元素数。  
另外，通过将元素数指定为`-1`，可以禁止在ERB中使用该变量。  

在ERB中对被禁止设置的变量进行赋值或引用时会出错。当系统需要使用被禁止设置的变量时，赋值处理会被忽略，值始终被视为`-1`。  
（发生在`MONEY`或`NEXTCOM`被禁止时的情况）  
另外，当`COUNT`被设为禁止变量时，`REPEAT`也会不可用，并在运行时出错（EM+EE）  

### 局部变量  
#### LOCAL  
#### LOCALS  
**※此变量已**过时**，不推荐使用。请使用`#DIM`、`#DIMS`替代。**  
**详情请参考[用户定义的变量](user_defined_variables.zh.md)。**  
**对于新游戏开发，建议在`VariableSize.csv`中将`LOCAL`和`LOCALS`的元素数均设为`-1`以禁用，强制迁移到`#DIM`/`#DIMS`。**

局部变量（函数级变量）。  
`LOCAL`为整数型，`LOCALS`为字符串型。  
默认大小为`LOCAL`1000，`LOCALS`100。  
另外，可以通过`#LOCALSIZE <元素数>`和`#LOCALSSIZE <元素数>`  
对每个函数分别更改元素数。（但设置的值必须是大于0的整数）  
不会被保存。  

	@EVENTFIRST  
		LOCAL:10 = 123  
		CALL FUNC001  
		PRINTV LOCAL:10  
		WAIT  
	@FUNC001  
		LOCAL:10 = 567  
		RETURN  

上述代码的[`PRINTV`](../Reference/PRINT.zh.md)结果为`123`。  
在`@FUNC001`中修改了`LOCAL:10`，但不会影响`@EVENTFIRST`中的`LOCAL`。  
与多数语言的局部变量不同，函数调用时不会进行初始化。  

内部实现为创建`LOCAL@函数名`这样的变量。  
因此，事件函数等同名函数存在多个定义时，它们会共用同一组 LOCAL 变量。另外，递归调用时也会使用相同的变量。  
像`LOCAL@EVENTFIRST:10 = 567`这样访问其他函数的变量也是可以的，但不推荐（这是调试用功能）。  
另外，访问其他函数的变量时，如果被调用函数名包含运算符等特殊字符会出错  

#### `ARG`  
#### `ARGS`  
局部变量。  
`ARG`为整数型，`ARGS`为字符串型。  
默认大小为`ARG`1000，`ARGS`100，可通过`VariableSize.csv`更改。  
另外，会自动确保足够的元素数，以供函数参数定义部分正常使用。（不会少于`VariableSize.csv`中指定的数值）  

	@FUNC002, ARG:0, ARG:1, ARG,1100  
		LOCAL = ARG:0 * ARG:1 / 100  
		RETURN LOCAL  

这种情况下，`ARG`的元素数原本是`1000`，但在`@FUNC002`中`ARG`的元素数为0～1100共1101个。  
由于该变量设计用于函数参数传递，用于其他用途可能会降低可读性。  

#### （用户定义的私有变量）  
在特定函数中定义`#DIM`或`#DIMS`定义的变量是私有变量，可按局部变量处理。  
详情请参考[用户定义的变量](user_defined_variables.zh.md)。  

### 存档间共享的变量  
#### `GLOBAL`  
#### `GLOBALS`  
可以在不同存档数据间共享的变量。  
`GLOBAL`为整数，`GLOBALS`为字符串  
大小基本为`GLOBAL`1000，`GLOBALS`100，可通过`VariableSize.csv`更改。  
不与其它数据一同保存·加载。  
要保存全局变量，使用`SAVEGLOBAL`指令。  
执行`SAVEGLOBAL`时，`GLOBAL`和`GLOBALS`会被保存到`global.sav`。  
写入时如果已有`global.sav`，会覆盖  
通过`LOADGLOBAL`指令，可从`global.sav`读取`GLOBAL`和`GLOBALS`。  
建议在`@EVENTFIRST`和`@EVENTLOAD`时机执行`LOADGLOBAL`。  
通过`GLOBAL`、`GLOBALS`可以在不同存档数据间共享数据。  

#### （用户定义的全局变量）  
在ERH中定义`#DIM GLOBAL`或`#DIMS GLOBAL`定义的变量成为全局变量。  
另外，使用`#DIM SAVEDATA GLOBAL`可以成为可保存的全局变量。  
详情请参考[头文件（ERH）](ERH.zh.md)。  

### 角色变量  
#### `NICKNAME`  
#### `MASTERNAME`  
与`NAME`或`CALLNAME`相同的可保存字符串型变量。  
在`chara*.csv`中指定为`NICKNAME`、`MASTERNAME`或`昵称`、`主人的称呼`。  

#### `CSTR`  
可保存的字符串数组变量。  
`CFLAG`的字符串版本。  
在`chara*.csv`中指定为`CSTR`。  

#### `CUP`  
#### `CDOWN`  
#### `DOWNBASE`  
#### `TCVAR`  
数值型数组变量。  
分别设想作为`UP`、`DOWN`、`LOSEBASE`、`TFLAG`的角色变量版本使用。  
因此初始化时机和是否可保存也与这些变量相同。  
但是，`CUP`和`CDOWN`需要使用`CUPCHECK`指令代替[`UPCHECK`](../Reference/UPCHECK.zh.md)指令。  

#### `CDFLAG`  
数值型角色三维数组变量。  

	CDFLAG:MASTER:0:2  

等的第一参数为角色登记编号 (CharaID)，与传统角色变量相同，  
但需要第二和第三参数。  

#### （用户定义的角色变量）  
在ERH中定义`#DIM CHARADATA`或`#DIMS CHARADATA`定义的变量成为角色变量，可像`CFLAG`等一样自由处理。  
详情请参考[头文件（ERH）](ERH.zh.md)。  

### csv相关  
#### csv变量  
用于引用在各csv中定义的值的变量。  
使用方法例如`TALENTNAME`和`talent.csv`的关系相同。  
全部为不可赋值、不保存的一维数组变量。  
如果csv中未定义，返回0或空字符串。  

|变量名     |文件   |类型      |元素数|  
|:----------|:----------|:-------|:-----|
|ITEMPRICE  |item.csv   |整数型  |1000  |
|TRAINNAME  |train.csv  |字符串型|1000  |
|BASENAME   |base.csv   |字符串型|100   |
|EQUIPNAME  |equip.csv  |字符串型|100   |
|EQUIPNAME  |tequip.csv |字符串型|100   |
|STAINNAME  |stain.csv  |字符串型|1000  |
|EXNAME     |ex.csv     |字符串型|100   |
|SOURCENAME |source.csv |字符串型|100   |
|FLAGNAME   |flag.csv   |字符串型|10000 |
|TFLAGNAME  |tflag.csv  |字符串型|1000  |
|CFLAGNAME  |cflag.csv  |字符串型|1000  |
|TCVARNAME  |tcvar.csv  |字符串型|100   |
|STRNAME    |strname.csv|字符串型|20000 |
|TSTRNAME   |tstr.csv   |字符串型|100   |
|CSTRNAME   |cstr.csv   |字符串型|100   |
|SAVESTRNAME|savestr.csv|字符串型|100   |
|CDFLAGNAME1|cdflag1.csv|字符串型|1     |
|CDFLAGNAME2|cdflag2.csv|字符串型|1     |
|GLOBALNAME |global.csv |字符串型|100   |
|GLOBALSNAME|globals.csv|字符串型|100   |

请不要混淆`cstr.csv`等与`str.csv`的作用。  
`str.csv`是决定赋值给变量`STR`的值的文件，而`cstr.csv`是确定`CSTRNAME`的文件。  
确定`STRNAME`的文件是`strname.csv`。请注意`str.csv`和`strname.csv`的用法。  

#### `gamebase.csv`变量  
用于引用在`gamebase.csv`中定义的值的变量。  
全部为非数组、不可赋值、不保存的变量。  

|变量名               |关键字              |类型    |
|:--------------------|:-------------------|:-------|
|GAMEBASE_AUTHOR      |作者                |字符串型|
|GAMEBASE_INFO        |追加信息            |字符串型|
|GAMEBASE_YEAR        |制作年              |字符串型|
|GAMEBASE_TITLE       |标题                |字符串型|
|GAMEBASE_GAMECODE    |代码                |整数型  |
|GAMEBASE_VERSION     |版本                |整数型  |
|GAMEBASE_ALLOWVERSION|版本差异承认        |整数型  |
|GAMEBASE_DEFAULTCHARA|最初就在的角色      |整数型  |
|GAMEBASE_NOITEM      |无道具              |整数型  |

#### `WINDOW_TITLE`  
Emuera窗口标题栏显示的字符串。  
非数组字符串型变量。初始值为`gamebase.csv`中设置的`窗口标题`值。  
如果没有设置`窗口标题`，则根据`标题`和`版本`生成。  
如果连`标题`都没有设置，则为`Emuera`。  

#### 其他与csv相关的变量  
##### `MONEYLABEL`  
记录货币单位的变量。  
非数组字符串型变量，不可赋值、不保存变量。  
初始值为在[`_Replace.csv`](replace.zh.md)中设置的`货币单位`值。  
如果没有设置`货币单位`，则与eramaker相同为`$`。  

##### `DRAWLINESTR`  
记录执行[`DRAWLINE`](../Reference/DRAWLINE.zh.md)指令时显示的字符串的变量。  
非数组字符串型变量，不可赋值、不保存变量。  
初始值为重复在`_Replace.csv`中设置的`DRAWLINE字符`的值。  
因此并不直接包含`DRAWLINE字符`设置的字符串。  
如果没有设置`DRAWLINE字符`，则与eramaker相同，例如  
`------------------------------------------------------------------------------------------------------------`。  

### 保存加载相关  
#### `LASTLOAD_*`  
用于引用最后一次加载的数据信息的变量。  
可以引用但不能赋值。  
全部初始值为`-1`或空字符串。  
加载时更新，执行`RESETDATA`或菜单的"返回标题"时恢复初始值。  

##### `LASTLOAD_VERSION`  
最后加载的数据的版本（`gamebase.csv`中定义的值）  

##### `LASTLOAD_NO`  
最后加载的数据的编号（`save*.sav`的`*`对应的编号）  

##### `LASTLOAD_TEXT`  
文本（在[`PUTFORM`](../Reference/PUTFORM.zh.md)中添加的文本。`SAVEDATA_TEXT`）  

#### `SAVEDATA_TEXT`  
保存在存档数据中，在保存/加载画面显示的文本。  
也是加载后可通过`LASTLOAD_TEXT`引用的文本。  
可以引用也可以赋值。  
在`@SAVEINFO`被调用时，会赋值为表示当前时间的字符串，是可以用`PUTFORM`追加的字符串。  
在`@SAVEINFO`中直接对此字符串赋值可以自定义时间显示。  
使用`SAVEGAME`和`PUTFORM`（使用`SAVELOAD.ERB`时）时才有用。  

#### （用户定义的可保存全局变量）  
在ERH中定义`#DIM SAVEDATA`或`#DIMS SAVEDATA"`定义的变量成为可保存的全局变量。  
但是，使用`#DIMS SAVEDATA`定义可保存的多维全局变量时，选项[`以二进制格式保存存档数据`](config.md#_43)必须启用。  
详情请参考[头文件（ERH）](ERH.zh.md)。  

### 多维数组变量  
#### `DITEMTYPE`  
#### `DA ～ DE`  
**※此变量已废弃。请考虑使用#DIM、#DIMS并根据用途命名。**  
**详情请参考[用户定义的变量](user_defined_variables.zh.md)。**  

固定长度的整数型二维数组。  
像`DITEMTYPE:1:2`这样调用。参数不能省略。  
eramaker的二维数组第一参数指定角色登记编号 (CharaID)，因此数组大小因`CHARANUM`而异。  
`DITEMTYPE`等二维数组保持`VariableSize.csv`中指定的大小不变。  
作为`VARSIZE`指令的目标时，元素数分别赋值给`RESULT:0`和`RESULT:1`。  
如果在`VariableSize.csv`中设置`DITEMTYPE,100,200`，则可使用`DITEMTYPE:99:199`，`VARSIZE`指令中`RESULT:0`和`RESULT:1`会被赋值为`100`和`200`。  

#### `TA, TB`  
**※此变量已废弃。请考虑使用#DIM、#DIMS并根据用途命名。**  
**详情请参考[用户定义的变量](user_defined_variables.zh.md)。**  

固定长度的整数型三维数组。  
像`TA:1:2:3`这样调用。参数不能省略。  
大小标准为`100×100×100`。即可以使用`TA:99:99:99`。  
可在`VariableSize.csv`中更改大小，但不能指定总计超过100万的大小。  
作为`VARSIZE`指令的目标时，各元素数分别赋值给`RESULT:0`、`RESULT:1`和`RESULT:2`。  

#### （用户定义的多维数组变量）  
从ver1.808开始，可以通过定义#DIM或#DIMS定义的变量成为多维数组。  
详情请参考[用户定义的变量](user_defined_variables.zh.md)。  

### 调试变量  
调试变量是提供调试信息的变量。  
调试变量只在以调试模式启动时返回有意义的值。  
在通常模式启动时返回`空字符串`或`0`。  

全部名字前后都有两个下划线`_`。  

#### `__FILE__`  
一维只读变量。  
返回当前执行脚本的文件名。  
文件名与错误信息等相同，包含文件夹结构和扩展名。  

在系统输入等待期间从调试命令或变量监视引用时等，  
当前没有执行脚本时返回空字符串。  

#### `__LINE__`  
一维只读变量。  
返回当前执行脚本的行号。  
行号与错误信息等相同，从1开始的数字。  

当前没有执行脚本时返回-1。  

#### `__FUNCTION__`  
一维只读变量。  
返回当前执行的函数名。  
函数名不包含`@`和参数列表。  

当前没有执行脚本时返回空字符串。  

### 其他  
#### `TSTR`  
字符串型一维数组。一维数组，不保存。  
与`TFLAG`相同时机初始化。  

#### `RANDDATA`  
记录随机数状态的数组。数值型一维数组，可赋值、可保存。  
通过`DUMPRAND`记录，通过`INITRAND`读取。  

#### `LINECOUNT`  
返回迄今为止`PRINT`的行数的变量。  
`LINECOUNT`从启动后开始，每当换行（不包括因窗口宽度导致的换行）时+1，`CLEARLINE`时减少相应的数量。  
不会因日志缓冲区（标准5000）溢出导致的删除而变动。  
非数组数值型变量，赋值·保存均不可能。  
另外，计数方式与`CLEARLINE`相同。  

#### `ISTIMEOUT`  
以下，摘自私人修改版1809+v2附带的readme  

	○新增检查TINPUT系列是否超时的变量ISTIMEOUT  
	　TINPUT系列被调用时初始化为0，超时时变为1。  

截至ver1815，此变量可能无法使用。  

#### `__INT_MAX__`  
#### `__INT_MIN__`  
记录数值型变量定义域最大值、最小值的常量的非数组数值型变量，赋值·保存均不可能。  
不是调试变量，普通启动时也可以使用。  

#### （用户定义的全局变量）  
在ERH中定义`#DIM`或`#DIMS`定义的变量成为全局变量，可像一字符变量（`A`等）一样自由处理。  
详情请参考[头文件（ERH）](ERH.zh.md)。  

#### （用户定义的常量）  
在ERH中及特定函数中，定义`#DIM`或`#DIMS`定义的变量成为一维数组常量，作为不可赋值的变量处理。  
详情请参考[用户定义的变量](ERH.zh.md)。  

#### （用户定义的引用型变量）  
在特定函数中定义`#DIM REF`或`#DIMS REF`定义的变量成为引用型变量。  
详情请参考[用户定义的变量](ERH.zh.md)。  

### 与maker的规格差异  
#### `NAME`  
#### `CALLNAME`  
在eramaker中不可赋值。  
在Emuera中可以赋值。  

#### `RAND`  
#### `CHARANUM`  
在eramaker中可以赋值并保存·加载，但没有使用赋值的方法。  
在Emuera中禁止赋值。  

### 临时规格表  
#### eramaker中也存在的变量  
|变量名     |类型    |数组          |赋值|保存|禁止|初始值|初始化时机|备注|
|:----------|:-----|:-------------|:---|:-----|:---|:-----|:---------------------|:---|
|RESULT     |整数  |一维        |○  |○    |×  |-|-|-|
|RESULTS    |字符串|一维        |○  |×    |×  |-|-|-|
|A～Z       |整数  |一维        |○  |○    |○  |-|-|-|
|COUNT      |整数  |一维        |○  |○    |○  |-|-|`COUNT:0`在`REPEAT`中作为计数器使用  禁用时`REPEAT`不可用|
|DAY        |整数  |一维        |○  |○    |○  |-|-|-|
|TIME       |整数  |一维        |○  |○    |○  |-|-|-|
|MONEY      |整数  |一维        |○  |○    |○  |-|-|-|
|MASTER     |整数  |一维        |○  |○    |○  |:0 = 0|-|主角角色的**登记编号 (CharaID)** `[VariableCode.MASTER]`，固定为0|
|TARGET     |整数  |一维        |○  |○    |×  |:0 = 1|-|调教中角色的**登记编号 (CharaID)** `[VariableCode.TARGET]`，当前被调教对象|
|ASSI       |整数  |一维        |○  |○    |○  |:0 = -1|-|助手角色的**登记编号 (CharaID)** `[VariableCode.ASSI]`，-1表示无助手|
|PLAYER     |整数  |一维        |○  |○    |○  |:0 = 0|-|当前执行调教的角色的**登记编号 (CharaID)** `[VariableCode.PLAYER]`，等于MASTER或ASSI|
|ASSIPLAY   |整数  |一维        |○  |○    |○  |:0 = 0|BEGIN TRAIN|-|
|SELECTCOM  |整数  |一维        |○  |○    |×  |-|-|-|
|PREVCOM    |整数  |一维        |○  |○    |○  |:0 = -1|BEGIN TRAIN|-|
|NEXTCOM    |整数  |一维        |○  |○    |○  |:0 = -1|BEGIN TRAIN|-|
|LOSEBASE   |整数  |一维        |○  |○    |○  |全部0|`@SHOW_USERCOM`结束时|可通过`BASENAME`指定元素|
|UP         |整数  |一维        |○  |○    |○  |全部0|`@SHOW_USERCOM`结束时  `UPCHECK`时|可通过`PALAMNAME`指定元素|
|DOWN       |整数  |一维        |○  |○    |○  |全部0|`@SHOW_USERCOM`结束时  `UPCHECK`时|可通过`PALAMNAME`指定元素|
|PALAMLV    |整数  |一维        |○  |○    |×  |`_replace.csv`  `PALAMLV初始值`|-|-|
|EXPLV      |整数  |一维        |○  |○    |×  |`_replace.csv`  `EXPLV初始值`|-|-|
|EJAC       |整数  |一维        |○  |○    |○  |:0 = 10000|-|-|
|FLAG       |整数  |一维        |○  |○    |○  |-|-|可通过`FLAGNAME`指定元素|
|TFLAG      |整数  |一维        |○  |○    |○  |全部0|BEGIN TRAIN|可通过`TFLAGNAME`指定元素|
|ITEM       |整数  |一维        |○  |○    |○  |-|-|可通过`ITEMNAME`指定元素|
|ITEMSALES  |整数  |一维        |○  |○    |○  |-|-|可通过`ITEMNAME`指定元素|
|BOUGHT     |整数  |一维        |○  |○    |○  |-|-|-|
|PBAND      |整数  |一维        |○  |○    |○  |:0 = `_replace.csv``  `PBAND初始值`|-|-|
|CHARANUM   |整数  |无维        |×  |×    |×  |-|-|无论指定哪个元素都返回角色注册数。|
|RAND       |整数  |无维        |×  |×    |×  |-|-|`RAND:X`的`X`为`0`或负值时出错  其他情况下返回0～(元素数-1)的随机值。|
|STR        |字符串|一维        |○  |×    |○  |`STR.CSV`|-|可通过`STRNAME`指定元素|
|SAVESTR    |字符串|一维        |○  |○    |○  |-|-|可通过`SAVESTRNAME`指定元素|
|NO         |数值  |角色＋无维|○  |○    |×  |-|-|角色注册编号 (NO) `[VariableCode.NO]`，在`CHARA**.CSV`中通过`编号,**`指定的**静态固定编号**，与动态分配的登记编号 (CharaID) 不同|
|ISASSI     |数值  |角色＋无维|○  |○    |×  |-|-|在`CHARA**.CSV`中通过`助手,1`指定可从初始状态作为助手处理|
|NAME       |字符串|角色＋无维|○  |○    |×  |-|-|在`CHARA**.CSV`中通过`姓名,**`指定|
|CALLNAME   |字符串|角色＋无维|○  |○    |×  |-|-|在`CHARA**.CSV`中通过`称呼,**`指定|
|BASE       |数值  |角色＋一维|○  |○    |○  |-|-|`ADDCHARA`时所有元素都变为与`MAXBASE`相同值  可通过`BASENAME`指定元素|
|MAXBASE    |数值  |角色＋一维|○  |○    |○  ||-|在`CHARA**.CSV`中通过`基础,*,**`指定  可通过`BASENAME`指定元素|
|ABL        |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`能力,*,**`指定  可通过`ABLNAME`指定元素|
|TALENT     |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`素质,*`指定  可通过`素质,*,**`指定第三个值  可通过TALENTNAME指定元素|
|EXP        |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`经验,*,**`指定  可通过`EXPNAME`指定元素|
|MARK       |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`刻印,*,**`指定  可通过`MARKNAME`指定元素|
|RELATION   |数值  |角色＋一维|○  |○    |○  |`replace.csv`  `RELATION初始值`|-|在`CHARA**.CSV`中通过`相性,*,**`指定  可通过`NAME`或`CALLNAME`指定元素|
|JUEL       |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`珠,*,**`指定  可通过`PALAMNAME`指定元素|
|CFLAG      |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`标志,*,**`指定  可通过`CFLAGNAME`指定元素|
|EQUIP      |数值  |角色＋一维|○  |○    |○  |-|-|在`CHARA**.CSV`中通过`装备物,*,**`指定  可通过`EQUIPNAME`指定元素|
|TEQUIP     |数值  |角色＋一维|○  |○    |○  |全部0|BEGIN TRAIN|可通过`TEQUIPNAME`指定元素|
|PALAM      |数值  |角色＋一维|○  |○    |○  |全部0|BEGIN TRAIN|可通过`PALAMNAME`指定元素|
|STAIN      |数值  |角色＋一维|○  |○    |×  |`_replace.csv`  `污渍初始值`|BEGIN TRAIN|可通过`STAINNAME`指定元素|
|EX         |数值  |角色＋一维|○  |○    |○  |全部0|BEGIN TRAIN|可通过`EXNAME`指定元素|
|SOURCE     |数值  |角色＋一维|○  |○    |○  |全部0|BEGIN TRAIN  `@SOURCE_CHECK`结束时|可通过`SOURCENAME`指定元素|
|NOWEX      |数值  |角色＋一维|○  |○    |○  |全部0|`@EVENTCOM`前|`@USERCOM`前不更新  可通过`EXNAME`指定元素|
|GOTJUEL    |数值  |角色＋一维|○  |○    |○  |全部0|BEGIN TRAIN|可通过`PALAMNAME`指定元素|
|ABLNAME    |字符串|一维        |×  |×    |○  |`ABL.CSV`|-|-|
|TALENTNAME |字符串|一维        |×  |×    |○  |`TALENT.CSV`|-|-|
|EXPNAME    |字符串|一维        |×  |×    |○  |`EXP.CSV`|-|-|
|MARKNAME   |字符串|一维        |×  |×    |○  |`MARK.CSV`|-|-|
|PALAMNAME  |字符串|一维        |×  |×    |○  |`PALAM.CSV`|-|-|
|ITEMNAME   |字符串|一维        |×  |×    |○  |`ITEM.CSV`|-|-|
|NOITEM     |整数  |一维        |○  |○    |○  |:0 = gamebase.csv  "无道具"|-|可指定0和1以外的值|

<!--下划线部分是eramaker和Emuera规格不同的部分-->

#### Emuera专用变量
<!--校对累了，推迟-->
|变量名|类型|数组|赋值|保存|禁止|初始值|初始化时机|备注|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|LOCAL|整数|一维|○  |×  |○  |-|-|#LOCALSIZE根据函数改变元素数 **⚠过时，新游戏建议VariableSize.csv设为-1禁用**|
|LOCALS|字符串|一维|○  |×  |○  |-|-|#LOCALSSIZE根据函数改变元素数 **⚠过时，新游戏建议VariableSize.csv设为-1禁用**|
|ARG|整数|一维|○  |×  |○  |任意|函数被调用时※|※仅在作为参数设置时  每个函数确保参数定义的元素数|
|ARGS|字符串|一维|○  |×  |○  |任意|函数被调用时※|※仅在作为参数设置时  每个函数确保参数定义的元素数|
|(Private)|任意|任意|任意|×  |×  |任意|游戏开始  函数被调用时※|※仅在作为参数设置时  在函数中用#DIM或#DIMS定义|
|(Refer)|任意|任意|※|※|×  |-|-|※依赖引用目标  在函数中的"#DIM REF"或"#DIMS REF"定义|
|(Wide_area)|任意|任意|任意|任意|×  |任意|游戏开始|在ERH中用#DIM或#DIMS定义|
|GLOBAL|整数|一维|○  |※|×  |-|-|※通过SAVEGLOBAL保存、LOADGLOBAL加载  可通过GLOBALNAME指定元素|
|GLOBALS|字符串|一维|○  |※|×  |-|-|※通过SAVEGLOBAL保存、LOADGLOBAL加载  可通过GLOBALSNAME指定元素|
|LINECOUNT|整数|无维|×  |×  |×  |-|-|-|
|ISTIMEOUT|整数|无维|×|×|×|0|TINPUT系列指令执行时|TINPUT系列指令超时时赋值为1|
|`__INT_MAX__`|整数|无维|×|×|×|9223372036854775807|-|-|
|`__INT_MIN__`|整数|无维|×|×|×|-9223372036854775808|-|-|
|RANDDATA|整数|一维|○|○|×|-|-|-|
|TSTR|字符串|一维|○|×|○|全部空字符串|BEGIN TRAIN|可通过TSTRNAME指定元素|
|DA|整数|二维|○|○|○|-|-|-|
|DB|整数|二维|○|○|○|-|-|-|
|DC|整数|二维|○|○|○|-|-|-|
|DD|整数|二维|○|○|○|-|-|-|
|DE|整数|二维|○|○|○|-|-|-|
|DITEMTYPE|整数|二维|○|○|○|-|-|-|
|TA|整数|三维|○|○|○|-|-|-|
|TB|整数|三维|○|○|○|-|-|-|
|NICKNAME|字符串|角色＋无维|○|○|×|-|-|在CHARA**.CSV中通过"昵称,**"指定|
|MASTERNAME|字符串|角色＋无维|○|○|×|-|-|在CHARA**.CSV中通过"主人的称呼,**"指定|
|DOWNBASE|整数|角色＋一维|○|○|○|全部0|@SHOW_USERCOM结束时|可通过BASENAME指定元素|
|CUP|整数|角色＋一维|○|○|○|全部0|@SHOW_USERCOM结束时  UPCHECK时|可通过PALAMNAME指定元素|
|CDOWN|整数|角色＋一维|○|○|○|全部0|@SHOW_USERCOM结束时  UPCHECK时|可通过PALAMNAME指定元素|
|TCVAR|整数|角色＋一维|○|○|○|全部0|BEGIN TRAIN|可通过TCVARNAME指定元素|
|CSTR|字符串|角色＋一维|○|○|○|-|-|在CHARA**.CSV中通过"CSTR,*,**"指定|  可通过CSTRNAME指定元素|
|CDFLAG|整数|角色＋二维|○|○|○|-|-|可通过CFDLAGNAME1和CDFLAGNAME2指定元素  注意元素数的初始设置值为1･1|
|ITEMPRICE|整数|一维|×|×|○|item.csv|-|可通过ITEMNAME指定元素|
|TRAINNAME|字符串|一维|×|×|○|train.csv|-|-|
|BASENAME|字符串|一维|×|×|○|base.csv|-|-|
|EQUIPNAME|字符串|一维|×|×|○|equip.csv|-|-|
|TEQUIPNAME|字符串|一维|×|×|○|tequip.csv|-|-|
|STAINNAME|字符串|一维|×|×|○|stain.csv|-|-|
|EXNAME|字符串|一维|×|×|○|ex.csv|-|-|
|SOURCENAME|字符串|一维|×|×|○|source.csv|-|-|
|FLAGNAME|字符串|一维|×|×|○|flag.csv|-|-|
|TFLAGNAME|字符串|一维|×|×|○|tflag.csv|-|-|
|CFLAGNAME|字符串|一维|×|×|○|cflag.csv|-|-|
|TCVARNAME|字符串|一维|×|×|○|tcvar.csv|-|-|
|STRNAME|字符串|一维|×|×|○|strname.csv|-|在str.csv中指定的是STR的内容，不是元素名|
|TSTRNAME|字符串|一维|×|×|○|tstr.csv|-|-|
|CSTRNAME|字符串|一维|×|×|○|cstr.csv|-|-|
|SAVESTRNAME|字符串|一维|×|×|○|savestr.csv|-|-|
|CDFLAGNAME1|字符串|一维|×|×|○|cdflag1.csv|-|-|
|CDFLAGNAME2|字符串|一维|×|×|○|cdflag2.csv|-|-|
|GLOBALNAME|字符串|一维|×|×|○|global.csv|-|-|
|GLOBALSNAME|字符串|一维|×|×|○|globals.csv|-|-|
|GAMEBASE_AUTHOR|字符串|无维|×|×|×|gamebase.csv  "作者"|-|-|
|GAMEBASE_INFO|字符串|无维|×|×|×|gamebase.csv  "追加信息"|-|-|
|GAMEBASE_YEAR|字符串|无维|×|×|×|gamebase.csv  "制作年"|-|-|
|GAMEBASE_TITLE|字符串|无维|×|×|×|gamebase.csv  "标题"|-|-|
|GAMEBASE_GAMECODE|整数|无维|×|×|×|gamebase.csv  "代码"|-|-|
|GAMEBASE_VERSION|整数|无维|×|×|×|gamebase.csv  "版本"|-|-|
|GAMEBASE_ALLOWVERSION|整数|无维|×|×|×|gamebase.csv  "版本差异承认"|-|-|
|GAMEBASE_DEFAULTCHARA|整数|无维|×|×|×|gamebase.csv  "最初就在的角色"|-|-|
|GAMEBASE_NOITEM|整数|无维|×|×|×|gamebase.csv  "无道具"|-|-|
|WINDOW_TITLE|字符串|无维|○|×|×|gamebase.csv  "窗口标题"※|-|※没有时从"标题"和"版本"生成  没有"标题"时为"Emuera"|
|MONEYLABEL|字符串|无维|×|×|×|_replace.csv  "货币单位"※|-|※没有时为"$"|
|DRAWLINESTR|字符串|无维|×|×|×|_replace.csv  "DRAWLINE字符"※|-|※没有时为"-"的重复|
|LASTLOAD_VERSION|整数|无维|×|×|×|-1|游戏开始  RESETDATA时|加载时值更新|
|LASTLOAD_NO|整数|无维|×|×|×|-1|游戏开始  RESETDATA时|加载时值更新|
|LASTLOAD_TEXT|字符串|无维|×|×|×|空字符串|游戏开始  RESETDATA时|加载时值更新|
|SAVEDATA_TEXT|字符串|无维|○|※|×|※※|@SAVEINFO开始时|※作为存档数据标题保存  ※※表示当前时间的字符串|