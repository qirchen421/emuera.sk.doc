---
hide:
  - toc
---

# FINDELEMENT

| Function name                                                                     | Arguments                                   | Return |
| :------------------------------------------------------------------------------- | :------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.md)     | `variable`, `value`(, `int`, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.md) | `variable`, `value`(, `int`, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	FINDELEMENT variableName, value(, startIndex, endIndex, completeMatch)
	FINDLASTELEMENT variableName, value(, startIndex, endIndex, completeMatch)
    ```
	Function to get the position of a specific element within a specified range in an array.  
	`value` must be of the same type as `variableName`.  
	If there is an element in the search range of array elements specified by `startIndex` and `endIndex` that matches the content specified by `value`, it returns that position.  
	If `endIndex` is omitted, it searches to the end of the array.  
	If there are multiple matches, `FINDELEMENT` returns the first match, and `FINDLASTELEMENT` returns the last match. Returns `-1` if no match is found.  
	If the search target is a string type, you can use regular expressions similar to [`REPLACE`](./REPLACE.md).  
	`completeMatch` is only valid when the search target is string type. If it is `0`, partial string match is acceptable. If it is not `0`, only exact string match is acceptable.

	The `variableName` can only be 1-dimensional array variables; multidimensional arrays cannot be specified.  
	If a character array such as CFLAG is specified for `variableName`, it counts only for the specified character.

!!! hint "Hint"

    Both command and expression function are supported.
