# 命令 vs 表达式 — 两种求值路径的根本差异

!!! info "本节对应知识库"

    - [命令与表达式的边界](../../../shared-trae/knowledge/erabasic/command-vs-expression.md) — 源码级完整分析
    - [语法速查](../../../shared-trae/knowledge/erabasic/syntax-quickref.md) — 命令/表达式语法规则速查

---

## 问题的起源

如果你从 C/Java/Python 等语言转来，你可能会自然地写出这样的代码：

```erb
STRLEN("hello")
```

然后收到一个错误：

```
命令の直後は半角スペースまたはタブでなければなりません
（命令后必须是半角空格或制表符）
```

**为什么 `STRLEN("hello")` 不能作为独立语句？** 答案在 ERABASIC 的解析器层面。

---

## 解析器规则

ERABASIC 的解析器在词法分析阶段就对「命令」和「表达式」做了严格区分。

### 命令行的解析规则

当解析器遇到一个函数名开头的行时，它会检查函数名后的**第一个字符**：

```
函数名 + 空格/制表符/分号 → 命令行（InstructionLine）
函数名 + (                  → 非法！→ InvalidLine
函数名 + 其他               → 非法！→ InvalidLine
```

这条规则定义在 [`LogicalLineParser.cs`](file:///d:/emuera/emuera_lazyloading_selfmodified_version/Emuera/Runtime/Script/Parser/LogicalLineParser.cs) 中：

```csharp
var current = stream.Current;
if (current != ';' && current != ' ' && current != '\t' && ...)
{
    return new InvalidLine(position, errMes);
}
```

**核心规则**：命令行中，函数名后**必须紧跟空格、制表符或分号**。`(` 会导致解析失败。

### 两种语法对照

| | 命令语法 | 表达式语法 |
|------|---------|-----------|
| **形式** | `FUNC arg1, arg2, arg3` | `FUNC(arg1, arg2, arg3)` |
| **分隔符** | 函数名后**空格**，参数间逗号 | 函数名后 `(`，参数间逗号，结尾 `)` |
| **出现位置** | 独立行（语句） | 表达式中（赋值右侧、条件、运算…） |
| **参数解析** | 取决于 `ArgumentBuilder` 类型 | 统一用表达式解析器 |

---

## 实例演示

### 正确用法

```erb
; ✅ 命令语法（空格分隔）— 作为独立语句
STRLEN "hello"
PRINTL 结果

; ✅ 表达式语法（括号）— 在表达式中
X = STRLEN("hello")
IF STRLEN("hello") > 5
    PRINTL 长字符串
ENDIF

; ✅ CALL 命令 — 使用逗号分隔参数
CALL MY_FUNC(1, 2)
```

### 错误用法

```erb
; ❌ 括号语法作为独立命令 → 解析失败！
STRLEN("hello")
; → InvalidLine: "命令の直後は半角スペースまたはタブでなければなりません"

; ❌ 同样，自定义表达式函数也不行
@CALC(X, Y)
#FUNCTION
    RETURNF X * Y

CALC(3, 5)    ; → 解析失败！
```

---

## 为什么这很重要

这个语法限制对 **getter 函数**（如 `STRLEN`、`MAX`）影响不大——它们本来就应该用在表达式中。

但它对 **setter 函数**（有副作用的函数）造成了真正的困境：

```erb
; 开发者想写一个 SETTER 函数来修改状态
@SETTER(KEY, VAL)
#FUNCTION
    ; 修改某个全局状态
    RETURNF 1    ; 返回值无意义，只是为了满足 #FUNCTION 的要求

; ❌ 无法写成自然的命令形式
SETTER("key", val)
; → 解析失败！函数名后不能直接跟 '('

; ⚠️ 只能用空格语法
SETTER "key", val
; → 解析成功，但会污染 RESULT！（见下文）
```

---

## RESULT 污染问题

当表达式函数（`#FUNCTION`/`#FUNCTIONS`）以命令语法（空格）调用时，引擎走 `METHOD_Instruction` 路径，会**无条件**将返回值写入 `RESULT`（整数）或 `RESULTS`（字符串）：

```erb
RESULT = 42
PRINTVL RESULT          ; 输出 42

SETTER "key", val       ; 作为命令调用 → RESULT = 1（被污染！）
PRINTVL RESULT          ; 输出 1 ← 意外覆盖！
```

而旧式纯命令（如 `SETFONT`、`SETCOLOR`）走 `doNormalFunction` 路径，**不写入 RESULT**。

!!! info "详细分析"

    关于三条指令分发路径（A/B/C）和 RESULT 污染的完整分析，请参阅
    [命令与表达式的边界（知识库）](../../../shared-trae/knowledge/erabasic/command-vs-expression.md)。

---

## 解决方案

### 方案 1：CALLF（事后补救）

`CALLF` 是专门为解决此问题设计的指令——调用表达式函数但丢弃返回值：

```erb
; ✅ CALLF 允许括号语法，不污染 RESULT
CALLF SETTER("key", val)
; RESULT 不变
```

**缺点**：比直接写命令式函数更啰嗦。`CALLF SETTER("key", val)` 不如 `SETTER "key", val` 简洁。

!!! info "CALLF 参考"

    详见 [CALLF 指令参考](../Reference/CALLF.md)。

### 方案 2：直接注册为 Instruction（设计层面解决）

**更好的方案**是直接把 setter 函数注册为 `AInstruction`（命令），让它不走 `METHOD_Instruction` 路径：

| | 表达式函数（#FUNCTION） | 注册为 Instruction |
|------|:---:|:---:|
| **注册方式** | `FunctionMethod` → `methodInstruction` | `AInstruction` 子类 |
| **分发路径** | 路径 A → `METHOD_Instruction` | 路径 A → 自己的 `DoInstruction` |
| **写入 RESULT？** | ✅ 无条件写入 | ❌ 不写入 |
| **可在表达式中使用？** | ✅ 天然支持 | ✅ 加 `METHOD_SAFE` flag |

**实例**：`SETANIMETIMER` 在 LazyLoading 中注册为 `SETANIMETIMER_Instruction`，不写入 RESULT，同时加了 `METHOD_SAFE` flag 仍可在表达式中使用。

---

## 总结

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `FUNC(args)` 不能作为独立语句 | 解析器要求函数名后跟空格/制表符，`(` 非法 | 用空格语法 `FUNC args` 或 CALLF |
| 表达式函数作为命令污染 RESULT | `METHOD_Instruction` 无条件写入 RESULT | CALLF 或注册为 Instruction |
| CALLF 太啰嗦 | 多了一层 CALLF 包装 | 设计时就注册为 Instruction |

**核心认知**：ERABASIC 的「命令」和「表达式」是两种不同的语法形式，不是同一种语法的两种用法。这个设计源于 eramaker 的历史遗产，在现代 ERABASIC 中仍然影响着我们如何编写 setter 函数。

---

## 深入理解：ERABASIC 是命令驱动的

从这一节的语法规则可以体会到 ERABASIC 最根本的设计哲学：**它是命令驱动的语言**。

在 C/Java/Python 中，`func(a)` 就是一个函数调用语句——语言不区分「命令」和「表达式函数」。但在 ERABASIC 中，解析器看到一行代码时，首先判断的是：**这一行是不是命令？**

```
解析器视角：
  行首是已知命令名？ → 命令语法（空格分隔参数）
  行首是 CALL？      → 调用自定义命令（括号语法）
  行首是 CALLF？     → 调用表达式函数（括号语法）
  行首是变量名 + =？  → 赋值语句（表达式语法）
  行首是 IF/FOR/...？ → 控制流（表达式语法）
```

**三种调用方式，三种语法形式**：

| 调用方式 | 语法 | 示例 | 本质 |
|---------|------|------|------|
| 内置命令 | `CMD arg1, arg2` | `PRINTL "hello"` | 空格分隔，解析器直接识别 |
| CALL 自定义命令 | `CALL FUNC(arg1, arg2)` | `CALL MY_FUNC(1, 2)` | CALL 是命令，`()` 是 CALL 的参数格式 |
| CALLF 表达式函数 | `CALLF FUNC(arg1, arg2)` | `CALLF STRLEN("hello")` | CALLF 是命令，`()` 是 CALLF 的参数格式 |

**关键洞察**：`()` 括号语法本身并不区分「命令式函数」和「表达式函数」。`CALL MY_FUNC(1, 2)` 中的 `MY_FUNC` 是命令式函数（`@` 标签定义），`CALLF STRLEN("hello")` 中的 `STRLEN` 是表达式函数（`#FUNCTION` 定义）——两者都用 `()` 传参，但**都需要一个「命令」（CALL 或 CALLF）来驱动**。

换句话说：**ERABASIC 中不存在「裸」的函数调用语句。** 任何函数调用都必须通过一个命令来发起——要么是内置命令名，要么是 CALL，要么是 CALLF。这是它与主流语言最根本的语法差异。

---

## 相关章节

- [行类型与结构](line-types.zh.md) — 四种行类型的基础知识
- [表达式函数](../Emuera/user_defined_in_expression_function.zh.md) — #FUNCTION/#FUNCTIONS 的完整规格
- [CALLF 指令参考](../Reference/CALLF.md) — CALLF 的 API 文档
- [命令与表达式的边界（知识库）](../../../shared-trae/knowledge/erabasic/command-vs-expression.md) — 源码级完整分析