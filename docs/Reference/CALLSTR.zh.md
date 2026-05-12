---
hide:
  - toc
---

# CALLSTR系

| 函数名                                                                   | 参数             | 返回值 |
| :----------------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconSK.webp)[`CALLSTR`](./CALLSTR.zh.md)           | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`JUMPSTR`](./CALLSTR.zh.md)           | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCALLSTR`](./CALLSTR.zh.md)        | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYJUMPSTR`](./CALLSTR.zh.md)        | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCCALLSTR`](./CALLSTR.zh.md)       | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCJUMPSTR`](./CALLSTR.zh.md)       | `stringVariable` | `void` |

!!! info "API"

    ``` { #language-erbapi }
    CALLSTR stringVariable
    JUMPSTR stringVariable
    TRYCALLSTR stringVariable
    TRYJUMPSTR stringVariable
    TRYCCALLSTR stringVariable
    TRYCJUMPSTR stringVariable
    ```

    与 `CALL`、`JUMP` 及其 `TRY` 系统类似，但允许通过一个**字符串表达式**来指定**完整的函数调用行**（包括函数名和参数）。

    被调用函数中执行了 [`RETURN`](./RETURN.zh.md) 时，`RESULT` 会被设为其参数值；函数到达末尾时，`RESULT` 会被设为 `0`。此行为与 [`CALL`](./CALL.zh.md) 完全一致。

    与 `CALLFORM` 的区别在于：`CALLFORM` 的参数结构在编译时必须固定，而 `CALLSTR` 系列是在运行时解析整个字符串。这意味着可以动态地改变传递给函数的参数数量或类型。

    - **CALLSTR / JUMPSTR**：将指定字符串作为函数调用执行。
    - **TRYCALLSTR / TRYJUMPSTR**：如果字符串中指定的函数名不存在，程序不会报错，而是直接跳过执行。
    - **TRYCCALLSTR / TRYCJUMPSTR**：属于 `TRYC` 系统，如果指定的函数存在则执行；如果不存在，则执行随后的 `CATCH` 分句。

    !!! warning "注意"
        - 仅支持命令语法，不支持表达式调用。
        - 字符串支持以下两种解析格式：
          1. **函数式写法**：`"FUNC_NAME(ARG1, ARG2)"`
          2. **逗号分隔写法**：`"FUNC_NAME, ARG1, ARG2"`
        - 字符串内的参数会根据当前的执行上下文进行解析。例如，`"MY_FUNC(LOCAL)"` 在执行时会读取当前函数内 `LOCAL` 变量的值。
        - 由于该命令涉及运行时的词法分析与语法解析，其执行效率略低于静态的 `CALL` 或 `CALLFORM`。在对性能要求极高的超大型循环中应谨慎使用。
        - 字符串内的语法错误（如括号不匹配）将在运行时触发 `CodeEE` 报错。
        - 接受 INPUTS 系指令的 RESULTS 作为参数时需要注意，由控制台输入的部分字符需要 `\\` 转义，包括小括号。

!!! hint "提示"

    仅命令语法可用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS DYNAMIC COMMAND
        ; 动态构造调用字符串
        COMMAND '= "TEST_FUNC" + "(100, 200)"
        CALLSTR COMMAND

        ; 直接传递包含参数的字符串
        LOCALS = SHOW_STATUS, 1, "READY"
        TRYCALLSTR LOCALS

    @TEST_FUNC(ARG:0, ARG:1)
        PRINTFORML 接收到的参数为: {ARG:0} 和 {ARG:1}

    @SHOW_STATUS(ARG, ARGS)
        PRINTFORML ID:{ARG} 模式:%ARGS%
    ```
    ``` title="结果"
    接收到的参数为: 100 和 200
    ID:1 模式:READY
    ```

### 相关项
- [CALL](CALL.zh.md)
- [CALLFORM](FORM.zh.md)
- [TRYCALL](TRY.zh.md)
- [TRYC系](TRYC.zh.md)
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — CALLSTR 属于第四代"函数名+参数全动态反射"

### ![](../assets/images/IconSK.webp)与 CALLFORM 的设计比较

!!! info "运行时参数反射的意义"

    `CALLFORM` 只能在运行时构造函数名，参数在编译时固定。这是一种"函数名动态但参数静态"的非对称设计，并非真正意义上的动态调用。

    `CALLSTR` 系列可以在运行时字符串中同时指定函数名和参数，实现完整的运行时函数反射。为配合此设计，Skia 版还新增了 `ConvertArg` 多余参数静默丢弃和 TRY 系安全网。
