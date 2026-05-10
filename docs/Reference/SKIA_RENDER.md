---
hide:
  - toc
---

# SET_TEXT_DRAWING_MODE / SET_SKIA_QUALITY

| 関数名                                                                               | 引数                              | 戻り値 |
| :----------------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SET_TEXT_DRAWING_MODE`](./SKIA_RENDER.md)         | `int`                             | `int`  |
| ![](../assets/images/IconSK.webp)[`GET_TEXT_DRAWING_MODE`](./SKIA_RENDER.md)         | なし                              | `int`  |
| ![](../assets/images/IconSK.webp)[`SET_SKIA_QUALITY`](./SKIA_RENDER.md)              | `int`(, `int`, `int`)             | `int`  |
| ![](../assets/images/IconSK.webp)[`GET_SKIA_QUALITY`](./SKIA_RENDER.md)              | `int`                             | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    SET_TEXT_DRAWING_MODE modeID
    int GET_TEXT_DRAWING_MODE
    SET_SKIA_QUALITY qualityID{, hintingID, edgingID}
    int GET_SKIA_QUALITY typeID
    ```

    Skia（SkiaSharp版）で追加されたレンダリング制御APIです。テキストの描画パイプラインとSkiaSharp品質パラメータを動的に制御します。

    ### SET_TEXT_DRAWING_MODE / GET_TEXT_DRAWING_MODE

    グローバルのテキストレンダリングパイプラインを動的に切り替えます。

    - **mode = 1**：`TEXTRENDERER` — GDI+ (TextRenderer) でレンダリング
    - **mode = 3**：`SKIASHARP` — SkiaSharp でレンダリング

    - `SET_TEXT_DRAWING_MODE`：命令専用。成功時1、失敗時0を返します。
    - `GET_TEXT_DRAWING_MODE`：命令・式中関数両対応。現在のレンダリングモード（1=GDI+, 3=SkiaSharp）を返します。
    - デフォルトは`SKIASHARP` (3)です。
    - パイプライン切り替え後、キャッシュされたフォントは再読み込みが必要な場合があります。

    ### SET_SKIA_QUALITY / GET_SKIA_QUALITY

    SkiaSharpレンダリングの品質パラメータを制御します。全パラメータ省略可能で、省略時は現在の値を維持します。

    **SET_SKIA_QUALITY パラメータ**：

    | パラメータ | 値域 | 説明 |
    | :--- | :--- | :--- |
    | `quality` | 0～3 | 画像品質レベル |
    | `hinting` | 0～3 | フォントヒンティング：0=none, 1=slight, 2=normal, 3=full |
    | `edging` | 0～2 | アンチエイリアス方式：0=alias, 1=antialias, 2=subpixel |

    **GET_SKIA_QUALITY パラメータ**：

    | type | 戻り値 |
    | :--- | :--- |
    | 0 | 現在の ImageQuality 値 |
    | 1 | 現在の FontHinting 値 |
    | 2 | 現在の FontEdging 値 |

    - `SET_SKIA_QUALITY`：命令専用。呼び出し後、FontFactoryはフォントキャッシュをクリアします。
    - `edging=0` (alias) は初期のWindowsフォントのようなシャープなピクセル風を実現します。
    - `edging=2` (subpixel) は最も滑らかな視覚効果を提供します。

    **デフォルト値（emuera.config）**：

    | パラメータ | デフォルト | 説明 |
    | :--- | :--- | :--- |
    | ImageQuality | High (3) | 画像品質レベル |
    | FontHinting | None (0) | フォントヒンティング |
    | FontEdging | SubpixelAntiAlias (2) | アンチエイリアス方式 |

    !!! warning "注意"
        - `SET_TEXT_DRAWING_MODE`と`SET_SKIA_QUALITY`は命令専用です。
        - `GET_TEXT_DRAWING_MODE`と`GET_SKIA_QUALITY`は命令・式中関数両対応です。
        - ラスタフォント（MS Gothic、MS Mincho等）は、`render`属性未指定時に自動的にGDI+でレンダリングされます。SkiaSharpでレンダリングする場合は`edging='alias'`の併用を推奨します。

!!! hint "ヒント"

    `SET_TEXT_DRAWING_MODE`と`SET_SKIA_QUALITY`は命令専用。`GET_TEXT_DRAWING_MODE`と`GET_SKIA_QUALITY`は命令・式中関数両対応。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 現在のレンダリングモードを確認
        PRINTFORML 現在のモード: {GET_TEXT_DRAWING_MODE()}

        ; 高品質モードに設定
        SET_SKIA_QUALITY 3, 2, 2
        PRINTFORML ImageQuality: {GET_SKIA_QUALITY(0)}

        ; ピクセル風レンダリング
        SET_SKIA_QUALITY 3, 0, 0
        HTML_PRINT "ピクセル風テキスト"

        ; GDI+モードに切り替え
        SET_TEXT_DRAWING_MODE 1
        PRINTFORML 切り替え後モード: {GET_TEXT_DRAWING_MODE()}

        ; SkiaSharpモードに戻す
        SET_TEXT_DRAWING_MODE 3
    ```

### HTML_PRINT fontタグ拡張属性

[`HTML_PRINT`](./HTML_PRINT.md)の`<font>`タグに以下の属性が追加されています：

| 属性 | 値 | 説明 |
    | :--- | :--- | :--- |
    | `render` | `'gdi'` / `'skia'` | レンダリングパイプラインを指定（グローバル設定を上書き） |
    | `edging` | `'alias'` / `'antialias'` / `'subpixel'` | アンチエイリアス方式を制御 |
    | `hinting` | `'none'` / `'slight'` / `'normal'` / `'full'` | フォントヒンティングを制御 |
    | `size` | 正の浮動小数点数（`px`サフィックス付き可） | フォントサイズ（ピクセル）を指定 |

    - 属性は**ネスト継承**をサポートします。内側の`<font>`で未指定の属性は外側の設定を継承します。
    - `render`省略時、ラスタフォントは自動的にGDI+、それ以外はグローバル設定に従います。
    - `size`属性は浮動小数点数をサポートします（例：`<font size='12.5'>`）。

    ``` { #language-erb title="HTML font属性の例" }
    HTML_PRINT "<font render='gdi' face='MS Gothic'>[♥] GDI+レンダリング</font>"
    HTML_PRINT "<font edging='alias'>ピクセル風テキスト</font>"
    HTML_PRINT "<font size='24'>大きなフォント（24px）</font>"
    HTML_PRINT "<font render='skia' edging='subpixel' hinting='full'>SkiaSharp+高品質</font>"
    ```

### 関連項目
- [HTML_PRINT](HTML_PRINT.md)
- [SETFONT](SETFONT.md)
