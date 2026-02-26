---
hide:
  - toc
---

# CBGSETBUTTONSPRITE

| Function name                                                                                 | Arguments                                              | Return |
| :-------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.md) | `int`, `string`, `string`, `int`, `int`, `zDepth`           | `int`  |
|                                                                                                | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth, tooltip
    ```
	Sets selectable buttons in conjunction with the button map set by the [`CBGSETBMAPG`](./CBGSETBMAPG.md) command.  
	When the `0xRRGGBB` value of the button map image color under the mouse equals the `button` argument, the sprite specified by `spriteNameB` is displayed; otherwise, the sprite specified by `spriteName` is displayed.  
	`spriteName` or `spriteNameB` can be an empty string, in which case nothing is displayed when not selected or when selected, respectively.  
	For `x, y, zDepth`, see [`CBGSETSPRITE`](./CBGSETSPRITE.md). Note that the reference position `(x,y) = (0,0)` is the position where the screen bottom-left aligns with the image bottom-left.  
	Optionally, you can specify a tooltip string to be displayed when the button is selected via `tooltip`.  
	Multiple `CBGSETBUTTONSPRITE` commands can be assigned to the same `button` value, and the buttons do not need to match the button positions.  
	In such cases, for tooltips, the tooltip string with the highest `zDepth` (drawn first, appearing furthest back) is displayed priority, regardless of the image's `x, y` position.

!!! hint "Hint"

    Both command and expression function supported.
