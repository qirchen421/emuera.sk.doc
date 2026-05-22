---
hide:
  - toc
---

# SETVAR, GETVAR Functions

| Function name                                                   | Arguments      | Return   |
| :------------------------------------------------------------- | :------------- | :------- |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.en.md)  | `string`       | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.en.md) | `string`       | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.en.md)  | `string`, `any` | `1`      |

!!! info "API"
    
    ``` { #language-erbapi }
    int GETVAR varName
    string GETVARS varName
    1 SETVAR varName, value
    ```

    `GET` and `SET` functions for variables/constants represented by `varName` (constants cannot be `SET`).

    - `GETVAR` returns the value of the integer type variable/constant represented by `varName`.
    - `GETVARS` returns the value of the string type variable/constant represented by `varName`.
    - `SETVAR` assigns `value` to the variable represented by `varName`. `value` must be of the same type as the variable.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST 定数文字列 = "Banana"
    #DIM 整数型変数 = 10
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS ローカル文字列 = "local"

        ; Error: "Foo" is not a recognizable identifier
        ; PRINTFORML {GETVAR("Foo")} 
        PRINTFORM {GETVAR("整数型変数")} %GETVARS("ローカル文字列")% 
        PRINTSL GETVARS("定数文字列")

        ; Error: "定数文字列" is not a variable
        ; SETVAR "定数文字列", "Apple"
        ; Error: "整数型変数" is not string type
        ; SETVAR "整数型変数", "Apple"
        SETVAR "ローカル文字列", "Apple"
        PRINTSL ローカル文字列

        ONEINPUT
    ```
    ``` title="Result"
    10 local Banana
    Apple
    ```

### Related Items
- [STRFORM](STRFORM.en.md)
- [GETMETH,GETMETHS](GETMETH.en.md)
