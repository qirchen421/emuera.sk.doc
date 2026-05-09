# 值、类型与变量

!!! info "本节对应手册"

    - [变量规格](../Emuera/variables.zh.md) — 内置变量完整列表
    - [用户定义变量](../Emuera/user_defined_variables.zh.md) — #DIM 声明的完整规格
    - [运算](../Emuera/operand.zh.md) — 运算符与类型交互

---

## 三类型体系

ERABASIC 有三种基本数据类型，每种类型有独立的声明关键字、参数变量和默认值：

| 类型 | 声明关键字 | 参数变量 | 字面量示例 | 默认值 |
|------|-----------|---------|------------|--------|
| 整数 (Integer) | `#DIM` | `ARG` | `42`, `0x2A`, `1p5` | `0` |
| 字符串 (String) | `#DIMS` | `ARGS` | `"hello"`, `@"form"` | `""` |
| 浮点数 (Float) | `#DIMF` | `ARGF` | `3.14`, `-1.5e2` | `0.0` |

!!! tip "Float 是 Skia 变体新增"

    浮点类型（`#DIMF` / `ARGF` / `RESULTF`）是 Skia 变体新增的类型扩展，原版 Emuera 不支持。
    本教程以 Emuera 为基准线，Float 相关内容会特别标注。

三种类型之间**不会自动转换**（除 Int→Float 的安全提升）。这意味着你不能把字符串赋给整数变量，也不能把整数赋给字符串变量——必须使用显式转换函数。

---

## 整数类型

整数是 ERABASIC 的默认类型。引擎内部使用 64 位有符号整数（`Int64`/`long`），值范围为 `-9223372036854775808` ~ `9223372036854775807`。

### 整数字面量

ERABASIC 支持多种整数字面量表示法：

| 表示法 | 格式 | 示例 | 值 |
|--------|------|------|----|
| 十进制 | 数字序列 | `42` | 42 |
| 十六进制 | `0x` 前缀 | `0x2A` | 42 |
| 二进制 | `0b` 前缀 | `0b101010` | 42 |
| 二的幂 | `p` 后缀 | `1p5` | 32（1×2⁵） |
| 十的幂 | `e` 后缀 | `13e3` | 13000（13×10³） |

```erb
#DIM L_VAL
L_VAL = 42            ; 十进制
L_VAL = 0x2A          ; 十六进制
L_VAL = 0b101010      ; 二进制
L_VAL = 1p5           ; 1 × 2⁵ = 32
L_VAL = 13e3          ; 13 × 10³ = 13000
L_VAL = -0xFF         ; -255
L_VAL = 2p10          ; 2 × 2¹⁰ = 2048
```

!!! warning "`e` 和 `p` 是整数字面量的一部分，不是浮点数"

    `13e3` 是整数 13000，不是浮点数 13000.0。`p` 表示 2 的幂，`e` 表示 10 的幂。
    这些后缀只能用在整数字面量中，不能用在变量名中。

    源码参考：`LexicalAnalyzer.ReadInt64()` 解析 `p`/`P` 为二进制指数、`e`/`E` 为十进制指数，结果仍为 `long`。

### 整数运算

整数运算遵循标准优先级。除法是**整数除法**（截断小数）：

```erb
#DIM L_RESULT
L_RESULT = 10 / 3        ; → 3（截断，不是 3.333...）
L_RESULT = -7 / 2        ; → -3（向零截断）
L_RESULT = 10 % 3        ; → 1（取余）
L_RESULT = 7 & 3         ; → 3（按位与）
L_RESULT = 7 | 8         ; → 15（按位或）
L_RESULT = 7 ^ 8         ; → 15（按位异或）
L_RESULT = 1 << 4        ; → 16（左移）
L_RESULT = 256 >> 4      ; → 16（右移）
```

---

## 字符串类型

字符串类型存储文本数据。字符串字面量用 `""` 包裹。

### 字符串字面量

```erb
#DIMS L_NAME
L_NAME '= "艾莉娜"          ; 字符串字面量必须用 "" 包裹
L_NAME '= "Hello World"     ; 不加 "" 会被当作变量名！
L_NAME '= ""                ; 空字符串
```

!!! danger "字符串字面量必须用双引号包裹"

    ```erb
    ; ❌ 错误：不加引号会被当作变量名
    L_NAME '= hello

    ; ✅ 正确：加引号才是字符串字面量
    L_NAME '= "hello"
    ```

