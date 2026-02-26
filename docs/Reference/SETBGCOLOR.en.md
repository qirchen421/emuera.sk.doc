---
hide:
  - toc
---

# SETBGCOLOR

| Function name                                                                   | Arguments           | Return |
| :------------------------------------------------------------------------------ | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.md)          | `int`, `int`, `int`  | none   |
|                                                                                 | `int`               | none   |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.md)        | none                | none   |

!!! info "API"

    ```  { #language-erbapi }
	SETBGCOLOR R, G, B
	SETBGCOLOR hexaDecimal
	RESETBGCOLOR
    ```
	Command to change the background color to the specified color.  
	The basic specifications are the same as [`SETCOLOR`/`RESETCOLOR`](./SETCOLOR.md), except that for safety, if the color is changed again within 0.2 seconds, it will force a WAIT until 0.2 seconds have elapsed.  
	The current background color can be obtained with [`GETBGCOLOR`](./GETCOLOR.md), and the default background color can be obtained with [`GETDEFBGCOLOR`](./GETCOLOR.md).  
	To specify colors by name, use [`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md).

    ```  { #language-erbapi }
	SETBGCOLOR 255, 128, 0
	SETBGCOLOR 0xFF8000
    ```

	Both lines have the same meaning. The value obtained with the [`GETBGCOLOR`](./GETCOLOR.md) command will be the latter format.

!!! hint "Hint"

    Command only.

### Related
- [SETCOLOR](SETCOLOR.md)
