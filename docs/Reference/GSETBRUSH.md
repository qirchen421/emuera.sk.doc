---
hide:
  - toc
---

# GSETBRUSH

| 関数名                                                             | 引数         | 戻り値 |
| :----------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETBRUSH gID, cARGB
    ```
	指定したIDのGraphicsに指定した色のブラシを設定します。  
	指定したブラシはGDISPOSE命令でGraphicsが破棄されるまで記憶されます。  
	処理に成功した場合、非0を返します。  
	設定されたブラシ色は[`GGETBRUSH`](./GGETBRUSH.md)で取得できます。
	ここで設定した色のブラシは以下の命令・式中関数で使用されます。  
	
	- [`GFILLRECTANGLE`](./GFILLRECTANGLE.md)

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GGETBRUSH](GGETBRUSH.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.md)
