---
hide:
  - toc
---

# PRINT_RECT

| Function name                                                               | Arguments               | Return   |
| :-------------------------------------------------------------------------- | :---------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.en.md) | `int`                   | none     |
|                                                                           | `int`, `int`, `int`, `int` | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_RECT width
	PRINT_RECT xPos, yPos, width, height
    ```
	Displays a rectangle with width as the specified percentage of font size, or displays a rectangle with x, y, width, height each as the specified percentage of arguments.
	The color can be changed using the `SETCOLOR` command, same as font color.
	Corresponds to the `<shape type='rect'>` tag of the [`HTML_PRINT` command](../Emuera/HTML_PRINT.md#shape).
	In EM+EE, `px` notation is also supported.

!!! hint "Hint"

    Command only.
