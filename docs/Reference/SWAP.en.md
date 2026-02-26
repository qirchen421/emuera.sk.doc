---
hide:
  - toc
---

# SWAP

| Function name                                               | Arguments             | Return |
| :---------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.md) | `variable`, `variable` | none   |

!!! info "API"

    ```  { #language-erbapi }
	SWAP variable, variable
    ```
	Swaps the contents of variable1 and variable2.  
	The two variables to be swapped must be of the same type (integer and integer, or string and string).

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
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
    ``` title="Result"
	AAA:123 BBB:456
	AAA:456 BBB:123
    ```
