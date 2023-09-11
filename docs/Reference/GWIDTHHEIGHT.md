---
hide:
  - toc
---

# GWIDTH, GHEIGHT

| 関数名                                                              | 引数  | 戻り値 |
| :------------------------------------------------------------------ | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.md)  | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GWIDTH gID
	int GHEIGHT gID
    ```
	指定した`gID`の`Graphics`の幅または高さを取得します。  
	`Graphics`が未作成（廃棄済を含む）なら0を返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
