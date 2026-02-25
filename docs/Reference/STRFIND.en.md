---
hide:
  - toc
---

# STRFIND

| Function name                                                          | Arguments                     | Return |
| :-------------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.md)        | `string`, `string`(, `int`)  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.md)       | `string`, `string`(, `int`)  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int STRFIND string, searchWord(, startPosition)
	int STRFINDU string, searchWord(, startPosition)
    ```
	String search command.  
	The first argument specifies the target string as a string expression, and the second argument specifies the search string as a string expression.  
	`STRFIND` counts full-width characters as 2, while `STRFINDU` counts them as 1, and returns a 0-based index. Returns -1 if not found.  
	Since version 1.712, a third argument can be specified for STRFIND(U).  
	The third argument specifies the search start position as a 0-based index.  

    ```  { #language-erbapi }
	STRFIND "abcdeabced","a",3
    ```

	In the above, `RESULT` will be assigned `5`.  
	Although there is an "a" at position 0, the search starts at position 3 (the "d") due to the third argument, so the first "a" found is at position 5.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = abcdefghi
		STR:1 = あいうえお
		STR:2 = うえ
		STRFIND STR:0, "cde"
		PRINTFORML <TEST1> = {RESULT:0}
		STRFIND STR:1, "いうえ"
		PRINTFORML <TEST2> = {RESULT:0}
		STRFIND STR:1, STR:2
		PRINTFORML <TEST3> = {RESULT:0}
		STRFIND STR:1, "か"
		PRINTFORML <TEST4> = {RESULT:0}
    ``` 
    ``` title="Result"
	<TEST1> = 2
	<TEST2> = 2
	<TEST3> = 4
	<TEST4> = -1
    ```

### See Also
- [STRCOUNT](STRCOUNT.md)
- [SUBSTRING](SUBSTRING.md)
