---
hide:
  - toc
---

# REUSELASTLINE

| Function name                                                                     | Arguments | Return   |
| :-------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
	REUSELASTLINE string
    ```
	Rewrites the last line with the specified formatted string.
	However, lines rewritten using this will be replaced when the next line is added.
	Basically, this should only be used within the loop processing of [`INPUT`](./INPUT.md) and [`INPUTS`](./INPUT.md).
	The argument uses the same format as [`PRINTFORM`](./PRINT.md).
	Note that `REUSELASTLINE ` (with this half-width space required) allows creating an empty line without warnings.

    ```  { #language-erbapi }
	$INPUT_LOOP  
	INPUT  
	IF RESULT != 0  
		;!;CLEARLINE 1   
		;!;REUSELASTLINE 無効ですよ  
		GOTO INPUT_LOOP  
	ENDIF  
	```

	Calling `REUSELASTLINE` before [`GOTO INPUT_LOOP`](./GOTO.md) will erase the previous input from the screen, and the next input will be displayed on the same line as the previous input.
	This prevents the number of lines from increasing even when invalid inputs are repeated, avoiding the situation where choices end up off-screen.
	Additionally, at the end of conditional branches in `@USERXXX` family functions
	(applicable to `@USERCOM`, `@USERSHOP`, and `@USERABLUP`):

    ```  { #language-erbapi }
	;!;ELSE  
		;!;REUSELASTLINE   
	ENDIF  
	```

	Can be used to...?
	(If using Emuera-specific code, `;!;` is not required)

!!! hint "Hint"

    Command only.
