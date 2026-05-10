# 基本输出

!!! info "本节对应手册"

    - [PRINT 系列](../Reference/PRINT.zh.md) — PRINT 指令完整 API 参考
    - [PRINTSINGLE 系列](../Reference/PRINTSINGLE.zh.md) — 单行输出指令
    - [PRINTDATA 系列](../Reference/PRINTDATA.zh.md) — 数据输出指令

---

## 概述

输出是 ERABASIC 程序与玩家交互的基本方式。所有输出通过 PRINT 系列指令完成，它们遵循统一的命名规则：

```
PRINT(参数类型)(修饰)(行为后缀)
```

| 组成部分 | 选项 | 含义 |
|---------|------|------|
| **参数类型** | 无 / V / S / FORM / FORMS | 决定参数的解析方式 |
| **修饰** | K / D | K=强制假名转换，D=忽略 SETCOLOR |
| **行为后缀** | 无 / L / W / N | 是否换行、是否等待输入 |

---

## 最基本的输出

### PRINT — 输出不换行

```erb
PRINT 你好
PRINT 世界
; 输出：你好世界（不换行，两段文本连在一起）
```

`PRINT` 后面的文本是**简单字符串**——不需要引号包裹，也不做任何变量替换。

### PRINTL — 输出并换行

```erb
PRINTL 你好
PRINTL 世界
; 输出：
; 你好
; 世界
```

`PRINTL` = `PRINT` + `L`（Line），是最常用的输出指令。每次输出后自动换行。

### 单独换行

```erb
PRINTL              ; 输出一个空行
```

`PRINTL` 不带参数时仅输出换行。

---

## 参数类型：五种 PRINT 变体

PRINT 系列指令根据参数类型分为五种变体，每种对参数的解析方式不同：

| 指令 | 参数类型 | 参数解析方式 | 示例 |
|------|---------|------------|------|
| `PRINT` | 简单字符串 | 原样输出，不做替换 | `PRINT 你好` |
| `PRINTV` | 整数表达式 | 求值后输出 | `PRINTV A + B` |
| `PRINTS` | 字符串表达式 | 求值后输出 | `PRINTS NAME:TARGET` |
| `PRINTFORM` | 格式化字符串 | FORM 语法，支持插值 | `PRINTFORM 你好，%NAME%！` |
| `PRINTFORMS` | 格式化字符串表达式 | 先求值为字符串，再按 FORM 解析 | `PRINTFORMS @"你好，%NAME%！"` |

### PRINT — 简单字符串

`PRINT` 将后面的文本原样输出，不做任何变量替换：

```erb
PRINT 你好，世界          ; → 你好，世界
PRINT %NAME%              ; → %NAME%（百分号是字面文本！）
PRINT %RESULTS%           ; → %RESULTS%（百分号是字面文本！）
```

!!! warning "PRINT 不做变量替换"

    `PRINT` 后面的文本是纯文本，`{变量}` 和 `%变量%` 不会被替换。需要变量替换时请使用 `PRINTFORM`。

### PRINTV — 整数表达式

`PRINTV` 将后面的内容作为**整数表达式**求值，输出结果：

```erb
#DIM L_VAL = 42
PRINTV L_VAL              ; → 42
PRINTV L_VAL * 2          ; → 84
PRINTV 10 + 20            ; → 30
```

`PRINTV` 可以接受多个表达式，用空格或逗号分隔，输出时拼接在一起：

```erb
PRINTV L_VAL "点"         ; → 42点（整数和字符串表达式拼接）
```

!!! tip "PRINTV 的参数是表达式，不是 FORM 字符串"

    `PRINTV` 使用 `SP_PRINTV_ArgumentBuilder`，将参数解析为表达式列表。
    整数表达式输出数值，字符串表达式输出文本。

### PRINTS — 字符串表达式

`PRINTS` 将后面的内容作为**字符串表达式**求值，输出结果：

```erb
#DIMS L_NAME '= "艾莉娜"
PRINTS L_NAME             ; → 艾莉娜
PRINTS L_NAME + "的冒险"  ; → 艾莉娜的冒险
PRINTS "Hello"            ; → Hello
```

### PRINTFORM — 格式化字符串

`PRINTFORM` 是最常用的格式化输出指令，支持 FORM 语法的变量替换：

