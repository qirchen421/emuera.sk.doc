---
hide:
  - toc
---

# ENUMMACRO Functions

| Function name                                                                   | Arguments  | Return |
| :----------------------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.en.md) | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.en.md)   | `string`   | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.en.md)       | `string`   | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMMACROBEGINSWITH keyword
    int ENUMMACROENDSWITH keyword
    int ENUMMACROWITH keyword
    ```

    Returns the total number of defined macros whose names contain `keyword`.  
    Also assigns macro names containing `keyword` to the array of `RESULTS`.

    - `ENUMMACROBEGINSWITH` returns macro names that start with `keyword`.
    - `ENUMMACROENDSWITH` returns macro names that end with `keyword`.
    - `ENUMMACROWITH` returns macro names that contain `keyword`.

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DEFINE Foo2 "Test"
    #DEFINE Foo3
    #DEFINE MyFoo 1 + 1
    #DEFINE YourFoo 1 + 1
    #DEFINE AFooInTheMiddle
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML Number of macro names starting with "Foo":{ENUMMACROBEGINSWITH("Foo")}
        ENUMMACROENDSWITH "Foo"
        PRINTFORML Number of macro names ending with "Foo":{RESULT}
        CALL PrintFoo
        ENUMMACROWITH "Foo"
        PRINTFORML Number of macro names containing "Foo":{RESULT}
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
    Number of macro names starting with "Foo":2
    Number of macro names ending with "Foo":2
    MyFoo, YourFoo
    Number of macro names containing "Foo":5
    Foo2, Foo3, MyFoo, YourFoo, AFooInTheMiddle
    ```
