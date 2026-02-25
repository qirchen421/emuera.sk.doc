---
hide:
  - toc
---

# TOSTR

| Function name                                                 | Arguments      | Return   |
| :------------------------------------------------------------ | :------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md)   | `int`, `option` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOSTR int, option
    ```
	Command that converts a number to a string.
	Specify the number to convert as the first argument, and the format as a string in the second argument.  
	The second argument can be omitted; when omitted, it simply becomes a string (similar to `{}` in [`PRINTFORM`](./PRINT.md)).  
	This function internally calls C#'s [`Int64.ToString()` function](https://learn.microsoft.com/en-us/dotnet/api/system.int64.tostring), so C# format specifiers can be used. If the second argument is invalid, an error occurs.  
	For simple format specifier examples, see the expression function with the same name. For detailed format specifications, refer to websites explaining C# numeric format strings.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		A = 438765
		PRINTSL TOSTR(A)
		PRINTSL TOSTR(A, "x")
		PRINTSL TOSTR(A, "X")
		PRINTSL TOSTR(A, "D8")
		PRINTSL TOSTR(A, "X8")
		PRINTSL TOSTR(A, "00000000")
		PRINTSL TOSTR(A, "########")
		PRINTSL TOSTR(A, "#,###")
		PRINTSL TOSTR(A, "0000万0000")
    ``` 
    ``` title="Result"
	438765　//standard
	6b1ed　//"x" hexadecimal (lowercase)
	6B1ED　//"X" hexadecimal (uppercase)
	00438765　//"D8" decimal + 8 digits
	0006B1ED　//"X8" hexadecimal + 8 digits
	00438765　//"00000000" decimal + 8 digits
	438765　//"########" decimal
	438,765　//"#,###" comma every 3 digits
	0043万8765　//"0000万0000" 8 digits + "万" at 4th position
    ```

### See Also
- [TOINT](TOINT.md)
