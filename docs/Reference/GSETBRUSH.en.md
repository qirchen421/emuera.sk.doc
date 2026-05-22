---
hide:
  - toc
---

# GSETBRUSH

| Function name                                                          | Arguments      | Return |
| :----------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.en.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETBRUSH gID, cARGB
    ```
	Sets the brush with the specified color to the `Graphics` with the specified `gID`.  
	The specified brush is retained until the `Graphics` is disposed via the GDISPOSE command.  
	Returns non-zero on success.  
	The set brush color can be retrieved with [`GGETBRUSH`](./GGETBRUSH.en.md).  
	The brush color set here is used in the following commands/expression functions:  
	
	- [`GFILLRECTANGLE`](./GFILLRECTANGLE.en.md)

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GGETBRUSH](GGETBRUSH.en.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.en.md)
