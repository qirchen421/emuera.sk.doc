# ENUMVAR系

| 関数名                                                        | 引数     | 戻り値 |
| :------------------------------------------------------------ | :------- | :----- |
| ![](../assets/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md) | `string` | `int`  |
| ![](../assets/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)   | `string` | `int`  |
| ![](../assets/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)       | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMVARBEGINSWITH keyword
    int ENUMVARENDSWITH keyword
    int ENUMVARWITH keyword
    ```

    定義された変数・定数名が`keyword`を含んでいればを`RESULTS`に代入，総数を返します。

    - `ENUMVARBEGINSWITH`は，`keyword`で始まる変数・定数名を返します。
    - `ENUMVARENDSWITH`は，`keyword`で終わる変数・定数名を返します。
    - `ENUMVARWITH`は，`keyword`を含んだ変数・定数名を返します。

!!! warning "注意"

    [`EXISTVAR`](./EXISTVAR.md)と違って，ローカル変数・定数を列挙しません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML "Foo"で始まる変数・定数名の数:{ENUMFUNCBEGINSWITH("Foo")}
        ENUMFUNCENDSWITH "Foo"
        PRINTFORML "Foo"で終わる変数・定数名の数:{RESULT}
        CALL PrintFoo
        ENUMFUNCWITH "Foo"
        PRINTFORML "Foo"を含んだ変数・定数名の数:{RESULT}
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
    "Foo"で始まる関数名の数:3
    "Foo"で終わる関数名の数:3
    PrintFoo, Dummy1Foo, Dummy2Foo
    "Foo"を含んだ関数名の数:7
    PrintFoo, Foo1, Foo2, Foo3, Dummy1Foo, Dummy2Foo, My_Foo_Func
    ```