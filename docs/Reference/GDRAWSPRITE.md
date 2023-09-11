---
hide:
  - toc
---

# GDRAWSPRITE

| 関数名                                                                 | 引数                                                           | 戻り値 |
| :--------------------------------------------------------------------- | :------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.md) | `int`, `string`                                                | `int`  |
|                                                                        | `int`, `string`, `int`, `int`                                  | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                    | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWSPRITE gID, spriteName
	int GDRAWSPRITE gID, spriteName, destX, destY
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight, colorMatrix
    ```
	指定した`gID`の`Graphics`に、指定した`spriteName`の`Sprite`を描画します。  
	オプションとして、`Graphics`内部の位置を`destX,destY`で指定することでその位置に`Sprite`を描画します。  
	また、描画幅及び高さを`destWidth,destHeight`で指定することでそのサイズに拡大又は縮小して`Sprite`を描画します。  
	さらに、`colorMatrix`に5x5の行列を指定することでカラーマトリクスを適用して描画します。  
	なお`Sprite`のサイズは`SPRITEWIDTH(str imgName), SPRITEHEIGHT(str imgName)`関数で取得できます。  
	処理に成功した場合、非0を返します。  

	アニメーションスプライトを指定した場合、実行時のフレーム1つが描画されます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
