# Hello World

!!! info "本节对应手册"

    - [ERB 书式](../eramaker/ERB_format.zh.md) — eramaker 的 ERB 格式（历史参考）
    - [系统流程](../Emuera/system_flow.zh.md) — 引擎启动与函数调用流程

---

## 第一个 ERB 程序

在 `ERB/SYSTEM_TITLE.ERB` 中编写你的第一个函数：

```erb
@SYSTEM_TITLE
    PRINTL 欢迎来到 era 世界！
    PRINTL [0] 开始游戏
    PRINTL [1] 读取存档
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ELSEIF RESULT == 1
        BEGIN LOADGAME
    ENDIF
```

### 逐行解读

| 行 | 含义 |
|----|------|
| `@SYSTEM_TITLE` | 函数标签行，定义名为 `SYSTEM_TITLE` 的函数。引擎在标题画面自动调用此函数 |
| `PRINTL 欢迎来到 era 世界！` | 输出一行文本并换行。`PRINTL` = PRINT + Line |
| `PRINTL [0] 开始游戏` | 输出选项文本，`[0]` 自动变为可点击按钮（见下方说明） |
| `INPUT` | 等待用户输入一个数字，结果存入 `RESULT` |
| `IF RESULT == 0` | 判断用户输入是否为 0 |
| `BEGIN FIRST` | 跳转到游戏开始流程 |
| `BEGIN LOADGAME` | 跳转到读取存档流程 |

### `[N]` 按钮语法

`PRINTL [0] 开始游戏` 这行包含一个 ERABASIC 引擎的特殊行为：文本中的 `[0]` 会被自动识别为**可点击按钮**。

**你现在只需要知道**：

- `[整数]` 在 PRINTL 输出中会变成可点击按钮
- 点击按钮等效于在 INPUT 时输入该数字（点击 `[0]` → `RESULT = 0`）
- 按钮必须在 `INPUT`（或 `INPUTS`）等待输入时才能被点击
- **整行都是按钮区域**——不只是 `[0]`，`开始游戏` 也可以点击

```erb
; 这两种输入方式等效：
PRINTL [0] 开始游戏
INPUT
; 方式1：点击 "开始游戏" → RESULT = 0
; 方式2：键盘输入 0 → RESULT = 0
```

!!! tip "循序渐进"

    `[N]` 按钮是 ERABASIC 最常见的写法，但它的底层机制涉及**输出系统与输入系统的深度耦合**。本教程在不同阶段逐步深入：

    | 阶段 | 你将学到 | 在哪里 |
    |------|---------|--------|
    | 现在 | `[N]` 创建按钮，INPUT 激活按钮 | 本页 |
    | 基础输出 | 按钮的显示行为、PRINTPLAIN 不生成按钮 | [基本输出](basic-output.zh.md) |
    | 函数与 CALL | INPUT/INPUTS 完整用法、默认值、RESULT 保存 | [函数与 CALL](call.zh.md) |
    | HTML 与图形 | PRINTBUTTON 显式按钮、HTML `<button>` 标签 | [HTML 标签语法](html-syntax.zh.md) |

### 运行方式

1. 将 `Emuera.exe` 放在游戏根目录
2. 在 `ERB/` 文件夹中创建 `SYSTEM_TITLE.ERB`
3. 双击 `Emuera.exe` 启动

---

## 第二个程序：自定义函数

```erb
@SYSTEM_TITLE
    CALL GREET("勇者")
    PRINTL [0] 开始游戏
    INPUT
    IF RESULT == 0
        BEGIN FIRST
    ENDIF

@GREET(ARGS:0)
    PRINTFORM 欢迎，%ARGS:0%！
    PRINTL 你的冒险开始了。
RETURN
```

### 逐行解读

| 行 | 含义 |
|----|------|
| `CALL GREET("勇者")` | 调用函数 `GREET`，传入字符串参数 `"勇者"` |
| `@GREET(ARGS:0)` | 函数标签行，`ARGS:0` 是内置字符串参数变量 |
| `PRINTFORM 欢迎，%ARGS:0%！` | 格式化输出，`%ARGS:0%` 被替换为参数值 |
| `RETURN` | 函数返回 |

---

## 第三个程序：表达式函数

```erb
@SYSTEM_TITLE
#DIM L_RESULT
    L_RESULT = ADD(3, 5)
    PRINTFORM 3 + 5 = {L_RESULT}
    PRINTL
    WAIT

@ADD(ARG:0, ARG:1)
#FUNCTION
    RETURNF ARG:0 + ARG:1
```

### 逐行解读

| 行 | 含义 |
|----|------|
| `#DIM L_RESULT` | 声明私有整数变量 `L_RESULT` |
| `L_RESULT = ADD(3, 5)` | 调用表达式函数 `ADD`，返回值赋给 `L_RESULT` |
| `@ADD(ARG:0, ARG:1)` | 函数标签行，`ARG:0` 和 `ARG:1` 是内置整数参数变量 |
| `#FUNCTION` | 标记此函数为表达式函数（`@` 行之后的 `#` 预处理区） |
| `RETURNF ARG:0 + ARG:1` | 表达式函数用 `RETURNF` 返回值（不是 `RETURN`） |

!!! warning "`#` 预处理行必须在 `@` 行之后、执行语句之前"

    所有 `#` 开头的行（`#DIM`/`#DIMS`/`#FUNCTION` 等）必须位于 `@` 标签行之后、第一条执行语句之前。多个 `#` 行可以连续出现，顺序不限。空行和注释行（`;`）不影响。

    ```erb
    ; ❌ 错误：执行语句打断了 # 行序列
    @ADD(ARG:0, ARG:1)
        PRINTL 开始          ; → 执行语句，更新了 lastLine
    #FUNCTION               ; → 警告: "#行只能在函数声明后立刻使用"

    ; ✅ 正确：#DIM、注释、#FUNCTION 可以混合出现
    @ADD(ARG:0, ARG:1)
    #DIM L_TMP
    ; 这是注释（不影响 # 行序列）
    #FUNCTION
        RETURNF ARG:0 + ARG:1
    ```

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| 字符串不加引号 | `CALL GREET(勇者)` | `CALL GREET("勇者")` | 不加引号会被当作变量名 |
| #DIM 位置错误 | `@F` → `PRINTL` → `#DIM` | `@F` → `#DIM` → `PRINTL` | #DIM 必须在 @ 行之后、执行语句之前 |
| A-Z 做变量名 | `#DIM A` | `#DIM L_A` | A~Z 是引擎内置变量 |
| RETURNF 用在命令式函数 | `RETURNF 42` | `RETURN 42` | RETURNF 仅用于表达式函数 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 文件类型与处理顺序 | [文件类型](file-types.zh.md) |
| 行类型与结构 | [行类型](line-types.zh.md) |
