# 行类型与结构

!!! info "本节对应手册"

    - [函数·预处理器](../Emuera/function.zh.md) — 函数与预处理行的完整规格
    - [用户定义变量](../Emuera/user_defined_variables.zh.md) — #DIM 声明的完整规格

---

## 四种行类型

ERABASIC 是**行驱动**语言——引擎逐行解析，每行属于以下四种类型之一：

| 行类型 | 标识 | C# 类 | 说明 |
|--------|------|-------|------|
| **函数标签行** | `@FUNC_NAME` | `FunctionLabelLine` | 函数入口，定义函数名和参数 |
| **预处理行** | `#DIM` / `#FUNCTION` 等 | `FunctionLabelLine` 的子信息 | 声明变量、标记函数类型 |
| **指令行** | `PRINT` / `CALL` / `A = 1` 等 | `InstructionLine` | 执行指令 |
| **Goto 标签行** | `$LABEL_NAME` | `GotoLabelLine` | 跳转目标 |
| **空行/注释行** | `;` 开头或空行 | `NullLine` | 被忽略 |

---

## 函数标签行（@行）

函数标签行以 `@` 开头，定义函数的名称和参数：

```erb
@MY_FUNC(ARG:0, ARG:1)
@GREET(ARGS:0)
@CALC(X, Y)
@EVENT_TRAIN
```

### 函数标签行的组成

```
@FUNCTION_NAME(PARAM1, PARAM2, ...)
↑  ↑           ↑       ↑
│  │           │       └── 参数列表（逗号分隔）
│  │           └────────── 函数名
│  └────────────────────── @ 前缀（必须）
└───────────────────────── 函数标签行标识
```

### 参数写法

| 参数写法 | 含义 | 是否需要 #DIM 声明 |
|---------|------|-------------------|
| `ARG:0` | 内置整数参数 | 不需要（内置） |
| `ARGS:0` | 内置字符串参数 | 不需要（内置） |
| `ARGF:0` | 内置浮点参数 | 不需要（内置） |
| `X` | 私有变量参数 | **需要** `#DIM X` |
| `VARIADIC ARG:0` | 可变整数参数 | 不需要（内置） |

---

## 预处理行（#行）

预处理行以 `#` 开头，必须位于 `@` 函数标签行之后、第一条指令行之前。多个 `#` 行可以连续出现，顺序不限。空行和注释行（`;`）不影响 `#` 行序列。

### 位置规则

```erb
@MY_FUNC(ARG:0, ARG:1)     ← @ 标签行
#DIM L_TEMP, 10             ← #DIM 声明（@ 行之后）
; 这是注释（不影响 # 行序列）
#FUNCTION                    ← #FUNCTION 声明（注释之后仍然有效）
    PRINTL 开始              ← 第一条指令（# 行必须在此之前）
    L_TEMP:0 = ARG:0 + ARG:1
RETURN L_TEMP:0
```

!!! danger "# 行位置错误是最常见的编译警告"

    ```erb
    ; ❌ 错误：#DIM 出现在函数体中间
    @MY_FUNC
        PRINTL 开始
        #DIM X, 10        ; → 警告: "#行只能在函数声明后立刻使用"

    ; ✅ 正确：所有 # 行在 @ 行之后、执行语句之前
    @CALC(X, Y)
    #FUNCTION
    ; 这是注释（不影响 # 行序列）
    #DIM X
    #DIM Y
        RETURNF X * Y
    ```

### 预处理指令分类

| 指令 | 用途 | 作用域 |
|------|------|--------|
| `#DIM` | 声明整数私有变量 | 函数内 |
| `#DIMS` | 声明字符串私有变量 | 函数内 |
| `#DIMF` | 声明浮点私有变量 | 函数内 |
| `#REF` / `#REFS` / `#REFF` | 声明标量引用 | 函数内 |
| `#FUNCTION` / `#FUNCTIONS` / `#FUNCTIONF` | 标记表达式函数类型 | 函数级 |
| `#LOCALSIZE` / `#LOCALSSIZE` / `#LOCALFSIZE` | 设置 LOCAL 数组大小 | 函数级 |
| `#PRI` / `#LATER` / `#SINGLE` / `#ONLY` | 事件函数优先级修饰 | 事件函数 |

---

## 指令行

指令行是函数的主体，执行实际操作。

### 指令行的种类

