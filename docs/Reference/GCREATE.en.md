---
hide:
  - toc
---

# GCREATE

| Function name                                                    | Arguments        | Return |
| :-------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATE gID, width, height
    ```
	Creates a `Graphics` with the specified `gID` and size.  
	The `gID` must be a non-negative integer, and `width` and `height` must be integers between 1 and 8192.  
	An error occurs if arguments are outside this range.  
	Returns non-zero on success.  
	Returns 0 if a `Graphics` with the specified `gID` already exists.  
	To recreate a `Graphics`, use the [`GDISPOSE`](./GDISPOSE.md) command to dispose of the existing `Graphics` first.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATEFROMFILE](GCREATEFROMFILE.md)
- [GDISPOSE](GDISPOSE.md)
