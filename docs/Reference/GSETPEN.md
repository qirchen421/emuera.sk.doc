---
hide:
  - toc
---

# GSETPEN

| 関数名                                                         | 引数                | 戻り値 |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETPEN gID, cARGB, penWidth
    ```
	指定した`gID`の`Graphics`に指定した色及び幅のペンを設定します。  
	指定したペンは[`GDISPOSE`](./GDISPOSE.md)命令で`Graphics`が破棄されるまで記憶されます。  
	処理に成功した場合、非0を返します。  
	設定したペン色、ペン幅を取得するには、それぞれ[`GGETPEN`](./GGETPEN.md)、[`GGETPENWIDTH`](./GGETPENWIDTH.md)を使用します。  
	`GSETPEN`で設定したペン色、ペン幅は以下の命令・式中関数で使用されます。

	- [`GDRAWTEXT`](./GDRAWTEXT.md)
	- [`GDRAWLINE`](./GDRAWLINE.md)

!!! hint "ヒント"

    命令、式中関数両方対応しています。
