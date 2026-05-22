---
hide:
  - toc
---

# CLEARLINE

| Function name                                                             | Arguments | Return   |
| :------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`CLEARLINE`](./CLEARLINE.en.md) | `int`     | none     |

!!! info "API"

    ```  { #language-erbapi }
	CLEARLINE line
    ```
	Deletes the specified number of lines (counting method is the same as `LINECOUNT`).
	A line is counted as from a newline by [`PRINTL`](./PRINT.en.md) etc. until the next newline.
	Note that long strings split across multiple lines are treated as a single line, so be careful.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL SSS
		PRINTL OOO
		PRINTL UUU
		PRINTL NNN
		PRINTL DDD
		PRINTL VVV
		PRINTL OOO
		PRINTL LLL
		PRINTL TTT
		CLEARLINE 8
		PRINTL EEE
		PRINTW XXX
    ``` 
    ``` title="Result"
	SSS
	EEE
	XXX
    ```

### Related Items
- [REUSELASTLINE](REUSELASTLINE.en.md)
