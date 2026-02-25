---
hide:
  - toc
---

# GCLEAR

| Function name                                                      | Arguments      | Return |
| :----------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCLEAR gID, cARGB
    ```
	Replaces the entire area of the `Graphics` with the specified `gID` with the specified color.  
	Returns non-zero on success.  
	An error occurs if `gID` or color specification is invalid.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GSETCOLOR](GSETCOLOR.md)
