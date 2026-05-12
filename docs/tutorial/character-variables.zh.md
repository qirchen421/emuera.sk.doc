# 角色变量

!!! info "本节对应手册"

    - [变量规格与一览](../Emuera/variables.zh.md) — 所有变量的完整规格
    - [用户定义变量](../Emuera/user_defined_variables.zh.md) — #DIM 声明规格
    - [头文件（ERH）](../Emuera/ERH.zh.md) — 全局变量声明

---

## 概述

era 游戏的核心是**角色**——每个角色有自己的属性、状态、能力。ERABASIC 通过**角色变量**系统来管理这些数据。

角色变量与普通变量的关键区别：角色变量的第一维索引是**角色注册编号**，每个角色拥有独立的一组数据。

!!! note "eramaker 兼容性"
    基础信息变量（`NAME`/`CALLNAME`/`NO`）、数值型角色变量（`BASE`/`ABL`/`TALENT`/`EXP`/`MARK`/`CFLAG`/`PALAM`/`SOURCE`）、角色管理指令（`ADDCHARA`/`DELCHARA`）是 eramaker 就存在的功能。`CSTR`/`CDFLAG`/`TCVAR`、CSV 读取函数（`CSVABL` 等）、`VariableSize.csv`、自定义角色变量（`#DIM CHARADATA`）是 Emuera 的扩展功能。

```erb
; 普通变量：一维索引
FLAG:10 = 1

; 角色变量：第一维是角色注册编号
CFLAG:TARGET:10 = 1    ; 当前调教角色的第10号 CFLAG
CFLAG:MASTER:10 = 1    ; 主角的第10号 CFLAG
```

---

## 角色编号系统

理解角色变量的前提是理解两种"角色编号"：

### 注册编号 vs 角色编号

| 概念 | 标识符 | 说明 | 特点 |
|------|--------|------|------|
| **注册编号** | `MASTER`/`TARGET`/`ASSI`/`PLAYER` | 引擎动态分配的索引 | 从 0 开始连续，随增删变化 |
| **角色编号** | `NO` | CSV 中定义的固定编号 | 静态不变，标识角色模板 |

```erb
; 注册编号是动态的
; 游戏启动时主角自动注册，编号为 0
; ADDCHARA 分配下一个连续编号
; DELCHARA 后编号重新排列

; 角色编号是静态的
; 在 CharaXX.csv 的第一列定义
; 不会随添加/删除而改变
```

### 四个核心注册编号

| 变量 | 含义 | 默认值 | 说明 |
|------|------|--------|------|
| `MASTER` | 主角的注册编号 | `0`（固定） | 始终为 0 |
| `TARGET` | 当前调教对象的注册编号 | `1` | 被调教的角色 |
| `ASSI` | 助手的注册编号 | `-1`（无助手） | 辅助调教的角色 |
| `PLAYER` | 当前执行调教者的注册编号 | `0`（= MASTER） | 通常等于 MASTER 或 ASSI，由脚本赋值 |

> **PLAYER 与 ASSIPLAY 的关系**：`PLAYER` 表示"谁在执行调教"，`ASSIPLAY` 表示"助手是否在执行调教"（0=主角执行，1=助手执行）。当 `ASSIPLAY == 1` 时，`PLAYER` 通常被设为 `ASSI`。

```erb
; 访问主角的体力
BASE:MASTER:0

; 访问调教对象的体力
BASE:TARGET:0

; 访问助手的体力（ASSI 为 -1 时会出错）
BASE:ASSI:0

; 访问当前执行调教者的体力
BASE:PLAYER:0

; PLAYER 的典型赋值模式
IF ASSIPLAY
    PLAYER = ASSI
ELSE
    PLAYER = MASTER
ENDIF
```

### 注册编号的动态性

