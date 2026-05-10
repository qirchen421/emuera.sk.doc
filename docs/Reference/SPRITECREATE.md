---
hide:
  - toc
---

# SPRITECREATE

| 関数名                                                                   | 引数                                                              | 戻り値 |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.md) | `string`, `int`                                                   | `int`  |
|                                                                          | `string`, `int`, `int`, `int`, `int`, `int`                       | `int`  |
|                                                                          | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`         | `int`  |
|                                                                          | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int SPRITECREATE spriteName, gID
    int SPRITECREATE spriteName, gID, x, y, width, height
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY, destWidth, destHeight
    ```

    `gID`の`Graphics`の一部または全部を元にして，`spriteName`で指定したリソース名を持つスプライトを作成します。
    `x, y, width, height`を指定することで`Graphics`のその部分をスプライトとして切り取れます。
    作成に成功した場合，非0を返します。
    同じリソース名のスプライトが既に存在するなどで失敗した場合，0を返します。
    スプライトは親`Graphics`の`gID`と切取位置を記憶しているだけなので，親`Graphics`に変更があるとスプライトも変更されます。
    また，親`Graphics`が破棄されるとスプライトも破棄された扱いになります。
    作成したスプライトは`resouces`フォルダ内のcsvで宣言したリソースとほぼ同様に扱うことができます。
    例えば[`PRINT_IMG`](./PRINT_IMG.md)命令や[`HTML_PRINTのimgタグ`](../Emuera/HTML_PRINT.md#img)などで使用できます。

    **Skia（SkiaSharp版）拡張パラメータ**（7引数目以降）：

    - `posX`, `posY`（省略可，デフォルト`0`）：スプライトの描画オフセット。スプライトが描画される際の原点からの相対位置を指定します。
    - `destWidth`, `destHeight`（省略可，デフォルトはソース矩形と同じサイズ）：スプライトの描画先サイズ。ソース矩形とは異なるサイズを指定すると，スプライトが拡大・縮小されて描画されます。負の値は絶対値として処理されます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GCREATE](GCREATE.md)
