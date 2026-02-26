---
hide:
  - toc
---

# ENUMFUNC Functions

| Function name                                                                   | Arguments  | Return |
| :----------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md) | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)   | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)       | `string`   | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFUNCBEGINSWITH keyword
    int ENUMFUNCENDSWITH keyword
    int ENUMFUNCWITH keyword
    ```

    Returns the total number of defined functions that contain `keyword`.  
    Also assigns function names containing `keyword` to the array of `RESULTS`.

    - `ENUMFUNCBEGINSWITH` returns function names that start with `keyword`.
    - `ENUMFUNCENDSWITH` returns function names that end with `keyword`.
    - `ENUMFUNCWITH` returns function names that contain `keyword`.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML Number of function names starting with "Foo":{ENUMFUNCBEGINSWITH("Foo")}
        ENUMFUNCENDSWITH "Foo"
        PRINTFORML Number of function names ending with "Foo":{RESULT}
        CALL PrintFoo
        ENUMFUNCWITH "Foo"
        PRINTFORML Number of function names containing "Foo":{RESULT}
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

    @Foo1
    @Foo2
    @Foo3
    @Dummy1Foo
    @Dummy2Foo
    @My_Foo_Func
    ```
    ``` title="Result"
    Number of function names starting with "Foo":3
    Number of function names ending with "Foo":3
    PrintFoo, Dummy1Foo, Dummy2Foo
    Number of function names containing "Foo":7
    PrintFoo, Foo1, Foo2, Foo3, Dummy1Foo, Dummy2Foo, My_Foo_Func
    ```

### Related Items
- [EXISTFUNCTION](EXISTFUNCTION.md)
