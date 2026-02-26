---
hide:
  - toc
---

# JUMP

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md) | `functionName`   | none   |

!!! info "API"

    ```  { #language-erbapi }
	JUMP functionName
    ```
	Calls a function defined with a string starting with `@`  
	When the function reaches its end or executes [`RETURN`](./RETURN.md), the function ends  
	Unlike [`CALL`](./CALL.md), it does not push the function onto the runtime stack, so when the destination function ends, it does not return. Therefore, if there is no call stack, it may result in an error termination


!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL CALL to AAA
		CALL AAA

		PRINTW Backed SYSTEM_TITLE

		@AAA
		PRINTL JUMP to BBB
		JUMP BBB

		PRINTL Can not reach here

		@BBB
		PRINTL Exit BBB
		RETURN
    ``` 
    ``` title="Result"
	CALL to AAA
	JUMP to BBB
	Exit BBB
	Backed SYSTEM_TITLE
    ```

### Related
- [JUMPFORM](FORM.md)
- [TRYJUMPFORM](TRYFORM.md)
- [TRYCJUMP](TRYC.md)