```erb
; 初始状态：只有主角，注册编号 0
; MASTER == 0, CHARANUM == 1

ADDCHARA 5        ; 添加角色编号5的角色，注册编号变为 1
ADDCHARA 10       ; 添加角色编号10的角色，注册编号变为 2
; CHARANUM == 3

DELCHARA 1        ; 删除注册编号1的角色
; 注册编号重新排列：原编号2变为1
; CHARANUM == 2
```

### 遍历所有角色

```erb
REPEAT CHARANUM
    ; COUNT 为当前角色的注册编号（0 ~ CHARANUM-1）
    PRINTFORML 注册编号={COUNT}, 角色编号={NO:COUNT}, 名字=%NAME:COUNT%
REND
```

### 通过角色编号查找注册编号

```erb
#DIM regNo
regNo = GETCHARA(5)    ; 查找角色编号为5的注册编号
IF regNo >= 0
    PRINTFORML 找到了，注册编号={regNo}
ELSE
    PRINTL 角色不存在
ENDIF
```

---

## 角色变量分类

### 基础信息变量

每个角色必须有的基本信息：

| 变量 | 类型 | 说明 |
|------|------|------|
| `NAME` | 字符串 | 角色名 |
| `CALLNAME` | 字符串 | 角色称呼 |
| `NICKNAME` | 字符串 | 昵称 |
| `MASTERNAME` | 字符串 | 对主人的称呼 |
| `NO` | 整数 | 角色编号（CSV 定义） |

```erb
PRINTFORML 名字：%NAME:TARGET%
PRINTFORML 称呼：%CALLNAME:TARGET%
PRINTFORML 角色编号：{NO:TARGET}
```

### 数值型角色变量

最常用的角色数据存储：

| 变量 | 说明 | 保存 | 初始化时机 |
|------|------|:----:|-----------|
| `BASE` | 基础参数（体力、气力等） | ✅ | — |
| `ABL` | 能力值 | ✅ | — |
| `TALENT` | 素质（二值标记） | ✅ | — |
| `EXP` | 经验值 | ✅ | — |
| `MARK` | 刻印 | ✅ | — |
| `CFLAG` | 自定义标记 | ✅ | — |
| `PALAM` | 参数（调教中变化） | ✅ | TRAIN 循环开始时 |
| `SOURCE` | 来源值（调教计算用） | ✅ | `@SOURCE_CHECK` 后清零 |
| `EX` | 绝顶经验 | ✅ | TRAIN 循环开始时 |
| `TEQUIP` | 装备状态 | ✅ | TRAIN 循环开始时 |
| `STAIN` | 污渍 | ✅ | TRAIN 循环开始时 |
| `EQUIP` | 装备 | ✅ | — |
| `JUEL` | 宝石（能力提升用） | ✅ | — |
| `GOTJUEL` | 获得的宝石 | ✅ | TRAIN 循环开始时 |

```erb
; 读取角色的体力
PRINTFORML 体力：{BASE:TARGET:0}

; 检查素质
IF TALENT:TARGET:服从
    PRINTL 她很服从
ENDIF

; 设置自定义标记
CFLAG:TARGET:好感度 += 10
```

### 字符串型角色变量

| 变量 | 说明 | 保存 |
|------|------|:----:|
| `CSTR` | 自定义字符串 | ✅ |

```erb
CSTR:TARGET:10 = 特殊状态：发情
PRINTFORML 状态：%CSTR:TARGET:10%
```

### TRAIN 循环专用角色变量

这些变量在 TRAIN 循环开始时自动初始化为 0：

| 变量 | 说明 | 对应全局变量 |
|------|------|-------------|
| `CUP` | 角色参数上升值 | `UP` |
| `CDOWN` | 角色参数下降值 | `DOWN` |
| `TCVAR` | 角色临时变量 | `TFLAG` |

```erb
; CUP/CDOWN 需要用 CUPCHECK 而非 UPCHECK
CUP:TARGET:0 += 100
CUPCHECK TARGET
```

### 三维角色变量

| 变量 | 说明 |
|------|------|
| `CDFLAG` | 三维角色变量，需要三个索引 |

