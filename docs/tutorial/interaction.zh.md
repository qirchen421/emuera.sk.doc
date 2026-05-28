# 交互系统：INPUT 与 AWAIT

!!! info "本节对应手册"

    - **Reference 分类**: [输入・等待](../Reference/README.zh.md#input-wait) / [AWAIT 相关](../Reference/README.zh.md#await)
    - [INPUT](../Reference/INPUT.zh.md) — INPUT/INPUTS 指令 API 参考
    - [TINPUT](../Reference/TINPUT.zh.md) — TINPUT/TINPUTS 指令 API 参考
    - [TINPUTNF](../Reference/TINPUTNF.zh.md) — TINPUTNF/TINPUTSNF 指令 API 参考（NoFocus 变体）
    - [TONEINPUTNF](../Reference/TONEINPUTNF.zh.md) — TONEINPUTNF/TONEINPUTSNF 指令 API 参考（NoFocus 变体）
    - [AWAIT](../Reference/AWAIT.zh.md) — AWAIT 指令 API 参考
    - [GETKEY](../Reference/GETKEY.zh.md) — GETKEY/GETKEYTRIGGERED 指令 API 参考

---

## 概述

在 [状态机流程](system-flow.zh.md) 中，你了解了"运行态"和"等待态"的两状态模型。本节深入讲解这两种状态背后的交互系统——你的程序如何与玩家交互。

ERABASIC 的交互指令分为两种模型：

| 模型 | 代表指令 | 行为 |
|------|---------|------|
| **拉取模型** | INPUT, TINPUT, BINPUT | 暂停脚本，等待完整输入 |
| **推送轮询模型** | AWAIT + GETKEY/MOUSEB | 不暂停脚本，检测瞬时状态 |

---

## 拉取模型：INPUT 系列

INPUT 系列是最常用的交互方式。脚本暂停执行，等待玩家做出一个完整的输入（按键、点击按钮、输入文字），然后继续。

```erb
PRINTL [0] 开始游戏
PRINTL [1] 读取存档
INPUT

IF RESULT == 0
    BEGIN FIRST
ELSEIF RESULT == 1
    LOADGAME
ENDIF
```

### INPUT 的三个副作用

INPUT 不只是"等待输入"——它同时做了三件事：

1. **等待输入**：暂停脚本，直到玩家做出完整输入
2. **强制滚动**：将窗口滚动到底部，确保输入行可见
3. **激活按钮**：`[0]`、`[1]` 等按钮变为可点击状态

这意味着每次 INPUT 后，玩家**无法**继续浏览之前的输出——窗口被强制拉回底部。

### TINPUT — 带超时的输入

`TINPUT` 在 INPUT 的基础上增加了超时机制：

```erb
; 3 秒内等待输入，超时则 RESULT = 0
TINPUT 3000, 0
```

超时精度约为 100ms，设置更小的值无法精确运作。

### INPUTMOUSEKEY — 原始输入检测

`INPUTMOUSEKEY` 进入等待态但**不激活按钮**，直接检测鼠标/键盘的原始事件。适用于需要精确检测鼠标/键盘但不需要按钮交互的场景。

---

## 推送轮询模型：AWAIT 系列

AWAIT 系列是另一种交互方式——脚本不暂停，只是让出时间片给 Windows 处理消息。

```erb
; 让出 16ms
AWAIT 16
```

AWAIT 配合 GETKEY、MOUSEB、MOUSEXY、ISACTIVE 等指令，可以检测键盘/鼠标的瞬时状态：

```erb
$LOOP
AWAIT 16
IF GETKEYTRIGGERED(1)
    ; 鼠标左键被按下
    BREAK
ENDIF
GOTO LOOP
```

### AWAIT 的特点

- **不暂停脚本**：AWAIT 后脚本继续执行
- **不强制滚动**：用户可以自由浏览历史输出
- **不激活按钮**：`[0]` 等按钮不可点击
- **输入不可靠**：两帧之间的按键可能被吞掉

### AWAIT 的典型用途

1. **耗时处理的进度显示**：防止 Emuera 进入"无响应"状态

    ```erb
    REDRAW 0
    FOR LCNT, 0, 100
        PRINTSL "处理中... " + TOSTR(LCNT) + "%"
        AWAIT
        CLEARLINE 1
        ; 耗时处理
    NEXT
    ```

2. **实时界面轮询**：配合 GETKEY/MOUSEB 做非阻塞输入检测

    ```erb
    $LOOP
    CALL DRAW_REALTIME_UI
    AWAIT 16
    IF GETKEYTRIGGERED(1)
        ; 处理点击
    ENDIF
    GOTO LOOP
    ```

### AWAIT 的陷阱

!!! warning "AWAIT 循环可能吞输入"

    AWAIT 只是泵一次消息队列。如果按键事件发生在两次 AWAIT 之间，GETKEYTRIGGERED 可能检测不到。这是 AWAIT 轮询的根本局限——它采样的是"瞬时状态"，不是"累积事件"。

---

## 两种模型的对比

| 维度 | INPUT 系列 | AWAIT 系列 |
|------|-----------|-----------|
| 脚本暂停 | ✅ 暂停 | ❌ 继续 |
| 输入可靠性 | ✅ 原子性 | ❌ 可能丢失 |
| 按钮交互 | ✅ 激活 | ❌ 不激活 |
| 自由滚动 | ❌ 强制到底 | ✅ 保持位置 |
| 超时 | ✅ TINPUT | ⚠️ 手动补偿 |

**核心矛盾**：你需要按钮交互（INPUT 的优势）+ 自由滚动（AWAIT 的优势），但两种模型互斥。

---

## NoFocus 变体：两种模型的桥梁

NF（NoFocus）后缀变体解决了上述矛盾。

```erb
TINPUTNF  ; 同上，带超时
TINPUTSNF ; 同上，字符串输入 + 超时
TONEINPUTNF  ; TONEINPUT 的 NF 变体
TONEINPUTSNF ; TONEINPUTS 的 NF 变体
```

NF 变体与原版参数完全相同，唯一区别是**不强制滚动到底部**。

### 用 TINPUTSNF 替代 AWAIT 轮询

之前用 AWAIT + GETKEYTRIGGERED 做动态界面的代码：

```erb
; 旧方案：AWAIT 轮询（~200 行 ERB）
$LOOP
CALL DRAW_MAP
AWAIT 16
IF GETKEYTRIGGERED(1)
    ; 处理点击...但按钮不可点击，需要手动计算点击区域
ENDIF
GOTO LOOP
```

用 TINPUTSNF 替代后：

```erb
; 新方案：TINPUTSNF（~10 行 ERB）
$LOOP
CALL DRAW_MAP
TINPUTSNF 33, "UPDATE", 0, "", 1
SELECTCASE RESULTS
CASE "UPDATE"
    ; 超时 → 刷新动画帧
    GOTO LOOP
CASEELSE
    ; 用户点击按钮 → 正常处理，按钮高亮/Tooltip 全部正常
ENDSELECT
```

### 悬停暂停模式

动态界面中，鼠标悬停在按钮上时需要暂停动画以保留 Tooltip。通过 `HOVER_PAUSE` 标志 + `MOUSEB()` 检测实现：

```erb
; HOVER_PAUSE：鼠标悬停按钮时暂停动画，离开时恢复
$INPUT_LOOP
IF ANIMATERECOLOREDMAPS > 0 && !FLAG:70
    IF HOVER_PAUSE
        TINPUTSNF 200, "UPDATE", 0, ""     ; 悬停模式：短超时轮询
    ELSE
        TINPUTSNF ANIMATERECOLOREDMAPS, "UPDATE", 0, ""  ; 动画模式：帧间隔
    ENDIF
ELSE
    INPUTS
ENDIF

; 悬停状态检测
IF RESULTS == "UPDATE"
    IF MOUSEB() != ""
        ; 鼠标在按钮上 → 暂停动画
        IF !HOVER_PAUSE
            HOVER_PAUSE = 1
        ENDIF
        GOTO INPUT_LOOP    ; 不推进动画，继续轮询
    ELSE
        ; 鼠标离开按钮 → 恢复动画
        IF HOVER_PAUSE
            HOVER_PAUSE = 0
        ENDIF
    ENDIF
ENDIF
; ... 正常输入处理
```

原理：TINPUTSNF 超时后检查 `MOUSEB()`——鼠标在按钮上则设 `HOVER_PAUSE=1` 并 `GOTO INPUT_LOOP`（不推进动画），鼠标离开则恢复 `HOVER_PAUSE=0`。悬停模式下用 200ms 短超时轮询，确保鼠标离开后快速恢复动画。

### NF 变体的优势

| 特性 | AWAIT 轮询 | NF 变体 |
|------|-----------|--------|
| 自由滚动 | ✅ | ✅ |
| 按钮高亮 | ❌ | ✅ |
| Tooltip | ❌ | ✅ |
| 输入可靠性 | ❌ | ✅ |
| 代码量 | 多 | 少 |

---

## 交互指令速查

| 指令 | 阻塞 | 按钮 | 自由滚动 | 超时 | 返回值 |
|------|:---:|:---:|:---:|:---:|------|
| `INPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `INPUTS` | ✅ | ✅ | ❌ | ❌ | RESULTS |
| `TINPUT` | ✅ | ✅ | ❌ | ✅ | RESULT |
| `TINPUTS` | ✅ | ✅ | ❌ | ✅ | RESULTS |
| `ONEINPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `BINPUT` | ✅ | ✅ | ❌ | ❌ | RESULT |
| `INPUTANY` | ✅ | ❌ | ❌ | ❌ | RESULT |
| `INPUTMOUSEKEY` | ✅ | ❌ | ❌ | ✅ | RESULT:0~5 |
| `AWAIT` | ❌ | ❌ | ✅ | ❌ | 无 |
| `TINPUTNF` | ✅ | ✅ | ✅ | ✅ | RESULT |
| `TINPUTSNF` | ✅ | ✅ | ✅ | ✅ | RESULTS |
| `TONEINPUTNF` | ✅ | ✅ | ✅ | ✅ | RESULT |
| `TONEINPUTSNF` | ✅ | ✅ | ✅ | ✅ | RESULTS |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| INPUT 指令 API | [INPUT](../Reference/INPUT.zh.md) |
| TINPUT 指令 API | [TINPUT](../Reference/TINPUT.zh.md) |
| TINPUTNF 指令 API | [TINPUTNF](../Reference/TINPUTNF.zh.md) |
| TONEINPUTNF 指令 API | [TONEINPUTNF](../Reference/TONEINPUTNF.zh.md) |
| AWAIT 指令 API | [AWAIT](../Reference/AWAIT.zh.md) |
| GETKEY 指令 API | [GETKEY](../Reference/GETKEY.zh.md) |
| 状态机流程 | [状态机流程](system-flow.zh.md) |
| 事件函数 | [事件函数](event-functions.zh.md) |
