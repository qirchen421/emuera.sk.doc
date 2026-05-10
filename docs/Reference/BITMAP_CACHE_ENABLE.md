---
hide:
  - toc
---

# BITMAP_CACHE_ENABLE

制作者：JukesBouver99

| 関数名                                             | 引数  | 戻り値 |
| :------------------------------------------------- | :---- | :----- |
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.md) | `int` | void   |

!!! info "API"

    ```  { #language-erbapi }
	BITMAP_CACHE_ENABLE bool
    ```
    
	頻繁に色が変わるテキストをビットマップとして描画することで、描画を高速化します。  
	有効にすると以降のすべての行に適用されます。処理が重い部分を`BITMAP_CACHE_ENABLE 1`と`BITMAP_CACHE_ENABLE 0`で囲むことで高速化が期待できます。  

	この機能を有効にすると、テキストの表示位置がズレることがあります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! skia "Skia版の変更点"

    | 項目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `BITMAP_CACHE_ENABLE` | 式中関数（戻り値あり） | 命令（戻り値なし） |

    EM+EEでは式中関数として実装されていましたが、Skia版では命令に再実装されました。機能自体に変更はありません。

### 関連項目
- [Skia版仕様変更一覧](../Skia/Skia_Summary.md#changed-commands)
