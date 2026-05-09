# FORM 语法（格式化字符串）

!!! info "本节对应手册"

    - [Emuera 新增语法 > 书式付文字列（FORM構文）拡張](../Emuera/expression.zh.md) — 官方手册中的 FORM 语法说明
    - [PRINT 系](../Reference/PRINT.zh.md) — 使用 FORM 语法的输出指令
    - [STRFORM](../Reference/STRFORM.zh.md) — 运行时 FORM 展开函数

!!! warning "FORM 语法是 ERABASIC 中耦合最深、最容易踩坑的特性"

    FORM 语法横跨词法分析、表达式求值、渲染系统三大模块。它的很多行为没有文档说明，只能从实践中推断，等于摸着石头过河。本教程基于源码分析，揭示那些"没人告诉你但你必须知道"的规则。

---

## 什么是 FORM 语法

FORM 语法是 ERABASIC 的**格式化字符串**机制——在字符串中嵌入变量引用、条件分支和特殊符号，运行时展开为最终字符串。

它无处不在：

```erb
PRINTFORM 名字是%NAME%金钱是{MONEY}
STR:0 = %CALLNAME%的攻击力是{ATK}
RESULTS '= @"%NAME%来了！"
CALLFORM FUNC_%TARGET%
```

### FORM 语法的两种出现位置

| 位置 | 语法形式 | 示例 |
|------|---------|------|
| **命令参数**（PRINTFORM/RETURNFORM 等） | 直接写，无需引号 | `PRINTFORM Hello {A}` |
| **字符串表达式内部**（PRINTS/表达式函数参数等） | 用 `@"..."` 包裹 | `PRINTS @"Hello {A}"` |

关键区别：命令参数位置直接写 FORM 字符串，不需要也不允许加引号。而字符串表达式内部必须用 `@"..."` 标记。

---

## 基础：变量替换

### `%变量%` — 字符串变量替换

用 `%` 包裹字符串变量名，运行时替换为该变量的值：

```erb
NAME:0 = 佐藤
PRINTFORML 名字是%NAME:0%
; 输出：名字是佐藤
```

`%` 中可以写任何**字符串表达式**：

```erb
PRINTFORML %CALLNAME:TARGET%
PRINTFORML %STR:0%
PRINTFORML %TOSTR(A)%
```

### `{表达式}` — 整数表达式插值

用 `{}` 包裹整数表达式，运行时求值并转为字符串：

```erb
A = 42
PRINTFORML 数值是{A}
PRINTFORML 计算结果是{A * 2 + 10}
PRINTFORML {(MONEY + 1000 - 600) * 5}
```

!!! note "`{}` 中必须是整数表达式"

    `{}` 中的内容会被当作**整数表达式**解析。如果写了字符串表达式会报错。

---

## 填充与对齐

### `%变量,位数,对齐%` — 字符串填充

```erb
STR:0 = あいう
PRINTFORML [%STR:0%]          ; [あいう]
PRINTFORML [%STR:0,10%]       ; [    あいう]  （右对齐，不足补半角空格）
PRINTFORML [%STR:0,10,LEFT%]  ; [あいう    ]  （左对齐）
PRINTFORML [%STR:0,2%]        ; [あいう]      （位数不足，原样显示）
```

### `{表达式,位数,对齐}` — 整数填充

```erb
A = 123456
PRINTFORML [{A}]          ; [123456]
PRINTFORML [{A,10}]       ; [    123456]  （右对齐）
PRINTFORML [{A,10,LEFT}]  ; [123456    ]  （左对齐）
PRINTFORML [{A,2}]        ; [123456]      （位数不足，原样显示）
```

### 填充长度计算的底层规则

