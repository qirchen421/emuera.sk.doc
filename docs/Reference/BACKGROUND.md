---
hide:
  - toc
---

# BACKGROUND操作系

制作者：Neo_Kesha

| 関数名                                                               | 引数                     | 戻り値 |
| :------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`SETBGIMAGE`](./BACKGROUND.md)    | `string`(, `int`, `int`) | なし   |
| ![](../assets/images/Iconetc.webp)[`REMOVEBGIMAGE`](./BACKGROUND.md) | `string`                 | なし   |
| ![](../assets/images/Iconetc.webp)[`CLEARBGIMAGE`](./BACKGROUND.md)  | なし                     | なし   |

!!! info "API"
    ```  { #language-erbapi }
	SETBGIMAGE resourceName(, depth, opacity)
	REMOVEBGIMAGE resourceName
	CLEARBGIMAGE
    ```

	`SETBGIMAGE`は引数で指定した画像をEmueraの背景画像に設定します。Depth(深度)とOpacity(透明度)は省略可能です  
	Depthはデフォルトが0で、マイナス値も指定可能です  
	Opacityは0～255の数値で指定可能です  

	`REMOVEIMAGE`は、`SETBGIMAGE`で設定した背景画像を削除します  
	`CLEARIMAGE`は全ての背景画像を削除します  

!!! hint "ヒント"

    命令のみ両方対応しています。
