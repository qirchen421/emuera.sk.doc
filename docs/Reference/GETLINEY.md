---
hide:
  - toc
---

# GETLINEY

| 関数名                                                                   | 引数    | 戻り値 |
| :----------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconSK.webp)[`GETLINEY`](./GETLINEY.md) | `int`   | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int GETLINEY(lineNo)
    ```

    指定した行番号の物理Y座標（左下原点）を返します。[`SETIMAGELAYER`](./SETIMAGELAYER.md)の座標系と一致します。

    **パラメータ**：

    | パラメータ | 型 | 説明 |
    | :--- | :--- | :--- |
    | `lineNo` | int | 行番号（0以上） |

    **戻り値**：指定行の物理Y座標（ピクセル）。左下原点の座標系で、`SETIMAGELAYER`の`y`引数と同じ座標系。

!!! warning "注意"

    Skia版専用の式中関数です。負数の引数を渡すと`CodeEE`が投げられます。

!!! hint "ヒント"

    [`SETIMAGELAYER`](./SETIMAGELAYER.md)の画像をHTMLテキストフローと同じ行に配置する際に使用します。`GETLINEY(LINECOUNT)`で現在の行のY座標を取得し、`SETIMAGELAYER`の`y`引数に渡すことで、画像レイヤーとテキストを正確に配置できます。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 現在の行番号を取得
        #DIM L_LINE
        L_LINE = LINECOUNT

        ; テキストを出力
        PRINTL こんにちは

        ; テキストと同じ行に画像レイヤーを配置
        #DIM L_Y
        L_Y = GETLINEY(L_LINE)
        SETIMAGELAYER "icon", 1, 100, L_Y, 50, 50
    ```

### 関連項目
- [SETIMAGELAYER](SETIMAGELAYER.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.md)
