---
hide:
  - toc
---

# BAR(L)

| 関数名                                                    | 引数                  | 戻り値 |
| :-------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.md)  | `int`, `int`, `int`   | なし   |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.md) | `int`, `int`, `int`   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	BAR value, maxValue, length
    ```
    第二引数に対する第一引数の割合をグラフ化したバーを描画する。第三引数でグラフの長さを設定できる  
	`BAR`は表示後に改行せず、`BARL`は表示後に改行する


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		BAR 2, 10, 20
		PRINTL (2/10)
		BARL 114, 514, 81
    ``` 
    ``` title="結果"
	[****................](2/10)
	[*****************................................................................]
    ```