!!! danger "全角字符的长度计算与编码深度绑定"

    填充长度使用 `LangManager.GetStrlenLang()` 计算，该方法的行为是：

    1. 如果字符串**全部是 ASCII 字符**，长度 = `string.Length`（字符数）
    2. 否则，长度 = `Encoding.GetByteCount(string)`（按系统编码的字节数）

    这意味着：

    - 日文 Shift-JIS 编码下，全角字符 = 2 字节 = 2 字符宽度
    - UTF-8 编码下，日文汉字 = 3 字节 ≠ 2 字符宽度

    **源码注释原文**（[StrForm.cs](https://github.com/Emuera/EmueraDotNet/blob/main/Runtime/Script/Data/StrForm.cs) `FormatPercent` 类）：

    ```
    totalLength -= currentLength - ret.Length;
    //全角文字の数だけマイナス。タブ文字？ゼロ幅文字？知るか！
    ```

    翻译："按全角字符的数量减去。制表符？零宽字符？管它呢！"

    这段注释揭示了填充逻辑的**hack 本质**：它假设全角字符在系统编码下恰好占 2 字节，然后通过 `totalLength - (byteLength - charLength)` 来调整填充量。对于非 Shift-JIS 编码环境，这个计算可能产生意外结果。

    填充一律使用**半角空格**（`' '`），无论对齐方向。

---

## `@"..."` — 字符串表达式中的 FORM 语法

在字符串表达式（如 `PRINTS` 参数、`+=` 右侧）中，不能直接写 FORM 语法，必须用 `@"..."` 包裹：

```erb
; ✅ 正确
PRINTS @"%RESULTS%继续"
STR:0 += @"%NAME%来了"

; ❌ 错误 — PRINTS 不接受裸 FORM 语法
PRINTS %RESULTS%继续

; ❌ 错误 — PRINTFORM 不需要 @"..."
PRINTFORM @"%RESULTS%继续"  ; 会原样输出 @"..." 和 "..."
```

### `@"..."` 的解析入口

当词法分析器在表达式上下文中遇到 `@` 字符时：

1. 检查下一个字符是否是 `"`
2. 如果是，跳过 `@"`，调用 `AnalyseFormattedString(st, FormStrEndWith.DoubleQuotation, false)`
3. 解析直到遇到闭合的 `"` 为止

这意味着 `@"..."` 中的 FORM 语法与 `PRINTFORM` 参数中的 FORM 语法**完全相同**，只是终止条件不同（`"` vs 行尾）。

---

## `\@ ? # \@` — FORM 三元运算符

这是 FORM 语法中最令人困惑的特性之一。

### 语法

```
\@ 条件 ? 真值字符串 # 假值字符串 \@
```

### 示例

```erb
PRINTFORML \@ TALENT:0 ? 有天赋 # 无天赋 \@
PRINTFORML 结果是\@ A > 0 ? 正数 # 非正数 \@！
```

### 解析流程

源码中 `\@` 的解析在 `LexicalAnalyzer.AnalyseYenAt()` 方法中：

1. 遇到 `\@` → 开始解析条件部分（直到 `?`）
2. 条件部分被当作**整数表达式**解析（`ExpressionParser.ReduceIntegerTerm`）
3. `?` 之后 → 解析真值字符串（直到 `#`），这是一个**嵌套的 FORM 字符串**
4. `#` 之后 → 解析假值字符串（直到 `\@`），也是嵌套 FORM 字符串
5. 闭合 `\@` → 结束

### 与表达式三元运算符的区别

| 特性 | FORM 三元运算符 `\@ ? # \@` | 表达式三元运算符 `? :` |
|------|---------------------------|----------------------|
| 出现位置 | FORM 字符串内部 | 表达式内部 |
| 条件类型 | 整数表达式 | 整数表达式 |
| 结果类型 | **字符串** | 整数或字符串（取决于操作数） |
| 分隔符 | `?` 和 `#` | `?` 和 `:` |
| 闭合标记 | `\@` | 无（靠优先级） |
| 真值/假值 | FORM 字符串（支持嵌套插值） | 表达式 |
| `#` 可省略 | 是（省略时假值为空字符串） | 否 |

!!! tip "省略 `#` 的情况"

    如果 `\@` 后直接遇到 `@`（没有 `#`），解析器会发出警告并将假值设为空字符串：

    ```erb
    ; 以下会触发警告，假值为空
    PRINTFORML \@ TALENT:0 ? 有天赋 \@
    ```

### 在表达式上下文中使用

在表达式上下文中，`\@...\@` 可以**省略** `@"..."` 直接使用：

```erb
; 以下两行等价
PRINTS @"\@ A > 0 ? 正 # 负 \@"
PRINTS \@ A > 0 ? 正 # 负 \@
```

这是因为词法分析器在表达式上下文中遇到 `\@` 时，会直接将其解析为 `StrFormWord`。

### `\@...\@` 在不同上下文中的行为

`\@...\@` 既是 FORM 语法的一部分，又是可以在表达式上下文中直接使用的字面量。这种双重身份让它在不同上下文中的行为令人困惑。下面逐一分析：

| 上下文 | 代码示例 | 行为 | 解析方式 |
|--------|---------|------|---------|
| **PRINTFORM** | `PRINTFORM \@ A>0 ? 正 # 负 \@` | FORM 字符串展开 | `AnalyseFormattedString` 直接解析 |
| **PRINTS** | `PRINTS \@ A>0 ? 正 # 负 \@` | 等价于 `PRINTS @"\@ A>0 ? 正 # 负 \@"` | 表达式上下文中 `\@` 被识别为 FORM 起始 |
| **RETURNF** | `RETURNF \@ A>0 ? 正 # 负 \@` | 返回展开后的字符串 | 同上，`\@` 在表达式上下文中被解析为 `StrFormWord` |
| **RETURNFORM** | `RETURNFORM \@ A>0 ? 正 # 负 \@` | FORM 字符串展开 | `AnalyseFormattedString` 直接解析 |
| **字符串字面量内** | `"结果是\@ A>0 ? 正 # 负 \@"` | **不会展开**——`\@` 在普通字符串中被转义为 `@` | `ReadString` 处理，`\` 吞掉，保留 `@` |
| **@"..."内** | `@"\@ A>0 ? 正 # 负 \@"` | FORM 字符串展开 | `AnalyseFormattedString` 解析 |
| **赋值 =** | `STR:0 = \@ A>0 ? 正 # 负 \@` | FORM 字符串展开 | 赋值 `=` 使用 `AnalyseFormattedString` |
| **赋值 '=** | `STR:0 '= \@ A>0 ? 正 # 负 \@` | FORM 字符串展开 | `'=` 虽用表达式解析，但 `\@` 在表达式上下文中仍被识别 |
| **#DIMS 初始化** | `#DIMS S = \@ A>0 ? 正 # 负 \@` | **编译期表达式求值** | `ExpressionParser.ReduceArguments`，`\@` 被解析为 `StrFormWord` |

!!! warning "关键区别：普通字符串字面量 vs FORM 上下文"

    在普通字符串字面量 `"..."` 中，`\@` 会被转义为 `@`（`\` 被吞掉），**不会触发 FORM 三元运算符**。这是因为 `"..."` 由 `ReadString` 解析，不经过 `AnalyseFormattedString`。

    ```erb
    ; ❌ 不会展开——这是普通字符串，\@ 被转义为 @
    RESULTS = "结果是\@ A>0 ? 正 # 负 \@"

    ; ✅ 正确——FORM 上下文
    RESULTS = \@ A>0 ? 正 # 费 \@

    ; ✅ 正确——@"..." 内部是 FORM 上下文
    RESULTS = @"结果是\@ A>0 ? 正 # 负 \@"
    ```

!!! tip "核心规则：`\@` 在任何 FORM 解析入口都会生效"

    只要解析路径经过 `AnalyseFormattedString`（PRINTFORM 参数、`@"..."`、赋值 `=`），或在表达式上下文中遇到 `\@`（RETURNF、`'=`、#DIMS 初始化），`\@` 三元运算符都会被正确解析。唯一例外是普通字符串字面量 `"..."`。

### 实测对比：PRINTL / PRINTFORML / PRINTSL 与 `\@` 和 `@"..."`

以下测试（`A = -1`，即 `A > 0` 为假）清晰展示了三种输出命令对 `\@` 和 `@"..."` 的不同处理：

```erb
; 假设 A = -1（A > 0 为假）

; ── PRINTL：纯文本输出，不解析任何 FORM 语法 ──
PRINTL 结果是\@ A > 0 ? 正数 # 非正数 \@！
; → 输出：结果是\@ A > 0 ? 正数 # 非正数 \@！（原样输出）

PRINTL  @"\@ A > 0 ? 正 # 负 \@"
; → 输出： @"\@ A > 0 ? 正 # 负 \@"（原样输出）

; ── PRINTFORML：FORM 语法解析 ──
PRINTFORML 结果是\@ A > 0 ? 正数 # 非正数 \@！
; → 输出：结果是非正数！（\@ 三元运算符展开）

PRINTFORML @"\@ A > 0 ? 正 # 负 \@"
; → 输出：@"负"（@ 和 " 是 FORM 中的普通字符，\@ 展开）
; ⚠️ 注意：PRINTFORML 中 @"..." 不是 FORM 字符串语法！
;    @ 和 " 都是字面字符，只有 \@ 触发三元运算符

; ── PRINTSL：表达式求值 ──
PRINTSL @"\@ A > 0 ? 正 # 负 \@"
; → 输出：负（@"..." 是表达式中的 FORM 字符串语法，\@ 在内部展开）

PRINTSL \@ A > 0 ? 正 # 负 \@
; → 输出：负（表达式上下文直接识别 \@ 为 StrFormWord）
```

!!! warning "PRINTFORML 中的 `@"..."` 不是 FORM 字符串语法"

    这是常见的混淆点。在 `AnalyseFormattedString`（PRINTFORML 的解析路径）中，`@` 和 `"` 都是普通字符，`@"..."` 不会被当作 FORM 字符串语法处理。只有**表达式上下文**（PRINTSL、RETURNF、赋值 `'=` 等）中 `@"..."` 才是 FORM 字符串语法。

    | 命令 | `@"..."` 含义 | `\@` 是否展开 |
    |------|-------------|-------------|
    | PRINTFORML | `@` + `"` + 内容 + `"`（全是字面量） | ✅（FORM 上下文） |
    | PRINTSL | FORM 字符串语法（`@"..."` 包裹 FORM 内容） | ✅（FORM 上下文） |
    | PRINTL | `@` + `"` + 内容 + `"`（全是字面量） | ❌（纯文本） |

---

## 字符串赋值与初始化的语义差异

FORM 语法在字符串赋值和初始化中的行为不同，这是常见的困惑来源。

> 赋值语句的完整说明见 [赋值语句](assignment.zh.md)，本节仅讨论与 FORM 语法直接相关的部分。

### 赋值语句：`=` 使用 FORM 语法

字符串变量的赋值语句 `=` 右侧使用 **FORM 语法**解析：

```erb
STR:0 = %CALLNAME%来了       ; ✅ %变量% 替换
STR:0 = 金额是{MONEY}元      ; ✅ {} 整数插值
STR:0 = \@ A>0 ? 正 # 负 \@  ; ✅ \@ 三元运算符
```

源码位置：`ArgumentBuilder.cs` 的 `SP_SET_ArgumentBuilder`，当 `op == OperatorCode.Assignment` 时调用 `LexicalAnalyzer.AnalyseFormattedString(st, FormStrEndWith.EoL, true)`。

### 赋值语句：`'=` 使用表达式语法

字符串变量的赋值语句 `'=` 右侧使用**表达式语法**解析：

```erb
STR:0 '= "Hello"              ; ✅ 字符串表达式
STR:0 '= TOSTR(A)             ; ✅ 函数调用
STR:0 '= RESULTS:0 + "世界"   ; ✅ 字符串拼接
```

源码位置：`ArgumentBuilder.cs` 的 `SP_SET_ArgumentBuilder`，当 `op == OperatorCode.AssignmentStr` 时调用 `ExpressionParser.ReduceArguments`。

!!! note "`'=` 中仍可使用 `\@`"

    虽然 `'=` 使用表达式解析，但词法分析器在表达式上下文中遇到 `\@` 时仍会将其解析为 `StrFormWord`，因此 `\@` 三元运算符在 `'=` 右侧也能工作：

    ```erb
    STR:0 '= \@ A>0 ? 正 # 负 \@  ; ✅ 等价于 STR:0 = \@ A>0 ? 正 # 费 \@
    ```

### #DIMS 初始化：`=` 使用表达式语法

`#DIMS` 变量声明中的 `=` 初始化使用**表达式语法**，而非 FORM 语法：

```erb
#DIMS GREETING = "你好"        ; ✅ 字符串表达式
#DIMS GREETING = %CALLNAME%   ; ❌ 不是 FORM 语法！% 会被当作取模运算符
#DIMS GREETING = {MONEY}      ; ❌ 不是 FORM 语法！{ } 会被当作块分隔符
```

源码位置：`UserDefinedVariable.cs`，初始化值通过 `ExpressionParser.ReduceArguments(wc, ArgsEndWith.EoL, false)` 解析，且要求每个初始化值必须是 `SingleTerm`（编译期常量）。

!!! danger "#DIMS 初始化的三个陷阱"

    1. **`=` 是表达式求值，不是 FORM 展开** — `%CALLNAME%` 不会替换为变量值
    2. **初始化值必须是编译期常量** — 不能用函数调用或变量引用（即使是 `\@` 三元运算符也不行，因为条件部分通常不是常量）
    3. **没有 `'=` 语法** — 初始化只有 `=`，不像赋值语句有 `=` 和 `'=` 两种

### 语义差异总结

| 场景 | 语法 | 解析方式 | 支持 FORM 语法 | 支持 `\@` |
|------|------|---------|--------------|----------|
| 字符串赋值 `=` | `STR = ...` | `AnalyseFormattedString` | ✅ 完整支持 | ✅ |
| 字符串赋值 `'=` | `STR '= ...` | `ExpressionParser.ReduceArguments` | ❌ | ✅（表达式上下文识别） |
| #DIMS 初始化 `=` | `#DIMS S = ...` | `ExpressionParser.ReduceArguments` | ❌ | 仅常量时 |
| PRINTFORM 参数 | `PRINTFORM ...` | `AnalyseFormattedString` | ✅ 完整支持 | ✅ |
| @"..." 内部 | `@"..."` | `AnalyseFormattedString` | ✅ 完整支持 | ✅ |
| 普通字符串 `"..."` | `"..."` | `ReadString` | ❌ | ❌（转义为 `@`） |

---

## Skia 变体的浮点数扩展

Skia 变体（LazyLoading）引入了 `EraType.Float` 浮点类型，并相应扩展了 FORM 语法和类型转换函数。

### `{}` 中的浮点数插值

在原版 Emuera 中，`{}` 只接受整数表达式。Skia 变体扩展了 `FormatCurlyBrace`，使其能自动识别浮点表达式：

```erb
#DIMF PI = 3.14159
PRINTFORML 圆周率是{PI}         ; 输出：圆周率是3.14159
PRINTFORML 宽度{PI,10}          ; 输出：   3.14159（右对齐填充）
PRINTFORML 宽度{PI,10,LEFT}     ; 输出：3.14159   （左对齐填充）
```

源码实现（[StrForm.cs](file:///d:/emuera/emuera_lazyloading_selfmodified_version/Emuera/Runtime/Script/Data/StrForm.cs) `FormatCurlyBrace` 类）：

```csharp
if (arguments[0].GetEraType() == EraType.Float)
    ret = arguments[0].GetFloatValue(exm).ToString();
else
    ret = arguments[0].GetIntValue(exm).ToString();
```

!!! note "浮点填充的精度问题"

    `{}` 中的浮点数转字符串使用 C# 的 `double.ToString()` 默认格式，**不提供精度控制**。这意味着：
    
    - `3.14159265` → `"3.14159265"`（完整精度）
    - `3.0` → `"3"`（整数部分省略小数点）
    - `0.0000001` → `"1E-07"` 或 `"1E-07"`（极小值用科学计数法）
    
    如需指定精度，请使用 `TOSTRF` 函数配合 `%` 替换（详见下方"精度与宽度的组合控制"）。

> **TO 系列类型转换函数的完整 API 文档**（TOSTR / TOSTRF / TOINT / TOFLOAT 的参数签名、格式字符串、示例代码），请参阅 [值、类型与变量 — 类型转换函数](../Reference/TOSTR.md)。本节仅讨论与 FORM 语法直接相关的部分。

### 与 FORM 语法的交叉引用

| FORM 语法 | 原版行为 | Skia 扩展行为 |
|-----------|---------|-------------|
| `{整数表达式}` | 整数→字符串 | 不变 |
| `{浮点表达式}` | ❌ 报错 | ✅ 浮点→字符串（默认格式） |
| `{表达式,位数}` | 整数→字符串+填充 | 浮点也支持填充 |
| `%字符串表达式%` | 字符串替换 | 不变 |

!!! tip "精度与宽度的组合控制"

    **当前机制的能力边界**：

    | 需求 | 语法 | 可行性 |
    |------|------|--------|
    | 浮点→字符串（默认精度） | `{PI}` | ✅ |
    | 浮点→字符串+填充 | `{PI,10}` | ✅ |
    | 浮点→字符串（指定精度） | `TOSTRF(PI, "F2")` | ✅ |
    | 浮点→字符串（指定精度+填充） | `%TOSTRF(PI, "F2"),10%` | ✅ |
    | 浮点→字符串（指定精度+填充+左对齐） | `%TOSTRF(PI, "F2"),10,LEFT%` | ✅ |

    **精度+填充的推荐写法**：

    ```erb
    #DIMF PI = 3.14159265

    ; ❌ {} 无法控制精度
    PRINTFORML {PI}              ; → 3.14159265（默认格式）

    ; ✅ TOSTRF + % 替换：精度+右对齐填充
    PRINTFORML %TOSTRF(PI, "F2"),10%    ; → "      3.14"

    ; ✅ TOSTRF + % 替换：精度+左对齐填充
    PRINTFORML %TOSTRF(PI, "F2"),10,LEFT% ; → "3.14      "

    ; ✅ @"..." 内部也可以使用
    PRINTS @"%TOSTRF(PI, "F2"),10%"
    ```

    **原理**：`%expr,width,LEFT%` 的 `FormatPercent` 接受任何字符串表达式作为第一个参数，因此 `TOSTRF(PI, "F2")` 的返回值可以直接作为 `%...%` 的输入，同时享受填充和对齐功能。`FormatPercent` 还会正确处理全角字符宽度（通过 `LangManager.GetStrlenLang`），而 `FormatCurlyBrace` 的填充不考虑全角。

!!! warning "现有机制的不足与改进方向"

    当前 `{}` 语法**不支持格式字符串参数**，这是浮点数格式化的主要缺口：

    | 语法 | 参数 | 缺失能力 |
    |------|------|---------|
    `{expr}` | 表达式 | — |
    `{expr,width}` | 表达式 + 填充宽度 | — |
    `{expr,width,LEFT}` | + 对齐方向 | — |
    `{expr,width,LEFT,format}` | + 格式字符串 | ❌ **不支持** |

    **可行的改进方案**：

    1. **扩展 `TOSTRF` 参数**（推荐，改动最小）：
       ```erb
       TOSTRF(float_value, format, width, align)
       ; 例：TOSTRF(PI, "F2", 10, "LEFT") → "3.14      "
       ```
       - 优点：无需修改词法分析器，仅扩展函数参数
       - 缺点：与 `TOSTR` 的参数模式不一致（TOSTR 的格式是第 2 参数）

    2. **扩展 `{}` 语法支持格式字符串**：
       ```erb
       {PI,10,LEFT,"F2"}  ; 或 {PI:"F2",10}
       ```
       - 优点：语法更直观，与 C# 内插字符串类似
       - 缺点：需要修改 `LexicalAnalyzer.AnalyseFormattedString` 和 `FormatCurlyBrace`，影响面大

    3. **新增 `FORMATF` 函数**（类似 `STRFORM` 但面向浮点）：
       ```erb
       FORMATF("{0:F2}", PI)  ; → "3.14"
       ```
       - 优点：通用性强，可复用 C# 格式化
       - 缺点：与现有 `STRFORM` 功能重叠

    **当前推荐**：方案 1（扩展 `TOSTRF`），因为改动最小且与现有 `TOSTRF` + `%...%` 的 workaround 兼容。

    > **TO 系列函数完整文档**：[值、类型与变量 — 类型转换函数](values-types.zh.md#类型转换函数)

---

## 三连标识符展开

### 语法

| 三连符号 | 展开为 | 含义 |
|---------|--------|------|
| `***` | `NAME:TARGET` | 目标角色的名字 |
| `+++` | `CALLNAME:MASTER` | 主角的称呼 |
| `===` | `CALLNAME:PLAYER` | 玩家的称呼 |
| `///` | `NAME:ASSI` | 助手的名字 |
| `$$$` | `CALLNAME:TARGET` | 目标角色的称呼 |

### 示例

```erb
PRINTFORML ***来了！     ; → NAME:TARGET + "来了！"
PRINTFORML +++攻击了===  ; → CALLNAME:MASTER + "攻击了" + CALLNAME:PLAYER
```

### 检测规则

三连标识符的检测在 `CharStream.TripleSymbol()` 中实现：

```csharp
public bool TripleSymbol()
{
    if (pointer + 3 > source.Length)
        return false;
    return source[pointer] == source[pointer + 1] && source[pointer] == source[pointer + 2];
}
```

**关键规则**：只要**连续三个相同字符**且该字符属于 `* + = / $` 之一，就会被识别为三连标识符。这意味着：

- `++++` → 第一个 `+++` 被展开，剩余一个 `+` 作为普通字符
- `+++++` → 第一个 `+++` 展开，接着第二个 `++` 不展开（只有两个）
- `======` → 两个 `===` 连续展开

### 配置选项

`SystemIgnoreTripleSymbol` 配置项（默认 `false`）可以禁用三连标识符展开。启用后，`+++` 等将被当作普通字符处理。

!!! danger "PRINTFORML === 的陷阱"

    ```erb
    PRINTFORML ===
    ```

    这行代码**不会**输出 `===`！它会被展开为 `CALLNAME:PLAYER` 的值。

    如果你确实想输出 `===`，需要转义：

    ```erb
    PRINTFORML \=\=
    ```

    或者启用 `SystemIgnoreTripleSymbol` 配置。

    同理，`PRINTFORML +++` 也会展开为 `CALLNAME:MASTER`，`PRINTFORML ***` 展开为 `NAME:TARGET`。

---

## 转义规则

`\` 是 FORM 字符串中的转义前缀。它的行为取决于后面的字符：

### FORM 字符串中的转义（`AnalyseFormattedString`）

| 转义序列 | 结果 | 说明 |
|---------|------|------|
| `\s` | 半角空格 ` ` |  |
| `\S` | 全角空格 `　` |  |
| `\t` | 制表符 `\t` |  |
| `\n` | 换行符 `\n` |  |
| `\@` | 进入 `\@` 三元运算符 | 特殊处理 |
| `\\` | `\` | 反斜杠本身 |
| `\%` | `%` | 百分号本身（不再触发变量替换） |
| `\{` | `{` | 左花括号本身 |
| `\"` | `"` | 双引号本身 |
| `\其他` | 该字符本身 | 任何其他字符，`\` 被吞掉 |

### 普通字符串中的转义（`ReadString`）

普通字符串（`"..."` 包裹的定字符串）也有类似的转义规则，但**没有 `\@`**：

| 转义序列 | 结果 |
|---------|------|
| `\s` | 半角空格 |
| `\S` | 全角空格 |
| `\t` | 制表符 |
| `\n` | 换行符 |
| `\其他` | 该字符本身 |

### 关键区别

!!! warning "FORM 字符串 vs 普通字符串的转义差异"

    - FORM 字符串中 `\@` 是三元运算符的起始标记
    - 普通字符串中 `\@` 会被转义为 `@`（`\` 吞掉，保留 `@`）
    - FORM 字符串中 `\` 后跟 `%`、`{`、`"` 等特殊字符会转义掉其特殊含义
    - 普通字符串中 `%`、`{` 没有特殊含义，不需要转义

### 实用转义示例

```erb
; 输出字面量 %RESULTS%
SAVESTR:0 = \%RESULTS\%

; 输出字面量 {A}
PRINTFORML 变量A的写法是\{A\}

; 输出反斜杠本身
PRINTFORML 路径是C\\Program Files

; 输出 === 字面量（避免三连标识符展开）
PRINTFORML \=\=（只转义前两个，第三个 = 不构成三连）
; 或者
PRINTFORML \===（转义第一个，剩余 == 不构成三连）
```

---

## FORM 字符串作为命令参数

### FORM_STR_ANY 参数类型

使用 FORM 语法的命令（如 `PRINTFORM`、`RETURNFORM`、`PUTFORM` 等）的参数类型是 `FORM_STR_ANY`。这类参数的构建器是 `FORM_STR_ANY_ArgumentBuilder`。

### 逗号分隔的 FORM 参数

`FORM_STR_ANY` 参数用**逗号**分隔多个 FORM 字符串：

```erb
RETURNFORM %RESULTS%, {RESULT}
; 两个参数：%RESULTS% 和 {RESULT}
```

**关键机制**：`AnalyseFormattedString` 在遇到逗号时，如果 `endWith == FormStrEndWith.Comma`，会**停止当前 FORM 字符串的解析**。这意味着逗号在 FORM_STR_ANY 参数中是**分隔符**，不是 FORM 字符串的一部分。

```erb
; 如果你想在 FORM 字符串中包含逗号本身：
PRINTFORM 你好\,世界    ; 转义逗号？不行！
PRINTFORM 你好,世界      ; 会被当作两个参数
```

!!! danger "FORM 字符串中无法包含逗号"

    由于逗号是 `FORM_STR_ANY` 的分隔符，而 FORM 转义规则中**没有 `\,`**，你无法在 FORM_STR_ANY 参数中直接输出逗号。

    替代方案：

    ```erb
    ; 方案1：用字符串表达式
    PRINTS "你好,世界"

    ; 方案2：用 @"..." 语法
    PRINTS @"你好,世界"
    ```

### CALLFORM 系的函数名部分

`CALLFORM`/`JUMPFORM`/`GOTOFORM` 等命令的函数名部分使用 `FormStrEndWith.LeftParenthesis_Bracket_Comma_Semicolon` 终止条件——遇到 `(`、`[`、`,` 或 `;` 时停止函数名解析：

```erb
CALLFORM FUNC_%TARGET%(ARG:0, ARG:1)
;       ^^^^^^^^^^^^^^^^  函数名部分（FORM字符串）
;                       ^^^^^^^^^^  参数部分（表达式）
```

这意味着函数名部分**不能包含** `(`、`[`、`,`、`;` 这些字符。

### `;` 注释符的交互

在 `FORM_STR_ANY` 参数中，`;` **不是**终止符——FORM 字符串会一直解析到行尾。这与某些命令（如 `PRINT`）中 `;` 被当作注释不同：

```erb
PRINT Hello;World      ; 输出 "Hello;World"（; 是字符串的一部分）
PRINTFORM Hello;World  ; 输出 "Hello;World"（; 是 FORM 字符串的一部分）
```

但在 `CALLFORM` 的函数名部分，`;` 会终止函数名解析。

---

## STRFORM 函数 — 运行时 FORM 展开

`STRFORM` 函数接受一个字符串参数，将其作为 FORM 字符串展开：

```erb
#DIMS FORM_STR = "名字是%NAME:0%，数值是{A}"
RESULTS = STRFORM(FORM_STR)
```

!!! warning "STRFORM 是运行时展开"

    与 `PRINTFORM` 的编译期解析不同，`STRFORM` 在**运行时**调用 `AnalyseFormattedString` 重新解析字符串。这意味着：

    - 如果传入的字符串包含 FORM 语法错误，会在运行时抛出异常
    - 可以动态构造 FORM 字符串再展开

    源码实现（[Creator.Method.cs](https://github.com/Emuera/EmueraDotNet/blob/main/Runtime/Script/Statements/Function/Creator.Method.cs) `StrFormMethod` 类）：

    ```csharp
    StrFormWord wt = LexicalAnalyzer.AnalyseFormattedString(new CharStream(str), FormStrEndWith.EoL, false);
    StrForm strForm = StrForm.FromWordToken(wt);
    destStr = strForm.GetString(exm);
    ```

---

## FORM 语法的内部架构

### 解析→展开→渲染 三阶段

```
源码字符串
    │
    ▼  LexicalAnalyzer.AnalyseFormattedString()
StrFormWord (strs[] + SubWord[])
    │     strs: 静态文本片段
    │     SubWord: 动态替换点
    │       ├─ CurlyBraceSubWord  → {} 整数插值
    │       ├─ PercentSubWord     → %% 字符串替换
    │       ├─ TripleSymbolSubWord → +++ 等三连符号
    │       └─ YenAtSubWord       → \@ 三元运算符
    │
    ▼  StrForm.FromWordToken()
StrForm (strs[] + AExpression[])
    │     将 SubWord 转为 AExpression（表达式节点）
    │     三连符号 → 预构建的 FunctionMethodTerm
    │     {} → FormatCurlyBrace
    │     %% → FormatPercent
    │     \@ → FormatYenAt
    │
    ▼  StrForm.GetString()
最终字符串
    │     交替拼接 strs[i] + terms[i].GetStrValue()
```

### FormStrEndWith — 终止条件枚举

FORM 字符串的解析由 `FormStrEndWith` 枚举控制终止条件：

| 枚举值 | 终止字符 | 用途 |
|--------|---------|------|
| `EoL` | 行尾 | `PRINTFORM` 等命令参数 |
| `DoubleQuotation` | `"` | `@"..."` 中的 FORM 字符串 |
| `Sharp` | `#` | `\@` 三元运算符的真值部分 |
| `YenAt` | `\@` | `\@` 三元运算符的假值部分 |
| `Comma` | `,` | `FORM_STR_ANY` 参数 |
| `LeftParenthesis_Bracket_Comma_Semicolon` | `(` `[` `,` `;` | `CALLFORM` 系的函数名部分 |

### 常量折叠优化

如果 FORM 字符串中所有动态部分在编译期就能确定值，`StrForm` 会执行**常量折叠**——将所有 `SingleTerm` 合并为一个纯字符串，避免运行时求值：

```csharp
// StrForm.Restricture() 中的优化逻辑
if (termList[i] is SingleTerm)
{
    string str = termList[i].GetStrValue(exm);
    strList[i] = strList[i] + str + strList[i + 1];
    termList.RemoveAt(i);
    strList.RemoveAt(i + 1);
    i--;
}
```

如果整个 FORM 字符串都是常量，`StrForm.IsConst` 返回 `true`，`ToStrFormTerm()` 会直接返回 `SingleStrTerm` 而非 `StrFormTerm`。

---

## FORM 语法的起源推测

FORM 语法并非凭空设计，而是从 eramaker 时代的简单变量替换逐步演化而来。

### eramaker 时代

eramaker 只支持两种 FORM 语法：

1. `%变量名%` — 字符串变量替换（仅支持简单变量名，不支持表达式）
2. `{变量名}` — 整数变量显示（仅支持简单变量名）

```erb
; eramaker 语法
PRINTFORM 名字是%NAME:0%，金钱是{MONEY}元
```

eramaker **没有**：

- `{}` 中的表达式计算
- `%%` 中的字符串表达式
- 填充对齐（位数指定）
- `\@` 三元运算符
- 三连标识符展开
- 转义规则（`\` 在 eramaker 中没有特殊含义）
- `@"..."` 语法

### Emuera 的扩展

Emuera 在兼容 eramaker 的基础上，逐步添加了：

1. **`{}` 中支持表达式** — 不再限于简单变量名
2. **`%%` 中支持字符串表达式** — 同上
3. **填充对齐** — `{变量,位数,LEFT/RIGHT}` 和 `%变量,位数,LEFT/RIGHT%`
4. **转义规则** — `\s`、`\S`、`\t`、`\n`、`\%`、`\{`、`\\`
5. **`\@` 三元运算符** — 受 C 语言三元运算符启发，但用 `#` 代替 `:`（因为 `:` 在 ERABASIC 中是数组下标分隔符）
6. **三连标识符** — 快捷方式，减少常用角色名的书写
7. **`@"..."` 语法** — 让 FORM 语法能在表达式上下文中使用
8. **STRFORM 函数** — 运行时 FORM 展开

### 设计哲学

FORM 语法的演化体现了 ERABASIC 的核心设计哲学：**在命令语法的框架内，逐步添加表达式能力**。

- `%变量%` 和 `{变量}` 是**命令语法**思维——用特殊标记在字符串中"挖洞"填值
- `@"..."` 是**表达式语法**思维——将 FORM 字符串作为表达式的一个值
- `\@ ? # \@` 是两种思维的**杂交**——在 FORM 字符串中嵌入条件表达式

这种混合导致了 FORM 语法与表达式系统之间的**深度耦合**，也是许多令人困惑行为的根源。

---

## 常见陷阱速查

| 陷阱 | 原因 | 解决方案 |
|------|------|---------|
| `PRINTFORML ===` 输出不是 `===` | `===` 是三连标识符，展开为 `CALLNAME:PLAYER` | 用 `\=\=` 或 `\===` 转义 |
| `PRINTFORML +++` 输出不是 `+++` | `+++` 展开为 `CALLNAME:MASTER` | 同上 |
| `PRINTFORM @"..."` 原样输出 `@"..."` | `PRINTFORM` 不需要 `@"` | 直接写 `PRINTFORM ...` |
| FORM 字符串中无法输出逗号 | 逗号是 `FORM_STR_ANY` 的分隔符 | 用 `PRINTS @"..."` 或字符串表达式 |
| `\@` 三元运算符中 `#` 被当作注释 | 不会，`#` 在 FORM 中是三元运算符分隔符 | 正常使用即可 |
| `STR:0 = %RESULTS%` 在 eramaker 中行为不同 | eramaker 不展开 `%` | 用 `\%RESULTS\%` 兼容 |
| 全角字符填充宽度不对 | 填充长度按系统编码字节数计算 | 了解 `LangManager` 的编码依赖 |
| `{A,10}` 中 A 是字符串变量 | `{}` 只接受整数表达式 | 用 `%STR,10%` 代替 |

---

## 语法速查表

```
FORM 字符串语法（PRINTFORM 参数 / @"..." 内部）：

  普通文本          → 原样输出
  %字符串表达式%    → 替换为字符串值
  %表达式,位数%     → 替换并右对齐填充
  %表达式,位数,LEFT% → 替换并左对齐填充
  {整数表达式}      → 求值并转为字符串
  {表达式,位数}     → 转字符串并右对齐填充
  {表达式,位数,LEFT} → 转字符串并左对齐填充
  \@ 条件 ? 真 # 假 \@ → 条件为真输出真值，否则输出假值
  ***               → NAME:TARGET
  +++               → CALLNAME:MASTER
  ===               → CALLNAME:PLAYER
  ///               → NAME:ASSI
  $$$               → CALLNAME:TARGET
  \s                → 半角空格
  \S                → 全角空格
  \t                → 制表符
  \n                → 换行符
  \\                → 反斜杠
  \%                → 百分号（不触发替换）
  \{                → 左花括号（不触发插值）
  \"                → 双引号
  \其他             → 该字符（\ 被吞掉）
```
