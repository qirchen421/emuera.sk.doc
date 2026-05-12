---
hide:
  - toc
---

# CALLSTR Series

| Function Name                                                            | Arguments        | Return Value |
| :----------------------------------------------------------------------- | :--------------- | :----------- |
| ![](../assets/images/IconSK.webp)[`CALLSTR`](./CALLSTR.en.md)        | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`JUMPSTR`](./CALLSTR.en.md)        | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCALLSTR`](./CALLSTR.en.md)     | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYJUMPSTR`](./CALLSTR.en.md)     | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCCALLSTR`](./CALLSTR.en.md)    | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCJUMPSTR`](./CALLSTR.en.md)    | `stringVariable` | `void` |

!!! info "API"

    ``` { #language-erbapi }
    CALLSTR stringVariable
    JUMPSTR stringVariable
    TRYCALLSTR stringVariable
    TRYJUMPSTR stringVariable
    TRYCCALLSTR stringVariable
    TRYCJUMPSTR stringVariable
    ```

    Similar to `CALL`, `JUMP`, and their `TRY` variants, but allows specifying the **complete function call line** (including function name and arguments) via a **string expression**.

    When the called function executes [`RETURN`](./RETURN.en.md), `RESULT` is set to its argument; when the function reaches its end, `RESULT` is set to `0`. This behavior is identical to [`CALL`](./CALL.en.md).

    Difference from `CALLFORM`: `CALLFORM` requires the argument structure to be fixed at compile time, while the CALLSTR series parses the entire string at runtime. This allows dynamically changing the number or type of arguments passed to a function.

    - **CALLSTR / JUMPSTR**: Executes the specified string as a function call.
    - **TRYCALLSTR / TRYJUMPSTR**: If the function name specified in the string does not exist, no error is raised and execution is skipped.
    - **TRYCCALLSTR / TRYCJUMPSTR**: Belongs to the `TRYC` system. If the specified function exists, it is executed; if not, the subsequent `CATCH` clause is executed.

    !!! warning "Notes"
        - Command syntax only. Cannot be called as an expression function.
        - The string supports two parsing formats:
          1. **Function notation**: `"FUNC_NAME(ARG1, ARG2)"`
          2. **Comma-separated notation**: `"FUNC_NAME, ARG1, ARG2"`
        - Arguments within the string are resolved in the current execution context. For example, `"MY_FUNC(LOCAL)"` reads the value of the `LOCAL` variable in the current function.
        - Since this command involves runtime lexical analysis and syntax parsing, its execution efficiency is slightly lower than static `CALL` or `CALLFORM`. Use with caution in extremely large performance-critical loops.
        - Syntax errors within the string (such as mismatched parentheses) will trigger a `CodeEE` error at runtime.
        - When passing RESULTS from INPUTS commands as arguments, note that some characters from console input need to be escaped with `\\`, including parentheses.

!!! hint "Hint"

    Command syntax only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS DYNAMIC COMMAND
        ; Dynamically construct call string
        COMMAND '= "TEST_FUNC" + "(100, 200)"
        CALLSTR COMMAND

        ; Directly pass a string containing arguments
        LOCALS = SHOW_STATUS, 1, "READY"
        TRYCALLSTR LOCALS

    @TEST_FUNC(ARG:0, ARG:1)
        PRINTFORML Received arguments: {ARG:0} and {ARG:1}

    @SHOW_STATUS(ARG, ARGS)
        PRINTFORML ID:{ARG} Mode:%ARGS%
    ```
    ``` title="Result"
    Received arguments: 100 and 200
    ID:1 Mode:READY
    ```

### See Also
- [CALL](CALL.en.md)
- [CALLFORM](FORM.en.md)
- [TRYCALL](TRY.en.md)
- [TRYC Series](TRYC.en.md)

### ![](../assets/images/IconSK.webp)Design Comparison with CALLFORM

!!! info "Significance of Runtime Parameter Reflection"

    `CALLFORM` can only construct the function name at runtime, while arguments are fixed at compile time. This is an asymmetric design where "the function name is dynamic but arguments are static," which is not truly dynamic invocation.

    The `CALLSTR` series allows specifying both function name and arguments via runtime strings, achieving complete runtime function reflection. To complement this design, the Skia version also adds silent discarding of extra parameters in `ConvertArg` and a TRY series safety net.
