---
hide:
  - toc
---

# SPRITEPOSX, SPRITEPOSY

| 関数名                                                                | 引数     | 戻り値 |
| :-------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.md) | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEPOSX spriteName
	int SPRITEPOSY spriteName
    ```
	指定した名称のスプライトの相対位置の`X`、`Y`を取得します。
	スプライトが未作成又は廃棄済みであるなら0を返します。
	相対位置の`X`、`Y`が0なのか未作成又は廃棄済であるのかの区別には別途[`SPRITECREATED`](./SPRITECREATED.md)を呼び出してください。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
