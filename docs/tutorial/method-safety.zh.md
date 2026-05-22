# 函数安全性与 METHOD_SAFE

!!! info "前置知识"

    - **Reference 分类**: [函数系列（CALL 等）](../Reference/README.zh.md#function-call)
    - [命令 vs 表达式](command-vs-expression.zh.md) — 两条求值路径、RESULT 污染
    - [变量声明系统](variable-declaration.zh.md) — #FUNCTION/#FUNCTIONS 声明
    - [运行时机制](runtime-mechanics.zh.md) — 函数调用流水线

!!! tip "本章要点"

    - `METHOD_SAFE` 是函数注册时的安全标志，标记了哪些命令可以在 `#FUNCTION` 函数体内安全调用
    - 不带 `METHOD_SAFE` 的命令（如 `CALL`、`WAIT`、`INPUT`）禁止在 `#FUNCTION` 函数体内使用——编译期会报错
    - 理解 `METHOD_SAFE` 的本质是理解 ERABASIC 对表达式函数的**副作用限制**：表达式函数应尽量无副作用，但引擎并未强制——它只限制了**控制流和 I/O 类**副作用

---

## 什么是 METHOD_SAFE

`METHOD_SAFE` 是 ERABASIC 引擎在函数注册时设置的一个标志位（flag），定义在 `FunctionIdentifier.cs` 中：

```csharp
public const int METHOD_SAFE = 0x00004;
// #Function中で呼び出してよい命令。WAITなど入力を伴うもの、CALLなど関数呼び出しを伴うものは不可。
// 翻译：#FUNCTION 中可以调用的命令。WAIT 等伴随输入的、CALL 等伴随函数调用的不可。
```

**一句话概括**：`METHOD_SAFE` 标记的命令可以在 `#FUNCTION`/`#FUNCTIONS` 函数体内使用；未标记的命令禁止使用。

---

## 为什么需要 METHOD_SAFE

ERABASIC 的表达式函数（`#FUNCTION`/`#FUNCTIONS`）设计为**纯计算**——它们在表达式求值过程中被调用，期望不产生控制流跳转或阻塞式 I/O。

如果在表达式函数中调用 `CALL`（跳转到另一个函数）或 `WAIT`（等待用户输入），会破坏表达式求值的正常流程：

```erb
@BAD_FUNC(X)
#FUNCTION
    WAIT            ; ❌ 编译期报错！WAIT 不带 METHOD_SAFE
    RETURNF X * 2

@ALSO_BAD(X)
#FUNCTION
    CALL OTHER()    ; ❌ 编译期报错！CALL 不带 METHOD_SAFE
    RETURNF X + 1
```

编译器在 `ErbLoader` 中检查：当解析到 `#FUNCTION` 函数体内的命令时，如果该命令的 `IsMethodSafe()` 返回 `false`，就会发出警告并将该行标记为错误。

---

## 哪些命令带 METHOD_SAFE

### 带有 METHOD_SAFE 的典型命令

| 类别 | 命令示例 | 说明 |
|------|---------|------|
| **输出** | `PRINT`、`PRINTL`、`PRINTS`、`PRINTFORM` 等 | 文本输出不阻塞执行流 |
| **格式化输出** | `PRINTBUTTON`、`PRINTPLAIN`、`PRINTPLAINFORM` | 按钮和纯文本输出 |
| **角色信息显示** | `PRINT_ABL`、`PRINT_TALENT`、`PRINT_MARK` 等 | 显示角色属性 |
| **绘图** | `DRAWLINE`、`CUSTOMDRAWLINE`、`DRAWLINEFORM` | 画线 |
| **颜色/字体** | `SETCOLOR`、`SETBGCOLOR`、`FONTSTYLE`、`ALIGNMENT` | 视觉设置 |
| **控制流结束** | `ENDIF`、`ENDSELECT`、`DO` | 语法结构的结束标记 |
| **数据操作** | `SPLIT`、`SAVEDATA`、`UPCHECK`、`CUPCHECK` | 字符串分割、存档、参数变动检查 |
| **角色管理** | `ADDDEFCHARA` | 添加默认角色 |
| **存档** | `PUTFORM` | 在存档信息中写入 |

### 不带 METHOD_SAFE 的典型命令

| 类别 | 命令示例 | 原因 |
|------|---------|------|
| **函数调用** | `CALL`、`JUMP`、`GOTO` | 控制流跳转，破坏表达式求值 |
| **TRY 系列** | `TRYCALL`、`TRYJUMP`、`TRYGOTO` | 同上，带容错的跳转 |
| **输入等待** | `WAIT`、`INPUT`、`TINPUT`、`ONEINPUT` | 阻塞式 I/O |
| **流程控制** | `IF`、`SELECTCASE`、`REPEAT`、`WHILE`、`FOR` | 流程控制的**开始**标记（但 `ENDIF`、`ENDSELECT` 等结束标记带 METHOD_SAFE） |
| **返回** | `RETURN`、`RETURNF` | 函数返回 |
| **存档读取** | `LOADDATA` | 读取存档会改变全局状态 |

---

## METHOD_SAFE 与 RESULT 污染的关系

`METHOD_SAFE` 和 RESULT 污染是**两个独立的问题**，但经常被混淆：

| 问题 | 机制 | 影响 |
|------|------|------|
| **METHOD_SAFE** | 编译期检查 | 决定命令**能否**在 `#FUNCTION` 体内使用 |
| **RESULT 污染** | 运行期行为 | 表达式函数作为命令调用时，`METHOD_Instruction` 无条件写入 RESULT |

一个命令可以同时带 `METHOD_SAFE` 且造成 RESULT 污染——两者不矛盾。例如，`STRLEN` 作为内置表达式函数，可以在 `#FUNCTION` 体内使用（因为它本身就是表达式函数），但以命令语法调用时会污染 RESULT。

反过来，`SETFONT` 不带 `METHOD_SAFE`（它是纯命令，走 `doNormalFunction` 路径），但也不污染 RESULT——因为它根本不写入 RESULT。

**关键区分**：

```
METHOD_SAFE → "这个命令在 #FUNCTION 体内安全吗？"（编译期）
RESULT 污染 → "这个命令会意外覆盖 RESULT 吗？"（运行期）
```

---

## METHOD_SAFE 的实际检查位置

引擎在两个地方检查 `METHOD_SAFE`：

### 1. 编译期：ErbLoader

```csharp
// ErbLoader.cs — 加载 ERB 文件时
if (inMethod)  // 当前在 #FUNCTION 函数体内
{
    if (!func.Function.IsMethodSafe())
    {
        ParserMediator.Warn(
            string.Format(trerror.CanNotUseInUserFunc.Text, func.Function.Name),
            nextLine, 2, true, false);
        continue;  // 跳过该行，标记为错误
    }
}
```

这是**编译期**检查——在 ERB 文件加载时就确定了哪些命令可以使用。

### 2. 运行期：EmueraConsole（调试命令）

在调试控制台中执行命令时，也会检查 `IsMethodSafe()`：

```csharp
// EmueraConsole.cs — 调试命令执行
if (!func.Function.IsMethodSafe())
    throw new CodeEE(string.Format(trerror.CanNotUseInstruction.Text, func.Function.Name));
```

---

## 实践建议

### 1. 在 #FUNCTION 中只做计算

```erb
; ✅ 好的做法 — 纯计算
@CALC_BONUS(BASE, LEVEL)
#FUNCTION
    #DIM BONUS
    BONUS = BASE * LEVEL / 100
    RETURNF BONUS

; ⚠️ 可以但不推荐 — 有输出副作用
@DEBUG_PRINT_VALUE(X)
#FUNCTION
    PRINTVL X        ; METHOD_SAFE，编译期允许
    RETURNF X        ; 但在表达式中调用时，PRINT 的输出时机可能不符合预期

; ❌ 禁止 — 控制流副作用
@BAD_FUNC(X)
#FUNCTION
    CALL OTHER()     ; 编译期报错！CALL 不带 METHOD_SAFE
    RETURNF X
```

### 2. 需要副作用时，使用命令函数

```erb
; ✅ 命令函数（@标签，无 #FUNCTION）可以使用任何命令
@PROCESS_DATA(KEY, VAL)
    ; 可以自由使用 CALL、WAIT、INPUT 等
    CALL SAVE_TO_DB(KEY, VAL)
    WAIT
    RETURN
```

### 3. 理解 METHOD_SAFE 不等于"无副作用"

`METHOD_SAFE` 只限制了**控制流和 I/O 类**副作用。带 `METHOD_SAFE` 的命令仍然可能：

- 修改全局变量（如 `SETCOLOR` 修改当前颜色）
- 输出文本（如 `PRINTL`）
- 修改 RESULT（如表达式函数以命令语法调用时）

---

## 相关章节

- [命令 vs 表达式](command-vs-expression.zh.md) — RESULT 污染、CALLF、METHOD_Instruction
- [运行时机制](runtime-mechanics.zh.md) — 函数调用流水线
- [变量声明系统](variable-declaration.zh.md) — #FUNCTION/#FUNCTIONS 声明
- [CALLF 指令参考](../Reference/CALLF.zh.md) — CALLF 的 API 文档
