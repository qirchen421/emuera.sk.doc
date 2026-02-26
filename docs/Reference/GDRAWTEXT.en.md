---
hide:
  - toc
---

# GDRAWTEXT

| Function name                                                        | Arguments                          | Return |
| :------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md) | `int`, `string`(, `int`, `int`) | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWTEXT gID, text(, x, y)
	```

	Draws `text` on the `Graphics` specified by `gID`. Uses the font and outline specified by `GSETFONT` and `GSETPEN`.  
	If `x`,`y` are omitted, draws at position `0`, `0`.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		FOR LCOUNT, 1, 6
			GCREATE LCOUNT, 2000, 300
			GSETFONT LCOUNT, "Arial", LCOUNT*50, 0
			GSETPEN LCOUNT, 0xFFFF0000, 5
			GDRAWTEXT LCOUNT, "ABC"
			SPRITECREATE @"TEST{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='TEST{LCOUNT}' srcb='' height='300'>"
			REPEAT 2
				PRINTL 
			REND
		NEXT
	```

	![](../assets/images/GDRAWTEXT.png)

### Related Items
- [GSETFONT](GSETFONT.md)
- [GSETPEN](GSETPEN.md)
- [GGETTEXTSIZE](GGETTEXTSIZE.md)
