---
hide:
  - toc
---

# CBGSETSPRITE

| 関数名                                                                   | 引数                          | 戻り値 |
| :----------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md) | `string`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETSPRITE, spriteName, x, y, zDepth
    ```
	`spriteName`で指定したリソース名を持つスプライトをクライアント領域に表示するように設定します。  
	`x, y`に0を指定した場合、クライアント領域の左下と画像の左下が一致するように表示されます。  
	`x`は右方向が正、`y`は下方向が正、`zDepth`は画面奥方向が正です。  
	`zDepth`は0以外の値を指定します。通常の文字描画が`zDepth==0`に相当し、`zDepth`が負であれば文字よりも手前に描画されます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [CBGSETG](CBGSETG.md)
- [CBGCLEAR](CBGCLEAR.md)
