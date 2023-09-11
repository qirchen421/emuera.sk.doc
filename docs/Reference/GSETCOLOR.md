---
hide:
  - toc
---

# GSETCOLOR

| 関数名                                                             | 引数                       | 戻り値 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETCOLOR gID, cARGB, x, y
    ```
	指定したIDのGraphicsの指定位置のピクセルを指定した色に置き換えます。  
	処理に成功した場合、非0を返します。  
	この命令はそれほど高速ではありません。  
	[`GGETCOLOR`](./GGETCOLOR.md)命令と合わせて大きな画像の全体を書き換える試みは実用的な時間内には終わりません。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
