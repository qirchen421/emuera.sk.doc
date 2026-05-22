---
hide:
  - toc
---

# ENUMVAR Functions

| Function name                                                                   | Arguments  | Return |
| :----------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.en.md) | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.en.md)   | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.en.md)       | `string`   | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMVARBEGINSWITH keyword
    int ENUMVARENDSWITH keyword
    int ENUMVARWITH keyword
    ```

    Returns the total number of defined variables and constants whose names contain `keyword`.  
    Also assigns variable and constant names containing `keyword` to the array of `RESULTS`.

    - `ENUMVARBEGINSWITH` returns variable/constant names that start with `keyword`.
    - `ENUMVARENDSWITH` returns variable/constant names that end with `keyword`.
    - `ENUMVARWITH` returns variable/constant names that contain `keyword`.

    !!! warning "Warning"

        Unlike [`EXISTVAR`](./EXISTVAR.en.md), this does not enumerate local variables or constants.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DIM Foo2, 2, 2
    #DIMS CONST Foo3 = "3", "4"
    #DIM MyFoo 
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS Local3DFoo, 2, 2, 2

        PRINTFORML Number of variable/constant names starting with "Foo":{ENUMVARBEGINSWITH("Foo")}
        ENUMVARENDSWITH "Foo"
        PRINTFORML Number of variable/constant names ending with "Foo":{RESULT}
        CALL PrintFoo
        ENUMVARWITH "Foo"
        PRINTFORML Number of variable/constant names containing "Foo":{RESULT}
        CALL PrintFoo

        ONEINPUT

    @PrintFoo
        #DIM i
        FOR i, 0, RESULT
            SIF i>0
                PRINT , 
            PRINTS RESULTS:i
        NEXT
        PRINTL
    ```
    ``` title="Result"
    Number of variable/constant names starting with "Foo":3
    Number of variable/constant names ending with "Foo":1
    MyFoo
    Number of variable/constant names containing "Foo":4
    Foo1, Foo2, Foo3, MyFoo
    ```

### Related Items
- [EXISTVAR](EXISTVAR.en.md)
