---
hide:
  - toc
---

# SPRITECREATEFROMFILE

| 関数名                                                                             | 引数                                               | 戻り値 |
| :--------------------------------------------------------------------------------- | :------------------------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SPRITECREATEFROMFILE`](./SPRITECREATEFROMFILE.md) | `string`, `string`(, `int`, `int`, `int`, `int`) | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath(, x, y, width, height)
    ```

    画像ファイルから直接スプライトを作成します。[`GCREATEFROMFILE`](./GCREATEFROMFILE.md)でGraphicsを作成してから[`SPRITECREATE`](./SPRITECREATE.md)でスプライトを作成する2段階の手順を、1回の呼び出しで完了できます。

    **パラメータ**：

    | パラメータ | 型 | 説明 |
    | :--- | :--- | :--- |
    | `spriteName` | string | 作成するスプライトのリソース名 |
    | `filePath` | string | 画像ファイルのパス |
    | `x` | int | 切り取り開始X座標（省略時0） |
    | `y` | int | 切り取り開始Y座標（省略時0） |
    | `width` | int | 切り取り幅（省略時0＝画像全体の幅） |
    | `height` | int | 切り取り高さ（省略時0＝画像全体の高さ） |

    **戻り値**：作成に成功した場合1、失敗した場合0を返します。

    !!! warning "注意"
        - 命令、式中関数両方対応。
        - 同じリソース名のスプライトが既に存在する場合、作成に失敗し0を返します。
        - `filePath`は`resources`フォルダからの相対パス、または絶対パスで指定できます。
        - 作成したスプライトは[`PRINT_IMG`](./PRINT_IMG.md)命令や[`HTML_PRINTのimgタグ`](../Emuera/HTML_PRINT.md#img)などで使用できます。
        - [`SPRITECREATE`](./SPRITECREATE.md)とは異なり、親Graphicsを持たないため、スプライトは独立した画像データとして保持されます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; ファイル全体からスプライトを作成
        IF SPRITECREATEFROMFILE("my_img", "image/character.png")
            PRINTL スプライト作成成功
            PRINT_IMG my_img
        ELSE
            PRINTL スプライト作成失敗
        ENDIF

        ; ファイルの一部を切り取ってスプライトを作成
        SPRITECREATEFROMFILE "my_icon", "image/icons.png", 0, 0, 32, 32
    ```

### 関連項目
- [SPRITECREATE](SPRITECREATE.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.md)
- [PRINT_IMG](PRINT_IMG.md)
