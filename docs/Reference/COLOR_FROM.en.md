---
hide:
  - toc
---

# COLOR_FROMNAME, COLOR_FROMRGB

| Function name                                                             | Arguments            | Return    |
| :------------------------------------------------------------------------ | :------------------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.md) | `string`            | `int`     |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.md)  | `int`, `int`, `int` | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int COLOR_FROMNAME colorName
	string COLOR_FROMRGB R, G, B
    ```
	`COLOR_FROMNAME` interprets the given argument as a color name and returns it as a value in `0xRRGGBB` format.  
	If the color name does not exist, it returns -1.

	`COLOR_FROMRGB` returns the given R,G,B values as a value in `0xRRGGBB` format.  
	If arguments are outside the 0-255 range, an error occurs.

!!! hint "Hint"

    Command and expression function both supported.

### Related
- [SETCOLOR](SETCOLOR.md)
