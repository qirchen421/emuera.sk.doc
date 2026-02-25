---
hide:
  - toc
---

# PRINT_IMG

| Function name                                                                                              | Arguments                                                     | Return   |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.md) | `string`                                                      | none     |
|                                                                                                            | `string`, `int`, `int`, `int`                                 | none     |
|                                                                                                            | `string`, `string`, `int`, `int`, `int`                       | none     |
|                                                                                                            | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_IMG spriteName
	PRINT_IMG spriteName, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, colorMatrix, width, height, ypos
    ```
	Displays the specified image in the line.
	Corresponds to the `<img>` tag of the [`HTML_PRINT` command](../Emuera/HTML_PRINT.md#img).
	Syntax extended in EM+EE. See [Summary](../EMEE/EMEE_Summary.md#html_printprint) for details.

!!! hint "Hint"

    Command only.

### Related Items
- [SPRITECREATE](SPRITECREATE.md)
