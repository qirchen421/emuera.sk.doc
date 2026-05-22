---
hide:
  - toc
---

# CHARATU

| Function name                                                   | Arguments       | Return   |
| :------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.en.md) | `string`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string CHARATU string, position
    ```
	Expression function that retrieves the character at the specified position in a string. The processing uses Unicode.  

	Example:
		CHARATU(<sourceString>, [characterPosition])
	This function gets the character at the specified position in the string.

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = "いろはにほ"

		REPEAT 5
			PRINTFORML %CHARATU(HOGES, COUNT)%
		REND
		WAIT
    ``` 
    ``` title="Result"
	い
	ろ
	は
	に
	ほ
    ```

### See Also
- [SUBSTRING](SUBSTRING.en.md)