```erb
#DIM L_MONEY = 500
PRINTFORM 你好，%NAME:TARGET%！       ; → 你好，艾莉娜！
PRINTFORM 金钱：{L_MONEY}元            ; → 金钱：500元
PRINTFORM %NAME:TARGET%的冒险          ; → 艾莉娜的冒险
```

| FORM 语法 | 功能 | 示例 |
|-----------|------|------|
| `{表达式}` | 整数/浮点插值 | `{MONEY}` → `500` |
| `{表达式,宽度}` | 带填充的插值 | `{MONEY,8}` → `     500` |
| `{表达式,宽度,LEFT}` | 左对齐填充 | `{MONEY,8,LEFT}` → `500     ` |
| `%表达式%` | 字符串插值 | `%NAME%` → `艾莉娜` |
| `%表达式,宽度%` | 带填充的字符串插值 | `%NAME%,10%` → `    艾莉娜` |

> FORM 语法的完整说明见 [FORM 语法](form-syntax.zh.md)。

### PRINTFORMS — 格式化字符串表达式

`PRINTFORMS` 先将参数作为字符串表达式求值，再对结果做 FORM 解析：

```erb
#DIMS L_FMT '= "你好，%NAME:TARGET%！"
PRINTFORMS L_FMT           ; → 你好，艾莉娜！（先求值 L_FMT，再 FORM 解析）
PRINTFORMS @"%L_FMT%"      ; 等价写法
```

`PRINTFORMS` 与 `PRINTFORM` 的区别：

| | `PRINTFORM` | `PRINTFORMS` |
|------|:---:|:---:|
| 参数 | FORM 字符串（直接解析） | 字符串表达式（先求值，再 FORM 解析） |
| 典型用途 | 固定模板 | 动态模板（运行时构建的 FORM 字符串） |

---

## 行为后缀：L / W / N

所有 PRINT 变体都可以添加行为后缀，控制输出后的动作：

| 后缀 | 含义 | 示例 |
|------|------|------|
| 无 | 不换行，不等待 | `PRINT 你好` |
| `L` | 输出后换行 | `PRINTL 你好` |
| `W` | 输出后换行并等待玩家按键 | `PRINTW 你好` |
| `N` | 不换行但等待玩家按键（Emuera 新增） | `PRINTN 你好` |

### 组合示例

```erb
; PRINTFORM + L = PRINTFORML
PRINTFORML 你好，%NAME:TARGET%！

; PRINTS + W = PRINTSW
PRINTSW "按任意键继续..."

; PRINTV + L = PRINTVL
PRINTVL A + B
```

!!! tip "PRINTW 和 WAIT 的区别"

    `PRINTW` = `PRINTL` + `WAIT`。`WAIT` 单独使用时也会等待玩家按键，但不会输出任何文本。

---

## 输出数值

### PRINTVL — 输出整数并换行

`PRINTVL` 是 `PRINTV` + `L` 的组合，输出整数表达式的值并换行：

```erb
#DIM L_VAL = 42
PRINTVL L_VAL              ; → 42
PRINTVL L_VAL * 2 + 1      ; → 85
```

### 在 FORM 字符串中输出数值

使用 `{表达式}` 在格式化字符串中插入数值：

```erb
#DIM L_HP = 80
#DIM L_MAXHP = 100
PRINTFORML HP：{L_HP}/{L_MAXHP}        ; → HP：80/100
PRINTFORML HP：{L_HP,5}/{L_MAXHP,5}    ; → HP：   80/  100
```

### 输出浮点数（Skia 变体）

浮点数在 `{}` 中默认使用 `ToString()` 格式输出。如需控制精度，使用 `TOSTRF` 函数：

```erb
#DIMF L_PI = 3.14159265
PRINTFORML 圆周率：{L_PI}              ; → 圆周率：3.14159265
PRINTFORML 圆周率：{TOSTRF(L_PI, "F2")} ; → 圆周率：3.14
```

---

## 输出颜色

### SETCOLOR — 设置文字颜色

```erb
SETCOLOR 0xFF0000          ; 红色（RGB 十六进制）
PRINTL 这是红色文字
SETCOLOR 0x00FF00          ; 绿色
PRINTL 这是绿色文字
SETCOLORBYNAME yellow      ; 用颜色名设置
PRINTL 这是黄色文字
RESETCOLOR                 ; 恢复默认颜色
```

