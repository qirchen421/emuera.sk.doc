---
hide:
  - toc
---

# GETDISPLAYLINE

| Function name                                                     | Arguments  | Return      |
| :--------------------------------------------------------------- | :--------- | :---------- |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.en.md) | `int` | `string`  |

!!! info "API"

	``` { #language-erbapi }
	string GETDISPLAYLINE lineNumber
	```

	Returns the string from the specified line of already displayed lines.

!!! hint "Hint"

    Command and expression function both supported.  
	Display lines are managed as an array, so they start from 0. You can loop through all lines using the `LINECOUNT` variable.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTL AAA
		PRINTL BBB
		PRINTL CCC

		REPEAT LINECOUNT
			PRINTFORML Line {COUNT}:%GETDISPLAYLINE(COUNT)%
		REND
		WAIT
	```
	``` title="Result"
	Now Loading...
	AAA
	BBB
	CCC
	0:Now Loading...
	1:AAA
	2:BBB
	3:CCC
	```

### Related
- [HTML_POPPRINTINGSTR](HTML_POPPRINTINGSTR.en.md)
