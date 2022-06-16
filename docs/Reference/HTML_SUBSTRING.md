# HTML_SUBSTRING

| 関数名                                                                   | 引数            | 戻り値   |
| :----------------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int` | `string` |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_SUBSTRING html, width
    ```

    `html`を`HTML_PRINT`でプリントした結果を、`width`（半角文字数）で分割して返す

    !!! warning "注意"

        `v8b` にて戻り値が整数型(常に`1`)から文字列型(`RESULTS:0`と同じ)に変更された。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTSL HTML_SUBSTRING("AB<b>CD</b>EFG",4)
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="結果"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    太字は普通より幅広いからです
