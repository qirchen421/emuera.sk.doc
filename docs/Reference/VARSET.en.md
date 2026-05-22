---
hide:
  - toc
---

# VARSET

| Function name                                                   | Arguments                                 | Return |
| :------------------------------------------------------------- | :---------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.en.md) | `variable`(, `value`, `startIndex`, `endIndex`) | none   |

!!! info "API"

    ```  { #language-erbapi }
	VARSET variableName(, value, startIndex, endIndex)
    ```
	Assigns the value of the second argument to the specified range of the array of the specified variable.  
	If the second argument is omitted, `0` or empty string is assigned.  
	If the third argument and beyond are omitted, assignment is made to all elements of the array.  
	For example:

    ```  { #language-erbapi }
	VARSET FLAG, 0
	VARSET STR, "あああ", 0, 10
	VARSET TA:0:0:0,5678
    ```

	In this example, all elements of `FLAG` become `0`.  
	`STR:0` to `STR:9` are assigned "あああ", and all elements of the three-dimensional array `TA` are assigned `5678`.  
	The same can be done using [`FOR-NEXT`](./FOR.en.md) loops in ERB, but when the loop count reaches tens of thousands, the execution time becomes non-negligible.  
	The `VARSET` command can complete processing much faster than assignment in ERB.  
	When a character variable is the target of `VARSET`, only the elements of the specified character are assigned.

    ```  { #language-erbapi }
	VARSET CFLAG:MASTER:0, 0
	VARSET CSTR, ""
    ```

	In this example, `CFLAG:0～999` of `MASTER` (if VariableSize.csv has not been changed) become `0`, but the `CFLAG` of other characters are not affected.  
	Also, if the target is omitted, it is treated as `TARGET` as usual, so all `CSTR` of `TARGET` become empty strings. The `CSTR` of other characters are not affected.  
	When used on non-1-dimensional arrays and non-array character variables such as `DITEMTYPE` or `TA`, the third argument and beyond are ignored, and assignment is made to all elements of the array.

!!! hint "Hint"

    Command only.

### Related Items
- [VARSETEX](VARSETEX.en.md)
