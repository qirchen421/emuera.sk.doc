# ENUMVAR系

| 関数名                                                               | 引数     | 戻り値 |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md) | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)       | `string` | `int`  |

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

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DIM Foo2, 2, 2
    #DIMS CONST Foo3 = "3", "4"
    #DIM MyFoo 
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS Local3DFoo, 2, 2, 2

        PRINTFORML "Foo"で始まる変数・定数名の数:{ENUMVARBEGINSWITH("Foo")}
        ENUMVARENDSWITH "Foo"
        PRINTFORML "Foo"で終わる変数・定数名の数:{RESULT}
        CALL PrintFoo
        ENUMVARWITH "Foo"
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
    "Foo"で始まる変数・定数名の数:3
    "Foo"で終わる変数・定数名の数:1
    MyFoo
    "Foo"を含んだ変数・定数名の数:4
    Foo1, Foo2, Foo3, MyFoo
    ```