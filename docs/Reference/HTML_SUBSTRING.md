# HTML_SUBSTRING

| 関数名                                                                   | 引数            | 戻り値 |
| :----------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_SUBSTRING html, width
    ```

    `html`を`HTML_PRINT`でプリントした場合，`width`（半角文字数）を超えない部分を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        HTML_SUBSTRING "AB<b>CD</b>EFG",4
        PRINTSL RESULTS
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="結果"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    太字は普通より幅広いからです