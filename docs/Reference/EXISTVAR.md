# EXISTVAR

| 関数名                                                | 引数     | 戻り値 |
| :---------------------------------------------------- | :------- | :----- |
| ![](../assets/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int EXISTVAR varName
    ```

    `varName`と同名な変数・定数が定義されていれば、変数・定数の種類によって正数を返します。定義されていない場合`0`を返します。
    
    - 整数型の場合、返り値 setbit 1
    - 文字列型の場合、返り値 setbit 2
    - 定数の場合、返り値 setbit 3
    - 2次元配列の場合、返り値 setbit 4
    - 3次元配列の場合、返り値 setbit 5

!!! hint "ヒント"

    命令、式中関数両方対応しています

!!! example "例"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIM CONST BIT = 0, 1, 1p1, 1p2, 1p3, 1p4, 1p5, 1p6, 1p7
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM キャラデータ, 2, 2
        #DIMS 名前

        ; 「キャラデータ」は2次元整数型配列だから setbit 1、4
        PRINTFORML {EXISTVAR("キャラデータ")} {BIT:1|BIT:4}
        ; 「BIT」は整数型定数配列だから setbit 1、3
        PRINTFORML {EXISTVAR("BIT")} {BIT:1|BIT:3}
        ; 「名前」は文字列型だから setbit 2
        PRINTFORML {EXISTVAR("名前")} {BIT:2}
        ; 今のコンテキストに「性別」が存在しない
        PRINTFORML {EXISTVAR("性別")}

        ONEINPUT

    @Foo
        #DIMS 性別
    ```
    ``` title="結果"
    9 9
    5 5
    2 2
    0
    ```