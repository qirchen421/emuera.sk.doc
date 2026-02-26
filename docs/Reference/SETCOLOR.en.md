---
hide:
  - toc
---

# SETCOLOR, RESETCOLOR

| Function name                                                           | Arguments         | Return |
| :---------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.md)      | `int`, `int`, `int`  | none   |
|                                                                         | `int`             | none   |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.md)    | none              | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETCOLOR R, G, B
	SETCOLOR hexaDecimal
	RESETCOLOR
    ```
	Changes the text color to the specified color. The change remains in effect until `RESETCOLOR` is called.  
	The specification method uses the `RGB` format.  
	The color specified with `SETCOLOR` can be reset with `RESETCOLOR`.  
	The current text color can be obtained with [`GETCOLOR`](./GETCOLOR.md), and the default text color can be obtained with [`GETDEFCOLOR`](./GETCOLOR.md).  
	Since version 1.731, `SETCOLOR` can also accept colors in `0xRRGGBB` format.  
	To specify colors by name, use [`SETCOLORBYNAME`](./SETCOLORBYNAME.md).

    ```  { #language-erbapi }
	SETCOLOR 255, 128, 0
	SETCOLOR 0xFF8000
    ```

	Both lines have the same meaning. The value obtained with the [`GETCOLOR`](./GETCOLOR.md) command will be the latter format.

!!! hint "Hint"

    Command only.

### Related
- [SETBGCOLOR](SETBGCOLOR.md)
- [SETCOLORBYNAME](SETCOLORBYNAME.md)
