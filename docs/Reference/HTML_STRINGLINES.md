---
hide:
  - toc
---

# HTML_STRINGLINES

| 関数名                                                                       | 引数            | 戻り値 |
| :--------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.md) | `string`, `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int HTML_STRINGLINES html, width
    ```

    `html`を`HTML_PRINT`でプリントした結果を、`width`（半角文字数）で分割した行数を返す。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTVL HTML_STRINGLINES("AB<b>CD</b>",4)

        ONEINPUT
    ```
    ``` title="結果"
    2
    ```
    太字は普通より幅広いからです
