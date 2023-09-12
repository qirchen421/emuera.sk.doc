---
hide:
  - toc
---

# SPRITEDISPOSE

| 関数名                                                                     | 引数     | 戻り値 |
| :------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITDISPOSE spriteName
    ```
	`spriteName`で指定したリソース名を持つスプライトを廃棄します。  
	廃棄に成功した場合、非0を返します。  
	この命令はスプライトの元となった`Graphics`等には影響しません。  
	`Graphics`に割り当てられたメモリを解放するには[`GDISPOSE`](./GDISPOSE.md)命令を使用してください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
