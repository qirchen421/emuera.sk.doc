---
hide:
  - toc
---

# GCREATEFROMFILE

| Function name                                                                        | Arguments         | Return |
| :----------------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.md) | `int`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATEFROMFILE gID, filePath
    ```
	Opens an image file from the `resources` folder using a relative path and creates a `Graphics`.  
	Unlike images declared in CSV files in the `resources` folder, image files are not locked. (In EM+EE, images specified in CSV are also not locked.)  
	Returns non-zero on success.  
	If a `Graphics` with the specified `gID` already exists, `Graphics` creation fails and this command returns 0 without doing anything.  
	Also returns 0 if the file doesn't exist, cannot be recognized as an image, or the file size is too large.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)
