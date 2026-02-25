---
hide:
  - toc
---

# GSAVE, GLOAD

| Function name                                                        | Arguments      | Return |
| :------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSAVE gID, fileNo
	int GLOAD gID, fileNo
    ```
	`GSAVE` outputs and saves the image of the `Graphics` with the specified `gID` as a `png` file with the number specified by `fileNo` as the filename.  
	Returns non-zero on success.  

	`GLOAD` opens an image with the number specified by `fileNo` as the filename and creates a `Graphics`.  
	In terms of operation, it is almost the same as the [`GCREATEFROMFILE`](./GCREATEFROMFILE.md) command, but it creates from images saved by the `GSAVE` command rather than from images in the `resources` folder.  
	Returns non-zero on success.  
	If a `Graphics` with the specified `gID` already exists, `Graphics` creation fails and this command returns 0 without doing anything.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.md)
