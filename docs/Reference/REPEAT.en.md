---
hide:
  - toc
---

# REPEAT-REND

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.en.md) | `int` | none   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.en.md)   | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	REPEAT loopCount
	REND
    ```
    The code between `REPEAT` and `REND` loops the number of times specified by the argument. The loop count is stored in the `COUNT` variable.  
	When [`CONTINUE`](./CONTINUE.en.md) is executed, it returns to the `REPEAT` line and increments the `COUNT` variable by 1.  
	When [`BREAK`](./CONTINUE.en.md) is executed, it terminates the loop and proceeds to the `REND` line.


!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		REPEAT 5
			SIF COUNT == 2
				CONTINUE
			SIF COUNT == 4
				BREAK
			PRINTFORML {COUNT}
		REND
		PRINTFORMW {COUNT}
    ``` 
    ``` title="Result"
	0
	1
	3
	5
    ```

### See Also
- [FOR-NEXT](FOR.en.md)
- [WHILE_WEND](WHILE.en.md)
- [CONTINUE,BREAK](CONTINUE.en.md)
