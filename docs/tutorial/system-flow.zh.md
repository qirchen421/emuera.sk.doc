# 状态机流程

!!! info "本节对应手册"

    - **Reference 分类**: [调试辅助・系统流程控制](../Reference/README.zh.md#debug-system-flow)
    - [流程图](../Emuera/system_flow.zh.md) — 各状态的完整流程图与细节
    - [事件函数](event-functions.zh.md) — 引擎在各状态自动调用的事件钩子
    - [BEGIN 指令](../Reference/BEGIN.zh.md) — 状态跳转指令 API 参考

---

## 概述

ERABASIC 程序不是从 `main()` 开始执行的——引擎有一个**内置的状态机**，它决定了你的代码何时被调用、以什么顺序被调用。

理解状态机是理解 era 游戏开发的关键：你写的不是"一个程序"，而是"挂载在引擎状态机各节点上的回调函数"。

---

## 两状态模型

先忘掉所有细节。ERABASIC 程序在任意时刻只处于两种状态之一：

| 状态 | 说明 | 引擎在做什么 |
|------|------|-------------|
| **运行态** | CALL 链正在执行 | 逐行执行你的代码 |
| **等待态** | 停在 INPUT 等待玩家输入 | 什么都不做，等玩家按键 |

```
运行态 ──遇到 INPUT──→ 等待态
等待态 ──玩家输入──→ 运行态
```

这就是全部。你的程序要么在跑 CALL 链，要么在等玩家。没有第三种状态。

!!! tip "直觉理解"

    想象你在写一本"选择你自己的冒险"书。每一页（函数）展示一些文字，然后让读者做选择（INPUT）。读者的选择决定了翻到哪一页（下一个 CALL）。引擎就是翻页的人。

---

## 状态机概览

引擎有 6 个主要状态，通过 `BEGIN` 指令在它们之间跳转：

```
TITLE ──BEGIN FIRST──→ FIRST
                         │
                         ↓
                       SHOP ←──────────────────┐
                         │                      │
                       BEGIN TRAIN              │
                         ↓                      │
                       TRAIN ──BEGIN SHOP──────→┘
                         │
                       BEGIN ABLUP → ABLUP ──BEGIN SHOP──→ SHOP
                         │
                       BEGIN AFTERTRAIN → AFTERTRAIN
                         │
                       BEGIN TURNEND → TURNEND
```

| 状态 | 进入方式 | 引擎做什么 |
|------|---------|-----------|
| **TITLE** | 启动后，或 `BEGIN TITLE` | 显示标题画面 |
| **FIRST** | `BEGIN FIRST` | 游戏初始化 |
| **SHOP** | `BEGIN SHOP`，或加载存档后 | 商店/主循环 |
| **TRAIN** | `BEGIN TRAIN` | 调教/行动循环 |
| **ABLUP** | `BEGIN ABLUP` | 能力提升 |
| **AFTERTRAIN** | `BEGIN AFTERTRAIN` | 调教结束 |
| **TURNEND** | `BEGIN TURNEND` | 回合结束 |

### 典型游戏循环

大多数 era 游戏遵循这个循环：

```
TITLE → FIRST → SHOP ⇄ TRAIN → SHOP → ...
                   ↑       │
                   └───────┘
```

1. **TITLE**：玩家看到标题画面，选择"开始"或"读取"
2. **FIRST**：初始化游戏数据
3. **SHOP**：主菜单，玩家选择行动
4. **TRAIN**：执行行动，处理结果
5. 回到 **SHOP**，等待下一次选择

---

## TITLE — 标题画面

引擎启动后首先进入 TITLE 状态。

### 自定义标题画面

定义 `@SYSTEM_TITLE` 即可替代默认标题画面：

```erb
@SYSTEM_TITLE
    PRINTL ═══════════════════
    PRINTL   我的 era 游戏
    PRINTL ═══════════════════
    PRINTL [0] 开始游戏
    PRINTL [1] 读取存档
    INPUT

    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

### 默认标题画面

如果没有定义 `@SYSTEM_TITLE`，引擎显示标准标题画面：

- `[0] 从最初开始` → 初始化数据 → `BEGIN FIRST`
- `[1] 读取后开始` → 显示加载画面

!!! warning "必须执行 BEGIN"

    `@SYSTEM_TITLE` 中如果不执行 `BEGIN` 指令就 `RETURN`，引擎会因为没有后续处理而报错终止。

---

## FIRST — 游戏初始化

`BEGIN FIRST` 进入此状态。引擎调用 `@EVENTFIRST`。

```erb
@EVENTFIRST
    MONEY = 1000
    DAY = 1
    ADDCHARA 0
    PRINTW 游戏开始！
    BEGIN SHOP
```

!!! warning "FIRST 状态必须跳转"

    `@EVENTFIRST` 中如果不执行 `BEGIN`，引擎会报错终止。通常在末尾写 `BEGIN SHOP` 进入主循环。

---

## SHOP — 主循环

SHOP 是游戏的主循环。大多数时间玩家都在这里做选择。

### 执行流程

```
BEGIN SHOP
    │
    ├─ @EVENTSHOP（如果定义了）
    │
    ├─ 自动保存（如果启用）
    │
    ├─ @SHOW_SHOP（必须定义）
    │
    ├─ 等待输入
    │
    ├─ 输入购买编号（0~99）？
    │   ├─ 是 → 购买处理 → @EVENTBUY → 回到 @SHOW_SHOP
    │   └─ 否 → @USERSHOP → 回到 @SHOW_SHOP
    │
    └─ 执行 BEGIN → 离开 SHOP
```

### 基本用法

```erb
@SHOW_SHOP
    PRINTL ─── 主菜单 ───
    PRINTL [0] 开始调教
    PRINTL [1] 查看状态
    PRINTL [100] 保存
    PRINTL [101] 读取

@USERSHOP
    IF RESULT == 0
        BEGIN TRAIN
    ELSEIF RESULT == 1
        CALL SHOW_STATUS_DETAIL
    ELSEIF RESULT == 100
        SAVEGAME
    ELSEIF RESULT == 101
        LOADGAME
    ENDIF
```

!!! note "加载后不触发 @EVENTSHOP"

    加载存档后直接进入 SHOP，但**不会**调用 `@EVENTSHOP`。如果需要在加载后执行逻辑，使用 `@EVENTLOAD` 或 `@SYSTEM_LOADEND`。

---

## TRAIN — 行动循环

TRAIN 是游戏的核心玩法循环。玩家在这里选择并执行行动。

### 执行流程

```
BEGIN TRAIN
    │
    ├─ 初始化变量（ASSIPLAY、TFLAG、PALAM 等）
    │
    ├─ @EVENTTRAIN（如果定义了）
    │
    ├─ @SHOW_STATUS（必须定义）
    │   ├─ 显示可执行命令（调用 @COM_ABLExx 判断）
    │   └─ @SHOW_USERCOM（必须定义）
    │
    ├─ 等待输入
    │
    ├─ 输入可执行命令？
    │   ├─ 是 → @EVENTCOM → @COMxx → @SOURCE_CHECK → @EVENTCOMEND
    │   │       → 回到 @SHOW_STATUS
    │   └─ 否 → @USERCOM → 回到 @SHOW_STATUS
    │
    └─ 执行 BEGIN → 离开 TRAIN
```

### 基本用法

```erb
@SHOW_STATUS
    PRINTL ─── 调教中 ───
    CALL SHOW_TARGET_INFO

@SHOW_USERCOM
    PRINTL [0] 摸头
    PRINTL [1] 拥抱
    PRINTL [999] 返回商店

@COM0
    PRINTW 你轻轻摸了摸她的头。
    RETURN 1

@COM1
    PRINTW 你给了她一个拥抱。
    RETURN 1

@USERCOM
    IF RESULT == 999
        BEGIN SHOP
    ENDIF
```

### 命令可执行性判断

`@COM_ABLExx` 决定命令是否可用。返回非 0 = 可执行，返回 0 = 不可执行：

```erb
@COM_ABLE5
    ; 命令5需要 TARGET 的信赖度 >= 50
    IF CFLAG:信赖度 < 50
        RETURN 0
    ENDIF
    RETURN 1
```

---

## 其他状态

### ABLUP — 能力提升

`BEGIN ABLUP` 进入。用于提升角色能力。

```erb
@SHOW_JUEL
    PRINTL ─── 宝石一览 ───
    ; 显示当前拥有的宝石

@SHOW_ABLUP_SELECT
    PRINTL [0] 提升服从
    PRINTL [1] 提升欲望
    ; 显示可提升的能力列表
```

### AFTERTRAIN — 调教结束

`BEGIN AFTERTRAIN` 进入。调教完全结束后的事件处理。

### TURNEND — 回合结束

`BEGIN TURNEND` 进入。一天结束时的处理。

```erb
@EVENTTURNEND
    DAY += 1
    PRINTW 第 {DAY} 天结束了。
    BEGIN SHOP
```

---

## BEGIN 指令 — 状态跳转

`BEGIN` 是状态跳转的唯一方式。它包含隐式 `RETURN`——`BEGIN` 之后的代码永远不会执行。

```erb
@MY_FUNC
    BEGIN SHOP
    PRINTL 这行永远不会执行
```

### 可用的 BEGIN 参数

| 指令 | 跳转目标 |
|------|---------|
| `BEGIN FIRST` | FIRST 状态 |
| `BEGIN SHOP` | SHOP 状态 |
| `BEGIN TRAIN` | TRAIN 状态 |
| `BEGIN ABLUP` | ABLUP 状态 |
| `BEGIN AFTERTRAIN` | AFTERTRAIN 状态 |
| `BEGIN TURNEND` | TURNEND 状态 |
| `BEGIN TITLE` | TITLE 状态 |
| `BEGIN LOADGAME` | 加载画面 |

---

## 存档与加载

### 保存

`SAVEGAME` 指令显示保存画面。在保存前一刻，引擎调用 `@SAVEINFO` 生成存档描述：

```erb
@SAVEINFO
    ; 这个函数的 PRINT 输出会成为存档的描述文字
    PRINTFORM 第{DAY}天 %CALLNAME:MASTER%的记录
```

### 加载

`LOADGAME` 指令显示加载画面。加载完成后的流程：

```
加载完成
    │
    ├─ @SYSTEM_LOADEND（如果定义了）
    │   └─ 执行了 BEGIN？→ 跳转
    │
    ├─ @EVENTLOAD（如果定义了）
    │   └─ 执行了 BEGIN？→ 跳转
    │
    └─ 默认 → @SHOW_SHOP
```

`LOADDATA` 指令直接加载指定编号的存档，不显示加载画面。

---

## 错误处理流程

### THROW 异常

`THROW` 指令抛出异常。如果定义了 `@BEFORE_THROW` 事件函数（Skia 专属），引擎会在抛出前先调用它：

```
THROW 执行
    │
    ├─ 已在 @BEFORE_THROW 中？→ 直接抛出
    │
    └─ 定义了 @BEFORE_THROW？→ 调用 @BEFORE_THROW → 抛出
```

### 运行时错误

任何未捕获的错误发生时，如果定义了 `@BEFORE_ERROR` 事件函数（Skia 专属），引擎会在错误处理前调用它。

> 详见 [事件函数 — BEFORE_THROW / BEFORE_ERROR](event-functions.zh.md#before_throw)

---

## 常见陷阱

| 陷阱 | 说明 | 解决方案 |
|------|------|---------|
| 事件函数不执行 BEGIN | `@EVENTFIRST`、`@EVENTEND` 等如果不执行 `BEGIN`，引擎报错终止 | 确保末尾有 `BEGIN` 或 `RETURN` |
| `@EVENTSHOP` 加载后不触发 | 加载存档后直接进入 SHOP，跳过 `@EVENTSHOP` | 使用 `@EVENTLOAD` 或 `@SYSTEM_LOADEND` |
| `BEGIN` 后的代码不执行 | `BEGIN` 包含隐式 `RETURN` | 不要在 `BEGIN` 后写代码 |
| TRAIN 中忘记 `BEGIN SHOP` | TRAIN 循环不会自动结束 | 在 `@USERCOM` 中处理"返回"逻辑 |
| `@COMxx` 返回 0 | 命令被视为执行失败，不触发 `@SOURCE_CHECK` 和 `@EVENTCOMEND` | 确保成功的命令返回非 0 值 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 交互系统：INPUT 与 AWAIT | [交互系统](interaction.zh.md) |
| 事件函数详解 | [事件函数](event-functions.zh.md) |
| BEGIN 指令 API | [BEGIN](../Reference/BEGIN.zh.md) |
| 角色变量系统 | [角色变量](../Emuera/variables.zh.md) |
| 完整流程图 | [流程图](../Emuera/system_flow.zh.md) |
