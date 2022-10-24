---
hide:
  - toc
---

# ENUMFUNC系

| 関数名                                                                 | 引数     | 戻り値 |
| :--------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md) | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)       | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFUNCBEGINSWITH keyword
    int ENUMFUNCENDSWITH keyword
    int ENUMFUNCWITH keyword
    ```

    定義された関数で、`keyword`を含んでいる関数の総数を返す  
	また、`keyword`を含む関数名を`RESULTS`の配列に代入する

    - `ENUMFUNCBEGINSWITH`は，`keyword`で始まる関数名を返します。
    - `ENUMFUNCENDSWITH`は，`keyword`で終わる関数名を返します。
    - `ENUMFUNCWITH`は，`keyword`を含んだ関数名を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML "Foo"で始まる関数名の数:{ENUMFUNCBEGINSWITH("Foo")}
        ENUMFUNCENDSWITH "Foo"
        PRINTFORML "Foo"で終わる関数名の数:{RESULT}
        CALL PrintFoo
        ENUMFUNCWITH "Foo"
        PRINTFORML "Foo"を含んだ関数名の数:{RESULT}
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
    ``` title="結果"
    "Foo"で始まる関数名の数:3
    "Foo"で終わる関数名の数:3
    PrintFoo, Dummy1Foo, Dummy2Foo
    "Foo"を含んだ関数名の数:7
    PrintFoo, Foo1, Foo2, Foo3, Dummy1Foo, Dummy2Foo, My_Foo_Func
    ```
