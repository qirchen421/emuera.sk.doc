---
hide:
  - toc
---

# THROW

| Function name                                                   | Arguments  | Return |
| :------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.en.md)   | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	THROW formedString
    ```
    Forces an error and displays the error using the string provided as an argument.


!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		THROW Unfortunately, the book of adventure has been lost
    ``` 
    ``` title="Result"
	Now Loading...
	THROW occurred at line 2 of MAIN.ERB
	THROW Unfortunately, the book of adventure has been lost
	THROW content: Unfortunately, the book of adventure has been lost
	Current function: @SYSTEM_TITLE (line 1 of MAIN.ERB)
	Function call stack:
	 ※※Log output to emuera.log ※※

    ```
