---
hide:
  - toc
---

# PRINTSINGLE 系

| 関数名                                                                                                         | 引数     | 戻り値 |
| :------------------------------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(\|V\|S\|FORM\|FORMS)(\|K\|D)</code>](./PRINTSINGLE.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
    PRINTSINGLEV(|K|D) integerVariable
    PRINTSINGLES(|K|D) stringVariable
    PRINTSINGLEFORM(|K|D) formedString
    PRINTSINGLEFORMS(|K|D) string
    ```
    `PRINTSINGLE`系は`PRINTL`とほぼ同じですが、`PRINTSINGLE`系は文字列を折り返さず、必ず1行で表示します。
    画面端を超えた文字は描画されません。
    また、自動的に改行が付与されるため、`(|L|W)`キーワードはありません。
    他のキーワードの意味は[PRINT系](./PRINT.md)と同じです。

!!! hint "ヒント"

    命令のみ対応しています。
