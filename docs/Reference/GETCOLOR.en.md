---
hide:
  - toc
---

# GETCOLOR functions

| Function name                                                                | Arguments | Return |
| :--------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.en.md)           | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.en.md)         | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.en.md)         | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.en.md)      | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.en.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCOLOR
	int GETBGCOLOR
	int GETDEFCOLOR
	int GETDEFBGCOLOR
	int GETFOCUSCOLOR
    ```
	Each function returns the color code in `RESULT:0`.  
	`GETCOLOR` returns the currently used text color, `GETDEFCOLOR` returns the text color specified in [config](../Emuera/config.en.md#text-color), `GETBGCOLOR` returns the currently used background color,  
	`GETDEFBGCOLOR` returns the [default background color](../Emuera/config.en.md#background-color), and `GETFOCUSCOLOR` returns the [text color when a button is selected](../Emuera/config.en.md#selected-text-color).  
	The return value is in hexadecimal format as `0xRRGGBB`.  
	For example, orange (R,G,B) = (`255, 128, 0`) returns `0xFF8000` (which is `16744448` in decimal).  
	For color-to-number mapping, you can refer to websites that explain web colors.  
	Due to changes in version 1.731, the [`SETCOLOR`](./SETCOLOR.en.md) command can now also accept the format `SETCOLOR 0xFF8000`.

!!! hint "Hint"

    Command and expression function both supported.

### Related
- [SETCOLOR](SETCOLOR.en.md)
- [SETBGCOLOR](SETBGCOLOR.en.md)
- [GETCONFIG](GETCONFIG.en.md)