```erb
; 第一参数：角色注册编号
; 第二、三参数：自定义索引
CDFLAG:MASTER:0:2 = 1
```

---

## 角色管理指令

### 添加角色

```erb
; 添加角色编号为 0 的角色（通常在 FIRST 中）
ADDCHARA 0

; 添加指定角色编号的角色
ADDCHARA 5

; 在指定位置插入角色
ADDCHARA 3, 1    ; 在注册编号1的位置插入角色编号3的角色
```

### 删除角色

```erb
; 删除指定注册编号的角色
DELCHARA 2

; 删除所有角色（除了 MASTER）
; 注意：这不会自动重新编号
```

### 查找角色

```erb
; 按角色编号查找注册编号
#DIM regNo
regNo = GETCHARA(5)
; regNo >= 0 表示找到，-1 表示不存在

; 按角色名查找
regNo = GETCHARA("博丽灵梦")
```

### 角色数量

```erb
; CHARANUM 返回当前已注册的角色数量
PRINTFORML 当前角色数：{CHARANUM}
```

---

## CSV 定义角色数据

角色数据在 `CSV/CHARA*.CSV` 文件中定义。文件名中的数字是**角色编号**。

### 基本格式

```csv
; CSV/CHARA0.CSV — 角色编号0
番号,0
名前,博丽灵梦
呼び名,灵梦
基礎,0,1000
基礎,1,500
素質,0,1
能力,0,5
```

| 关键字 | 对应变量 | 说明 |
|--------|---------|------|
| `番号` | `NO` | 角色编号 |
| `名前` | `NAME` | 角色名 |
| `呼び名` | `CALLNAME` | 角色称呼 |
| `基礎` | `BASE` | 基础参数 |
| `素質` | `TALENT` | 素质 |
| `能力` | `ABL` | 能力值 |
| `経験` | `EXP` | 经验值 |
| `刻印` | `MARK` | 刻印 |
| `CFLAG` | `CFLAG` | 自定义标记 |
| `CSTR` | `CSTR` | 自定义字符串 |

### CSV 名称文件

每种角色变量都有对应的 CSV 名称文件，定义索引对应的名称：

```csv
; CSV/base.csv — BASE 变量的名称
0,体力
1,气力
```

```erb
; 引用名称
PRINTFORML %BASENAME:0%：{BASE:TARGET:0}
; 输出：体力：1000
```

### CSV → 变量的完整映射

CSV 文件、名称变量、数据变量、CharaXX.csv 关键字、CSV读取函数的关系一览。

#### 角色变量系

| CSV 名称文件 | 名称变量 | 数据变量 | CharaXX.csv 关键字 | CSV读取函数 |
|:--|:--|:--|:--|:--|
| `abl.csv` | `ABLNAME` | `ABL` | `能力` | `CSVABL()` |
| `talent.csv` | `TALENTNAME` | `TALENT` | `素質` | `CSVTALENT()` |
| `exp.csv` | `EXPNAME` | `EXP` | `経験` | `CSVEXP()` |
| `mark.csv` | `MARKNAME` | `MARK` | `刻印` | `CSVMARK()` |
| `base.csv` | `BASENAME` | `BASE` / `MAXBASE` | `基礎` | `CSVBASE()` |
| `palam.csv` | `PALAMNAME` | `PALAM` / `JUEL` / `GOTJUEL` | — | — |
| `cflag.csv` | `CFLAGNAME` | `CFLAG` | `フラグ` | `CSVCFLAG()` |
| `cstr.csv` | `CSTRNAME` | `CSTR` | `CSTR` | `CSVCSTR()` |
| `source.csv` | `SOURCENAME` | `SOURCE` | — | — |
| `ex.csv` | `EXNAME` | `EX` / `NOWEX` | — | — |
| `equip.csv` | `EQUIPNAME` | `EQUIP` | — | — |
| `tequip.csv` | `TEQUIPNAME` | `TEQUIP` | — | — |
| `relation.csv` | — | `RELATION` | `相性` | `CSVRELATION()` |
| `juel.csv` | — | `JUEL` | `珠` | `CSVJUEL()` |
| `equip.csv` | — | `EQUIP` | `装着物` | `CSVEQUIP()` |
| `stain.csv` | `STAINNAME` | `STAIN` | — | — |
| `tcvar.csv` | `TCVARNAME` | `TCVAR` | — | — |
| `cdflag1.csv` | `CDFLAGNAME1` | `CDFLAG`（第2索引） | — | — |
| `cdflag2.csv` | `CDFLAGNAME2` | `CDFLAG`（第3索引） | — | — |

