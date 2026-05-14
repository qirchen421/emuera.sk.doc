# 跳转

!!! info "本节对应手册"

    - **Reference 分类**: [循环・分支语法](../Reference/README.zh.md#flow-control)
    - [GOTO](../Reference/GOTO.zh.md) — GOTO 指令 API 参考
    - [GOTOFORM](../Reference/FORM.zh.md) — GOTOFORM 指令 API 参考
    - [CONTINUE / BREAK](../Reference/CONTINUE.zh.md) — 循环控制 API 参考

---

## 概述

ERABASIC 的跳转分为两类：

| 类型 | 指令 | 作用范围 |
|------|------|---------|
| 函数内跳转 | `GOTO`、`$标签` | 当前函数内 |
| 循环控制 | `CONTINUE`、`BREAK` | 当前循环内 |

!!! warning "GOTO 只能跳到当前函数内的标签"

    `GOTO` 不能跨函数跳转。跨函数的跳转使用 `CALL`/`JUMP`（见 [函数与 CALL](call.zh.md)）。

---

## $ 标签 — 定义跳转目标

`$` 开头的行定义一个标签，作为 `GOTO` 的跳转目标：

```erb
$LOOP_START
    ; 代码
    GOTO LOOP_START
```

### 标签命名规则

- 以 `$` 开头，后跟标签名
- 标签名在同一函数内必须唯一
- 标签名区分大小写
- 标签只在本函数内可见

```erb
@MY_FUNC
$START
    PRINTL 开始
    GOTO MIDDLE

$MIDDLE
    PRINTL 中间
    GOTO END_LABEL

$END_LABEL
    PRINTL 结束
RETURN
```

---

## GOTO — 无条件跳转

`GOTO` 跳转到当前函数内指定的 `$` 标签：

```erb
GOTO labelName
```

### 基本用法

```erb
@MY_FUNC
    PRINTL 1
    GOTO THREE

$TWO
    PRINTL 2
    GOTO FIVE

$THREE
    PRINTL 3
    GOTO TWO

$FOUR
    PRINTL 4
    GOTO END_LABEL

$FIVE
    PRINTL 5
    GOTO FOUR

$END_LABEL
    PRINTW END
RETURN
; 输出：1, 3, 2, 5, 4, END
```

### GOTOFORM — 动态标签跳转

`GOTOFORM` 使用 FORM 语法动态构建标签名：

```erb
#DIM L_PHASE = 2
GOTOFORM PHASE_{L_PHASE}

$PHASE_1
    PRINTL 阶段1
    RETURN

$PHASE_2
    PRINTL 阶段2
    RETURN

$PHASE_3
    PRINTL 阶段3
    RETURN
```

---

## GOTO 与循环结构的交互

### GOTO 跳入循环内部

如果 `GOTO` 跳到循环体内部，行为取决于循环类型：

| 循环类型 | GOTO 跳入后的行为 |
|---------|-----------------|
| `REPEAT` ~ `REND` | 执行到 `REND` 前一行，然后跳到 `REND` 下一行（不循环） |
| `FOR` ~ `NEXT` | 执行到 `NEXT` 前一行，然后跳到 `NEXT` 下一行（不循环） |
| `WHILE` ~ `WEND` | 执行到 `WEND`，回到 `WHILE` 检查条件 |
| `DO` ~ `LOOP` | 执行到 `LOOP`，检查条件，满足则回到 `DO` |

!!! danger "避免 GOTO 跳入循环"

    `GOTO` 跳入循环内部的行为容易出错，应尽量避免。如果需要从循环外进入循环，应该使用条件标志或重构代码。

### GOTO 跳出循环

`GOTO` 可以跳出循环，但 `BREAK` 是更好的选择：

```erb
; ❌ 不推荐：用 GOTO 跳出循环
REPEAT 100
    SIF COUNT == 5
        GOTO OUTSIDE
REND
$OUTSIDE

; ✅ 推荐：用 BREAK 跳出循环
REPEAT 100
    SIF COUNT == 5
        BREAK
REND
```

### GOTO 跳过 SELECTCASE

`GOTO` 跳入 `SELECTCASE` 内部时，执行到 `CASE`/`CASEELSE` 前会跳到 `ENDSELECT` 下一行：

```erb
SELECTCASE X
    GOTO INSIDE      ; ❌ 不要这样做
$INSIDE
    CASE 1           ; 执行到这里会直接跳到 ENDSELECT 之后
        PRINTL 1
ENDSELECT
```

---

## CONTINUE 和 BREAK — 循环内跳转

`CONTINUE` 和 `BREAK` 是循环内的专用跳转指令（详见 [循环](loop.zh.md)）：

| 指令 | 行为 |
|------|------|
| `CONTINUE` | 跳到当前循环的下一次迭代 |
| `BREAK` | 跳出当前循环 |

### CONTINUE 的跳转目标

| 循环 | CONTINUE 跳转目标 |
|------|-----------------|
| `REPEAT` | 回到 `REPEAT`，`COUNT` +1 |
| `FOR` | 回到 `FOR`，计数变量 +步长 |
| `WHILE` | 回到 `WHILE`，重新检查条件 |
| `DO` | 跳到 `LOOP`，检查条件 |

### BREAK 的跳转目标

`BREAK` 跳到循环结束行的下一行：

| 循环 | BREAK 跳转目标 |
|------|---------------|
| `REPEAT` ~ `REND` | `REND` 的下一行 |
| `FOR` ~ `NEXT` | `NEXT` 的下一行 |
| `WHILE` ~ `WEND` | `WEND` 的下一行 |
| `DO` ~ `LOOP` | `LOOP` 的下一行 |

---

## GOTO 的替代方案

`GOTO` 容易导致代码难以理解和维护。以下场景可以用更好的替代方案：

| 场景 | GOTO 写法 | 推荐替代 |
|------|----------|---------|
| 跳出循环 | `GOTO END` | `BREAK` |
| 跳过迭代 | `GOTO NEXT_ITER` | `CONTINUE` |
| 按条件执行 | `GOTO LABEL_A` / `GOTO LABEL_B` | `IF` / `SELECTCASE` |
| 循环重试 | `GOTO RETRY` | `WHILE` / `DO` ~ `LOOP` |
| 阶段切换 | `GOTOFORM PHASE_{N}` | `SELECTCASE` + `CALL` |

### 重构示例：GOTO 循环 → WHILE

```erb
; ❌ GOTO 循环
$RETRY
    INPUT
    SIF RESULT < 0
        GOTO RETRY

; ✅ WHILE 循环
WHILE 1
    INPUT
    SIF RESULT >= 0
        BREAK
WEND

; ✅ DO ~ LOOP（更简洁）
DO
    INPUT
LOOP RESULT < 0
```

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| GOTO 跨函数 | `GOTO OTHER_FUNC_LABEL` | 用 `CALL`/`JUMP` | GOTO 只在当前函数内有效 |
| 标签名冲突 | 两个 `$START` | 每个标签名唯一 | 同函数内标签名必须唯一 |
| GOTO 跳入循环 | `GOTO` 跳到 `FOR` 内部 | 用条件标志或重构 | 行为不可预测 |
| 无限 GOTO | `GOTO A` → `$A: GOTO B` → `$B: GOTO A` | 用循环结构 | Emuera 会检测并报错 |
| GOTO 代替 BREAK | `GOTO END` 跳出循环 | `BREAK` | BREAK 更清晰 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 循环结构 | [循环](loop.zh.md) |
| 条件分支 | [条件分支](condition.zh.md) |
| 函数调用 | [函数与 CALL](call.zh.md) |
| GOTO 完整 API | [GOTO](../Reference/GOTO.zh.md) |
