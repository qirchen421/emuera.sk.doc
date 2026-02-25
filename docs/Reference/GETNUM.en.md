---
hide:
  - toc
---

# GETNUM

| Function name                                                   | Arguments           | Return |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.md) | `variable`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GETNUM variableName, indexName
    ```
	Gets the numeric value from the name defined in each CSV and assigns it to `RESULT:0`.  
	For example, if `2,技巧` is defined in `abl.csv`, then executing `GETNUM ABL, "技巧"` will assign `2` to `RESULT:0`.  
	If not defined, the result is `-1`.  
	The correspondence between CSV and variables follows the "Array element specification by string" in the ["Syntax added in Emuera"](../Emuera/expression.md#_10) page.

!!! hint "Hint"

    Both command and expression function are supported.

### Related Items
- [CSV Status Functions](CSV_STATUS.md)