### 字符串赋值的两种方式

字符串变量有两种赋值语法，行为完全不同：

```erb
#DIMS L_STR

; = 走 FORM 语法（支持变量插值）
L_STR = 你好，{NAME:TARGET}！    ; {NAME:TARGET} 被替换为角色名
L_STR = 金钱：{MONEY}元           ; {MONEY} 被替换为金钱数值

; '= 走表达式语法（不插值，支持拼接）
L_STR '= "你好"                   ; 字面量赋值
L_STR '= NAME:TARGET + "的冒险"   ; 字符串拼接
L_STR '= "Hello {NAME}"           ; 花括号是字面文本，不插值！
```

| | `=` (FORM 语法) | `'= ` (表达式) |
|------|:---:|:---:|
| `{变量}` 插值 | ✅ | ❌ |
| `%变量%` 替换 | ✅ | ❌ |
| 字符串拼接 `+` | ❌ | ✅ |
| 字符串字面量 `""` | 不需要 | **必须** |

> 详见 [赋值语句](assignment.zh.md) 和 [FORM 语法](form-syntax.zh.md)。

### 字符串运算

字符串支持比较和拼接：

```erb
; 拼接（必须用 '= 赋值）
L_STR '= "你好" + "世界"        ; → "你好世界"
L_STR '= L_STR + "！"           ; → "你好世界！"

; 重复
L_STR '= "啊" * 3               ; → "啊啊啊"

; 比较
IF L_STR == "你好"
    PRINTL 匹配
ENDIF
IF L_STR != ""
    PRINTL 非空
ENDIF
```

---

## 浮点数类型（Skia 变体新增）

浮点数是独立的 `EraType` 枚举值，需用 `#DIMF` 声明。引擎内部使用 `double`（64 位双精度浮点）。

### 浮点字面量

```erb
#DIMF L_FLOAT
L_FLOAT = 3.14              ; 小数点字面量
L_FLOAT = -1.5e2            ; 科学计数法 → -150.0
L_FLOAT = 0.001             ; 小数
L_FLOAT = 10 / 3.0          ; 浮点除法 → 3.333...
```

!!! warning "整数除法 vs 浮点除法"

    ```erb
    #DIMF L_F
    L_F = 10 / 3         ; → 3.0（整数除法后提升为浮点）
    L_F = 10 / 3.0       ; → 3.333...（浮点除法）
    L_F = 10.0 / 3       ; → 3.333...（浮点除法）
    ```

    赋值目标变量的类型不影响右侧表达式的计算方式。`10 / 3` 始终是整数除法，结果是 `3`；
    只有当操作数中包含浮点值时，才会触发浮点除法。

### 浮点运算

```erb
#DIMF L_PI = 3.14159265
#DIMF L_R = 5.0
#DIMF L_AREA

L_AREA = L_PI * L_R * L_R       ; 圆面积
L_AREA = L_R * L_R * L_PI       ; 等价写法
```

---

## 变量

### 内置变量

ERABASIC 提供了大量内置变量，无需声明即可使用。以下是常用的内置变量：

| 变量 | 类型 | 用途 |
|------|------|------|
| `RESULT` | Int 一维数组 | 函数返回值（`RETURN` 写入） |
| `RESULTS` | Str 一维数组 | 函数字符串返回值 |
| `RESULTF` | Float 一维数组 | 函数浮点返回值（Skia 新增） |
| `ARG` | Int 一维数组 | 函数整数参数 |
| `ARGS` | Str 一维数组 | 函数字符串参数 |
| `ARGF` | Float 一维数组 | 函数浮点参数（Skia 新增） |
| `COUNT` | Int | 循环计数器（`REPEAT` 使用） |
| `TARGET` | Int | 当前交互角色编号 |
| `MASTER` | Int | 主角编号（通常为 0） |
| `ASSI` | Int | 助手角色编号 |
| `MONEY` | Int | 金钱 |
| `DAY` | Int | 经过天数 |
| `TIME` | Int | 时刻 |
| `LOCAL` | Int 一维数组 | 函数局部整数变量（⚠过时，新游戏建议 `#DIM` 替代，VariableSize.csv 设 -1 禁用） |
| `LOCALS` | Str 一维数组 | 函数局部字符串变量（⚠过时，新游戏建议 `#DIMS` 替代，VariableSize.csv 设 -1 禁用） |
| `LOCALF` | Float 一维数组 | 函数局部浮点变量（Skia 新增） |

