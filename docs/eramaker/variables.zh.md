# eramaker 的变量列表

Emuera 中变量的上限可以通过 VariableSize.csv 进行修改。

## 基本变量

### 通用变量

!!! note "A-Z"
	- A 到 Z，共 26 个单字母变量。
	- 可作为临时数据容器自由使用。但由于其值可能在任何地方被修改，不适合长时间存储数据。

!!! note "COUNT"
	- 使用 [REPEAT](../Reference/REPEAT.md) 命令时，记录重复次数的变量。
	- 为避免误操作，建议不要在 REPEAT～REND 内部修改 COUNT 的值。

!!! note "RESULT"
	- 用于记录各种结果的变量。
	- 由于其值可能在任何地方被修改，除即时使用外，建议将数据转移到其他变量中处理。

!!! note "RESULTS（字符串变量）"
	- 用于记录各种结果的字符串变量。
	- 由于其值可能在任何地方被修改，除即时使用外，建议将数据转移到其他变量中处理。

### 基础信息变量

!!! note "DAY"
	- 记录日期。单位未固定，可自由处理。

!!! note "TIME"
	- 记录时刻。单位未固定，可自由处理。

!!! note "MONEY"
	- 记录金钱。商店购物时程序会引用此变量，因此除获得或失去金钱外，请勿随意修改。

### 調教基礎情報変数

!!! note "MASTER"
	- 指向主角角色的注册编号 `[VariableCode.MASTER]`。注意这可能与 CharaXX.CSV 中指定的角色编号不同。通常为 0。
!!! note "TARGET"
	- 指向调教中角色的注册编号 `[VariableCode.TARGET]`。注意这可能与 CharaXX.CSV 中指定的角色编号不同。
!!! note "ASSI"
	- 指向助手角色的注册编号 `[VariableCode.ASSI]`。注意这可能与 CharaXX.CSV 中指定的角色编号不同。
!!! note "PLAYER"
	- 指向正在进行调教的角色的注册编号 `[VariableCode.PLAYER]`。通常应与 MASTER 或 ASSI 一致。注意这可能与 CharaXX.CSV 中指定的角色编号不同。
!!! note "CHARANUM"
	- 当前已注册的角色数量 `[VariableCode.CHARANUM]`。包含主角。此变量用户无法修改。

!!! note "ASSIPLAY"
	- 表示助手是否正在进行调教。1 表示助手正在调教，0 表示不是。

!!! note "SELECTCOM"
	- 表示所选命令。包含 TRAIN.CSV 中注册的命令编号。

!!! note "PREVCOM"
	- 表示上一次选择的命令。用于处理连续执行相同命令时的惩罚等。

### 调教变量

!!! note "LOSEBASE"
	- 表示调教命令导致基础参数减少的量。通常 LOSEBASE:0 为体力消耗，LOSEBASE:1 为气力消耗。

!!! note "UP"
	- 表示调教命令使调教中参数上升的量。UP:A 中的 A 为 PALAM.CSV 中指定的参数编号。

!!! note "DOWN"
	- 表示调教命令使调教中参数下降的量。DOWN:A 中的 A 为 PALAM.CSV 中指定的参数编号。

!!! note "PALAMLV"
	- 调教中参数等级划分的边界值。当调教中参数超过此边界值时，调教结束后获得的宝石数量会大幅增加。

!!! note "EXPLV"
	- 经验等级划分的边界值。当经验超过此边界值时，调教效果可能会提升（特别是 V 经验和 A 经验）。

!!! note "EJAC"
	- 射精检查时使用的临时变量。为提高可读性而设为独立变量，但实际上只是一个普通的数据容器。

### 标志

!!! note "FLAG"
	- 记录游戏的各种状态。示例游戏中，FLAG:0 用于判断调教中的角色是否休息过。此外还常用于判断事件是否发生等。

!!! note "TFLAG"
	- 记录游戏的各种状态。示例游戏中用于记录如何射精、是否执行过侍奉系调教等。可以理解为 Temporary Flag（临时标志）或 Training Flag（调教标志）。总之，是比 FLAG 更临时用途的标志。

### キャラデータ

角色数据大多为二维数组，可通过 EXP:1:2 方式访问（查看第 1 个角色的第 2 个经验值）。  
但也可以写成 EXP:0，这种情况下会被解释为 EXP:TARGET:0。也就是说，访问调教中角色的数据时可以省略 TARGET:。

