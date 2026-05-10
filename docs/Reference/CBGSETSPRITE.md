---
hide:
  - toc
---

# CBGSETSPRITE

| 関数名                                                                   | 引数                                                     | 戻り値 |
| :----------------------------------------------------------------------- | :------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md) | `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `var`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBGSETSPRITE, spriteName, x, y, zDepth{, width, height, opacity, colorMatrix}
    ```

    `spriteName`で指定したリソース名を持つスプライトをクライアント領域に表示するように設定します。
    `x, y`に0を指定した場合、クライアント領域の左下と画像の左下が一致するように表示されます。
    `x`は右方向が正、`y`は下方向が正、`zDepth`は画面奥方向が正です。
    `zDepth`は0以外の値を指定します。通常の文字描画が`zDepth==0`に相当し、`zDepth`が負であれば文字よりも手前に描画されます。

    **Skia（SkiaSharp版）拡張パラメータ**（第5引数以降、省略可能）：

    | パラメータ | 型 | デフォルト | 説明 |
    | :--------- | :-- | :--------- | :--- |
    | `width` | `int` | `0` | 描画先の幅。0の場合スプライトの元の幅を使用 |
    | `height` | `int` | `0` | 描画先の高さ。0の場合スプライトの元の高さを使用 |
    | `opacity` | `int` | `255` | 不透明度（0～255）。255で完全不透明 |
    | `colorMatrix` | `var` | `null` | 5×5カラーマトリクス配列参照（例：`CM_GRAY:0:0`）。省略時は色変換なし |

    - `opacity`は整数0～255で指定し，エンジン内部で255で除算して浮動小数点に変換します。
    - `colorMatrix`は2次元/3次元整数配列の先頭アドレスを渡します（例：`CM:0:0`や`CM_PRESET:0:0:0`）。エンジンは5×5サブマトリクスを読み取り，256で除算して浮動小数点に変換します。

    !!! warning "注意"
        - `zDepth`に0は指定できません。
        - `colorMatrix`パラメータはWINAPIモードではサポートされません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 基本描画：(0,0)にdepth=1でスプライト表示
        CBGSETSPRITE "pet_1", 0, 0, 1

        ; 拡縮＋透明度：200x200に拡大，約78%不透明
        CBGSETSPRITE "pet_2", 100, 50, 2, 200, 200, 200

        ; カラーマトリクス：グレースケール効果
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        CBGSETSPRITE "pet_3", 300, 50, 3, 150, 150, 255, CM_GRAY:0:0

        ; 式として呼び出し
        RESULT = CBGSETSPRITE("pet_1", 0, 0, 1)
        PRINTVL RESULT
    ```

### 関連項目
- [CBGSETG](CBGSETG.md)
- [CBGCLEAR](CBGCLEAR.md)
