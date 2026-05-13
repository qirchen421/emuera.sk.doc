---
hide:
  - toc
---

# EVAL / EVALS

| Function Name                                                 | Arguments                          | Return Value |
| :------------------------------------------------------------ | :--------------------------------- | :----------- |
| ![](../assets/images/IconSK.webp)[`EVAL`](./EVAL.en.md)  | `string`(, `int`)                  | `int`        |
| ![](../assets/images/IconSK.webp)[`EVALS`](./EVAL.en.md) | `string`(, `string`)               | `string`     |

!!! info "API"

    ``` { #language-erbapi }
    int EVAL expressionString{, defaultValue}
    string EVALS expressionString{, defaultValue}
    ```

    Dynamically parses and evaluates the passed string `expression` as an ERB expression at runtime.
    - `EVAL` computes and returns an **integer** result.
    - `EVALS` computes and returns a **string** result.

    **Safe Fallback Mechanism**:
    If the passed expression is empty, contains a syntax error, references a non-existent variable, or the result type does not match the function's expected type (e.g., computing a string with `EVAL`), the engine **does not throw a red error**. Instead, it silently intercepts the error and returns `defaultValue`.
    - If `defaultValue` is omitted, `EVAL` returns `0` and `EVALS` returns an empty string `""`.

!!! hint "Hint"

    Supports both command and expression function syntax.

    Command syntax:
    ```
    EVAL "LOCAL + 10"
    EVALS "\"string result\""
    ```

    Expression syntax:
    ```
    LOCAL = EVAL("LOCAL + 10")
    RESULTS:0 '= EVALS("\"string result\"")
    ```

    Variables within the expression are bound to the **context of the currently executing function**.
    Works well with `DataTable` or `XML` systems to store calculation formulas as external data, enabling a highly data-driven architecture.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        LOCAL:0 = 10
        LOCAL:1 = 20

        ; 1. Normal arithmetic
        PRINTFORML EVAL("LOCAL:0 + LOCAL:1 * 2") = {EVAL("LOCAL:0 + LOCAL:1 * 2")}

        ; 2. Complex logic with ternary operator
        PRINTFORML EVAL("LOCAL:0 > 5 ? 100 # 50") = {EVAL("LOCAL:0 > 5 ? 100 # 50")}

        ; 3. Safe fallback (misspelled variable name, returns default value -1)
        PRINTFORML EVAL("LOOOOCAL:0 + 1", -1) = {EVAL("LOOOOCAL:0 + 1", -1)}

        ; 4. Dynamic string evaluation
        LOCALS:0 = Warrior
        PRINTFORML EVALS("\"Class: \" + LOCALS:0") = %EVALS("\"Class: \" + LOCALS:0", "Unknown")%

        ONEINPUT
    ```
    ``` title="Result"
    EVAL("LOCAL:0 + LOCAL:1 * 2") = 50
    EVAL("LOCAL:0 > 5 ? 100 # 50") = 100
    EVAL("LOOOOCAL:0 + 1", -1) = -1
    EVALS("\"Class: \" + LOCALS:0") = Class: Warrior
    ```

### See Also
- [CALLSTR Series](CALLSTR.en.md)
