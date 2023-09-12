---
hide:
  - toc
---

# SPRITEGETCOLOR

| 関数名                                                                       | 引数                   | 戻り値 |
| :--------------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEGETCOLOR spriteName, x, y
    ```
	`spriteName`で指定したリソース名を持つスプライトの指定位置の色を`0xAARRGGBB`形式の整数値で取得します。  
	`spriteName`が未作成又は廃棄済み、あるいは`x, y`が画像外の位置であるなら-1を返します。  

	この命令のみ、失敗した場合に0ではなく-1を返すことに注意してください。  
	黒色かつ完全透明の位置の色を取得した場合に、この命令は0を返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
