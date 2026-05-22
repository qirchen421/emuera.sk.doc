---
hide:
  - toc
---

# UNICODE, ENCODETOUNI

| Function name                                                         | Arguments            | Return   |
| :------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.en.md)       | `int`               | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.en.md)   | `string`             | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	string UNICODE characterCode
	int ENCODETOUNI string(, position)
    ```
	`UNICODE` is a command/expression function that returns the Unicode character corresponding to the argument value.  
	For example, the following script displays a hollow heart mark.  
	However, this function cannot handle surrogate pairs.  
	Also, the font must support it to display correctly.  

    ```  { #language-erbapi }
	UNICODE 0x2661
	PRINTFORMW %RESULTS%
    ```

	Note that Emuera's Unicode support is not complete.  
	For example, Emuera does not guarantee correct behavior when using surrogate pairs.  

	`ENCODETOUNI` encodes the given string to Unicode and returns the byte values as numbers.  
	For commands:
	- RESULT:0: Number of characters
	- RESULT:1~: Byte values

	For expression functions, it converts the character at the target position to a Unicode code value and returns it. The position can be omitted, in which case position `0` (first character) is targeted.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = @"%UNICODE(0x2661)%"
		PRINTFORMW %HOGES% %CONVERT(ENCODETOUNI(HOGES), 16)%
    ``` 
    ``` title="Result"
	♡ 2661
    ```
