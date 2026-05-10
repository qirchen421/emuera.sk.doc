---
hide:
  - toc
---

# TEXT_BGC_ON / TEXT_BGC_OFF

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_ON`](./TEXT_BGC.md) | `int`, `int`, `int`, `int` | void |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_OFF`](./TEXT_BGC.md) | なし | void |

!!! info "API"

    ``` { #language-erbapi }
    TEXT_BGC_ON R, G, B, Alpha%
    TEXT_BGC_OFF
    ```

    `TEXT_BGC_ON`は、以降のすべての行に対して**行全体**の背景色を設定します。`TEXT_BGC_OFF`で背景色をクリアし、透明に戻します。

    - `R`, `G`, `B`：背景色のRGB値（0～255）
    - `Alpha%`：不透明度（0～100）。0=完全透明、100=完全不透明
    - 背景は行の全幅（`ClientWidth`）×行高（`LineHeight`）の矩形として描画されます
    - 行内に実際のテキストが存在する場合のみ背景が描画されます（空行には描画されません）
    - 設定は`TEXT_BGC_OFF`が呼ばれるまで全行に適用され続けます

!!! warning "注意"

    - 背景色は**行単位**で適用されます。個別の文字やspan単位の背景色にはHTMLのインラインスタイルを使用してください
    - ネスト（save/restore）はサポートされていません。新しい色を設定すると古い色が上書きされます

!!! example "例"

    ``` { #language-erb }
    ; 赤背景で警告テキストを表示
    TEXT_BGC_ON 255, 0, 0, 30
    PRINTL 警告：HPが低下しています！
    TEXT_BGC_OFF

    ; 半透明の青背景
    TEXT_BGC_ON 0, 0, 128, 50
    PRINTL この行は青い背景色がつきます
    PRINTL この行も同じ背景色
    TEXT_BGC_OFF
    ```

### 関連項目
- [SETCOLOR](SETCOLOR.md)
- [SETBGCOLOR](SETBGCOLOR.md)
- [HTML_PRINT](HTML_PRINT.md)
