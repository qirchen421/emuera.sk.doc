---
hide:
  - toc
---

# SWAP

| 函数名                                                   | 参数                   | 返回值 |
| :------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.zh.md) | `variable`, `variable` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SWAP variable, variable
    ```
	交换变量1和变量2的内容。  
	用于交换的两个变量必须是相同类型（整数型与整数型、字符串型与字符串型）。

!!! hint "提示"

    仅支持作为指令使用。

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
    ``` title="结果"
	AAA:123 BBB:456
	AAA:456 BBB:123
    ```