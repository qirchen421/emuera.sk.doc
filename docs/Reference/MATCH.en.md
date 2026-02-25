---
hide:
  - toc
---

# MATCH

| Function name                                             | Arguments                   | Return |
| :-------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.md) | `array`, `any`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MATCH array, value(, start, end)
    ```
	Returns the number of elements in the specified array that match the `value`.  
	`value` must be the same type as `array`.  
	Specify a one-dimensional array to search in `array`, and search elements from `start` to less than `end`.  
	If `end` is omitted, the search extends to the end of the array.  
	`RESULT = MATCH(X, Y, A, B)` is equivalent to:

		RESULT = 0
		FOR COUNT, A, B
			IF X:COUNT == Y
				RESULT += 1
			ENDIF
		REND

	(This also works if you specify string arrays and string expressions instead of `X` and `Y`.)  
	Only one-dimensional array variables can be specified for `array`; multidimensional arrays cannot be used.  
	If a character array such as `CFLAG` is specified for `array`, only the specified characters are counted.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [GROUPMATCH](GROUPCHECK.md)
