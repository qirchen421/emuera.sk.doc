# 函数与 CALL

!!! info "本节对应手册"

    - **Reference 分类**: [函数系列（CALL 等）](../Reference/README.zh.md#function-call) / [RETURN 系列](../Reference/README.zh.md#return) / [输入・等待](../Reference/README.zh.md#input-wait)
    - [CALL](../Reference/CALL.zh.md) — CALL 指令 API 参考
    - [JUMP](../Reference/JUMP.zh.md) — JUMP 指令 API 参考
    - [RETURN](../Reference/RETURN.zh.md) — RETURN 指令 API 参考
    - [INPUT](../Reference/INPUT.zh.md) — INPUT 指令 API 参考
    - [函数定义](../Emuera/function.zh.md) — 函数规格说明
    - [用户定义变量](../Emuera/user_defined_variables.zh.md) — #DIM 声明规格

---

## 概述

ERABASIC 程序由**函数**组成。每个函数以 `@` 标签开头，可以被 `CALL` 调用。函数是代码组织的基本单位——你写的每一行代码都隶属于某个函数。

| 概念 | 说明 |
|------|------|
| `@标签` | 定义函数的入口 |
| `CALL` | 调用函数，执行后返回 |
| `JUMP` | 跳转到函数，不返回 |
| `RETURN` | 从函数返回，设置 RESULT |
| `RETURNF` | 从表达式函数返回值 |

!!! note "eramaker 兼容性"
    `@标签`/`CALL`/`JUMP`/`RETURN` 是 eramaker 就存在的功能。`RETURNF`、`TRYCALL`/`TRYJUMP`、`#FUNCTION`/`#FUNCTIONS` 等是 Emuera 的扩展功能。

---

## @标签 — 定义函数

`@` 开头的行定义一个函数：

```erb
@MY_FUNC
    PRINTL 这是我的函数
RETURN
```

### 函数命名规则

- 以 `@` 开头，后跟函数名
- 函数名在整个项目中必须唯一
- 函数名区分大小写
- 函数名只能包含字母、数字和下划线

### 函数的执行

函数只有在被 `CALL` 或 `JUMP` 调用时才会执行。引擎会在特定时机自动调用一些函数（如 `@SYSTEM_TITLE`、`@EVENTFIRST` 等），详见 [事件函数](event-functions.zh.md)。

---

## CALL — 调用函数

`CALL` 调用指定函数，执行完毕后返回到 `CALL` 的下一行：

```erb
@SYSTEM_TITLE
    CALL GREETING
    PRINTL 返回了
    WAIT

@GREETING
    PRINTL 你好！
RETURN
; 输出：
; 你好！
; 返回了
```

### CALL 的参数传递

`CALL` 可以传递参数给函数，函数内通过 `ARG`、`ARGS`、`ARGF` 接收：

```erb
@SYSTEM_TITLE
    CALL SHOW_DAMAGE 100, 50
    WAIT

@SHOW_DAMAGE, ARG:0, ARG:1
    PRINTFORML 物理伤害：{ARG:0}，魔法伤害：{ARG:1}
    PRINTFORML 总伤害：{ARG:0 + ARG:1}
RETURN
; 输出：
; 物理伤害：100，魔法伤害：50
; 总伤害：150
```

| 参数变量 | 类型 | 说明 |
|---------|------|------|
| `ARG` | 整数 | 接收整数参数，`ARG:0`、`ARG:1`... |
| `ARGS` | 字符串 | 接收字符串参数，`ARGS:0`、`ARGS:1`... |
| `ARGF` | 浮点数 | 接收浮点参数（Skia 变体），`ARGF:0`、`ARGF:1`... |

### 参数声明的两种方式

**方式一：使用内置参数变量 ARG/ARGS/ARGF**

ERABASIC 没有标量——所有变量都是数组。`ARG`/`ARGS`/`ARGF` 也是数组，省略下标时默认访问第 0 号元素：

```erb
@SHOW_DAMAGE, ARG, ARG:1
; ARG 省略下标 = ARG:0（第 0 号元素），ARG:1 = 第 1 号元素
; ARG:0 = 第一个参数，ARG:1 = 第二个参数
```

!!! warning "不能重复注册同一数组元素"

    `@SHOW_DAMAGE, ARG, ARG` 会将两个参数都绑定到 `ARG:0`，导致第二个参数覆盖第一个。引擎会发出重复参数警告。必须用不同下标区分：`ARG, ARG:1` 或 `ARG:0, ARG:1`。

**方式二：使用命名私有变量**（推荐）

```erb
@SHOW_DAMAGE(L_PHYS, L_MAGIC)
#DIM DYNAMIC L_PHYS
#DIM DYNAMIC L_MAGIC
; 签名中的名字是对 #DIM 变量的引用，参数含义一目了然
    PRINTFORML 物理伤害：{L_PHYS}，魔法伤害：{L_MAGIC}
RETURN
```

命名私有变量和 ARG 数组是**完全独立的实体**——命名参数不会自动赋值给对应的 ARG 元素。详见 [变量声明系统 → 命名参数 vs ARG 数组](variable-declaration.zh.md#arg)。

### 字符串参数

```erb
@SYSTEM_TITLE
    CALL GREET "艾莉娜"
    WAIT

@GREET, ARGS
    PRINTFORML 你好，%ARGS%！
RETURN
; 输出：你好，艾莉娜！
```

### 混合参数

```erb
@SHOW_INFO, ARGS, ARG, ARG:1
; ARGS = ARGS:0 = 名字，ARG = ARG:0 = 等级，ARG:1 = HP
    PRINTFORML %ARGS% Lv.{ARG} HP:{ARG:1}
RETURN
```

---

## RETURN — 从函数返回

`RETURN` 结束当前函数，返回到调用者：

```erb
@MY_FUNC
    PRINTL 执行中
    RETURN              ; 返回到调用者
    PRINTL 不会执行     ; RETURN 后面的代码不会执行
```

### RETURN 设置 RESULT

`RETURN` 的参数会存入 `RESULT`：

```erb
@SYSTEM_TITLE
    CALL GET_ANSWER
    PRINTFORML 答案是{RESULT}
    WAIT

@GET_ANSWER
    RETURN 42
; 输出：答案是42
```

### 多个返回值

`RETURN` 可以返回多个值，依次存入 `RESULT:0`、`RESULT:1`...：

```erb
@SYSTEM_TITLE
    CALL GET_COORDS
    PRINTFORML X={RESULT:0} Y={RESULT:1}
    WAIT

@GET_COORDS
    RETURN 10, 20
; 输出：X=10 Y=20
```

### 无 RETURN 的函数

如果函数执行到末尾没有 `RETURN`，`RESULT` 会被设为 `0`：

```erb
@NO_RETURN
    PRINTL 没有RETURN
; 函数结束时 RESULT = 0
```

### RETURN 必定覆盖 RESULT

`RETURN` **必定**覆盖 `RESULT`。即使在函数中手动给 `RESULT` 赋值，`RETURN` 执行时也会被覆盖：

```erb
@MY_FUNC
    RESULT = 999
    RETURN 1
    ; 调用方的 RESULT 是 1 而非 999
```

函数末尾也会隐式覆盖——没有 `RETURN` 时，`RESULT:0` 被设为 `0`。

### RETURNF 不覆盖 RESULT

`#FUNCTION` 声明的表达式函数使用 `RETURNF` 返回值。`RETURNF` **不会覆盖 RESULT**，函数末尾也不会隐式赋值：

```erb
@MY_EXPR_FUNC
#FUNCTION
    RESULT = 999
    RETURNF 1
    ; 调用方的 RESULT 仍为 999（RETURNF 不触碰 RESULT）
```

| 函数类型 | 返回关键字 | 是否覆盖 RESULT | 函数末尾 RESULT |
|---------|-----------|:---:|:---:|
| 命令式（默认） | `RETURN` | ✅ 覆盖 | 隐式 `RESULT:0 = 0` |
| 表达式式（`#FUNCTION`） | `RETURNF` | ❌ 不覆盖 | 不修改 |

### RETURNFORM — FORM 语法动态求值返回

`RETURNFORM` 是 `RETURN` 的动态求值变体。它先通过 FORM 语法展开字符串，再将展开结果**作为整数表达式重新解析求值**，最终写入 `RESULT`。

```erb
@MY_FUNC
    #DIMS L_EXPR '= "A * 10"
    RETURNFORM %L_EXPR%
; 执行过程：FORM 展开 → "A * 10" → 词法分析+整数表达式求值 → 写入 RESULT
; 等价于 RETURN A * 10
```

!!! warning "RETURNFORM 中 % 是字符串替换符"

    `RETURNFORM` 中 `%` 是 FORM 语法的字符串替换符，不是取模运算符。
    `RETURNFORM A % 100` 会被解析为 `A ` + 变量 `100` 的值，而不是 `A mod 100`。

!!! info "RETURNFORM 返回整数，不返回字符串"

    `RETURNFORM` 的求值分两阶段：
    
    1. **FORM 展开**：将 `%变量%` 和 `{表达式}` 替换为实际值，得到一个字符串
    2. **二次解析**：将展开后的字符串当作**整数表达式**重新词法分析并求值
    
    最终结果写入 `RESULT`（整数数组）。不存在 `RETURNSFORM` 指令——如需返回字符串，请用 `RESULTS = ...` 赋值后 `RETURN`。
    
    这意味着 RETURNFORM 本质上是一种**受限的动态求值**机制：参数在编译期以 FORM 字符串形式存在，运行时先展开再解析为整数表达式。现代 ERABASIC 提供了更通用的 `EVAL`/`EVALS`/`EVALF` 表达式函数来实现完整的动态求值。

---

## JUMP — 跳转到函数

`JUMP` 跳转到另一个函数，**不会返回**：

```erb
@SYSTEM_TITLE
    CALL AAA
    PRINTW 回到了 SYSTEM_TITLE

@AAA
    PRINTL 在 AAA 中
    JUMP BBB           ; 跳转到 BBB，不返回 AAA
    PRINTL 不会执行     ; JUMP 后面的代码不会执行

@BBB
    PRINTL 在 BBB 中
    RETURN              ; 返回到 AAA 的调用者（SYSTEM_TITLE）
; 输出：
; 在 AAA 中
; 在 BBB 中
; 回到了 SYSTEM_TITLE
```

### CALL vs JUMP

| | `CALL` | `JUMP` |
|------|:---:|:---:|
| 是否返回 | ✅ 返回调用者 | ❌ 不返回 |
| 调用栈 | 压入栈 | 不压入栈 |
| 典型用途 | 调用子函数 | 函数间跳转（尾调用优化） |

!!! warning "JUMP 的调用栈风险"

    `JUMP` 不压入调用栈。如果调用链中全部使用 `JUMP`，最终 `RETURN` 时可能找不到返回目标，导致错误。

### JUMP 与 RESULT

JUMP 目标函数中的 `RETURN` 会正常设置 `RESULT`。JUMP 只是替换栈帧，不影响 `RETURN` 设置 `RESULT` 的行为。

当 JUMP 目标函数结束时，引擎会检测到 `IsJump` 标志，**递归地回退栈帧**，直到回到最初的非 JUMP 调用方（如 `CALL`）。JUMP 链也能正确传递 RESULT：

```erb
@SYSTEM_TITLE
    CALL AAA
    PRINTVL RESULT    ; 42

@AAA
    JUMP BBB          ; AAA 被 BBB 替换

@BBB
    RETURN 42         ; RESULT = 42，递归回退到 SYSTEM_TITLE
```

---

## CALLF — 表达式函数调用

`CALLF` 调用**表达式函数**（用 `#FUNCTION` 声明的函数），可以在表达式中使用返回值：

```erb
@SYSTEM_TITLE
    #DIM L_RESULT
    L_RESULT = IS_VALID(100)
    PRINTFORML 结果={L_RESULT}
    WAIT

@IS_VALID, ARG
#FUNCTION
    IF ARG > 0 && ARG < 1000
        RETURNF 1
    ELSE
        RETURNF 0
    ENDIF
```

`#FUNCTION` 声明的函数使用 `RETURNF` 返回值（而不是 `RETURN`），可以在表达式中直接调用。

> 关于表达式函数的详细说明，见 [命令 vs 表达式](command-vs-expression.zh.md)。

---

## INPUT — 等待玩家输入

`INPUT` 暂停程序执行，等待玩家输入，将结果存入 `RESULT`：

```erb
@SYSTEM_TITLE
    PRINTL 请输入数字：
    INPUT
    PRINTFORML 你输入了{RESULT}
    WAIT
```

### INPUT 的默认值

```erb
INPUT 0          ; 未输入时 RESULT = 0
INPUT 100        ; 未输入时 RESULT = 100
```

### INPUTS — 字符串输入

`INPUTS` 等待字符串输入，结果存入 `RESULTS`：

```erb
PRINTL 请输入名字：
INPUTS
PRINTFORML 你好，%RESULTS%！
```

### INPUT 与 RESULT

`INPUT` 和 `CALL` 都会修改 `RESULT`。如果需要在 `CALL` 后使用 `INPUT` 的结果，应该先保存：

```erb
INPUT
#DIM L_INPUT = RESULT       ; 保存输入值
CALL SOME_FUNC              ; RESULT 被覆盖
PRINTFORML 输入值={L_INPUT}  ; 使用保存的值
```

### INPUT 与按钮的联动

在 [Hello World](hello-world.zh.md) 中你已经见过 `[N]` 按钮与 `INPUT` 的配合。这里补充关键细节：

**类型匹配**：`INPUT` 只能点击整数按钮（`[0]`、`[1]` 等），`INPUTS` 只能点击字符串按钮。类型不匹配时按钮不可点击。

```erb
; INPUT + 整数按钮（常见）
PRINTL [0] 开始
PRINTL [1] 退出
INPUT                        ; 点击 [0] → RESULT=0

; INPUTS + 字符串按钮
PRINTBUTTON "[HogeHoge] ", "HogeHoge"
PRINTBUTTON "[PugePuge] ", "PugePuge"
INPUTS                       ; 点击 → RESULTS="HogeHoge"
```

**按钮只在 INPUT 等待时激活**：`PRINTL [0]` 创建了按钮，但只有执行到 `INPUT` 时按钮才变为可点击状态。此前的按钮点击无效。

**旧按钮失效**：每次 `INPUT` 后，之前的按钮自动失效（不可再次点击），只有新的按钮才能被选中。

---

## 函数内的变量声明

函数内用 `#DIM`/`#DIMS`/`#DIMF` 声明私有变量，这些变量只在当前函数内可见：

```erb
@MY_FUNC
#DIM L_COUNT                ; 私有整数变量
#DIMS L_NAME '= "默认"      ; 私有字符串变量
#DIMF L_RATE = 0.5          ; 私有浮点变量（Skia 变体）

    FOR L_COUNT, 0, 10
        PRINTFORML %L_NAME%：{L_COUNT}
    NEXT
RETURN
```

!!! warning "#DIM 必须在 @ 标签行之后、执行语句之前"

    `#DIM` 等预处理行必须写在函数开头，不能写在可执行语句之后。多个 `#` 行可以连续出现。

> 关于变量声明的完整说明，见 [值、类型与变量](values-types.zh.md) 和 [变量声明系统](../Emuera/user_defined_variables.zh.md)。

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| CALL 后用 RESULT | `CALL F` 后直接用 `RESULT` | 先保存 `RESULT` | 后续操作可能覆盖 RESULT |
| JUMP 后写代码 | `JUMP F` 后写逻辑 | JUMP 后不写代码 | JUMP 不返回，后面代码不执行 |
| #DIM 位置错误 | 可执行语句后写 `#DIM` | `@` 标签行之后 | #DIM 是预处理行 |
| RETURNFORM 取模 | `RETURNFORM A % 100` | `RETURN A % 100` | % 在 RETURNFORM 中是替换符 |
| 函数名冲突 | 两个 `@MY_FUNC` | 函数名唯一 | 项目内函数名不能重复 |
| 忘记 RETURN | 函数末尾无 RETURN | 加 `RETURN` | 无 RETURN 时 RESULT = 0 |
| 手动设 RESULT 后 RETURN | `RESULT = 999` 后 `RETURN 1` | 不要手动设 RESULT | RETURN 必定覆盖 RESULT |
| 误以为 JUMP 不设 RESULT | 以为 JUMP 后 RESULT 不变 | JUMP 目标的 RETURN 正常设 RESULT | JUMP 替换栈帧但不影响 RESULT 设置 |
| INPUT 选字符串按钮 | `INPUT` + `PRINTBUTTON "x", "str"` | 改用 `INPUTS` | INPUT 只能点击整数按钮 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 值、类型与变量 | [值、类型与变量](values-types.zh.md) |
| 变量声明系统（REF/OUT/VARIADIC） | [变量声明系统](variable-declaration.zh.md) |
| 条件分支 | [条件分支](condition.zh.md) |
| 循环 | [循环](loop.zh.md) |
| 事件函数 | [事件函数](event-functions.zh.md) |
| 命令 vs 表达式 | [命令 vs 表达式](command-vs-expression.zh.md) |
| CALL 完整 API | [CALL](../Reference/CALL.zh.md) |
| RETURN 完整 API | [RETURN](../Reference/RETURN.zh.md) |
