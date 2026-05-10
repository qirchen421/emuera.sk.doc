---
hide:
  - toc
---

# HTML_PRINTC / HTML_PRINTLC

| 関数名                                                                     | 引数     | 戻り値 |
| :------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTC`](./HTML_PRINTC.md)     | `string` | なし   |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTLC`](./HTML_PRINTC.md)    | `string` | なし   |

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlStyleString
    HTML_PRINTLC htmlStyleString
    ```

    [`HTML_PRINT`](./HTML_PRINT.md)の中央揃え・左揃えバリアントです。HTMLタグを利用して描画しますが、配置位置が異なります。

    - **HTML_PRINTC**：HTML描画結果を**中央揃え**で表示します。
    - **HTML_PRINTLC**：HTML描画結果を**左揃え**で表示します。

    `HTML_PRINT`と同様に、[`ALIGNMENT`](./ALIGNMENT.md)、[`SETFONT`](./SETFONT.md)、[`SETCOLOR`](./SETCOLOR.md)、[`FONTSTYLE`](./FONT_OPERATION.md)命令の影響を受けません。配置はコマンド自体によって制御されます。

    詳細は[`HTML_PRINT`関連](../Emuera/HTML_PRINT.md)を参照してください。

    !!! warning "注意"
        - 命令構文のみ対応。式中関数としては呼び出せません。
        - 引数は`PRINTS`と同じ文字列式です。自動的に改行します。

!!! hint "ヒント"

    命令のみ対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 中央揃えでHTML描画
        HTML_PRINTC "<b>中央揃えテキスト</b>"

        ; 左揃えでHTML描画
        HTML_PRINTLC "<b>左揃えテキスト</b>"

        ; 通常のHTML_PRINT（ALIGNMENT設定に従う）
        HTML_PRINT "<b>デフォルト配置</b>"
    ```

### 関連項目
- [HTML_PRINT](HTML_PRINT.md)
- [HTML_PRINT関連](../Emuera/HTML_PRINT.md)
