# ISDEFINED

| 関数名                                                  | 引数     | 戻り値 |
| :------------------------------------------------------ | :------- | :----- |
| ![](../assets/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ISDEFINED macroName
    ```

    `macroName`と同名なマクロ(`#DEFINE XXX`)が定義されていたら`1`を返します。定義されていない場合`0`を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています

!!! example "例"

    ``` { #language-erh title="DEFINE.ERH" }
    #DEFINE 体力 0
    #DEFINE 気力 1
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM キャラデータ, 2 = 1000, 200

        PRINTFORML {ISDEFINED("体力")} {キャラデータ:体力}
        PRINTFORML {ISDEFINED("気力")} {キャラデータ:気力}
        PRINTFORML {ISDEFINED("攻撃力")}

        ONEINPUT
    ```
    ``` title="結果"
    1 1000
    1 200
    0
    ```