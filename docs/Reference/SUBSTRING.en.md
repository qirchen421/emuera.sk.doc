---
hide:
  - toc
---

# SUBSTRING

| Function name                                                             | Arguments                | Return   |
| :----------------------------------------------------------------------- | :---------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.md)       | `string`, `int`, `int`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.md)      | `string`, `int`, `int`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string SUBSTRING string, startPosition, characterCount
	string SUBSTRINGU string, startPosition, characterCount
    ```
	Returns a substring starting from the position specified by the first argument, with the number of characters specified by the second argument.  
	The starting position uses 0 for the first character of the string. If a position beyond the string length is specified, an empty string is returned.  
	For `SUBSTRING`, the character count is specified in SHIFT-JIS bytes, meaning full-width characters are counted as 2. `SUBSTRINGU` uses Unicode counting, so full-width characters are counted as 1.  
	If a negative value is specified for the character count, or if a position beyond the end of the original string is specified, it returns the string from the starting position to the end.  
	If the starting or ending position falls in the middle of a character (e.g., in the middle of a full-width character), it is treated as if the next position was specified.  
	Be careful: this may result in a string that is 1 character longer than the specified character count.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = 01234あいうえお
		SUBSTRING STR:0, 0, -1
		PRINTFORML <TEST1> = %RESULTS:0%
		SUBSTRING STR:0, 1, 3
		PRINTFORML <TEST2> = %RESULTS:0%
		SUBSTRING STR:0, 6, 3
		PRINTFORML <TEST3> = %RESULTS:0%
		WAIT
    ``` 
    ``` title="Result"
	<TEST1> = 01234あいうえお
	<TEST2> = 123
	<TEST3> = いう
    ```

### See Also
- [STRFIND](STRFIND.md)
