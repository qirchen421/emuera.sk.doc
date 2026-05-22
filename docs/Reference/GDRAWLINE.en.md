---
hide:
  - toc
---

# GDRAWLINE

| Function name                                                        | Arguments                            | Return |
| :------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.en.md) | `int`, `int`, `int`, `int`, `int` | 1      |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWLINE gID, fromX, fromY, forX, forY
	```

	Draws a line from coordinates `fromX`,`fromY` to coordinates `forX`,`forY` on the `Graphics` specified by `gID`.  
	Uses the color and thickness specified by `GSETPEN`.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		FOR LCOUNT, 0, 5
			GCREATE LCOUNT, 100, 100
			GCLEAR LCOUNT, 0xFFFFFFFF
			GSETPEN LCOUNT, 0xFFFF0000, 5
			GDRAWLINE LCOUNT, 0, 0, 100, (LCOUNT+1)*20
			SPRITECREATE @"LINE{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='LINE{LCOUNT}' srcb='' height='500'>"
			REPEAT 4
				PRINTL
			REND
		NEXT
		WAIT
	```

	![](../assets/images/GDRAWLINE.png)

### Related Items
- [GSETPEN](GSETPEN.en.md)
- [GDASHSTYLE](GDASHSTYLE.en.md)
