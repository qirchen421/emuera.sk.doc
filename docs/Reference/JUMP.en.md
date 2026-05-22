---
hide:
  - toc
---

# JUMP

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.en.md) | `functionName`   | `void`¹ |

!!! info "API"

    ```  { #language-erbapi }
	JUMP functionName
    ```
	Calls a function defined with a string starting with `@`  
	When the function reaches its end or executes [`RETURN`](./RETURN.en.md), the function ends  
	Unlike [`CALL`](./CALL.en.md), it does not push the function onto the runtime stack, so when the destination function ends, it does not return. Therefore, if there is no call stack, it may result in an error termination

¹ `void` means the instruction itself does not return a value, but [`RETURN`](./RETURN.en.md) in the JUMP destination function still sets `RESULT`. See "JUMP and RESULT" below for details.


!!! hint "Hint"

    Only available as a statement.

!!! info "JUMP and RESULT"

    When [`RETURN`](./RETURN.en.md) is executed in a JUMP destination function, `RESULT` is set normally. JUMP only replaces the stack frame and does not affect `RETURN`'s `RESULT` assignment behavior.

    When the JUMP destination function ends, `Return()` detects the `IsJump` flag and **recursively unwinds the stack** back to the first non-JUMP caller (e.g., [`CALL`](./CALL.en.md)). Even in a JUMP chain (A→JUMP B→JUMP C→RETURN), RESULT is correctly set.

    ``` { #language-erb }
    @SYSTEM_TITLE
        CALL AAA
        PRINTVL RESULT    ; 42 (BBB's RETURN 42 sets RESULT)

    @AAA
        JUMP BBB          ; Replaces AAA with BBB
        PRINTL Unreachable ; Never executed

    @BBB
        RETURN 42         ; RESULT = 42, recursively unwinds to SYSTEM_TITLE
    ```


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
- [JUMPFORM](FORM.en.md)
- [TRYJUMPFORM](TRYFORM.en.md)
- [TRYCJUMP](TRYC.en.md)