#### 非角色变量系

| CSV 名称文件 | 名称变量 | 数据变量 | 备注 |
|:--|:--|:--|:--|
| `flag.csv` | `FLAGNAME` | `FLAG` | |
| `tflag.csv` | `TFLAGNAME` | `TFLAG` | |
| `train.csv` | `TRAINNAME` | — | 命令名定义 |
| `item.csv` | `ITEMNAME` / `ITEMPRICE` | `ITEM` / `ITEMSALES` | 第3列为价格 |
| `strname.csv` | `STRNAME` | — | STR 的名称定义 |
| `str.csv` | — | `STR` | **值的直接赋值**（非名称） |
| `tstr.csv` | `TSTRNAME` | `TSTR` | |
| `savestr.csv` | `SAVESTRNAME` | `SAVESTR` | |
| `global.csv` | `GLOBALNAME` | `GLOBAL` | |
| `globals.csv` | `GLOBALSNAME` | `GLOBALS` | |

> **注意 `str.csv` 与 `strname.csv` 的区别**：`str.csv` 是向变量 `STR` 直接赋值的文件，`strname.csv` 是定义 `STRNAME`（索引名称）的文件。两者的作用完全不同。

### CSV 到变量的转换示例

CharaXX.csv 中定义的数据，在 `ADDCHARA` 执行时自动赋值到对应的变量。

```csv
; CSV/Chara5.csv
番号,5
名前,博丽灵梦
呼び名,灵梦
基礎,0,2000
基礎,1,1000
素質,0,1
素質,3,1
能力,0,5
能力,2,3
経験,1,100
フラグ,0,1
CSTR,0,测试用角色
```

```erb
; ADDCHARA 执行后的变量状态（注册编号 = 1 时）
; NO:1 = 5
; NAME:1 = "博丽灵梦"
; CALLNAME:1 = "灵梦"
; BASE:1:0 = 2000,  BASE:1:1 = 1000
; TALENT:1:0 = 1,   TALENT:1:3 = 1
; ABL:1:0 = 5,      ABL:1:2 = 3
; EXP:1:1 = 100
; CFLAG:1:0 = 1
; CSTR:1:0 = "测试用角色"
```

### 通过名称进行索引访问

当名称变量已定义时，可以用名称代替数值索引来访问。

```erb
; 以下写法完全等价
ABL:TARGET:0
ABL:TARGET:従順        ; 当 ABLNAME:0 = "従順" 时

; 名称访问也可以通过 GETNUM 实现
#DIM idx
idx = GETNUM(ABL, "従順")    ; idx = 0
ABL:TARGET:idx = 10
```

### CSV 读取函数

无需 `ADDCHARA` 即可直接读取 CSV 定义值的函数群。第一参数是**角色编号**（不是注册编号）。

```erb
; 直接读取角色编号5的CSV数据（无需 ADDCHARA）
PRINTFORML 能力0 = {CSVABL(5, 0)}
PRINTFORML 素质3 = {CSVTALENT(5, 3)}
PRINTFORML 基础0 = {CSVBASE(5, 0)}
PRINTFORML CFLAG0 = {CSVCFLAG(5, 0)}
PRINTFORML CSTR0 = %CSVCSTR(5, 0)%
```

