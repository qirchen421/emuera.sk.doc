---
hide:
  - toc
---

# SPRITEANIMECREATE

| 関数名                                                                             | 引数                   | 戻り値 |
| :--------------------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMECREATE spriteName, width, height
    ```
	`spriteName`で指定したリソース名を持つ、`width`及び`height`で指定したサイズのアニメーションスプライトを作成します。 作成に成功した場合、非0を返します。  
	同じリソース名のスプライトが既に存在するなどで失敗した場合、0を返します。  
	アニメーションさせるためには[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md)命令によってフレームを追加する必要があります。  
	アニメーションスプライトに関する注意点については、[`resouces`](../Emuera/resources.md)も参照してください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
