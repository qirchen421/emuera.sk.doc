# 基本输出

!!! info "本节对应手册"

    - **Reference 分类**: [PRINT 系列](../Reference/README.zh.md#print) / [显示操作・字体操作](../Reference/README.zh.md#display-font)
    - [PRINT 系列](../Reference/PRINT.zh.md) — PRINT 指令完整 API 参考
    - [PRINTSINGLE 系列](../Reference/PRINTSINGLE.zh.md) — 单行输出指令
    - [PRINTDATA 系列](../Reference/PRINTDATA.zh.md) — 数据输出指令

***

## 概述

输出是 ERABASIC 程序与玩家交互的基本方式。所有输出通过 PRINT 系列指令完成，它们遵循统一的命名规则：

```
PRINT(参数类型)(修饰)(行为后缀)
```

| 组成部分     | 选项                       | 含义                     |
| -------- | ------------------------ | ---------------------- |
| **参数类型** | 无 / V / S / FORM / FORMS | 决定参数的解析方式              |
| **修饰**   | K / D                    | K=强制假名转换，D=忽略 SETCOLOR |
| **行为后缀** | 无 / L / W / N            | 是否换行、是否等待输入            |

!!! note "eramaker 兼容性"
    `PRINT`/`PRINTL`/`PRINTW`/`PRINTV`/`PRINTVL`/`PRINTS`/`PRINTSL`/`PRINTFORM`/`PRINTFORML`/`PRINTFORMW` 是 eramaker 就存在的功能。`PRINTK`/`PRINTD`/`PRINTDATA` 系列/`PRINTSINGLE` 系列等是 Emuera 的扩展功能。

***

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

***

## 参数类型：五种 PRINT 变体

PRINT 系列指令根据参数类型分为五种变体，每种对参数的解析方式不同：

| 指令           | 参数类型      | 参数解析方式             | 示例                      |
| ------------ | --------- | ------------------ | ----------------------- |
| `PRINT`      | 简单字符串     | 原样输出，不做替换          | `PRINT 你好`              |
| `PRINTV`     | 表达式列表（每个独立求值） | 整数→数值，字符串→文本，自动拼接 | `PRINTV A + B, "点"`      |
| `PRINTS`     | 字符串表达式    | 求值后输出              | `PRINTS NAME:TARGET`    |
| `PRINTFORM`  | 格式化字符串    | FORM 语法，支持插值       | `PRINTFORM 你好，%NAME%！`  |
| `PRINTFORMS` | 格式化字符串表达式 | 先求值为字符串，再按 FORM 解析 | `PRINTFORMS L_TEMPLATE` |

### PRINT — 简单字符串

`PRINT` 将后面的文本原样输出，不做任何变量替换：

```erb
PRINT 你好，世界          ; → 你好，世界
PRINT %NAME%              ; → %NAME%（百分号是字面文本！）
PRINT %RESULTS%           ; → %RESULTS%（百分号是字面文本！）
```

!!! warning "PRINT 不做变量替换"

```
`PRINT` 后面的文本是纯文本，`{变量}` 和 `%变量%` 不会被替换。需要变量替换时请使用 `PRINTFORM`。
```

### PRINTV — 表达式（整数·字符串）

`PRINTV` 将后面的内容作为**表达式**求值，输出结果。每个参数独立求值：**整数表达式输出数值，字符串表达式输出文本**：

```erb
#DIM L_VAL = 42
PRINTV L_VAL              ; → 42
PRINTV L_VAL * 2          ; → 84
PRINTV 10 + 20            ; → 30

#DIMS L_NAME = "艾莉娜"
PRINTV L_NAME             ; → 艾莉娜（字符串变量）
PRINTV L_NAME + "的冒险"  ; → 艾莉娜的冒险（字符串表达式）
```

`PRINTV` 可以接受多个表达式，用逗号分隔，输出时拼接在一起。每个参数的类型可以不同：

```erb
PRINTV L_VAL, "点"        ; → 42点（整数 + 字符串）
PRINTV L_VAL, "点", L_NAME ; → 42点艾莉娜（整数 + 字符串 + 字符串变量）
```

!!! tip "PRINTV 的参数是表达式，不是 FORM 字符串"

```
`PRINTV` 使用 `SP_PRINTV_ArgumentBuilder`，将参数解析为表达式列表。
每个参数项独立求值：整数表达式输出数值，字符串表达式输出文本。
因此 `PRINTV` 可以同时混合整数和字符串参数，无需统一类型。
```

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

| FORM 语法         | 功能        | 示例                                 |
| --------------- | --------- | ---------------------------------- |
| `{表达式}`         | 整数/浮点插值   | `{MONEY}` → `500`                  |
| `{表达式,宽度}`      | 带填充的插值    | `{MONEY,8}` →      `     500`      |
| `{表达式,宽度,LEFT}` | 左对齐填充     | `{MONEY,8,LEFT}` → `500     `      |
| `%表达式%`         | 字符串插值     | `%NAME%` → `艾莉娜`                   |
| `%表达式,宽度%`      | 带填充的字符串插值 | `%NAME%,10%` →     `    艾莉娜`       |

> FORM 语法的完整说明见 [FORM 语法](form-syntax.zh.md)。

### PRINTFORMS — 格式化字符串表达式

`PRINTFORMS` 先将参数作为字符串表达式求值，再对结果做 FORM 解析——也就是说，你可以用表达式动态构建出 FORM 语法字符串，就像拼接 HTML 一样：

```erb
; 甚至 %...% 中的变量名也是动态构建的
#DIMS L_VARNAME = "NAME:TARGET"
#DIMS L_TEMPLATE
L_TEMPLATE '= "你好，%" + L_VARNAME + "%！"
; L_TEMPLATE 求值后 → "你好，%NAME:TARGET%！"

PRINTFORMS L_TEMPLATE      ; 先求值 L_TEMPLATE，再 FORM 解析 → 你好，艾莉娜！
```

`PRINTFORMS` 与 `PRINTFORM` 的区别：

| <br /> |   `PRINTFORM`  |      `PRINTFORMS`     |
| ------ | :------------: | :-------------------: |
| 参数     | FORM 字符串（直接解析） | 字符串表达式（先求值，再 FORM 解析） |
| 典型用途   |      固定模板      | 动态模板（运行时构建的 FORM 字符串） |

***

## 行为后缀：L / W / N

所有 PRINT 变体都可以添加行为后缀，控制输出后的动作：

| 后缀  | 含义                    | 示例          |
| --- | --------------------- | ----------- |
| 无   | 不换行，不等待               | `PRINT 你好`  |
| `L` | 输出后换行                 | `PRINTL 你好` |
| `W` | 输出后换行并等待玩家按键          | `PRINTW 你好` |
| `N` | 不换行但等待玩家按键（DotNet 新增） | `PRINTN 你好` |

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

```
`PRINTW` = `PRINTL` + `WAIT`。`WAIT` 单独使用时也会等待玩家按键，但不会输出任何文本。
```

### PRINTN — 不换行但等待按键

```erb
PRINTN 按任意键继续...
PRINTL 继续后的文本
; 按键前显示：按任意键继续...
; 按键后显示：按任意键继续...继续后的文本（同一行）
```

`PRINTN` = `PRINT` + `N`（No line end）。与 `PRINTW` 不同——`PRINTW` 输出后换行并等待按键；`PRINTN` 输出后等待按键，但**结束行时标记为"未结束"**，后续输出会水平接在当前行末尾，而不是另起一行。

!!! tip "PRINTN 的典型用途"

    PRINTN 适合需要行内等待的场景，例如逐步展开的文本演出、需要玩家确认后才显示后续内容的对话行等。

    ```erb
    ; 错误：用 PRINT + WAIT 模拟行内等待
    PRINT 请稍候...
    WAIT
    ; → WAIT 前的内容在 buffer 中不可见，按键后才被冲到屏幕并强制换行

    ; 正确：用 PRINTN 实现行内等待
    PRINTN 请稍候...
    ; → 文本立即显示，等待按键，后续内容同行追加
    ```

> `PRINTN` 是 DotNet 新增的行为后缀，由emuera.EM引入支持。

***

## 输出数值

### PRINTVL — 输出表达式并换行

`PRINTVL` 是 `PRINTV` + `L` 的组合，输出表达式的值并换行（整数表达式→数值，字符串表达式→文本）：

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

浮点数在 `{}` 中默认使用 `ToString()` 格式输出，但 `{}` 不支持精度控制。如需指定精度，须用 `TOSTRF` 函数将浮点转为字符串，再通过 `%` 替换输出（`TOSTRF` 返回字符串，必须用 `%...%` 而非 `{}`）：

```erb
#DIMF L_PI = 3.14159265
PRINTFORML 圆周率：{L_PI}                ; → 圆周率：3.14159265（{} 默认格式，无精度控制）
PRINTFORML 圆周率：%TOSTRF(L_PI, "F2")%   ; → 圆周率：3.14（%...% 字符串替换 + TOSTRF 精度控制）
```

***

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

### TEXT\_BGC\_ON / TEXT\_BGC\_OFF — 文本背景色（SK 专属）

Skia 版提供 `TEXT_BGC_ON` / `TEXT_BGC_OFF` 为整行设置背景色：

```erb
TEXT_BGC_ON 255, 0, 0, 30       ; 红色背景，30% 不透明度
PRINTL 这行有红色背景
TEXT_BGC_OFF                     ; 关闭背景色
```

详见 [TEXT\_BGC 参考手册](../Reference/TEXT_BGC.zh.md)。

***

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

### PRINTPLAIN — 不生成按钮的输出 { #prinTPLAIN-overview }

`PRINTPLAIN` 的 `PLAIN` 修饰语义是**不生成按钮**——文本中的 `[数值]` 不会被转换为可点击的交互按钮。

`PLAIN` 与 `FORM` 是两个**正交**的修饰维度，可以自由组合：

| 维度 | 控制什么 | 可选值 |
|------|---------|-------|
| `FORM` | 是否做 `%变量%`/`{表达式}` 插值 | 有 = 做插值（`FORM_STR` 参数类型）/ 无 = 不做插值（`STR` 参数类型） |
| `PLAIN` | 是否将 `[数值]` 转换为按钮 | 有 = 不生成按钮 / 无 = 正常生成按钮 |

具体组合如下：

| 指令 | 参数类型 | FORM 插值 | 生成按钮 |
|------|---------|:--------:|:--------:|
| `PRINT` | `STR` | ❌ | ✅ |
| `PRINTFORM` | `FORM_STR` | ✅ | ✅ |
| `PRINTPLAIN` | `STR_NULLABLE` | ❌ | ❌ |
| `PRINTPLAINFORM` | `FORM_STR_NULLABLE` | ✅ | ❌ |

`PRINTPLAIN` 使用 `STR_NULLABLE` 参数类型（同 `PRINT` 一样不做 FORM 插值），同时 `PLAIN` 修饰使其不生成按钮：

```erb
PRINTPLAIN %NAME%           ; → %NAME%（STR_NULLABLE，不做 FORM 插值；PLAIN，不生成按钮）
PRINTPLAINFORM %NAME%       ; → 艾莉娜（FORM_STR_NULLABLE，做 FORM 插值；PLAIN，不生成按钮）
```

这意味着在 `INPUT` 阻塞时，`[0]`、`[100]` 等将保持为纯文本，用户无法通过点击输入数值，必须手动键入：

```erb
PRINT [0] 点击我           ; → 可点击按钮，点击自动输入 0
PRINTPLAIN [0] 不能点我    ; → 纯文本，不可点击，必须手动输入
INPUT
```

详细机制见 [输出中的按钮——PRINTPLAIN](#prinTPLAIN) 和 [PRINTPLAIN 参考手册](../Reference/PRINTPLAIN.zh.md)。

***

## PRINT 系列速查表

| 指令                | 参数类型        | 换行   | 等价写法                  |
| ----------------- | ----------- | ---- | --------------------- |
| `PRINT 文本`        | 简单字符串       | ❌    | —                     |
| `PRINTL 文本`       | 简单字符串       | ✅    | `PRINT` + 换行          |
| `PRINTW 文本`       | 简单字符串       | ✅+等待 | `PRINTL` + `WAIT`     |
| `PRINTN 文本`       | 简单字符串       | ❌（行合并） | `PRINT` + 入屏 + `WAIT` + 行合并 |
| `PRINTV 表达式`      | 表达式（整数·字符串） | ❌    | —                     |
| `PRINTVL 表达式`     | 表达式（整数·字符串） | ✅    | `PRINTV` + 换行         |
| `PRINTS 表达式`      | 字符串表达式      | ❌    | —                     |
| `PRINTSL 表达式`     | 字符串表达式      | ✅    | `PRINTS` + 换行         |
| `PRINTFORM 格式串`   | FORM 字符串    | ❌    | —                     |
| `PRINTFORML 格式串`  | FORM 字符串    | ✅    | `PRINTFORM` + 换行      |
| `PRINTFORMW 格式串`  | FORM 字符串    | ✅+等待 | `PRINTFORML` + `WAIT` |
| `PRINTFORMS 表达式`  | FORM 字符串表达式 | ❌    | —                     |
| `PRINTFORMSL 表达式` | FORM 字符串表达式 | ✅    | `PRINTFORMS` + 换行     |

***

## 输出中的按钮

### `[N]` 自动按钮

在 [Hello World](hello-world.zh.md) 中你已经见过 `[0]` 自动变成按钮的写法。这里补充更多细节：

**识别规则**：`[整数]` 模式会被引擎自动识别为按钮核。只有整数才有效——`[abc]`、`[1.5]`、`[]` 都不会生成按钮。

**按钮范围**：当一行只有一个 `[N]` 时，**整行都是按钮区域**：

```erb
PRINTL [0] 开始游戏     ; 点击 "开始游戏" 或 "[0]" 都等效于输入 0
```

**多按钮行**：一行有多个 `[N]` 时，引擎按空格间隔拆分为独立按钮：

```erb
PRINT [0] 是    [1] 否
INPUT
; 两个独立按钮：点击 "是" → RESULT=0，点击 "否" → RESULT=1
```

!!! warning "多按钮拆分的边界情况"

```
当一行中 `[N]` 和说明文字的排列不规则时，自动拆分可能不符合预期。此时应使用 `PRINTBUTTON` 显式创建按钮（见 [HTML 标签语法](html-syntax.zh.md)）。
```

### PRINTPLAIN — 不生成按钮的输出 { #prinTPLAIN }

`PRINTPLAIN` 输出文本但**不生成按钮**，即使文本包含 `[0]`：

```erb
PRINTPLAIN [0] 这不是按钮    ; 原样输出，不可点击
```

**关键区别**：在 `INPUT` 阻塞场景下，`PRINT [0] 点击` 生成的按钮可点击并自动传递 `0` 给 `INPUT`；而 `PRINTPLAIN [0] 不可点击` 中的 `[0]` 只是普通文本——用户必须手动输入 `0` 才能被 `INPUT` 接收。详解见 "其他输出指令" 一节的 [PRINTPLAIN — 不生成按钮的输出](#prinTPLAIN-overview)。

`PRINTPLAINFORM` 版同理：`PRINTPLAINFORM 价格为 {PRICE} 元，选择 [1] 购买` 中的 `[1]` 也**不会**生成按钮。`PRINTPLAINFORM` 同时会做 FORM 插值（`{PRICE}` 会被展开为数值）。

***

## 常见陷阱

| 陷阱            | 错误写法              | 正确写法                          | 原因                |
| ------------- | ----------------- | ----------------------------- | ----------------- |
| PRINT 期望变量替换  | `PRINT %NAME%`    | `PRINTFORM %NAME%`            | PRINT 不做 FORM 插值  |
| PRINTS 不加引号   | `PRINTS hello`    | `PRINTS "hello"`              | 不加引号会被当作变量名       |
| 忘记换行          | `PRINT 你好`        | `PRINTL 你好`                   | PRINT 不换行，内容会粘在一起 |
| FORM 中浮点精度    | `PRINTFORM {PI}`  | `PRINTFORM %TOSTRF(PI,"F2")%` | `{}` 对浮点无精度控制；TOSTRF 返回字符串，须用 `%...%` |
| `[abc]` 期望变按钮 | `PRINTL [abc] 选项` | `PRINTL [0] 选项` | 只有 `[整数]` 才生成按钮 |
| `PRINTPLAIN` 期望有按钮 | `PRINTPLAIN [0] 确定 [1] 取消\nINPUT` | `PRINT [0] 确定 [1] 取消\nINPUT` | `PRINTPLAIN` 不生成按钮，用户必须手动输入 |

***

## 下一步

| 你想了解什么       | 前往                                   |
| :----------- | :----------------------------------- |
| FORM 语法详解    | [FORM 语法](form-syntax.zh.md)         |
| 赋值语句         | [赋值语句](assignment.zh.md)             |
| 值、类型与变量      | [值、类型与变量](values-types.zh.md)        |
| 输入与等待        | [INPUT 指令](../Reference/INPUT.zh.md) |
| PRINT 完整 API | [PRINT 系列](../Reference/PRINT.zh.md) |

