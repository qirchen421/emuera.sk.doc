# 事件函数

!!! info "本节对应手册"

    - **Reference 分类**: [调试辅助・系统流程控制](../Reference/README.zh.md#debug-system-flow)
    - [Emuera 流程图](../Emuera/system_flow.zh.md) — 系统流程与事件触发时机
    - [Emuera 扩展语法 - 函数](../Emuera/function.zh.md) — 函数定义与调用
    - [ERB 文件格式扩展](erb-format-extension.zh.md) — `#PRI`/`#LATER`/`#SINGLE`/`#ONLY` 修饰符

---

## 概述

ERABASIC 中的函数分为三类：

| 类型 | 示例 | 特点 |
|------|------|------|
| **事件函数** | `@EVENTFIRST`、`@EVENTSHOP` | 可多次定义，引擎自动调用，支持 `#PRI`/`#LATER` 等修饰符 |
| **系统函数** | `@SHOW_SHOP`、`@SHOW_STATUS` | 只能定义一次，引擎在特定时机调用 |
| **用户函数** | `@MY_FUNC` | 只能定义一次，由脚本通过 `CALL` 主动调用 |

事件函数是 ERABASIC 的核心机制之一——引擎在特定时机自动调用它们，而你可以定义多个同名事件函数，它们会按优先级依次执行。

---

## 事件函数 vs 系统函数

虽然事件函数和系统函数都由引擎自动调用，但它们有本质区别：

| | 事件函数 | 系统函数 |
|------|:---:|:---:|
| 可否多次定义 | ✅ 可以 | ❌ 只能一次 |
| `#PRI`/`#LATER` 修饰符 | ✅ 可用 | ❌ 不可 |
| `#SINGLE`/`#ONLY` 修饰符 | ✅ 可用 | ❌ 不可 |
| `#FUNCTION`/`#FUNCTIONS` | ❌ 不可 | ❌ 不可 |
| `#LOCALSIZE` 等尺寸指定 | ⚠️ 忽略 | ✅ 有效 |
| 缺失时的行为 | 跳过（不报错） | 大部分跳过，少数报错 |

### 源码中的判断依据

引擎通过 `IdentifierDictionary.IsEventLabelName()` 判断一个函数名是否为事件函数。当前的事件函数名列表：

```
EVENTFIRST, EVENTTRAIN, EVENTSHOP, EVENTBUY,
EVENTCOM, EVENTTURNEND, EVENTCOMEND, EVENTEND, EVENTLOAD,
BEFORE_THROW, BEFORE_ERROR  ← Skia 专属
```

> **SK 专属标记**：`BEFORE_THROW` 和 `BEFORE_ERROR` 是 Skia 版本新增的事件函数，用于错误处理和异常拦截。

通过 `IdentifierDictionary.IsSystemLabelName()` 判断是否为系统函数。系统函数名列表包含上述事件函数名以及：

```
SHOW_STATUS, SHOW_USERCOM, USERCOM, SOURCE_CHECK,
CALLTRAINEND, SHOW_JUEL, SHOW_ABLUP_SELECT, USERABLUP,
SHOW_SHOP, SAVEINFO, USERSHOP,
TITLE_LOADGAME, SYSTEM_AUTOSAVE, SYSTEM_TITLE, SYSTEM_LOADEND
```

此外，匹配 `COM\d+`（如 `@COM5`）、`COM_ABLE\d+`（如 `@COM_ABLE5`）、`ABLUP\d+`（如 `@ABLUP3`）模式的函数名也被视为系统函数。

---

## 事件函数的调用机制

### 多定义的遍历

当引擎调用一个事件函数时，它会查找所有同名的事件函数定义，并按优先级分组依次执行：

```
第0组：#ONLY 函数（只执行第一个）
第1组：#PRI 函数（优先执行）
第2组：普通函数（无修饰符）
第3组：#LATER 函数（延迟执行）
```

引擎从第 0 组开始遍历，每组内按定义顺序执行。当所有组遍历完毕，事件函数调用结束。

### `#ONLY` 的行为

如果事件函数声明了 `#ONLY`，则引擎只执行第一个声明了 `#ONLY` 的定义，跳过所有其他同名事件函数：

```erb
@EVENTFIRST
#ONLY
; 只有这个函数会被执行
PRINTW 唯一的初始化

@EVENTFIRST
; 这个函数被 #ONLY 跳过
PRINTW 不会执行
```

!!! warning "多个 #ONLY 的后果"

    如果有多个同名事件函数声明了 `#ONLY`，只有第一个会被执行。引擎会对后续的 `#ONLY` 定义发出警告。

### `#SINGLE` 的行为

`#SINGLE` 表示只执行一个事件函数就停止。与 `#ONLY` 不同，`#SINGLE` 不限制哪个函数被执行——它只是让引擎在执行完当前函数后停止遍历：

```erb
@EVENTFIRST
#SINGLE
PRINTW 初始化

@EVENTFIRST
#SINGLE
; 如果上面的函数已经执行，这个不会执行
PRINTW 不会执行
```

### `#PRI` 和 `#LATER` 的组合

`#PRI` 和 `#LATER` 可以同时指定——函数会被添加到两个组中，即先在优先组执行一次，再在延迟组执行一次：

```erb
@EVENTFIRST
#PRI
PRINTW 1. 最先执行

@EVENTFIRST
#PRI #LATER
PRINTW 2. 优先执行（也在延迟组中注册）

@EVENTFIRST
PRINTW 3. 普通执行

@EVENTFIRST
#LATER
PRINTW 4. 延迟执行

@EVENTFIRST
#PRI #LATER
PRINTW 5. 再次延迟执行（因为 #PRI #LATER 同时指定）
```

---

## 完整事件函数列表

### `@EVENTFIRST`

**触发时机**：选择"从最初开始"后，或执行 `BEGIN FIRST` 后。

**行为**：游戏开始时的事件。如果 `@EVENTFIRST` 中没有执行 `BEGIN` 指令或 `RETURN`，引擎会因为没有后续处理而报错终止。

```erb
@EVENTFIRST
PRINTW 游戏开始！
MONEY = 500
BEGIN SHOP
```

### `@EVENTSHOP`

**触发时机**：进入 SHOP 阶段时（加载后除外）。

**行为**：在 `@SHOW_SHOP` 之前调用。注意，加载存档后进入 SHOP 时**不会**调用 `@EVENTSHOP`。

```erb
@EVENTSHOP
PRINTW 欢迎来到商店！
```

### `@EVENTBUY`

**触发时机**：在 SHOP 中购买商品成功后。

**行为**：购买成功后，`BOUGHT` 变量已被设置为购买的商品编号，`ITEM:BOUGHT` 已增加 1，`MONEY` 已减少。

```erb
@EVENTBUY
PRINTW 购买了 %ITEMNAME:BOUGHT%！
```

### `@EVENTTRAIN`

**触发时机**：进入 TRAIN 阶段时，在 `@SHOW_STATUS` 之前。

**行为**：如果未定义，引擎直接跳过进入 `@SHOW_STATUS`。

```erb
@EVENTTRAIN
PRINTW 调教开始！
```

### `@EVENTCOM`

**触发时机**：在 TRAIN 中执行命令时，在调用 `@COMxx` 之前。

**行为**：`SELECTCOM` 已被设置为选中的命令编号。

```erb
@EVENTCOM
PRINTW 执行了命令 {SELECTCOM}
```

### `@EVENTCOMEND`

**触发时机**：在 TRAIN 中命令执行成功后（`@COMxx` 返回非 0 值），`@SOURCE_CHECK` 结束后。

**行为**：所有角色的 `SOURCE` 已被重置为 0。如果 `@EVENTCOMEND` 中没有执行 `WAIT` 指令，引擎会自动添加一个 `WAIT`。

```erb
@EVENTCOMEND
PRINTW 命令执行完毕
```

### `@EVENTTURNEND`

**触发时机**：执行 `BEGIN TURNEND` 后。

**行为**：回合结束事件。如果 `@EVENTTURNEND` 中没有执行 `BEGIN` 指令，引擎会因为没有后续处理而报错终止。

```erb
@EVENTTURNEND
DAY += 1
PRINTW 第 {DAY} 天结束
BEGIN SHOP
```

### `@EVENTEND`

**触发时机**：执行 `BEGIN AFTERTRAIN` 后。

**行为**：调教结束事件。如果 `@EVENTEND` 中没有执行 `BEGIN` 指令，引擎会因为没有后续处理而报错终止。

```erb
@EVENTEND
PRINTW 调教完全结束
BEGIN SHOP
```

### `@EVENTLOAD`

**触发时机**：加载存档后，在 `@SYSTEM_LOADEND` 之后（如果定义了的话）。

**行为**：加载完成事件。如果 `@EVENTLOAD` 中没有执行 `BEGIN` 指令，则照常转移到 `@SHOW_SHOP`。

```erb
@EVENTLOAD
PRINTW 存档加载完成！
```

### `@BEFORE_THROW` （SK 专属） { #before_throw }

**触发时机**：执行 `THROW` 指令抛出异常前。

**行为**：允许脚本拦截和处理即将抛出的异常。如果 `@BEFORE_THROW` 事件函数存在，异常会被延迟抛出，允许脚本进行清理或恢复操作。

**参数**：异常消息可通过事件函数内部访问。

**注意**：如果在 `@BEFORE_THROW` 中再次调用 `THROW`，会导致递归调用被阻断，消息直接打印而不再次触发该事件。

```erb
@BEFORE_THROW
#PRI
PRINTW 检测到异常，尝试恢复...
; 可以在这里执行清理操作或尝试恢复
; 如果函数正常结束，异常会继续抛出
```

### `@BEFORE_ERROR` （SK 专属） { #before_error }

**触发时机**：任何错误第一次发生时（包括运行时错误、脚本错误等）。

**行为**：在错误处理流程开始前调用，提供一个统一的错误处理钩子。允许脚本在错误显示给用户之前进行干预。

**参数**：错误信息和异常对象可通过事件函数内部访问。

**注意**：如果在 `@BEFORE_ERROR` 中再次发生错误，会直接进入错误处理流程而不再触发该事件。

```erb
@BEFORE_ERROR
#PRI
PRINTW 发生错误，正在处理...
; 可以在这里记录错误日志或尝试修复
```

> **SK 专属说明**：`BEFORE_THROW` 和 `BEFORE_ERROR` 是 Skia 版本新增的事件函数，提供了更强大的错误处理能力。原版 Emuera 和其他变体不支持这些事件。

---

## 系统函数列表

系统函数由引擎在特定时机调用，但只能定义一次，不支持 `#PRI`/`#LATER` 等修饰符。

### 标题相关

| 函数名 | 触发时机 | 说明 |
|--------|---------|------|
| `@SYSTEM_TITLE` | 启动后进入标题画面 | 自定义标题画面，替代标准标题 |
| `@TITLE_LOADGAME` | 标题画面选择"读取" | 自定义加载画面，替代标准加载画面 |

### SHOP 相关

| 函数名 | 触发时机 | 说明 |
|--------|---------|------|
| `@SHOW_SHOP` | 进入 SHOP 后 | 显示商店画面 |
| `@USERSHOP` | SHOP 中输入非购买编号 | 处理自定义输入 |

### TRAIN 相关

| 函数名 | 触发时机 | 说明 |
|--------|---------|------|
| `@SHOW_STATUS` | TRAIN 循环开始 | 显示状态画面 |
| `@SHOW_USERCOM` | 显示可执行命令后 | 显示自定义命令提示 |
| `@USERCOM` | 输入不可执行的命令 | 处理自定义命令输入 |
| `@SOURCE_CHECK` | `@COMxx` 返回非 0 后 | 处理 SOURCE 计算 |
| `@COMxx` | 输入可执行的命令 | 执行对应编号的命令 |
| `@COM_ABLExx` | 显示命令列表时 | 判断命令是否可执行（返回 0 = 不可执行） |
| `@CALLTRAINEND` | 连续调教命令结束后 | 连续调教结束处理 |

### ABLUP 相关

| 函数名 | 触发时机 | 说明 |
|--------|---------|------|
| `@SHOW_JUEL` | 进入 ABLUP 后 | 显示宝石画面 |
| `@SHOW_ABLUP_SELECT` | `@SHOW_JUEL` 后 | 显示能力提升选择 |
| `@ABLUPxx` | 选择提升项目 | 执行对应编号的能力提升 |
| `@USERABLUP` | 输入超出 0~99 范围 | 处理自定义提升输入 |

### 存档相关

| 函数名 | 触发时机 | 说明 |
|--------|---------|------|
| `@SAVEINFO` | 保存前一刻 | 生成存档描述信息 |
| `@SYSTEM_AUTOSAVE` | 自动保存时 | 自定义自动保存处理 |
| `@SYSTEM_LOADEND` | 加载完成后 | 自定义加载后处理（在 `@EVENTLOAD` 之前） |

---

## 调用流程详解

### TRAIN 循环中的事件函数

TRAIN 是最复杂的流程，涉及多个事件和系统函数的协作：

```
BEGIN TRAIN
    │
    ├─ @EVENTTRAIN（可选，可多次定义）
    │
    ├─ @SHOW_STATUS（必须定义）
    │   ├─ 显示可执行命令（调用 @COM_ABLExx 判断）
    │   └─ @SHOW_USERCOM（必须定义）
    │
    ├─ 等待输入
    │
    ├─ 输入可执行命令？
    │   ├─ 是 → @EVENTCOM（可多次定义）
    │   │       → @COMxx（必须定义，返回非0=成功）
    │   │       → @SOURCE_CHECK（必须定义）
    │   │       → @EVENTCOMEND（可多次定义）
    │   │       → 回到 @SHOW_STATUS
    │   │
    │   └─ 否 → @USERCOM（必须定义）
    │           → 回到 @SHOW_STATUS
    │
    └─ 执行 BEGIN 指令 → 离开 TRAIN
```

### SHOP 循环中的事件函数

```
BEGIN SHOP
    │
    ├─ @EVENTSHOP（可选，可多次定义）
    │
    ├─ 自动保存（如果启用）
    │   └─ @SYSTEM_AUTOSAVE 或 @SAVEINFO
    │
    ├─ @SHOW_SHOP（必须定义）
    │
    ├─ 等待输入
    │
    ├─ 输入购买编号？
    │   ├─ 是 → 购买处理 → @EVENTBUY（可多次定义）
    │   │       → 回到 @SHOW_SHOP
    │   │
    │   └─ 否 → @USERSHOP（必须定义）
    │           → 回到 @SHOW_SHOP
    │
    └─ 执行 BEGIN 指令 → 离开 SHOP
```

---

## 常见模式

### 初始化模式

```erb
@EVENTFIRST
#PRI
; 最先执行的初始化
MONEY = 500
DAY = 1

@EVENTFIRST
; 普通初始化
CALL INIT_ITEMS
CALL INIT_CHARACTERS

@EVENTFIRST
#LATER
; 最后执行的初始化
PRINTW 初始化完成！
BEGIN SHOP
```

### 加载后处理模式

```erb
@SYSTEM_LOADEND
; 在 @EVENTLOAD 之前执行
PRINTW 系统加载完成

@EVENTLOAD
; 在 @SYSTEM_LOADEND 之后执行
PRINTW 欢迎回来！
```

### 命令扩展模式

```erb
@EVENTCOM
; 在每个命令执行前统一处理
TFLAG:命令计数 += 1

@EVENTCOMEND
; 在每个命令执行后统一处理
CALL CHECK_LEVEL_UP
```

---

## 常见陷阱

| 陷阱 | 说明 | 解决方案 |
|------|------|---------|
| 事件函数不执行 `BEGIN` | 某些事件函数（如 `@EVENTFIRST`、`@EVENTEND`）如果不执行 `BEGIN`，引擎会报错终止 | 确保在事件函数末尾执行 `BEGIN` 或 `RETURN` |
| `@EVENTSHOP` 加载后不触发 | 加载存档后直接进入 SHOP，不调用 `@EVENTSHOP` | 使用 `@EVENTLOAD` 或 `@SYSTEM_LOADEND` 处理加载后逻辑 |
| `#ONLY` 误用 | `#ONLY` 会跳过所有同名事件函数，包括其他文件中的定义 | 谨慎使用 `#ONLY`，通常 `#SINGLE` 更安全 |
| `#LOCALSIZE` 在事件函数中无效 | 事件函数的 `#LOCALSIZE` 被忽略 | 使用 `#DIM` 声明私有变量代替 |
| 系统函数多次定义 | 系统函数只能定义一次，多次定义会报错 | 确保每个系统函数只在一个文件中定义 |
| `@COM_ABLExx` 返回值误解 | 返回 0 表示不可执行，非 0 表示可执行 | 注意是"非 0 = 可执行"，不是"1 = 可执行" |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| ERB 文件格式扩展 | [ERB 文件格式扩展](erb-format-extension.zh.md) |
| 赋值语句详解 | [赋值语句](assignment.zh.md) |
| 系统流程图 | [流程图](../Emuera/system_flow.zh.md) |
| BEGIN 指令 | [BEGIN](../Reference/BEGIN.zh.md) |
| CALL 指令 | [CALL](../Reference/CALL.zh.md) |
