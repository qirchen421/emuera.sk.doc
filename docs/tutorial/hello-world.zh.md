# Hello World

!!! info "本节对应手册"

    - [ERB 书式](../eramaker/ERB_format.md) — eramaker 的 ERB 格式（历史参考）
    - [系统流程](../Emuera/system_flow.md) — 引擎启动与函数调用流程

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
| `PRINTL [0] 开始游戏` | 输出选项文本 |
| `INPUT` | 等待用户输入一个数字，结果存入 `RESULT` |
| `IF RESULT == 0` | 判断用户输入是否为 0 |
| `BEGIN FIRST` | 跳转到游戏开始流程 |
| `BEGIN LOADGAME` | 跳转到读取存档流程 |

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
| `#FUNCTION` | 标记此函数为表达式函数（紧跟 `@` 行） |
| `RETURNF ARG:0 + ARG:1` | 表达式函数用 `RETURNF` 返回值（不是 `RETURN`） |

!!! warning "#FUNCTION 必须紧跟 @ 行"

    ```erb
    ; ❌ 错误：@ 和 #FUNCTION 之间有空行
    @ADD(ARG:0, ARG:1)

    #FUNCTION

    ; ✅ 正确：#FUNCTION 紧跟 @ 行
    @ADD(ARG:0, ARG:1)
    #FUNCTION
    ```

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 | 原因 |
|------|---------|---------|------|
| 字符串不加引号 | `CALL GREET(勇者)` | `CALL GREET("勇者")` | 不加引号会被当作变量名 |
| #DIM 位置错误 | `@F` → `PRINTL` → `#DIM` | `@F` → `#DIM` → `PRINTL` | #DIM 必须紧跟 @ 行 |
| A-Z 做变量名 | `#DIM A` | `#DIM L_A` | A~Z 是引擎内置变量 |
| RETURNF 用在命令式函数 | `RETURNF 42` | `RETURN 42` | RETURNF 仅用于表达式函数 |

---

## 下一步

| 你想了解什么 | 前往 |
|:---|:---|
| 文件类型与处理顺序 | [文件类型](file-types.zh.md) |
| 行类型与结构 | [行类型](line-types.zh.md) |