> **CSV 读取函数与变量访问的区别**：`CSVABL(5, 0)` 读取角色编号5的 CSV 定义值。`ABL:TARGET:0` 读取注册编号 TARGET 的当前运行时值。CSV 读取函数用于引用初始值，运行时值用变量访问。

### VariableSize.csv 修改数组大小

Emuera 中可以通过 `CSV/VariableSize.csv` 修改各变量的元素数量。

```csv
; CSV/VariableSize.csv
ABL,100
TALENT,1000
CFLAG,10000
STR,20000
```

eramaker 中各变量有固定上限（如 ABL 最多99、TALENT 最多99）。Emuera 中可通过 `VariableSize.csv` 扩展这些限制。但 `ABLNAME` 等名称变量的元素数不可修改（自动跟随 CSV 文件的行数）。

---

## 自定义角色变量

当内置角色变量不够用时，可以在 ERH 头文件中声明自定义角色变量：

```erb
; ERH/VARIABLE.ERH

; 自定义角色变量
#DIM CHARADATA 好感度      ; 整数型，每个角色独立
#DIMS CHARADATA 特殊状态   ; 字符串型，每个角色独立

; 可保存的角色变量
#DIM SAVEDATA CHARADATA 亲密度
```

使用方式与内置角色变量完全相同：

```erb
好感度:TARGET += 10
特殊状态:TARGET:0 = 恋爱

PRINTFORML 好感度：{好感度:TARGET}
PRINTFORML 状态：%特殊状态:TARGET:0%
```

---

## RELATION — 特殊的角色变量

`RELATION` 是特殊的角色变量，它的第二参数是**角色编号**而非注册编号：

```erb
; RELATION:注册编号:角色编号
; 调教对象与角色编号3的角色的相性
RELATION:TARGET:3 = 50
```

这与大多数角色变量不同——其他角色变量的第二参数是数组索引，而 `RELATION` 的第二参数是角色编号。

---

## 常见陷阱

| 陷阱 | 说明 | 解决方案 |
|------|------|---------|
| 混淆注册编号和角色编号 | 注册编号随增删变化，角色编号固定不变 | 用 `GETCHARA()` 按角色编号查找注册编号 |
| `ASSI` 为 -1 时访问角色变量 | 没有助手时 `ASSI == -1`，访问 `BASE:ASSI:0` 会出错 | 先检查 `ASSI >= 0` |
| `DELCHARA` 后注册编号变化 | 删除角色后，后续角色的注册编号会重新排列 | 遍历时用 `CHARANUM` 和 `REPEAT`，不要缓存注册编号 |
| 忘记 `CUP`/`CDOWN` 用 `CUPCHECK` | `CUP`/`CDOWN` 需要用 `CUPCHECK` 而非 `UPCHECK` | 角色版用 `CUPCHECK`，全局版用 `UPCHECK` |
| `TALENT` 是二值标记 | `TALENT` 的值是 0 或 1，不是任意整数 | 用 `IF TALENT:TARGET:服从` 而非 `IF TALENT:TARGET:服从 > 0` |
| `SOURCE` 自动清零 | `@SOURCE_CHECK` 结束后所有 `SOURCE` 被设为 0 | 如需保留 SOURCE 值，在 `@SOURCE_CHECK` 前保存 |
| `PALAM` 在 TRAIN 开始时清零 | `PALAM` 在 `BEGIN TRAIN` 时被初始化 | 需要跨 TRAIN 保留的数据用 `CFLAG` 或 `BASE` |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 事件函数详解 | [事件函数](event-functions.zh.md) |
| 状态机流程 | [状态机流程](system-flow.zh.md) |
| 变量声明系统 | [变量声明系统](variable-declaration.zh.md) |
| 完整变量规格 | [变量规格与一览](../Emuera/variables.zh.md) |
| 用户定义变量 | [用户定义变量](../Emuera/user_defined_variables.zh.md) |
