---
hide:
  - toc
---

# SPRITESETPOS

| 関数名                                                                   | 引数                   | 戻り値 |
| :----------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITESETPOS spriteName, posX, posY
    ```
	指定した名称のスプライトの相対位置の`X`、`Y`を設定します。  
	成功した場合は非0を、指定したスプライトが未作成又は廃棄済み等の理由で失敗した場合には0を返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
