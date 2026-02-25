---
hide:
  - toc
---

# SPLIT, STRJOIN

| Function name                                                   | Arguments                              | Return   |
| :------------------------------------------------------------- | :------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.md)    | `string`, `string`, `stringArray`      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.md)  | `stringArray`(, `string`, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	SPLIT string, sepalateWord, stringArray
	string STRJOIN stringArray(, sepalateWord, startIndex, joinCount)
    ```
	`SPLIT` splits the string specified in the first argument using the string specified in the second argument as the delimiter, and assigns the result to the string array variable specified in the third argument.  
	Also assigns the number of splits to `RESULT`.  
	The variable specified in the third argument must be an array variable.  

    ```  { #language-erbapi }
	SPLIT "あい,うえ,,お", ",", LOCALS
    ```

	As a result of the above script, `LOCALS:0` becomes "あい", `LOCALS:1` becomes "うえ", `LOCALS:2` becomes an empty string, `LOCALS:3` becomes "お", and `RESULT` becomes `4`.  
	If the number of split elements exceeds the assignable capacity of the third argument, those elements are not assigned.  
	Since `RESULT` contains the actual split count, use that to determine the number.  

	`STRJOIN` is the opposite string concatenation command from `SPLIT`. Specifying a character variable may result in an error.  
	`sepalateWord` is the string to add between elements during concatenation. As with similar functions in other languages, when omitted, `,` is automatically applied (specify `""` if no delimiter is needed).  
	If `startIndex` and `joinCount` are specified, concatenation is performed in the range `arrayIndexStart ≤ i < startPosition + arrayIndexElementCount`.  
	When specifying the latter, the former cannot be omitted.  

!!! hint "Hint"

    `STRJOIN` is supported as an expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		SPLIT "あい,うえ,,お", ",", LOCALS
		REPEAT RESULT
			PRINTFORML %LOCALS:COUNT%
		REND
		PRINTFORMW %STRJOIN(LOCALS, "")%
    ``` 
    ``` title="Result"
	あい
	うえ
	
	お
	あいうえお
    ```
