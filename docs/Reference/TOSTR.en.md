---
hide:
  - toc
---

# TOSTR

| Function name                                                 | Arguments      | Return   |
| :------------------------------------------------------------ | :------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.en.md)   | `int`, `option` | `string` |
| ![](../assets/images/IconSK.webp)[`TOSTRF`](./TOSTR.en.md) | `float`{, `option`} | `string` |

!!! info "API — TOSTR"

    ```  { #language-erbapi }
	string TOSTR int, option
    ```
	Command that converts a number to a string.
	Specify the number to convert as the first argument, and the format as a string in the second argument.  
	The second argument can be omitted; when omitted, it simply becomes a string (similar to `{}` in [`PRINTFORM`](./PRINT.en.md)).  
	This function internally calls C#'s [`Int64.ToString()` function](https://learn.microsoft.com/en-us/dotnet/api/system.int64.tostring), so C# format specifiers can be used. If the second argument is invalid, an error occurs.  
	For simple format specifier examples, see the expression function with the same name. For detailed format specifications, refer to websites explaining C# numeric format strings.  

!!! info "API — TOSTRF" 

    ![](../assets/images/IconSK.webp) Skia addition

    ```  { #language-erbapi }
	string TOSTRF float, option
    ```
	Command that converts a floating-point number to a string.
	Specify the floating-point number to convert as the first argument, and the format as a string in the second argument.  
	The second argument can be omitted; when omitted, it simply becomes a string.  
	This function internally calls C#'s [`Double.ToString()` function](https://learn.microsoft.com/en-us/dotnet/api/system.double.tostring), so C# format specifiers can be used. If the second argument is invalid, an error occurs.  

	Common formats:

	| Format | Example | Result | Description |
	|--------|---------|--------|-------------|
	| `"F2"` | `TOSTRF(3.14, "F2")` | `"3.14"` | Fixed-point, 2 digits |
	| `"F4"` | `TOSTRF(3.14, "F4")` | `"3.1400"` | Fixed-point, 4 digits |
	| `"E"` | `TOSTRF(3.14, "E")` | `"3.140000E+000"` | Scientific notation |
	| `"G4"` | `TOSTRF(3.14, "G4")` | `"3.14"` | General format, 4 significant digits |
	| `"0.00"` | `TOSTRF(3.14, "0.00")` | `"3.14"` | Custom numeric format |

	Precision + width padding requires the FORM `%...%` syntax:

	``` { #language-erb }
	PRINTFORML %TOSTRF(PI, "F2"),10%      ; → "      3.14" (right-aligned)
	PRINTFORML %TOSTRF(PI, "F2"),10,LEFT% ; → "3.14      " (left-aligned)
	```

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
- [TOINT](TOINT.en.md)
