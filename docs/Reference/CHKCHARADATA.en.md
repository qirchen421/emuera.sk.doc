---
hide:
  - toc
---

# CHKCHARADATA

| Function name                                                         | Arguments | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.en.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CHKCHARADATA filename
    ```
    Returns information about the file with the filename indicated by `chara_*.dat` in the dat folder.  
    Returns 0 if loadable, and non-zero if unable to load for some reason.  
    Also, when loadable, assigns the save data memo to `RESULTS:0`, and when not loadable, assigns the reason to `RESULTS:0`.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [SAVECHARA](SAVECHARA.en.md)
- [LOADCHARA](LOADCHARA.en.md)