| 种类 | 示例 | 说明 |
|------|------|------|
| 输出指令 | `PRINTL 你好` | 输出文本 |
| 输入指令 | `INPUT` | 等待用户输入 |
| 赋值语句 | `X = 10` | 给变量赋值 |
| 函数调用 | `CALL MY_FUNC(1, 2)` | 调用函数 |
| 控制流 | `IF` / `FOR` / `REPEAT` | 条件和循环 |
| 返回 | `RETURN` / `RETURNF` | 函数返回 |

!!! warning "命令语法 vs 表达式语法"

    指令行中，函数名后**必须紧跟空格或制表符**。`FUNC(args)` 这种括号语法**不能**作为独立指令行，
    只能在表达式中使用（如 `X = FUNC(args)` 或 `IF FUNC(args) > 0`）。

    ```erb
    ; ✅ 命令语法（空格分隔）
    STRLEN "hello"

    ; ❌ 括号语法作为独立命令 → 解析失败！
    STRLEN("hello")
    ```

    详见 [命令 vs 表达式](command-vs-expression.zh.md)。

### 赋值操作符

```erb
; 整数/浮点赋值
X = 10                    ; 基本赋值
X += 5                    ; 加法赋值
X -= 3                    ; 减法赋值
X *= 2                    ; 乘法赋值
X /= 4                    ; 除法赋值
X ++                      ; 自增
X --                      ; 自减

; 字符串赋值
S = Hello %NAME%          ; 格式化字符串（%变量% 字符串替换）
S '= "Hello"              ; 表达式求值（不插值）
S += " World"             ; 字符串拼接
```

!!! warning "字符串赋值的 = 和 '= 含义不同"

    | 操作符 | 含义 | 示例 |
    |--------|------|------|
    | `=` | 格式化字符串（`%变量%` 字符串替换，`{变量}` 数值插值） | `S = Hello %NAME%` → `Hello 艾莉娜` |
    | `'= ` | 表达式求值（不插值） | `S '= "Hello %NAME%"` → `Hello %NAME%` |

### 注释

```erb
; 这是注释（行首 ;）

; ✅ 行末注释：预处理语句、条件控制语句、一般指令语句
#DIM L_COUNT, 10      ; 声明局部数组
#FUNCTION              ; 标记为表达式函数
SIF RESULT == 0        ; 结果为零时跳过
    RETURN 0
CALL MY_FUNC           ; 调用函数
LOCAL = 10 + 20        ; 赋值表达式

; ❌ PRINT 系列指令不支持行末注释
; PRINTL 把 ; 之后的内容当作字符串原样打印
PRINTL 你好    ; 这不是注释
输出结果： 你好    ; 这不是注释
```

!!! warning "eramaker 的注释限制"

    eramaker 中行末不能写注释（`;` 后的内容会被当作指令执行）。
    Emuera 放宽了此限制，行末 `;` 之后的内容会被忽略——但 **PRINT 系列指令例外**，它们把行末剩余内容当作字符串参数，`;` 会被原样打印。

---

## Goto 标签行（$行）

Goto 标签行以 `$` 开头，作为 `GOTO` 指令的跳转目标：

```erb
@MY_FUNC
$LOOP_START
    PRINTL 继续吗？
    INPUT
    SIF RESULT == 0
        GOTO LOOP_START
RETURN
```

!!! tip "尽量少用 GOTO"

    ERABASIC 提供了 IF/SELECTCASE/FOR/REPEAT/WHILE 等结构化控制流，
    大多数情况下不需要 GOTO。GOTO 主要用于兼容旧代码。

---

## 行结构总览

一个完整的函数由这四种行类型按固定顺序组成：

```erb
@MY_FUNC(ARG:0, ARG:1)       ← 1. @ 标签行（函数入口）
#DIM L_TEMP, 10               ← 2. # 预处理行（声明，@ 行之后）
#FUNCTION                      ← 2. # 预处理行（标记类型）
    L_TEMP:0 = ARG:0 + ARG:1  ← 3. 指令行（执行）
    IF L_TEMP:0 > 10          ← 3. 指令行（控制流）
        PRINTL 大于10          ← 3. 指令行
    ENDIF                      ← 3. 指令行
$RETRY                         ← 4. $ Goto 标签行
    RETURNF L_TEMP:0           ← 3. 指令行（返回）
```

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 声明系统详解 | [声明系统](variable-declaration.zh.md) |
| 控制流 | [IF](../Reference/IF.zh.md) / [SELECTCASE](../Reference/SELECTCASE.zh.md) / [REPEAT](../Reference/REPEAT.zh.md) |
