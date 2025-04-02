---
hide:
  - toc
---

# SETBGCOLOR

| 関数名                                                                 | 引数                | 戻り値 |
| :--------------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.md)   | `int`, `int`, `int` | なし   |
|                                                                        | `int`               | なし   |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.md) | なし                | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SETBGCOLOR R, G, B
	SETBGCOLOR hexaDecimal
	RESETBGCOLOR
    ```
	背景色を指定した色に変更する命令です。  
	基本的な仕様は[`SETCOLOR`・`RESETCOLOR`](./SETCOLOR.md)と同様ですが、  
	安全のため変更後0.2秒以内に再変更する場合は0.2秒経過まで強制WAITになります。  
	現在の背景色は[`GETBGCOLOR`](./GETCOLOR.md)で、デフォルトの背景色は[`GETDEFBGCOLOR`](GETCOLOR.md)で取得することができます。  
	色名で指定する場合は[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md)をお使いください  

    ```  { #language-erbapi }
	SETBGCOLOR 255, 128, 0
	SETBGCOLOR 0xFF8000
	```

	これはどちらの行も同じ意味になります。 [`GETBGCOLOR`](./GETCOLOR.md)命令で取得できる値は後者です。

!!! hint "ヒント"

    命令のみ両方対応しています。

### 関連項目
- [SETCOLOR](SETCOLOR.md)