> 完整内置变量列表见 [变量规格](../Emuera/variables.zh.md)。

### A~Z 保留变量

**A~Z 这 26 个单字母变量是引擎内置的泛用整数数组，绝对不能用于 `#DIM` 声明！**

```erb
; ❌ 错误：A~Z 是引擎内置变量
#DIM A
#DIM X

; ✅ 正确：使用 L_ 前缀避免冲突
#DIM L_A
#DIM L_X
```

这些变量在 `VariableCode` 中定义为 `__INTEGER__ | __ARRAY_1D__` 类型，是引擎预留的泛用存储空间。你可以在代码中直接使用 `A:0`、`B:5` 等，但不能用 `#DIM` 重新声明它们。

### 私有变量声明

使用 `#DIM`/`#DIMS`/`#DIMF` 在函数内声明私有变量：

```erb
@MY_FUNC(ARG:0)
#DIM L_COUNT, 10          ; 私有整数数组，10 个元素
#DIMS L_NAME              ; 私有字符串标量
#DIMF L_SCORE             ; 私有浮点标量（Skia 新增）
    L_COUNT:0 = ARG:0
    L_NAME '= "测试"
    L_SCORE = 0.0
RETURN
```

!!! warning "#DIM 必须紧跟 @ 标签行"

    ```erb
    ; ❌ 错误：#DIM 出现在函数体中间
    @MY_FUNC
        PRINTL 开始
        #DIM X, 10        ; → 警告

    ; ✅ 正确：#DIM 紧跟 @ 行
    @MY_FUNC
    #DIM X, 10
        PRINTL 开始
    ```

> 详见 [行类型与结构](line-types.zh.md) 和 [ERB 文件格式扩展](erb-format-extension.zh.md)。

### 数组访问

变量名后用 `:` 加索引访问数组元素：

```erb
; 一维数组
A:0 = 100
A:5 = 200
L_COUNT:3 = 42

; 二维数组
DA:0:0 = 1
DA:0:1 = 2

; 用变量做索引
#DIM L_IDX = 5
PRINTVL A:L_IDX           ; 输出 A:5 的值

; 用字符串索引（CSV 中定义了名称映射时）
ABL:0 += 1                ; 数值索引
ABL:"技巧" += 1           ; 字符串索引（如果 abl.csv 中有定义）
```

---

## 类型转换

三种类型之间不会自动转换（除 Int→Float 的安全提升）。跨类型操作必须使用显式转换函数。

### 隐式转换

唯一的隐式转换发生在**实参→形参绑定**时：

| 实参类型 | 形参类型 | 行为 |
|---------|---------|------|
| Integer | Float | ✅ 安全提升 |
| 其他组合 | — | ❌ 阻止 |

```erb
@FLOAT_FUNC(ARGF:0)
#FUNCTIONF
    RETURNF ARGF:0 * 2.0

; ✅ 整数 5 自动提升为浮点 5.0
RESULTF = FLOAT_FUNC(5)
```

### 显式转换函数（TO 系列） { #类型转换函数 }

| 函数 | 功能 | 示例 | 结果 |
|------|------|------|------|
| `TOSTR(int)` | 整数→字符串 | `TOSTR(42)` | `"42"` |
| `TOSTR(int, fmt)` | 整数→字符串（格式化） | `TOSTR(42, "D4")` | `"0042"` |
| `TOSTR(int, "X")` | 整数→十六进制字符串 | `TOSTR(255, "X")` | `"FF"` |
| `TOSTRF(float)` | 浮点→字符串（Skia 新增） | `TOSTRF(3.14)` | `"3.14"` |
| `TOSTRF(float, fmt)` | 浮点→字符串（格式化） | `TOSTRF(3.14, "F2")` | `"3.14"` |
| `TOINT(str)` | 字符串→整数 | `TOINT("42")` | `42` |
| `TOINT(float)` | 浮点→整数（Skia 扩展） | `TOINT(3.7)` | `3`（截断） |
| `TOFLOAT(str)` | 字符串→浮点（Skia 新增） | `TOFLOAT("3.14")` | `3.14` |

### 类型转换完整对照

