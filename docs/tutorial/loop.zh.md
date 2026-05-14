# 循环

!!! info "本节对应手册"

    - **Reference 分类**: [循环・分支语法](../Reference/README.zh.md#flow-control)
    - [REPEAT ~ REND](../Reference/REPEAT.zh.md) — 计数循环 API 参考
    - [FOR ~ NEXT](../Reference/FOR.zh.md) — 通用计数循环 API 参考
    - [WHILE ~ WEND](../Reference/WHILE.zh.md) — 前置条件循环 API 参考
    - [DO ~ LOOP](../Reference/DO.zh.md) — 后置条件循环 API 参考
    - [CONTINUE / BREAK](../Reference/CONTINUE.zh.md) — 循环控制 API 参考

---

## 概述

ERABASIC 提供四种循环结构：

| 结构 | 特点 | 适用场景 |
|------|------|---------|
| `REPEAT` ~ `REND` | 固定次数，用 `COUNT` 计数 | 已知循环次数 |
| `FOR` ~ `NEXT` | 自定义计数变量、起始值、步长 | 需要灵活控制计数 |
| `WHILE` ~ `WEND` | 前置条件，可能不执行 | 条件满足时循环 |
| `DO` ~ `LOOP` | 后置条件，至少执行一次 | 至少执行一次的条件循环 |

所有循环都可以用 `CONTINUE`（跳到下一次迭代）和 `BREAK`（跳出循环）控制。

!!! note "eramaker 兼容性"
    `REPEAT`/`REND` 和 `CONTINUE`/`BREAK` 是 eramaker 就存在的功能。`FOR`/`NEXT`、`WHILE`/`WEND`、`DO`/`LOOP` 是 Emuera 的扩展功能。

---

## REPEAT ~ REND — 固定次数循环

`REPEAT` 是最简单的循环，指定循环次数，用内置变量 `COUNT` 计数：

```erb
REPEAT 5
    PRINTFORML 第{COUNT}次
REND
; 输出：
; 第0次
; 第1次
; 第2次
; 第3次
; 第4次
```

### COUNT 变量

- `COUNT` 是内置整数变量，从 `0` 开始，每次迭代自动 +1
- 循环结束时 `COUNT` 等于循环次数（不是次数 - 1）
- `COUNT` 是全局变量，嵌套 `REPEAT` 时会覆盖外层的值

```erb
REPEAT 3
    ; COUNT: 0, 1, 2
    PRINTFORML COUNT = {COUNT}
REND
PRINTFORML 循环结束后 COUNT = {COUNT}    ; → 3
```

!!! warning "REPEAT 不能嵌套"

    因为 `REPEAT` 始终使用 `COUNT` 计数，嵌套时内层会覆盖外层的 `COUNT`。需要嵌套循环时请使用 `FOR`。

---

## FOR ~ NEXT — 通用计数循环

`FOR` 是 `REPEAT` 的增强版，可以自定义计数变量、起始值和步长：

```erb
FOR 计数变量, 起始值, 结束值, 步长
    ; 循环体
NEXT
```

| 参数 | 含义 | 省略 | 默认值 |
|------|------|------|--------|
| 计数变量 | 用于计数的整数变量 | ❌ 不可省略 | — |
| 起始值 | 首次赋给计数变量的值 | ❌ 不可省略 | — |
| 结束值 | 循环结束的边界 | ❌ 不可省略 | — |
| 步长 | 每次迭代增加的值 | ✅ 可省略 | `1` |

### 基本用法

```erb
#DIM L_I
FOR L_I, 0, 5
    PRINTFORML L_I = {L_I}
NEXT
; 输出：L_I = 0, 1, 2, 3, 4
```

### 自定义步长

```erb
#DIM L_I
FOR L_I, 10, 0, -2
    PRINTFORML L_I = {L_I}
NEXT
; 输出：L_I = 10, 8, 6, 4, 2
```

### 嵌套循环

```erb
#DIM L_X
#DIM L_Y
FOR L_Y, 0, 3
    FOR L_X, 0, 3
        PRINTFORM ({L_X},{L_Y})
    NEXT
    PRINTL
NEXT
; 输出：
; (0,0)(1,0)(2,0)
; (0,1)(1,1)(2,1)
; (0,2)(1,2)(2,2)
```

### FOR 的关键规则

1. **步长为正**：计数变量 < 结束值时继续循环
2. **步长为负**：计数变量 > 结束值时继续循环
3. **步长为 0**：无限循环，必须用 `BREAK` 跳出
4. **参数在循环开始时固定**：循环中修改计数变量不影响循环次数

```erb
#DIM L_I
#DIM L_N = 5
FOR L_I, 0, L_N
    L_N = 100       ; 不影响循环次数，仍然是 5 次
NEXT
```

---

## WHILE ~ WEND — 前置条件循环

`WHILE` 在每次迭代前检查条件，条件为真（非 0）时继续循环：

```erb
WHILE HP > 0
    ; 战斗逻辑
    HP -= 10
WEND
```

如果初始条件就为假，循环体**一次也不会执行**：

```erb
#DIM L_X = 100
WHILE L_X < 0
    PRINTL 不会执行
WEND
```

!!! warning "避免无限循环"

    `WHILE` 条件如果始终为真，会形成无限循环。Emuera 会检测并报错。
    确保循环体内有改变条件的逻辑，或使用 `BREAK` 跳出。

---

## DO ~ LOOP — 后置条件循环

`DO` ~ `LOOP` 至少执行一次循环体，然后在 `LOOP` 处检查条件：

```erb
DO
    PRINTL 至少执行一次
    A -= 1
LOOP A > 0
```

### DO ~ LOOP 与 WHILE ~ WEND 的区别

| | `WHILE` ~ `WEND` | `DO` ~ `LOOP` |
|------|:---:|:---:|
| 检查时机 | 循环前 | 循环后 |
| 最少执行次数 | 0 次 | 1 次 |

### CONTINUE 在 DO ~ LOOP 中的特殊行为

在 `DO` ~ `LOOP` 中执行 `CONTINUE` 时，会跳到 `LOOP` 行检查条件。如果条件不满足，**直接跳出循环**，而不是回到 `DO`：

```erb
DO
    A += 1
    SIF A == 3
        CONTINUE       ; 跳到 LOOP 检查条件
    PRINTFORML A = {A}
LOOP A < 5
; 输出：A = 1, A = 2, A = 4
; （A == 3 时 CONTINUE 跳到 LOOP，条件仍满足，继续循环）
```

---

## CONTINUE 和 BREAK

所有循环结构都支持 `CONTINUE` 和 `BREAK`：

| 指令 | 行为 |
|------|------|
| `CONTINUE` | 跳到下一次迭代（`REPEAT`/`FOR` 中计数变量自动递增） |
| `BREAK` | 立即跳出循环，执行循环结构后面的代码 |

### CONTINUE 示例

```erb
REPEAT 5
    SIF COUNT == 2
        CONTINUE           ; 跳过 COUNT == 2 的迭代
    PRINTFORML {COUNT}
REND
; 输出：0, 1, 3, 4
```

### BREAK 示例

```erb
REPEAT 100
    SIF COUNT == 3
        BREAK              ; COUNT == 3 时跳出循环
    PRINTFORML {COUNT}
REND
PRINTFORML 循环结束后 COUNT = {COUNT}    ; → 3
; 输出：0, 1, 2
```

### CONTINUE 在不同循环中的行为

| 循环 | CONTINUE 的行为 |
|------|----------------|
| `REPEAT` | 回到 `REPEAT`，`COUNT` +1 |
| `FOR` | 回到 `FOR`，计数变量 +步长 |
| `WHILE` | 回到 `WHILE`，重新检查条件 |
| `DO` | 跳到 `LOOP`，检查条件 |

---

## 四种循环的选择

| 场景 | 推荐 | 原因 |
|------|------|------|
| 已知循环次数 | `REPEAT` | 最简洁 |
| 需要自定义计数 | `FOR` | 灵活的计数变量和步长 |
| 嵌套循环 | `FOR` | 每层用不同计数变量 |
| 条件满足时循环 | `WHILE` | 前置检查，可能不执行 |
| 至少执行一次 | `DO` ~ `LOOP` | 后置检查 |

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| REPEAT 嵌套 | `REPEAT` 内嵌套 `REPEAT` | 用 `FOR` 嵌套 | COUNT 被内层覆盖 |
| FOR 步长为 0 | `FOR I, 0, 10, 0` | 确保步长非 0 | 步长为 0 是无限循环 |
| WHILE 无限循环 | `WHILE 1` 无 BREAK | 确保有退出条件 | Emuera 会报错 |
| 忘记 REND/NEXT/WEND | `REPEAT 5` ... | `REPEAT 5` ... `REND` | 循环必须闭合 |
| FOR 中修改计数变量 | `FOR I, 0, 10` 内写 `I = 5` | 不在循环内修改计数变量 | 参数在开始时固定，修改无效 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 条件分支 | [条件分支](condition.zh.md) |
| 跳转与标签 | [跳转](jump.zh.md) |
| 赋值语句 | [赋值语句](assignment.zh.md) |
| REPEAT 完整 API | [REPEAT ~ REND](../Reference/REPEAT.zh.md) |
| FOR 完整 API | [FOR ~ NEXT](../Reference/FOR.zh.md) |
