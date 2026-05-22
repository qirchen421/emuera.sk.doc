---
hide:
  - toc
---

# SETFONT functions

| Function name                                                        | Arguments   | Return    |
| :------------------------------------------------------------------ | :---------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.en.md)      | `string`    | `int`     |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.en.md)      | `string`    | none      |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.en.md)      | none        | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKFONT fontName
	SETFONT fontName
	string GETFONT
    ```
	`CHKFONT` checks whether a font with the specified name is installed.  
	If installed, 1 is returned in `RESULT:0`; if not installed, 0 is returned.

	`SETFONT` command uses the specified font name for subsequent string display.  
	If the argument is omitted or an empty string is specified, it returns to the [default font specified in emuera.config](../Emuera/config.en.md#font-name).  
	If the specified font is not installed, `Microsoft Sans Serif` is used instead.  
	When specifying a font that may not be installed, refer to `CHKFONT` before `SETFONT`.

	`GETFONT` returns the name of the currently used font in `RESULTS:0`.  
	This is the same name specified by the `SETFONT` command.  
	If `SETFONT` has not been called, it returns the name of the [default font specified in emuera.config](../Emuera/config.en.md#font-name).

	Each is an EM+EE addition, and fonts in the `font` folder (ttf, otf) in the same directory as Emuera are also available.

!!! hint "Hint"

    `CHKFONT` and `GETFONT` are supported as expression functions.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL abc123(Default font)
		CHKFONT "MS PGothic"
		IF RESULT
			SETFONT "MS PGothic"
			PRINTL abc123(MS PGothic)
		ENDIF
		CHKFONT "MS Mincho"
		IF RESULT
			SETFONT "MS Mincho"
			PRINTL abc123(MS Mincho)
		ENDIF
		STR:0 = MS PMincho
		CHKFONT STR:0
		IF RESULT
			SETFONT STR:0
			PRINTL abc123(MS PMincho)
		ENDIF
		SETFONT
    ``` 
	![](../assets/images/SETFONT.png)
