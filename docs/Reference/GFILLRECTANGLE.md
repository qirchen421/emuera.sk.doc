---
hide:
  - toc
---

# GFILLRECTANGLE

| 関数名                                                                       | 引数                              | 戻り値 |
| :--------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GFILLRECTANGLE gID, x, y, width, height
    ```
	指定した`gID`の`Graphics`に`x, y, width, height`で指定した四角形を描画します。  
	処理に成功した場合、非0を返します。  
	描画の色は[`GSETBRUSH`](./GSETBRUSH.md)命令によってあらかじめ指定しなければEmueraコンフィグの文字色で描画されます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
