---
hide:
  - toc
---

# HTML_PRINT_ISLAND, HTML_PRINT_ISLAND_CLEAR

| Function name                                                                                   | Arguments     | Return |
| :--------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND`](./HTML_PRINT_ISLAND.en.md)       | `string` | none   |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND_CLEAR`](./HTML_PRINT_ISLAND.en.md) | `string` | none   |

!!! info "API"

    ```  { #language-erbapi }
	HTML_PRINT_ISLAND htmlStyleString
    ```
	The tag-based notation is the same as [`HTML_PRINT`](HTML_PRINT.en.md), but it does not depend on line information.  
	Since it does not depend on line information, unlike regular [`PRINT`](PRINT.en.md) commands, it will not disappear no matter how much you scroll.  
	See [`HTML_PRINT` Related](../Emuera/HTML_PRINT.en.md) for details.

!!! hint "Hint"

    Only commands are supported.
