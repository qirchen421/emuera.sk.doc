---
hide:
  - toc
---

# SETIMAGELAYER

| 関数名                                                                   | 引数                                                                                           | 戻り値 |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYER`](./SETIMAGELAYER.md) | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`, `int`                                  | なし   |

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYER spriteName, depth(, x, y, width, height, opacity, colorMatrix, followScroll)
    ```

    指定したスプライトを独立したレイヤーにレンダリングします。[`CBGSETSPRITE`](./CBGSETSPRITE.md)とは異なり、SETIMAGELAYERのレイヤーはテキスト行から分離されており、ビューポートクリッピングとスクロール追従をサポートします。

    **パラメータ**（`spriteName`と`depth`は省略不可、それ以外は省略可能）：

    | パラメータ | 型 | デフォルト | 説明 |
    | :--- | :--- | :----- | :--- |
    | `spriteName` | str | — | スプライト名（省略不可） |
    | `depth` | int | — | レイヤー深度（省略不可）。正値はテキストの背面、負値はテキストの前面 |
    | `x` | int | `0` | 描画X座標 |
    | `y` | int | `0` | 描画Y座標 |
    | `width` | int | `0` | 描画先の幅。0の場合スプライトの元の幅を使用 |
    | `height` | int | `0` | 描画先の高さ。0の場合スプライトの元の高さを使用 |
    | `opacity` | int | `255` | 不透明度（0～255）。255で完全不透明 |
    | `colorMatrix` | var | `null` | 5×5カラーマトリクス配列の参照（例：`CM_GRAY:0:0`） |
    | `followScroll` | int | `0` | スクロール追従。0=固定位置、1=テキストと共にスクロール |

    !!! warning "注意"
        - 命令構文のみ対応。式中関数としては呼び出せません。
        - `depth`はレイヤーのソートと一意識別に使用されます。同じ`depth`のレイヤーは上書きされます。
        - [`EXISTSIMAGELAYER(depth)`](./EXISTSIMAGELAYER.md)で指定深度のレイヤーの存在確認ができます。
        - [`CLEARIMAGELAYER depth`](./CLEARIMAGELAYER.md)で指定深度のレイヤーを、[`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.md)ですべてのレイヤーをクリアできます。
        - WINAPIモードでは使用できません。

!!! hint "ヒント"

    命令構文のみ対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 基本レンダリング：depth=1にスプライトを表示
        SETIMAGELAYER "pet_1", 1

        ; 位置と深度を指定
        SETIMAGELAYER "pet_2", 2, 100, 50

        ; 拡大・縮小 + 透明度
        SETIMAGELAYER "pet_3", 3, 200, 100, 150, 150, 200

        ; カラーマトリクス + スクロール追従
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        SETIMAGELAYER "pet_4", 4, 300, 50, 150, 150, 255, CM_GRAY:0:0, 1

        ; レイヤーの存在確認
        IF EXISTSIMAGELAYER(1)
            PRINTL depth=1のレイヤーが存在します
        ENDIF

        ; 指定レイヤーをクリア
        CLEARIMAGELAYER 1

        ; 全レイヤーをクリア
        CLEARIMAGELAYER_ALL
    ```
    ``` title="結果"
    depth=1のレイヤーが存在します
    ```

### 関連項目
- [CLEARIMAGELAYER](CLEARIMAGELAYER.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.md)
- [CBGSETSPRITE](CBGSETSPRITE.md)
