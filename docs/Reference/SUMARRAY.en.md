---
hide:
  - toc
---

# SUMARRAY

| Function name                                                     | Arguments                     | Return |
| :--------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.md) | `integerArray`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMARRAY integerArray(, startIndex, endIndex)
    ```
	Returns the sum of array values.  
	Specify a one-dimensional integer array in `integerArray` to calculate the sum of elements from `startIndex` to less than `endIndex`.  
	If `endIndex` is omitted, the sum extends to the end of the array.  
	`RESULT = SUMARRAY(X, A, B)` is equivalent to:

		RESULT = 0
		FOR COUNT, A, B
			RESULT += X:COUNT
		REND

	Note that values up to `X:(B - 1)` are added, and `X:B` is not added.
	Only one-dimensional integer array variables can be specified for `integerArray`; string variables and multidimensional arrays cannot be used.
	If a character array such as `CFLAG` is specified for `integerArray`, only the specified characters are summed.

!!! hint "Hint"

    Both command and expression function forms are available.
