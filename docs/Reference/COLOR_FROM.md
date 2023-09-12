---
hide:
  - toc
---

# COLOR_FROMNAME, COLOR_FROMRGB

| 関数名                                                                   | 引数                | 戻り値   |
| :----------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.md) | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.md)  | `int`, `int`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	int COLOR_FROMNAME colorName
	string COLOR_ROMRGB R, G, B
    ```
	`COLOR_FROMNAME`は与えられた引数を色名として判定し`0xRRGGBB`形式の数値として返します。  
	該当する色名が存在しない場合、-1を返します。  

	`COLOR_FROMRGB`は与えられた`R,G,B`値を`0xRRGGBB`形式の数値として返します。
	引数が`0-255`の範囲外の場合、エラーになります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
