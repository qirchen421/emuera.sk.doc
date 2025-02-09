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

	`REMOVEBGIMAGE`は、`SETBGIMAGE`で設定した背景画像を削除します  
	`CLEARBGIMAGE`は全ての背景画像を削除します  

	Emuera コンソール ウィンドウに背景を追加するコマンドのセット。WINAPI はサポートされていません。
	背景はリソース CSV ファイルで定義する必要があります。背景は透明度とレイヤーをサポートします。
	背景はアスペクト比を維持しながらコンソール ウィンドウに収まるように動的にサイズ変更されます。

!!! hint "ヒント"

	命令のみ対応しています。
