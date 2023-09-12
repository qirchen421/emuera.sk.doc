---
hide:
  - toc
---

# SPRITEWIDTH, SPRITEHEIGHT

| 関数名                                                                        | 引数     | 戻り値 |
| :---------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.md)  | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEWIDTH spriteName
	int SPRITEHEIGHT spriteName
    ```
	指定した名称のスプライトの幅または高さを取得します。
	スプライトが未作成又は廃棄済みであるなら0を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
