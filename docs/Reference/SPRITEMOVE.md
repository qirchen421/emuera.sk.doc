---
hide:
  - toc
---

# SPRITEMOVE

| 関数名                                                               | 引数                   | 戻り値 |
| :------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEMOVE spriteName, movex, movey
    ```
	指定した名称のスプライトの相対位置のX、Yに指定した値を加算します。
	つまり、

		SPRITESETPOS spriteName, SPRITEPOSX(spriteName) + movex, SPRITEPOSY(spriteName) + movey

	と同等です。
	成功した場合は非0を、指定したスプライトが未作成又は廃棄済み等の理由で失敗した場合には0を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
