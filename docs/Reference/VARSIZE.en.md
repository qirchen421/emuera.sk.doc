---
hide:
  - toc
---

# VARSIZE

| Function name                                                           | Arguments                | Return |
| :--------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.md)   | `variable`              | `int`  |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.md) | `variable`(, `dimension`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	VARSIZE variableName
	VARSIZE(variableName(, dimension))
    ```
	There are differences in specifications between command and expression function.  
	When used as a command, assigns the array size of the specified variable to `RESULT:0`.  
	For multidimensional array variables, sizes are assigned in order from the leftmost element: `RESULT:0`, `RESULT:1`, `RESULT:2`.  
	The array size is specified in `VariableSize.csv`.

    ```  { #language-erbapi }
	VARSIZE FLAG
	PRINTFORML <TEST1> = {RESULT:0}
	VARSIZE SAVESTR
	PRINTFORML <TEST2> = {RESULT:0}
	VARSIZE TALENT
	PRINTFORML <TEST3> = {RESULT:0}
	WAIT
    ```

	Result (when size has not been modified):

		<TEST1> = 10000
		<TEST2> = 100
		<TEST3> = 1000

	※ This does not actually reference the variable, so out-of-bounds array access will not occur.  
	　In the example above, even if `TARGET == -1`, it will not cause an error trying to reference TALENT of "-1st" character.

	When used as an expression function:

	```  { #language-erbapi }
	X = VARSIZE("FLAG")
    ```

	The variable must be specified as a string.  
	Also, when getting the size of multidimensional array variables such as `DITEMTYPE` or `TA`, the second argument specifies the dimension (from the leftmost element: `0, 1, 2`).  
	To get the element count of a multidimensional array at once, use the command form.  
	Also, when [`Align VARSIZE Dimension Specification with ERD Feature`](../Emuera/config.md#align-varsize-dimension-specification-with-erd-feature) added in EM+EE is enabled, the dimension specification becomes `1, 2, 3` from the left, matching the ERD system.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 1, 2, 3
		#DIMS HOGES, 4, 5, 6

		VARSIZE HOGE
		PRINTFORML HOGE 1Dim:{RESULT:0} 2Dim:{RESULT:1} 3Dim:{RESULT:2}
		PRINTFORMW HOGES 1Dim:{VARSIZE("HOGES", 0)} 2Dim:{VARSIZE("HOGES", 1)} 3Dim:{VARSIZE("HOGES", 2)}
    ``` 
    ``` title="Result"
	HOGE 1Dim:1 2Dim:2 3Dim:3
	HOGES 1Dim:4 2Dim:5 3Dim:6
    ```