!!! note "NO"
	- 角色编号 `[VariableCode.NO]`（CSV中定义的固定编号）。不是二维数组，需使用 NO:TARGET 或 NO:ASSI 方式访问。

!!! note "BASE"
	- 角色的基础参数。示例游戏中，BASE:0 表示体力，BASE:1 表示气力，BASE:2 表示射精槽。

!!! note "MAXBASE"
	- 角色基础参数的最大值。

!!! note "ABL"
	- 角色的能力。通过 ABL.CSV 中注册的能力编号访问。

!!! note "TALENT"
	- 角色的素质。通过 TALENT.CSV 中注册的素质编号访问。

!!! note "EXP"
	- 角色的经验。通过 EXP.CSV 中注册的经验编号访问。

!!! note "MARK"
	- 角色的刻印。通过 MARK.CSV 中注册的刻印编号访问。

!!! note "RELATION"
	- 角色的相性 `[VariableCode.RELATION]`。RELATION:TARGET:3 表示调教中角色与角色编号 3 的角色之间的相性。注意这不是指角色注册编号为 3 的角色的相性（索引是角色编号，不是注册编号）。

!!! note "JUEL"
	- 角色持有的宝石。通过 PALAM.CSV 中注册的参数编号访问。

!!! note "CFLAG"
	- 每个角色的标志。可为每个角色记录各种数据。示例游戏中，CFLAG:0 为 1 的角色是 SP 角色。

!!! note "ISASSI"
	- 表示是否为助手。0 表示不是助手，1 表示是助手。不是二维数组，需使用 ISASSI:TARGET 或 ISASSI:ASSI 方式访问。

!!! note "NAME"
	- 角色的名称。不是二维数组，需使用 NAME:TARGET 或 NAME:ASSI 方式访问。

!!! note "CALLNAME"
	- 角色的称呼。不是二维数组，需使用 CALLNAME:TARGET 或 CALLNAME:ASSI 方式访问。

!!! note "TEQUIP"
	- 角色装备的物品。用于调教中插入震动棒等情况，也可用于角色强化物品等。示例游戏中也用于判断是否使用过春药。

!!! note "PALAM"
	- 角色的调教中参数。通过 PALAM.CSV 中注册的参数编号访问。

!!! note "STAIN"
	- 调教产生的「污秽」。口交射精或肛交等行为会改变其值。示例游戏中，STAIN:0 表示口部，STAIN:1 表示手部，STAIN:2 表示阴茎，STAIN:3 表示阴道，STAIN:4 表示肛门的污秽。污秽表示的详细说明请参考此处。

!!! note "EX"
	- 本次调教期间达到高潮的次数。示例游戏中，EX:0 表示 C 高潮，EX:1 表示 V 高潮，EX:2 表示 A 高潮。

!!! note "SOURCE"
	- 执行此命令产生的调教源。用于内部处理。查看 COMxx.ERB 和 SOURCE.ERB 可以了解从调教源到调教参数上升的流程。

!!! note "NOWEX"
	- 本次命令期间达到高潮的次数。示例游戏中，NOWEX:0 表示 C 高潮，NOWEX:1 表示 V 高潮，NOWEX:2 表示 A 高潮。

!!! note "GOTJUEL"
	- 完成本次调教获得的宝石。通过 PALAM.CSV 中注册的参数编号访问。

### 物品数据

!!! note "ITEM"
	- 持有的物品数量。通过 ITEM.CSV 中注册的物品编号访问。

!!! note "ITEMSALES"
	- 表示该物品是否在商店出售。1 表示出售，0 表示不出售。通过 ITEM.CSV 中注册的物品编号访问。

!!! note "BOUGHT"
	- 表示当前购买的物品。例如在 @EVENTBUY 中将刚购买的物品从商店移除时使用。

!!! note "NOITEM"
	- 在 GAMEBASE.CSV 中指定无物品时为 1。这种情况下，命令执行判定时会忽略物品的有无。

!!! note "PBAND"
	- 阴茎环的物品编号。初始值为 4。由于阴茎环经常与调教的执行判定相关，因此作为独立变量处理。

### 名称数据

!!! note "ABLNAME"
	- 能力的名称。通过 ABL.CSV 中注册的参数编号访问。

!!! note "TALENTNAME"
	- 素质的名称。通过 TALENT.CSV 中注册的参数编号访问。

!!! note "EXPNAME"
	- 经验的名称。通过 EXP.CSV 中注册的参数编号访问。

