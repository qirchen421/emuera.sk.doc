---
hide:
  - toc
---

# TOINT, ISNUMERIC

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.md)       | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.md)   | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int TOINT string
	int ISNUMERIC string
    ```
	`TOINT` converts the argument string to a number and assigns it to `RESULT:0` or returns it. However, only strings composed of half-width digits can be converted.  
	If the argument cannot be interpreted as a number, `0` is assigned or returned. This applies to full-width digits as well.  
	If the value passed is indeterminate, using `ISNUMERIC` before `TOINT` improves code stability.  

	`ISNUMERIC` determines whether a string can be parsed as a number (i.e., whether a value can be obtained with `TOINT`).  
	If the argument can be interpreted as a number, it assigns or returns `1` to `RESULT:0`; otherwise, it assigns or returns `0`.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES
		REPEAT 3
			SELECTCASE COUNT
				CASE 0
					HOGES = 123
				CASE 1
					HOGES = 一二三
				CASE 2
					HOGES = １２３
			ENDSELECT
			IF ISNUMERIC(HOGES)
				PRINTFORML Variable HOGES can be converted to numeric type ({TOINT(HOGES)})
			ELSE
				PRINTFORML Variable HOGES cannot be converted to numeric type (%HOGES%)
			ENDIF
		REND
		WAIT
    ``` 
    ``` title="Result"
	Variable HOGES can be converted to numeric type (123)
	Variable HOGES cannot be converted to numeric type (一二三)
	Variable HOGES cannot be converted to numeric type (１２３)
    ```

### See Also
- [TOSTR](TOSTR.md)
