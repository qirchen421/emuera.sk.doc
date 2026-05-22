---
hide:
  - toc
---

# GDASHSTYLE

| Function name                                                        | Arguments                | Return |
| :------------------------------------------------------------- | :----------------------| :----- |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.en.md) | `int`, `int`, `int` | 1      |

!!! info "API"

	``` { #language-erbapi }
	int GDASHSTYLE gID, DashStyle, DashCap
	```

	Sets the line style for `GDRAWLINE`. DashStyle and DashCap can be specified using the numeric values of C#'s DashStyle and DashCap enumerations.  
	DashStyle: 0=solid line, 1=line composed of dashes, 2=line composed of dots, 3=line composed of dashes and dots, 4=line composed of dashes and two dots  
	DashCap (line end shape): 0=normal shape (right angle), 2=rounded shape, 3=triangular shape. 1 is unused. Direct complaints to Microsoft.

!!! hint "Hint"

	Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		#DIM DYNAMIC LCOUNT
		FOR LCOUNT, 0, 5
			GCREATE LCOUNT, 100, 100

			GSETPEN LCOUNT, 0xFFFF0000, 5
			
			GDASHSTYLE LCOUNT, 1, 3
			GSETPEN LCOUNT, 0xFFFF0000, 4

			GCLEAR LCOUNT, 0xFFFFFFFF

			GDRAWLINE LCOUNT, 0, 0, 100, (LCOUNT+1)*20

			SPRITECREATE @"LINE{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='LINE{LCOUNT}' srcb='' height='500'>"
			REPEAT 4
				PRINTL
			REND
		NEXT
		WAIT
	```

	![](../assets/images/GDASHSTYLE.png)

### Related Items
- [GDRAWLINE](GDRAWLINE.en.md)
