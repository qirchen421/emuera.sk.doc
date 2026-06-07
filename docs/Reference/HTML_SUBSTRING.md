---
hide:
  - toc
---

# HTML_SUBSTRING

| 関数名                                                                   | 引数            | 戻り値   |
| :----------------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int` | `string` |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_SUBSTRING html, width
    ```

    `html`を`HTML_PRINT`でプリントした結果を、`width`（半角文字数）で分割して返す。

    切り取り部分は`RESULTS:0`（戻り値と同一）、残り部分は`RESULTS:1`に代入される。  
    切り取り時に未閉じタグは自動的に閉じられ、残り部分では閉じられたタグが自動的に再開される。

    !!! warning "注意"

        `v8b` にて戻り値が整数型(常に`1`)から文字列型(`RESULTS:0`と同じ)に変更された。

    !!! tip "タグ整合"

        戻り値（`RESULTS:0`）には未閉じタグを自動的に閉じ、`RESULTS:1`には開きタグを自動的に再開する。
        
        例：`<font color='red'>ABC<br>DEF</font>` を `width=3` で分割：
        - `RESULTS:0` = `<font color='red'>ABC</font>`
        - `RESULTS:1` = `<font color='red'><br>DEF</font>`

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

    ``` { #language-erb title="行分割ループ" }
    ; HTML_SUBSTRINGで行分割（タグ整合自動処理）
    #DIMS L_REMAIN
    #DIMS L_LINE
    #DIM L_LINE_CNT
    
    L_REMAIN '= HTML_CONTENT
    L_LINE_CNT = 0
    WHILE STRLENS(L_REMAIN) > 0
        L_LINE '= HTML_SUBSTRING(L_REMAIN, L_WIDTH)
        L_LINES:L_LINE_CNT '= L_LINE
        L_LINE_CNT += 1
        L_REMAIN '= RESULTS:1
    WEND
    ```

### 関連項目
- [SUBSTRING](SUBSTRING.md)
