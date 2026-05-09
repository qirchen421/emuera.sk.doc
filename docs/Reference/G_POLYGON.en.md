---
hide:
  - toc
---

# G_POLYGON Series

| Function Name                                                                  | Parameters          | Returns |
| :----------------------------------------------------------------------------- | :------------------ | :------ |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_DRAW`](./G_POLYGON.md)        | `int`               | `int`   |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_FILL`](./G_POLYGON.md)        | `int`               | `int`   |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_ADD`](./G_POLYGON.md)   | `int`, `int`, `int` | `int`   |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_CLEAR`](./G_POLYGON.md) | `int`               | `int`   |

!!! info "API"

	``` { #language-erbapi }
	int G_POLYGON_DRAW gID
	int G_POLYGON_FILL gID
	int G_POLYGON_POINT_ADD gID, x, y
	int G_POLYGON_POINT_CLEAR gID
	```

	`G_POLYGON_POINT_ADD` adds a vertex to the graphics specified by `gID`.  
	`G_POLYGON_DRAW` draws the added vertices as a polygon using the current pen.  
	`G_POLYGON_FILL` fills the added vertices as a polygon using the current brush.  
	`G_POLYGON_POINT_CLEAR` clears all added vertices.  

	These functions are only available in SkiaSharp drawing mode. They will throw an error in GDI mode.

!!! hint "Hint"

	Both command and expression function forms are supported.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		; Create a 400x300 canvas
		GCREATE 0, 400, 300
		GCLEAR 0, 0xFFFFFF

		; Set red pen and blue brush
		GSETPEN 0, 0xFF0000, 3
		GSETBRUSH 0, 0x0000FF

		; Add triangle vertices
		G_POLYGON_POINT_ADD 0, 50, 50
		G_POLYGON_POINT_ADD 0, 350, 50
		G_POLYGON_POINT_ADD 0, 200, 250

		; Fill then draw outline
		G_POLYGON_FILL 0
		G_POLYGON_DRAW 0

		; Display
		CBGSETG 0, 0, 0, 0
		WAIT
	```

### Related Items
- [GCREATE](GCREATE.md)
- [GSETPEN](GSETPEN.md)
- [GSETBRUSH](GSETBRUSH.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.md)