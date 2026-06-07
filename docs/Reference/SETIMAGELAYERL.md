---
hide:
  - toc
---

# SETIMAGELAYERL

| 関数名                                                                       | 引数                                                                      | 戻り値 |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------ | :----- |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYERL`](./SETIMAGELAYERL.md) | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`                     | なし   |

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYERL spriteName, depth(, xpos, ypos, width, height, opacity, colorMatrix)
    ```

    [`SETIMAGELAYER`](./SETIMAGELAYER.md)の行相対位置決め版です。自動で`followScroll=1`が設定され、常に現在の表示行にアンカーされます。位置パラメータ`xpos`/`ypos`は行位置からの相対オフセットで、[`HTML_PRINT`](./HTML_PRINT.md)の`<img>`タグの`xpos`/`ypos`属性と同じ意味です。`xpos=0, ypos=0`の場合、同じ行の`<img>`と全く同じ位置にレンダリングされます（`ShapePositionShift`オフセットを含む）。

    **パラメータ**（`spriteName`と`depth`は省略不可、それ以外は省略可能）：

    | パラメータ | 型 | デフォルト | 説明 |
    | :--- | :--- | :----- | :--- |
    | `spriteName` | str | — | スプライト名（省略不可） |
    | `depth` | int | — | レイヤー深度（省略不可）。正値はテキストの背面、負値はテキストの前面 |
    | `xpos` | int | `0` | 行位置からのXオフセット（HTML`<img>`の`xpos`属性と同じ、`ShapePositionShift`を含む） |
    | `ypos` | int | `0` | 行上端からのYオフセット（HTML`<img>`の`ypos`属性と同じ） |
    | `width` | int | `0` | 描画先の幅。0の場合スプライトの元の幅を使用 |
    | `height` | int | `0` | 描画先の高さ。0の場合スプライトの元の高さを使用 |
    | `opacity` | int | `255` | 不透明度（0～255）。255で完全不透明 |
    | `colorMatrix` | var | `null` | 5×5カラーマトリクス配列の参照（例：`CM_GRAY:0:0`） |

    !!! warning "注意"
        - 命令構文のみ対応。式中関数としては呼び出せません。
        - `followScroll`は常に`1`（スクロール追従）です。固定位置のレイヤーには[`SETIMAGELAYER`](./SETIMAGELAYER.md)を使用してください。
        - 常に現在の表示行にアンカーされ、他の行番号の指定はできません。
        - `xpos`と`ypos`は行位置からの相対オフセットであり、[`SETIMAGELAYER`](./SETIMAGELAYER.md)の絶対座標`x`/`y`とは意味が異なります。
        - 第3～8パラメータは空パラメータ（`,,`）に対応しています。空の場合はデフォルト値が使用されます。
        - WINAPIモードでは使用できません。

!!! hint "ヒント"

    HTML imgと同じ位置にレイヤーを配置したい場合、`SETIMAGELAYERL`で`xpos=0, ypos=0`を設定するだけでよく、手動で`GETLINEY`を計算したり`ShapePositionShift`を補正したりする必要はありません。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 基本レンダリング：現在の行にスプライトを表示（xpos=0, ypos=0、HTML imgと同じ位置）
        SETIMAGELAYERL "pet_1", 1

        ; Xオフセットを指定
        SETIMAGELAYERL "pet_2", 2, 100

        ; X/Yオフセットとサイズを指定
        SETIMAGELAYERL "pet_3", 3, 0, 0, 150, 150, 200

        ; カラーマトリクス付き
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        SETIMAGELAYERL "pet_4", 4, , , 150, 150, 255, CM_GRAY:0:0
    ```

### 関連項目
- [SETIMAGELAYER](SETIMAGELAYER.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.md)
- [GETLINEY](GETLINEY.md)
