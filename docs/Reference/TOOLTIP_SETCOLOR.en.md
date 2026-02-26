---
hide:
  - toc
---

# TOOLTIP_SETCOLOR

| Function name                                                                           | Arguments         | Return |
| :------------------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.md) | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETCOLOR colorCode, colorCode
    ```
	Sets the foreground and background color of the tooltip using numeric values in 0xRRGGBB format. The first argument is the text color, and the second is the background color.  
	If you want to use R,G,B values or strings, use the [`COLOR_FROMRGB`](./COLOR_FROM.md) or [`COLOR_FROMNAME`](./COLOR_FROM.md) functions.  

	This command does not work in the original Emuera. It works when used together with [`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md) added in EM+EE.  

!!! hint "Hint"

    Only commands are supported.

### See Also
- [Tooltip Extension](TOOLTIP_EXTENSION.md)
- [Tooltip Display Operations](TOOLTIP_SET.md)
