---
hide:
  - toc
---

# HTML_STRINGLEN

| 関数名                                                                   | 引数              | 戻り値 |
| :----------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_STRINGLEN html(, returnPixel)
    ```

    `HTML_PRINT`で`html`を表示した結果の幅を返す、複数行がある場合1行目の幅を返します。
    `returnPixel`が`0`または省略した場合、半角文字単位で返す。そうでない場合はピクセル数を返します。

    !!! warning "注意"

        `<nobr></nobr>`で囲まない限り，いくら長い文字列でも返り値は「ウィンドウ幅-スクロールバーの幅」を超えません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML {HTML_STRINGLEN("<b>B</b>")}
        PRINTFORML {HTML_STRINGLEN("<b>B</b>", 1)} {GETCONFIG("フォントサイズ")/2}

        ONEINPUT
    ```
    ``` title="結果"
    2
    9 8
    ```
    太字は普通より幅広いからです

### 関連項目
- [STRLEN](STRLEN.md)
