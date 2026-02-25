---
hide:
  - toc
---

# TOOLTIP_SETDELAY, TOOLTIP_SETDURATION

| Function name                                                                         | Arguments    | Return |
| :----------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.md)    | `int`   | none   |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.md) | `int`   | none   |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETDELAY milliSecond
	TOOLTIP_SETDURATION milliSecond
    ```
	`TOOLTIP_SETDELAY` sets the time in milliseconds before the tooltip is displayed.  
	The default is 500 (milliseconds), and the maximum value is 32767.  

	`TOOLTIP_SETDURATION` sets the display duration of the tooltip in milliseconds. Specifying 0 uses the default display duration.

!!! hint "Hint"

    Only commands are supported.

### See Also
- [Tooltip Extension](TOOLTIP_EXTENSION.md)
- [TOOLTIP_SETCOLOR](TOOLTIP_SETCOLOR.md)
