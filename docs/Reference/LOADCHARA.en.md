---
hide:
  - toc
---

# LOADCHARA

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	LOADCHARA filename
    ```
    The first argument specifies the filename (part of it) to load the data. The actual filename will be `chara_*.dat`.  
    Assigns `0` to `RESULT:0` if reading fails, and `1` if successful.  
    You should check the file's suitability using the [`CHKCHARADATA`](./CHKCHARADATA.md) function before `LOADCHARA`.  
    `LOADCHARA` registers as many new characters as there are saved characters.  
    Therefore, it does not affect existing registered characters.  
    To know how many characters were added, compare `CHARANUM` before and after loading.  


!!! hint "Hint"

    Command only.

### See Also
- [SAVECHARA](SAVECHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)
