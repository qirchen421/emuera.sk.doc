# ENUMMACRO系

| 関数名                                                                   | 引数     | 戻り値 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md) | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)       | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMMACROBEGINSWITH keyword
    int ENUMMACROENDSWITH keyword
    int ENUMMACROWITH keyword
    ```

    定義されたマクロ名が`keyword`を含んでいればを`RESULTS`に代入，総数を返します。

    - `ENUMMACROBEGINSWITH`は，`keyword`で始まるマクロ名を返します。
    - `ENUMMACROENDSWITH`は，`keyword`で終わるマクロ名を返します。
    - `ENUMMACROWITH`は，`keyword`を含んだマクロ名を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

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

        PRINTFORML "Foo"で始まるマクロ名の数:{ENUMMACROBEGINSWITH("Foo")}
        ENUMMACROENDSWITH "Foo"
        PRINTFORML "Foo"で終わるマクロ名の数:{RESULT}
        CALL PrintFoo
        ENUMMACROWITH "Foo"
        PRINTFORML "Foo"を含んだマクロ名の数:{RESULT}
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
    ``` title="結果"
    "Foo"で始まるマクロ名の数:2
    "Foo"で終わるマクロ名の数:2
    MyFoo, YourFoo
    "Foo"を含んだマクロ名の数:5
    Foo2, Foo3, MyFoo, YourFoo, AFooInTheMiddle
    ```