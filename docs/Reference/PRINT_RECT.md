---
hide:
  - toc
---

# PRINT_RECT

| 関数名                                                               | 引数                       | 戻り値 |
| :------------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.md) | `int`                      | なし   |
|                                                                      | `int`, `int`, `int`, `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_RECT width
	PRINT_RECT xPos, yPos, width, height
    ```
	行中に横幅がフォントサイズの引数％である長方形を表示します。または、行中に`x`,`y`,`横幅`,`縦幅`がそれぞれ引数％である長方形を表示します。  
	`SETCOLOR`命令によりフォント色と同様に色を変えられます。  
	[`HTML_PRINT`命令の`<shape type='rect'>`タグ](../Emuera/HTML_PRINT.md#shape)に相当します。  
	EM+EEにて、`px`指定の表記もできるようになりました。  

!!! hint "ヒント"

    命令のみ対応しています。
