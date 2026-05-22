# ERB 文件格式扩展

!!! info "本节对应手册"

    - **Reference 分类**: [存档操作](../Reference/README.zh.md#save-data) / [图像处理相关](../Reference/README.zh.md#image) / [音频系列](../Reference/README.zh.md#sound)
    - [eramaker ERB 书式](../eramaker/ERB_format.zh.md) — 原始 ERB 格式（历史参考）
    - [Emuera 新增语法](../Emuera/expression.zh.md) — 行连接、特殊注释行
    - [Emuera 扩展语法 - 函数](../Emuera/function.zh.md) — `#FUNCTION`/`#FUNCTIONS` 声明
    - [Emuera 扩展语法 - 变量](../Emuera/variables.zh.md) — `#DIM`/`#DIMS`/`#DIMF` 声明

---

## 概述

eramaker 定义了 ERB 文件的基本格式——每行一条语句、用 `;` 注释、用 `=` 赋值。Emuera 在此基础上进行了大量扩展，使 ERB 的表达能力大幅提升。本教程将系统介绍这些扩展。

| 扩展类别 | eramaker | Emuera 扩展 |
|---------|----------|------------|
| 行连接 | ❌（必须一行写完） | ✅ `{}` 多行连接 |
| 行末注释 | ❌ | ✅ `; 行末注释` |
| 特殊注释行 | ❌ | ✅ `;!;` `;#;` |
| 条件编译 | ❌ | ✅ `[SKIPSTART]`/`[SKIPEND]` `[IF]`/`[ENDIF]` |
| 私有变量声明 | ❌ | ✅ `#DIM`/`#DIMS`/`#DIMF`/`#REF`/`#REFS`/`#REFF` |
| 函数类型声明 | ❌ | ✅ `#FUNCTION`/`#FUNCTIONS` |
| 局部变量尺寸 | 隐式 | ✅ `#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` |
| 事件修饰符 | ❌ | ✅ `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` |

---

## 行连接 `{}`

eramaker 要求每条语句必须在一行内写完。Emuera 新增了 `{}` 行连接语法，允许将一条语句拆分为多行：

```erb
{
    #DIM CONST HOGE =
        1,2,3,4
}
; 等价于：#DIM CONST HOGE = 1,2,3,4
```

### 语法规则

1. **`{` 和 `}` 必须独占一行**——除了空白字符外，不能有其他内容：

```erb
; ✅ 正确
{
    A = 10 +
        20 +
        30
}

; ❌ 错误：{ 行有非空白字符
{ A = 10 +
    20
}
```

2. **换行处自动补充半角空格**——被拆分的行在连接时，换行位置会插入一个空格：

```erb
{
    PRINT Hello
    World
}
; 等价于：PRINT Hello World（注意：Hello 和 World 之间有空格）
```

3. **不能在标识符中间分割**——因为换行处会插入空格，所以在变量名、函数名、字符串中间分割会导致错误：

```erb
; ❌ 错误：会在 PRI 和 NT 之间插入空格，变成 "PRI NT"
{
    PRI
    NT Hello
}

; ❌ 错误：会在 HEL 和 LO 之间插入空格
{
    STR '= "HEL
    LO"
}
```

### 处理顺序

行连接在注释处理**之前**进行。这意味着在 `{}` 块内部的注释会被包含在连接后的行中：

```erb
{
    #DIM CONST HOGE =
        1,2,3,4 ;注释
        ,5,6,7,8
}
; 连接后：#DIM CONST HOGE = 1,2,3,4 ;注释 ,5,6,7,8
; ",5,6,7,8" 被视为注释的一部分而被忽略！
```

!!! danger "行连接中的注释陷阱"

    由于行连接先于注释处理，`{}` 块内的行末注释可能导致后续行被意外忽略。建议在 `{}` 块中避免使用行末注释。

---

## 行末注释

Emuera 允许在语句末尾添加 `;` 注释：

```erb
A = B ;将B赋值给A
MONEY += 100 ;增加金钱
```

### 例外情况

对于 `PRINT` 等参数为简单字符串的指令，`;` 不会被视为注释，而是字符串的一部分：

```erb
PRINT foobar;霍格霍格
; 输出：foobar;霍格霍格（; 是字符串的一部分）
```

---

## 特殊注释行

### `;!;` — Emuera 专用行

以 `;!;` 开头的行在 Emuera 中被视为有效行（不是注释），但在 eramaker 中被当作注释忽略：

```erb
;!;PRINTW 此脚本无法在Emuera中运行
;!;QUIT
```

这可以用于编写只在 eramaker 中执行的代码（因为在 Emuera 中这些行会执行，可以主动阻止运行）。

### `;#;` — 调试专用行

以 `;#;` 开头的行只在调试模式下执行，非调试模式下被视为注释：

```erb
;#;PRINTV DEBUG_VAR
;#;PRINTW 调试信息
```

!!! tip "调试指令不需要 `;#;`"

    `DEBUG` 系列指令（如 `DEBUGPRINT`）在非调试模式下本身就会被忽略，不需要额外加 `;#;`。同样，调试变量在非调试模式下也是空字符串或 0。

---

## 条件编译

### `[SKIPSTART]` / `[SKIPEND]`

这两个标记之间的代码在 Emuera 中会被跳过（不执行、不解析）：

```erb
[SKIPSTART]
这段代码在Emuera中不会执行
[SKIPEND]
```

### `[IF]` / `[ENDIF]`

根据条件决定是否编译代码。`[IF]` 的参数是定义名（在 `_replace.csv` 中定义），不是表达式：

```erb
[IF ___]
    只在定义了 ___ 时编译
[ENDIF]
```

### 与 `;!;` 组合使用

可以组合使用 `;!;` 和 `[SKIPSTART]`/`[SKIPEND]` 来编写只在 Emuera 或只在 eramaker 中执行的代码：

```erb
; 只在Emuera以外运行
;!;[SKIPSTART]
PRINTW 此脚本无法在Emuera以外运行
QUIT
;!;[SKIPEND]
```

---

## `#` 预处理指令

`#` 开头的行是预处理指令，在函数定义内部使用，用于声明变量、指定函数属性等。这些指令在解析阶段处理，不是运行时语句。

### 私有变量声明

在函数内部声明的变量只在该函数内可见：

```erb
@MY_FUNCTION
#DIM L_COUNT          ; 整数私有变量，默认值0
#DIM L_ARR, 10        ; 整数私有数组，10个元素
#DIMS L_NAME          ; 字符串私有变量，默认值""
#DIMS L_NAMES, 5      ; 字符串私有数组，5个元素
#DIMF L_SCORE         ; 浮点私有变量，默认值0.0
#DIMF L_SCORES, 3     ; 浮点私有数组，3个元素
```

#### 内联初始化

私有变量可以在声明时初始化：

```erb
#DIM L_VALUE = 42
#DIM L_ARR, 5 = 10, 20, 30, 40, 50
#DIMS L_GREETING = "Hello"
#DIMS L_NAMES, 3 = "Alice", "Bob", "Charlie"
```

#### 常量声明

使用 `CONST` 关键字声明常量：

```erb
#DIM CONST MAX_LEVEL = 99
#DIM CONST ELEMENTS = 4
#DIMS CONST GAME_TITLE = "My Game"
```

#### 引用变量声明

使用 `#REF`/`#REFS`/`#REFF` 声明引用变量（别名变量），指向另一个变量：

```erb
#REF L_REF = TARGET    ; L_REF 是 TARGET 的别名
#REFS L_NAME_REF = NAME:TARGET
```

!!! warning "私有变量命名规则"

    - `#DIM`/`#DIMS`/`#DIMF` 中的 `#` 不可省略（不能写成 `DIM`）
    - 变量名不能以数字开头
    - A-Z 单字母变量名是引擎保留变量，不能用作私有变量名
    - 私有变量名不能与已有的全局变量名冲突

### 函数类型声明

`#FUNCTION` 和 `#FUNCTIONS` 将函数声明为**表达式函数**，可以在表达式中像函数一样调用：

```erb
@IS_POSITIVE(A)
#FUNCTION
IF A > 0
    RETURNF 1
ELSE
    RETURNF 0
ENDIF

@GET_GREETING(NAME)
#FUNCTIONS
RETURNF "你好，" + NAME + "！"
```

- `#FUNCTION` — 返回整数（Int64）的表达式函数
- `#FUNCTIONS` — 返回字符串（String）的表达式函数

!!! warning "`#FUNCTION`/`#FUNCTIONS` 的限制"

    - 必须在函数标签行（`@函数名`）之后、第一条执行语句之前
    - 多个 `#` 行可以连续出现（如 `#DIM` → `#FUNCTION`），顺序不限
    - 空行和注释行（`;`）不影响 `#` 行序列
    - 不能用于系统函数（`@SHOW_SHOP` 等）或事件函数（`@EVENTFIRST` 等）
    - 不能与 `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` 同时使用
    - 函数名不能以数字开头
    - 返回值使用 `RETURNF` 而不是 `RETURN`

### 局部变量尺寸指定

`#LOCALSIZE`/`#LOCALSSIZE`/`#LOCALFSIZE` 指定 `LOCAL`/`LOCALS`/`LOCALF` 数组的大小：

!!! warning "LOCAL/LOCALS 已过时"

    `LOCAL` 和 `LOCALS` 是过时的设计，不推荐使用。请使用 `#DIM`/`#DIMS` 声明私有变量替代。
    对于新游戏开发，建议在 `VariableSize.csv` 中将 `LOCAL` 和 `LOCALS` 的元素数均设为 `-1` 以禁用，强制迁移到 `#DIM`/`#DIMS`。

```erb
@MY_FUNCTION
#LOCALSIZE 100        ; LOCAL 数组大小为 100（默认取决于设置）
#LOCALSSIZE 50        ; LOCALS 数组大小为 50
#LOCALFSIZE 10        ; LOCALF 数组大小为 10
```

!!! info "事件函数中无效"

    在事件函数中指定 `#LOCALSIZE` 等会被忽略，因为事件函数可能有多个定义，LOCAL 变量的大小由所有定义中的最大值决定。

### 事件修饰符

事件函数可以使用修饰符控制调用顺序和方式：

| 修饰符 | 效果 |
|-------|------|
| `#PRI` | 优先调用（在其他事件函数之前） |
| `#LATER` | 延迟调用（在其他事件函数之后） |
| `#SINGLE` | 只调用一个（遇到第一个即停止） |
| `#ONLY` | 只调用此函数（忽略其他同名的全部事件函数） |

```erb
@EVENTFIRST
#PRI
; 这个函数会在其他 @EVENTFIRST 之前被调用
PRINTW 优先初始化

@EVENTFIRST
; 这个函数在 #PRI 之后被调用
PRINTW 普通初始化

@EVENTFIRST
#LATER
; 这个函数在普通函数之后被调用
PRINTW 延迟初始化
```

!!! warning "事件修饰符的互斥规则"

    - `#ONLY` 与 `#PRI`/`#LATER`/`#SINGLE` 互斥——指定 `#ONLY` 时，其他修饰符会被忽略
    - `#PRI` 和 `#LATER` 可以同时指定（函数会被添加到两个列表中）
    - 这些修饰符只能用于事件函数，不能用于用户自定义函数或系统函数

---

## 完整示例

以下是一个综合运用多种扩展的函数：

```erb
@CALC_DAMAGE(ATTACKER, DEFENDER, SKILL_ID)
#FUNCTION
#DIM CONST BASE_MULTIPLIER = 100
#DIM L_ATK_POWER
#DIM L_DEF_POWER
#DIM L_DAMAGE
#LOCALSIZE 10

L_ATK_POWER = ABL:ATTACKER:0 * BASE_MULTIPLIER / 100
L_DEF_POWER = ABL:DEFENDER:1 * BASE_MULTIPLIER / 100

{
    L_DAMAGE = L_ATK_POWER - L_DEF_POWER
        + SKILL_ID * 10
}

IF L_DAMAGE < 1
    L_DAMAGE = 1
ENDIF

RETURNF L_DAMAGE
```

---

## 与 eramaker 的兼容性

| 特性 | eramaker | Emuera | 兼容方案 |
|------|----------|--------|---------|
| 行连接 | ❌ | ✅ `{}` | eramaker 忽略 `{`/`}` 行 |
| 行末注释 | ❌ | ✅ `;` | eramaker 将 `;` 后的内容视为字符串 |
| `;!;` | 注释 | 有效行 | eramaker 跳过，Emuera 执行 |
| `;#;` | 注释 | 调试行 | eramaker 跳过 |
| `#DIM` 等 | ❌ | ✅ | eramaker 报错 |
| `#FUNCTION` | ❌ | ✅ | eramaker 报错 |
| `[SKIPSTART]` | ❌ | ✅ | eramaker 忽略 |

如果需要同时兼容 eramaker 和 Emuera，可以使用 `;!;` 和 `[SKIPSTART]`/`[SKIPEND]` 组合：

```erb
; Emuera 专用代码
;!;SAVESTR:0 = \%RESULT\%

; eramaker 专用代码
;!;[SKIPSTART]
SAVESTR:0 = %RESULTS%
;!;[SKIPEND]
```

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 赋值语句详解 | [赋值语句](assignment.zh.md) |
| 事件函数机制 | [事件函数](event-functions.zh.md) |
| 变量与声明 | [文件类型](file-types.zh.md) |
| 系统流程图 | [流程图](../Emuera/system_flow.zh.md) |
