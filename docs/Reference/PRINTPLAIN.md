---
hide:
  - toc
---

# PRINTPLAIN

| 関数名                                                                                  | 引数     | 戻り値 |
| :-------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(\|FORM)</code>](./PRINTPLAIN.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
    PRINTPLAIN(|FORM) string
    ```
    引数の文字列を平文として出力します。この時ボタン文字列（0など）があってもボタン化しません。
    括弧内のキーワードは引数タイプを指定します。

    - なし - <文字列>
    - `FORM` - <書式付文字列>

!!! hint "ヒント"

    命令のみ対応しています。