| 源 → 目标 | 隐式 | 显式函数 | 备注 |
|-----------|------|---------|------|
| Int → Str | ❌ | `TOSTR(i)` | 原版 |
| Int → Float | ✅ | — | 安全提升 |
| Str → Int | ❌ | `TOINT(s)` | 解析失败→0 |
| Str → Float | ❌ | `TOFLOAT(s)` | Skia 新增；解析失败→0.0 |
| Float → Str | ❌ | `TOSTRF(f)` | Skia 新增 |
| Float → Int | ❌ | `TOINT(f)` | Skia 扩展；直接截断 |

### 转换示例

```erb
; 整数 → 字符串
#DIMS L_STR
L_STR '= TOSTR(42)             ; → "42"
L_STR '= TOSTR(42, "D4")       ; → "0042"（4 位补零）
L_STR '= TOSTR(255, "X")       ; → "FF"（十六进制）

; 字符串 → 整数
#DIM L_INT
L_INT = TOINT("42")            ; → 42
L_INT = TOINT("abc")           ; → 0（解析失败）
L_INT = TOINT("")              ; → 0（空字符串）

; 浮点 → 字符串（Skia 新增）
#DIMF L_PI = 3.14159265
L_STR '= TOSTRF(L_PI)          ; → "3.14159265"
L_STR '= TOSTRF(L_PI, "F2")    ; → "3.14"
L_STR '= TOSTRF(L_PI, "E")     ; → "3.141593E+000"

; 字符串 → 浮点（Skia 新增）
#DIMF L_F
L_F = TOFLOAT("3.14")          ; → 3.14
L_F = TOFLOAT("-1.5e2")        ; → -150.0
L_F = TOFLOAT("abc")           ; → 0.0（解析失败）

; 浮点 → 整数（Skia 扩展）
L_INT = TOINT(3.7)             ; → 3（截断，非四舍五入）
L_INT = TOINT(-2.9)            ; → -2（向零截断）
```

!!! warning "TOINT 对浮点是截断，不是四舍五入"

    `TOINT(3.7)` 返回 `3`，不是 `4`。源码实现为 `(long)GetFloatValue()`，即 C# 的直接强制转换，向零截断。

### 在 FORM 语法中使用转换

当需要在格式化字符串中插入非整数类型的值时，转换函数特别有用：

```erb
; 在 PRINTFORM 中插入浮点值（Skia 变体）
#DIMF L_PI = 3.14159265
PRINTFORML 圆周率：{TOSTRF(L_PI, "F2")}    ; → "圆周率：3.14"

; 在字符串赋值中拼接
#DIMS L_MSG
L_MSG = 圆周率是{TOSTRF(L_PI, "F4")}       ; FORM 语法，{...} 插值
L_MSG '= "圆周率是" + TOSTRF(L_PI, "F4")   ; 表达式语法，拼接
```

> FORM 语法的完整说明见 [FORM 语法](form-syntax.zh.md)。

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| A-Z 做变量名 | `#DIM A` | `#DIM L_A` | A~Z 是引擎内置泛用变量 |
| 字符串不加引号 | `S '= hello` | `S '= "hello"` | 不加引号会被当作变量名 |
| 整数赋给字符串 | `S = 42` | `S '= TOSTR(42)` | 类型不匹配 |
| 浮点赋给整数 | `X = 3.14` | `X = TOINT(3.14)` | 浮点赋给整数会截断为 3 |
| 期望四舍五入 | `TOINT(3.7)` 期望 4 | 手动实现：`TOINT(3.7 + 0.5)` | TOINT 是截断不是四舍五入 |
| 整数除法意外 | `10 / 3` 期望 3.33 | `10 / 3.0` | 除法操作数全为整数时是整数除法 |
| FORM 中意外插值 | `S = 100%` | `S = 100\%` 或 `S '= "100%"` | `%` 在 FORM 语法中是变量替换符 |
| #DIM 位置错误 | `@F` → `PRINTL` → `#DIM` | `@F` → `#DIM` → `PRINTL` | #DIM 必须紧跟 @ 行 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 赋值的完整语法 | [赋值语句](assignment.zh.md) |
| 格式化字符串详解 | [FORM 语法](form-syntax.zh.md) |
| 变量声明系统（CONST/DYNAMIC/REF/OUT 等） | [变量声明系统](variable-declaration.zh.md) |
| 内置变量完整列表 | [变量规格](../Emuera/variables.zh.md) |
| 运算符与表达式 | [运算](../Emuera/operand.zh.md) |
