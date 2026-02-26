---
hide:
  - toc
---

# CONTINUE, BREAK

| Function name                                                       | Arguments | Return |
| :----------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.md) | none | none   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.md)    | none | none   |

!!! info "API"

    ```  { #language-erbapi }
	loopInstruction
		CONTINUE
		BREAK
	loopendInstruction
    ```
    Loop control commands available within [`REPEAT`](./REPEAT.md), [`FOR`](./FOR.md), [`WHILE`](./WHILE.md), and [`DO`](./DO.md).  
	`CONTINUE` returns to the loop start line at execution. For `REPEAT` and `FOR`, it increments or decrements the corresponding counter variable.  
	`BREAK` terminates the remaining loop execution at execution and jumps to the loop end line.


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
		PRINTFORML {COUNT}

		DO
			COUNT++
			IF UNICODE(COUNT) == "A"
				FOR COUNT, COUNT, COUNT+26
					PRINTFORM %UNICODE(COUNT)%
				NEXT
				BREAK
			ENDIF
		LOOP 1
		WAIT
    ``` 
    ``` title="Result"
	0
	1
	3
	5
	ABCDEFGHIJKLMNOPQRSTUVWXYZ
    ```