!!! note "MARKNAME"
	- 刻印的名称。通过 MARK.CSV 中注册的参数编号访问。

!!! note "PALAMNAME"
	- 调教中参数的名称。通过 PALAM.CSV 中注册的参数编号访问。

!!! note "ITEMNAME"
	- 物品的名称。通过 ITEM.CSV 中注册的参数编号访问。

### 字符串数据

!!! note "STR"
	- 字符串数据。STR.CSV 的数据存储在此处。请注意，修改此变量不会保存到存档中。

!!! note "SAVESTR"
	- 字符串数据。此处记录的数据会在保存时保存到存档。需要长期使用的字符串变量应存储在此处。

### 随机数

!!! note "RAND（伪数组）"
	- 这是一个特殊变量，返回随机数。例如 `PRINTV RAND:10` 会随机显示 0 到 9 的数字。
	- 请记住，RAND:A 返回的是 0 到 A-1 之间的整数。

## 角色的注册编号

### 角色的注册编号与角色编号的区别

> 注意：
> - **角色编号** `[VariableCode.NO]`：CharaXX.CSV 中定义的固定编号，与实体无关
> - **注册编号** `[VariableCode.TARGET/VariableCode.MASTER/VariableCode.ASSI]`：当前游戏状态中动态分配的编号，0 表示第一个角色

!!! note "没有实体的角色数据"
	- CharaXX.CSV 中指定了「编号」。此处指定的编号是「角色编号」。
	- 但是，CharaXX.CSV 中的角色在调教开始时并非都具有实体。只有通过 ADDCHARA 命令调用后，才会获得实体。
!!! note "注册角色"
	- 游戏开始时，只有主角具有实体。主角的「角色注册编号」为 0。
	- 假设通过 ADDCHARA 注册了「角色编号」为 5 的角色。该角色的「角色编号」是 5，但「角色注册编号」是主角之后的下一个编号，即 1。如果再添加一个「角色编号」为 7 的角色，该角色的注册编号为 2。
!!! note "删除角色"
	- 通过 DELCHARA 命令删除「角色注册编号」为 1 的角色。那么后来添加的「角色编号」为 7 的角色的「注册编号」会变为 1。
	- 请务必记住，当前已注册的角色会从 0 开始连续分配「角色注册编号」。

## 关于污秽

### 污秽数据的特殊性

!!! note "污秽的种类"
	- 污秽数据由 STAIN 管理。STAIN:TARGET:0 表示调教中角色口部的污秽。
	- 但是，这里考虑的污秽种类有多种。口交会产生精液污秽，女同调教中舔阴会产生爱液污秽。
	- 示例游戏中假设了「阴道（爱液）」「阴茎」「精液」「肛门」四种污秽。

!!! note "污秽数据的表示方法"
	- 各种污秽被分配了 1、2、4、8 等数值。也就是说，如果有肛门和精液的污秽，就是 4+8=12；如果有爱液和精液的污秽，就是 1+4=5。
	- 这样表示的话，一个变量就可以很好地处理四种污秽。但是，「口部添加精液污秽」「判定口部是否有爱液污秽」等操作无法通过传统的 + - * / % 运算符很好地实现。

!!! note "污秽数据的判定方法"
	- 因此使用 & 和 | 符号。它们类似于 &&（且）和 ||（或），但单独使用。
	- 例如，假设 STAIN:TARGET:0 为 12。此时执行 STAIN:TARGET:0 & 4 会只提取 4 的部分。即 STAIN:TARGET:0 & 4 == 4。
	- 再假设 STAIN:TARGET:0 为 1+2+8=11。此时执行 STAIN:TARGET:0 & 4 会只提取 4 的部分。即 STAIN:TARGET:0 & 4 == 0。
	- 这样就可以轻松知道存在哪些污秽。

!!! note "污秽数据的添加方法"
	- 假设 STAIN:TARGET:0 为 1+4=5。此时执行 STAIN:TARGET:0 | 2 会添加 2 的部分。即 STAIN:TARGET:0 | 2 == 7。
	- 再假设 STAIN:TARGET:0 为 1+2+4=7。此时执行 STAIN:TARGET:0 | 2 会添加 2 的部分。但由于 2 的部分已经包含在内，所以没有变化。即 STAIN:TARGET:0 | 2 == 7。
	- 也可以写成 STAIN:TARGET:0 |= 2。
	- 这样就可以在不关心是否已包含该污秽的情况下进行污秽添加处理。
