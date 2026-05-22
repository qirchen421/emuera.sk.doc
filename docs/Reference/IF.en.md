---
hide:
  - toc
---

# (S)IF

| Function name                                                | Arguments  | Return |
| :----------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF`](./IF.en.md) | `operand` | `void` |

!!! info "API"

    ```  { #language-erbapi }
	IF operand(int)
	ELSEIF operand(int)
	ELSE
	ENDIF
	SIF operand(int)
    ```
	`SIF` executes the next line if the condition is true. If false, it skips the next line.  
	`IF` executes from the next line until it encounters `ELSEIF`, `ELSE`, or `ENDIF`, then jumps to the `ENDIF` line. If false, it skips until it encounters `ELSEIF`, `ELSE`, or `ENDIF`.  
	When a condition in `ELSEIF` is true, it executes from the next line until it encounters another `ELSEIF`, `ELSE`, or `ENDIF`, then jumps to `ENDIF`. If false, it skips to the next `ELSEIF`, `ELSE`, or `ENDIF` and repeats the same process.  
	`ELSE` executes from the next line until it encounters `ENDIF`. `ELSE` must always follow `ELSEIF`, and `ENDIF` must follow `ELSE`.  
	The condition is strictly of type `int`, where 0 is false and anything else is true.

!!! hint "Hint"

    Commands only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	#DIM CONST TRUE = 1
	#DIM CONST FALSE = 0
		IF TRUE
			PRINTL IF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF

		IF FALSE
			PRINTL Can not reach here
		ELSEIF TRUE
			PRINTL ELSEIF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF
		
		IF FALSE
			PRINTL Can not reach here
		ELSEIF FALSE
			PRINTL Can not reach here
		ELSE
			PRINTL Reached ELSE
		ENDIF

		WAIT
    ``` 
    ``` title="Result"
	Now Loading...
	IF=TRUE
	ELSEIF=TRUE
	Reached ELSE
    ```

### See Also
- [SELECTCASE](SELECTCASE.en.md)
