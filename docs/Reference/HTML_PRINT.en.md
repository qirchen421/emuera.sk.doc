---
hide:
  - toc
---

# HTML_PRINT

| Function name                                                               | Arguments     | Return |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.en.md) | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	HTML_PRINT htmlStyleString
    ```
	A command to [`PRINT`](./PRINT.en.md) using HTML-like tags.  
	The argument is not a string like `PRINT` but a string expression like `PRINTS`, and automatically adds a newline, so in practice it is closer to the behavior of `PRINTSL`. (EM+EE has added an option to not add a newline)  
	The `HTML_PRINT` is not affected by [`ALIGNMENT`](./ALIGNMENT.en.md), [`SETFONT`](./SETFONT.en.md), [`SETCOLOR`](./SETCOLOR.en.md), [`FONTSTYLE`](./FONT_OPERATION.en.md) commands and their similar commands.  
	To get these effects, you must specify everything using tags.  
	See [`HTML_PRINT` Related](../Emuera/HTML_PRINT.en.md) for details.

!!! hint "Hint"

    Only commands are supported.

### See Also
- [HTML_PRINT Related](../Emuera/HTML_PRINT.en.md)
