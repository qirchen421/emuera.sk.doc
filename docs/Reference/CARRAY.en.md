---
hide:
  - toc
---

# SUMCARRAY, CMATCH, MAXCARRAY, MINCARRAY

| Function name                                                    | Arguments                             | Return |
| :-------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.md)    | `charaArray`, `any`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)         | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMCARRAY charaArray(, start, end)
	int CMATCH charaArray, value(, start, end)
	int MAXCARRAY charaArray(, start, end)
	int MINCARRAY charaArray(, start, end)
    ```
	Variations of [`SUMARRAY`](./SUMARRAY.md), [`MATCH`](./MATCH.md), [`MAXARRAY`](./MAXMINARRAY.md), and [`MINARRAY`](./MAXMINARRAY.md) that scan across characters.  
	`charaArray` must be a character array variable.  
	`start` and `end` are specified by character registration numbers.  
	For example, `RESULT = SUMCARRAY(CFLAG:2, A, B)` can also be written as:  
	(`B` must be less than `CHARANUM`)

		RESULT = 0
		FOR COUNT, A, B
			RESULT += CFLAG:COUNT:2
		REND

!!! hint "Hint"

    Both command and expression function forms are available.
