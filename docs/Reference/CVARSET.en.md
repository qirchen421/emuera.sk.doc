---
hide:
  - toc
---

# CVARSET

| Function name                                                   | Arguments                                | Return |
| :------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.md) | `charaVariable`(, `int`, `int`, `int`, `int`) | none   |

!!! info "API"

    ```  { #language-erbapi }
	CVARSET characterVariable, index, value, startID, endID
    ```
	Command to assign a specific element of a character variable for the specified registered character.  
	For the registered characters specified by the fourth argument and beyond of the variable specified in the first argument, assigns the value specified by the third argument to the element specified by the second argument.  
	For 1-dimensional array variables such as `NAME` and `ISASSI`, the second argument does not affect processing. Therefore, if you do not omit the third argument, please specify an appropriate value.  
	If the third argument is omitted, `0` or empty string is assigned.  
	If the second argument is also omitted, assignment is made to element 0.  
	If the fourth argument and beyond are omitted, assignment is made to all registered characters.

    ```  { #language-erbapi }
	CVARSET CFLAG, 10, 123
    ```

	This script is equivalent to:

    ```  { #language-erbapi }
	REPEAT CHARANUM
		CFLAG:COUNT:10 = 123
	REND
    ```

!!! hint "Hint"

    Command only.

### Related Items
- [VARSET](VARSET.md)
