# SETVAR、GETVAR系

| 関数名                                               | 引数            | 戻り値   |
| :--------------------------------------------------- | :-------------- | :------- |
| ![](../assets/IconEM.webp)[`GETVAR`](./GETVAR.md)    | `string`        | `int`    |
| ![](../assets/IconEM.webp)[`GETVARS`](./GETVAR.md)   | `string`        | `string` |
| ![](../assets/IconEM.webp)[`SETVAR`](./GETSETVAR.md) | `string`, `any` | `1`      |

!!! info "API"
    
    ``` { #language-erbapi }
    int GETVAR varName
    string GETVARS varName
    1 SETVAR varName, value
    ```

    `varName`で表した変数・定数の`GET`、`SET`関数です（定数は`SET`できい）。

    - `GETVAR`は，`varName`で表した整数型変数・定数の値を返します。
    - `GETVARS`は，`varName`で表した文字列型変数・定数の値を返します。
    - `SETVAR`は，`varName`で表した変数に`value`を代入します。`value`は変数と同じ型でなければなりません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST 定数文字列 = "Banana"
    #DIM 整数型変数 = 10
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS ローカル文字列 = "local"

        ; エラー："Foo"は解釈できない識別子です
        ; PRINTFORML {GETVAR("Foo")} 
        PRINTFORM {GETVAR("整数型変数")} %GETVARS("ローカル文字列")% 
        PRINTSL GETVARS("定数文字列")

        ; エラー："定数文字列"が変数ではありません
        ; SETVAR "定数文字列", "Apple"
        ; エラー："整数型変数"が文字列型ではありません
        ; SETVAR "整数型変数", "Apple"
        SETVAR "ローカル文字列", "Apple"
        PRINTSL ローカル文字列

        ONEINPUT
    ```
    ``` title="結果"
    10 local Banana
    Apple
    ```