### PRINTD — 忽略颜色设置

`PRINTD` 系列忽略 `SETCOLOR` 设置，始终以默认颜色输出：

```erb
SETCOLOR 0xFF0000
PRINTL 这是红色
PRINTDL 这是默认颜色（忽略 SETCOLOR）
```

### TEXT_BGC_ON / TEXT_BGC_OFF — 文本背景色（SK 专属）

Skia 版提供 `TEXT_BGC_ON` / `TEXT_BGC_OFF` 为整行设置背景色：

```erb
TEXT_BGC_ON 255, 0, 0, 30       ; 红色背景，30% 不透明度
PRINTL 这行有红色背景
TEXT_BGC_OFF                     ; 关闭背景色
```

详见 [TEXT_BGC 参考手册](../Reference/TEXT_BGC.zh.md)。

---

## 其他输出指令

### DRAWLINE — 绘制分隔线

```erb
DRAWLINE                    ; 绘制一条横线
```

### PRINTSINGLE — 单行输出

`PRINTSINGLE` 系列始终在一行内显示，超出屏幕边缘的字符不显示。自动换行，没有 L/W 后缀：

```erb
PRINTSINGLEFORM 很长很长的文本...    ; 不折行，超宽部分截断
```

### PRINTDATA — 数据输出

`PRINTDATA` 从多个 `DATA` 项中随机选择一个输出：

```erb
PRINTDATA
    DATA 苹果
    DATA 橘子
    DATA 香蕉
ENDDATA
; 随机输出其中一种水果
```

### PRINTPLAIN — 原样输出

`PRINTPLAIN` 不做 FORM 解析，原样输出字符串（包括 `{` 和 `%`）：

```erb
PRINTPLAIN %NAME%           ; → %NAME%（不插值）
```

---

## PRINT 系列速查表

| 指令 | 参数类型 | 换行 | 等价写法 |
|------|---------|------|---------|
| `PRINT 文本` | 简单字符串 | ❌ | — |
| `PRINTL 文本` | 简单字符串 | ✅ | `PRINT` + 换行 |
| `PRINTW 文本` | 简单字符串 | ✅+等待 | `PRINTL` + `WAIT` |
| `PRINTV 表达式` | 整数表达式 | ❌ | — |
| `PRINTVL 表达式` | 整数表达式 | ✅ | `PRINTV` + 换行 |
| `PRINTS 表达式` | 字符串表达式 | ❌ | — |
| `PRINTSL 表达式` | 字符串表达式 | ✅ | `PRINTS` + 换行 |
| `PRINTFORM 格式串` | FORM 字符串 | ❌ | — |
| `PRINTFORML 格式串` | FORM 字符串 | ✅ | `PRINTFORM` + 换行 |
| `PRINTFORMW 格式串` | FORM 字符串 | ✅+等待 | `PRINTFORML` + `WAIT` |
| `PRINTFORMS 表达式` | FORM 字符串表达式 | ❌ | — |
| `PRINTFORMSL 表达式` | FORM 字符串表达式 | ✅ | `PRINTFORMS` + 换行 |

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| PRINT 期望变量替换 | `PRINT %NAME%` | `PRINTFORM %NAME%` | PRINT 不做 FORM 插值 |
| PRINTV 输出字符串 | `PRINTV "hello"` | `PRINTS "hello"` | PRINTV 是整数表达式 |
| PRINTS 不加引号 | `PRINTS hello` | `PRINTS "hello"` | 不加引号会被当作变量名 |
| 忘记换行 | `PRINT 你好` | `PRINTL 你好` | PRINT 不换行，内容会粘在一起 |
| FORM 中浮点精度 | `PRINTFORM {PI}` | `PRINTFORM {TOSTRF(PI,"F2")}` | `{}` 对浮点无精度控制 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| FORM 语法详解 | [FORM 语法](form-syntax.zh.md) |
| 赋值语句 | [赋值语句](assignment.zh.md) |
| 值、类型与变量 | [值、类型与变量](values-types.zh.md) |
| 输入与等待 | [INPUT 指令](../Reference/INPUT.zh.md) |
| PRINT 完整 API | [PRINT 系列](../Reference/PRINT.zh.md) |
