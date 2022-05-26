# HTML_STRINGLEN

| 関数名                                                            | 引数              | 戻り値 |
| :---------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_STRINGLEN html(, returnPixel)
    ```

    `HTML_PRINT`で`html`を表示した結果の幅を返す、複数行がある場合1行目の幅を返す
    `returnPixel`が`0`または省略した場半角文字単位で返す、そうでない場合はピクセル数を返す

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