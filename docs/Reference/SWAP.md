---
hide:
  - toc
---

# SWAP

| 関数名                                                   | 引数                   | 戻り値 |
| :------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.md) | `variable`, `variable` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SWAP variable, variable
    ```
	変数1と変数2の中身を入れ替えます  
	交換する2つの変数は同じ型（整数型と整数型、文字列型と文字列型）である必要があります  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM AAA
		#DIM BBB

		AAA = 123
		BBB = 456

		REPEAT 2
			PRINTFORML AAA:{AAA} BBB:{BBB}
			SWAP AAA, BBB
		REND
		WAIT
    ``` 
    ``` title="結果"
	AAA:123 BBB:456
	AAA:456 BBB:123
    ```
