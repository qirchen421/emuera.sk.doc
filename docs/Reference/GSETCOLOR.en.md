---
hide:
  - toc
---

# GSETCOLOR

| Function name                                                          | Arguments                     | Return |
| :----------------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETCOLOR gID, cARGB, x, y
    ```
	Replaces the pixel at the specified position in the `Graphics` with the specified `gID` with the specified color.  
	Returns non-zero on success.  
	This command is not particularly fast.  
	Using this together with the [`GGETCOLOR`](./GGETCOLOR.md) command to rewrite an entire large image will not finish within a practical time.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GGETCOLOR](GGETCOLOR.md)
