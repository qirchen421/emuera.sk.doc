---
hide:
  - toc
---

# STRICT_FONT_FALLBACK

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`STRICT_FONT_FALLBACK`](./STRICT_FONT_FALLBACK.md) | `int` | void |

!!! info "API"

    ``` { #language-erbapi }
    STRICT_FONT_FALLBACK value
    ```

    フォントフォールバックの厳格モードを切り替えます。

    - `value`に`1`を指定すると厳格モードが有効になり、`0`で無効になります
    - 厳格モードが有効な場合、指定されたフォントにグリフが存在しない文字はフォールバックフォントで代替されず、□（tofu）として表示されます
    - 厳格モードが無効（デフォルト）の場合、グリフが存在しない文字は自動的にフォールバックフォントで描画されます

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb }
    ; 厳格モードを有効化（フォールバックなし）
    STRICT_FONT_FALLBACK 1
    PRINTL このテキストはフォールバックしません
    ; 厳格モードを無効化（デフォルトのフォールバック動作）
    STRICT_FONT_FALLBACK 0
    ```

### 関連項目
- [SETFONT](SETFONT.md)
- [SKIA_RENDER](SKIA_RENDER.md)
