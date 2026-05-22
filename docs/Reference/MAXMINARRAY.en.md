---
hide:
  - toc
---

# MAXARRAY, MINARRAY

| Function name                                                        | Arguments                   | Return |
| :------------------------------------------------------------------ | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.en.md) | `integerArray`, `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.en.md) | `integerArray`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAXARRAY integerArray(, start, end)
	int MINARRAY integerArray(, start, end)
    ```
	Returns the maximum or minimum value in an array.  
	Specify a one-dimensional array to search in `integerArray`, and search elements from `start` to less than `end`.  
	If `end` is omitted, the search extends to the end of the array.  
	`RESULT = MAXARRAY(X, A, B)` is equivalent to:

		RESULT = X:A
		FOR COUNT, A, B
			IF X:COUNT > RESULT
				RESULT = X:COUNT
			ENDIF
		REND

	Only one-dimensional integer array variables can be specified for `integerArray`; string variables and multidimensional arrays cannot be used.  
	If a character array such as `CFLAG` is specified for `integerArray`, only the specified characters are searched.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [MAX, MIN](MAX.en.md)
