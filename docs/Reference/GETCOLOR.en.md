---
hide:
  - toc
---

# GETCOLOR functions

| Function name                                                                | Arguments | Return |
| :--------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.md)           | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.md)         | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.md)         | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.md)      | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCOLOR
	int GETBGCOLOR
	int GETDEFCOLOR
	int GETDEFBGCOLOR
	int GETFOCUSCOLOR
    ```
	Each function returns the color code in `RESULT:0`.  
	`GETCOLOR` returns the currently used text color, `GETDEFCOLOR` returns the text color specified in [config](../Emuera/config.md#_28), `GETBGCOLOR` returns the currently used background color,  
	`GETDEFBGCOLOR` returns the [default background color](../Emuera/config.md#_27), and `GETFOCUSCOLOR` returns the [text color when a button is selected](../Emuera/config.md#_29).  
	The return value is in hexadecimal format as `0xRRGGBB`.  
	For example, orange (R,G,B) = (`255, 128, 0`) returns `0xFF8000` (which is `16744448` in decimal).  
	For color-to-number mapping, you can refer to websites that explain web colors.  
	Due to changes in version 1.731, the [`SETCOLOR`](./SETCOLOR.md) command can now also accept the format `SETCOLOR 0xFF8000`.

!!! hint "Hint"

    Command and expression function both supported.

### Related
- [SETCOLOR](SETCOLOR.md)
- [SETBGCOLOR](SETBGCOLOR.md)
- [GETCONFIG](GETCONFIG.md)
