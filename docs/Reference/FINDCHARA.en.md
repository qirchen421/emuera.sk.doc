---
hide:
  - toc
---

# FINDCHARA, FINDLASTCHARA

| Function name                                                                 | Arguments                               | Return |
| :----------------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.en.md)     | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.en.md) | `charaVariable`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FINDCHARA charaVariable, value(, startID, endID)
	int FINDLASTCHARA charaVariable, value(, startID, endID)
    ```
    The `FINDCHARA` command specifies a character variable and a value, and returns the registration number of the character whose variable matches that value.  
    If multiple matches are found, `FINDCHARA` returns the first matching character, and `FINDLASTCHARA` returns the last matching character. Returns `-1` if not found.  
    You can also specify the third argument to set the search start position, and the fourth argument to set the search end position.  
    However, an error occurs if the search range exceeds the character count.

    ```  { #language-erbapi }
	X = -1
	WHILE 1
		FINDCHARA CFLAG:10, 123, X + 1
		X = RESULT
		SIF X < 0
			BREAK
		PRINTFORML %NAME:X%
	WEND
    ```

    The above script lists all characters with `CFLAG:10` equal to `123`.

!!! hint "Hint"

    Both command and expression function forms are available.
