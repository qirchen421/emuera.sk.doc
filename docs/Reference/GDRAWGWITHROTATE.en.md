---
hide:
  - toc
---

# GDRAWGWITHROTATE

| Function name                                                                      | Arguments                              | Return |
| :--------------------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWGWITHROTATE gID, destID, Angle(, x, y)
	```

	Rotates the image of `destID` by the specified `Angle` degrees to the right and pastes it onto `gID`.  
	`x` and `y` specify the center of rotation. If omitted, it becomes `x/2`, `y/2` (center point of the entire image).

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HTML

		GCREATE 0, 400, 400
		GCREATE 1, 400, 400
		GCREATE 2, 400, 400

		GSETFONT 0, "Arial", 100
		GDRAWTEXT 0, "Emuera", 30, 150
		
		GDRAWGWITHROTATE 1, 0, 90
		GDRAWGWITHROTATE 2, 0, 180

		REPEAT 3
			SPRITECREATE @"TEST{COUNT}", COUNT
			HTML += @"<img src='TEST{COUNT}' height = '400' width = '400'>"
		REND
		HTML_PRINT HTML
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT
	```

	![](../assets/images/GDRAWGWITHROTATE.png)
