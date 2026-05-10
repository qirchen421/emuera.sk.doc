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

!!! note "パラメータ解析の説明"

	`resourceName` パラメータの解析方式はバージョンによって異なる：

	| バージョン | 解析方式 | 変数引数の動作 |
	|:---|:---|:---|
	| emuera.em | `FORM_STR_ANY` | ❌ 変数名がリテラル文字列として検索され、黙って失敗 |
	| lazyloading 版 | 型付き文字列式 | ✅ 変数値を正しく読み取り |

	**示例**：
	```erb
	#DIMS temp_name
	temp_name = "小帽_笑_3"
	SETBGIMAGE temp_name  ; lazyloading 版では正常工作、emuera.em では黙って失敗
	```
