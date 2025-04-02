---
hide:
  - toc
---

# SETCOLOR, RESETCOLOR

| 関数名                                                             | 引数                  | 戻り値 |
| :----------------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.md)   | `int`, `int`, `int`   | なし   |
|                                                                    | `int`                 | なし   |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.md) | なし                  | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SETCOLOR R, G, B
	SETCOLOR hexaDecimal
	RESETCOLOR
    ```
	文字色を指定した色に変更、適用は`RESETCOLOR`が呼ばれるまで。  
	指定方法は`RGB`形式になります  
	`SETCOLOR`で指定した色は`RESETCOLOR`でリセットすることができます  
	現在の文字色は[`GETCOLOR`](./GETCOLOR.md)で、デフォルトの文字色は[`GETDEFCOLOR`](./GETCOLOR.md)で取得することができます。  
	1.731以降では`SETCOLOR`に`0xRRGGBB`形式で指定できるようになりました。  
	色名で指定する場合は[`SETCOLORBYNAME`](./SETCOLORBYNAME.md)をお使いください  

    ```  { #language-erbapi }
	SETCOLOR 255, 128, 0
	SETCOLOR 0xFF8000
	```

	これはどちらの行も同じ意味になります。[`GETCOLOR`](./GETCOLOR.md)命令で取得できる値は後者です。

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [SETBGMCOLOR](SETBGCOLOR.md)
- [SETCOLORBYNAME](SETCOLORBYNAME.md)
