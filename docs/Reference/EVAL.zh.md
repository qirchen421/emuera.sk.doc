# EVAL, EVALS ¶

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| **EVAL** | string expression(, int defaultValue) | int |
| **EVALS** | string expression(, string defaultValue) | string |

### API

1. `int EVAL(expression[, defaultValue])`
2. `string EVALS(expression[, defaultValue])`

将传入的字符串 `expression` 作为 ERB 表达式在运行时进行动态解析与求值。
* `EVAL` 用于计算并返回**整数**结果。
* `EVALS` 用于计算并返回**字符串**结果。

**安全失败机制（Fallback）：**
如果传入的表达式为空、存在语法错误、引用的变量不存在，或者计算结果的类型与函数要求的类型不匹配（例如用 `EVAL` 计算了一个字符串），引擎**不会抛出红字报错**，而是会静默拦截错误，并返回 `defaultValue`。
* 如果省略 `defaultValue`，`EVAL` 默认返回 `0`，`EVALS` 默认返回空字符串 `""`。

### Hint

* 表达式内的变量会绑定到**当前执行该函数的上下文**。这意味着你可以在字符串里使用 `LOCAL`、`ARG` 等局部变量，它们会正确读取当前函数内的值。
* 非常适合与 `DataTable` 或 `XML` 系统配合，将计算公式作为数据存储在外部，实现高度的数据驱动架构。

### Example

**MAIN.ERB**
```erb
@SYSTEM_TITLE
    LOCAL:0 = 10
    LOCAL:1 = 20
    
    ; 1. 正常的数学运算
    PRINTFORML EVAL("LOCAL:0 + LOCAL:1 * 2") = {EVAL("LOCAL:0 + LOCAL:1 * 2")}
    
    ; 2. 带有三元运算符的复杂逻辑
    PRINTFORML EVAL("LOCAL:0 > 5 ? 100 # 50") = {EVAL("LOCAL:0 > 5 ? 100 # 50")}
    
    ; 3. 触发安全失败机制 (拼写错误的变量名，返回默认值 -1)
    PRINTFORML EVAL("LOOOOCAL:0 + 1", -1) = {EVAL("LOOOOCAL:0 + 1", -1)}
    
    ; 4. 字符串动态求值
    LOCALS:0 = 剑士
    PRINTFORML EVALS("\"职业是: \" + LOCALS:0") = %EVALS("\"职业是: \" + LOCALS:0", "未知")%

    ONEINPUT
```

**Result**
```text
EVAL("LOCAL:0 + LOCAL:1 * 2") = 50
EVAL("LOCAL:0 > 5 ? 100 # 50") = 100
EVAL("LOOOOCAL:0 + 1", -1) = -1
EVALS("\"职业是: \" + LOCALS:0") = 职业是: 剑士
```