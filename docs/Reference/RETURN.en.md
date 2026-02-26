---
hide:
  - toc
---

# RETURN

| Function name                                                                                              | Arguments                   | Return                    |
| :-------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------ |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.md) | `int`(, `int`,...)     | `same as arguments`              |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.md)                                    | `string`(, `string`,...)| `same as arguments (converted to numeric)`|

!!! info "API"

    ```  { #language-erbapi }
	RETURN result:0(, result:1,...)
	RETURNFORM formedString(, formedString,...)
    ```
    Assigns the values specified in the arguments to `RESULT` and terminates the currently executing function.  
	`RETURN` assigns arguments from left to right to `RESULT:0`, `RESULT:1`, etc.  
	
	`RETURNFORM` is a variant of `RETURN`.  
	The formatted string specified in the arguments is parsed as an expression and `RETURN` is performed.  
	For example, the following is possible:

    ```  { #language-erbapi }
	A = 100
	CALL TEST
	PRINTFORMW RESULT == {RESULT}

	@TEST
	STR = A * 10
	RETURNFORM %STR%
    ```

	Note that unlike `RETURN`, % is not treated as the modulo operator but as the start of a string expression.  

    ```  { #language-erbapi }
	;OK. Returns the last two digits of A.
		RETURN A % 100

	;Error. Tries to read everything after % as a string expression.
		RETURNFORM A % 100
    ```
	Multiple return values are also supported.  
	When multiple return values are specified, they are assigned to `RESULT:0`, `RESULT:1`, etc. in order from the beginning.  

!!! hint "Hint"

    Only commands are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CALL AAA

		PRINTFORML {RESULT:0}, {RESULT:1}, {RESULT:2}

		CALL BBB

		PRINTFORMW {RESULT:0}

		@AAA
		RETURN 5, 7, 3

		@BBB
		#DIMS HOGES

		HOGES '= "3"*2

		RETURNFORM %HOGES%4
    ``` 
    ``` title="Result"
		5, 7, 3
		334
    ```

### See Also
- [RESTART](RESTART.md)
