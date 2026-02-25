---
hide:
  - toc
---

# STRLEN Family

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.md)            | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.md)          | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.md)       | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.md)          | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.md)         | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.md)      | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	STRLEN string
	int STRLENS string
	STRLENFORM formedString
	STRLENU string
	int STRLENSU string
	STRLENFORMU formedString
    ```
	`STRLEN`, `STRLENS`, and `STRLENFORM` measure the length of a string and assign it to `RESULT:0`.  
	The length is in bytes using SHIFT-JIS. This means full-width characters are counted as 2 characters.  

	`STRLENU`, `STRLENSU`, and `STRLENFORMU` are Unicode versions. The difference is that full-width characters are counted as 1 character.  

!!! hint "Hint"

    `STRLENS` and `STRLENSU` are supported as expression functions.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STRLEN ABCあいう
		PRINTFORML <TEST1> = {RESULT}
		STR:0 = ABCあいう
		STRLENS STR:0
		PRINTFORML <TEST2> = {RESULT}
		STRLENFORM abc%STR:0%
		PRINTFORML <TEST3> = {RESULT}

		;STRLENS also supports string expressions
		STRLENS "abc" + STR:0
		PRINTFORML <TEST4> = {RESULT}
		WAIT
    ``` 
    ``` title="Result"
	<TEST1> = 9
	<TEST2> = 9
	<TEST3> = 12
	<TEST4> = 12
    ```
