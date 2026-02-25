---
hide:
  - toc
---

# GWIDTH, GHEIGHT

| Function name                                                             | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.md)  | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GWIDTH gID
	int GHEIGHT gID
    ```
	Gets the width or height of the `Graphics` with the specified `gID`.  
	Returns 0 if the `Graphics` has not been created (including if disposed).

!!! hint "Hint"

    Both command and expression function supported.
