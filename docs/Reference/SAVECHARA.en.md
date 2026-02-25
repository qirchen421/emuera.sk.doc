---
hide:
  - toc
---

# SAVECHARA

| Function name                                                       | Arguments                        | Return |
| :------------------------------------------------------------------ | :------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.md) | `string`, `string`, `int`(, `int`...) | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVECHARA filename, memo, charaNO{,charaNO2...}
    ```
    Command to save the data of specified characters to a file.  
    The first argument specifies the filename (part of it) to save the data. The actual filename will be `chara_*.dat`.  
    The second argument saves a string as a memo for the save data. It can be read later using the [`CHKCHARADATA`](./CHKCHARADATA.md) function.  
    The third and subsequent arguments specify the registration numbers of characters to save. Any number can be specified, but the same registration number cannot be specified multiple times.  
    If the dat folder does not exist, the system attempts to create it. If creation fails, an error occurs.  
    Also, an error occurs if the first argument is an empty string or contains characters that cannot be used in filenames.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADCHARA](LOADCHARA.md)
- [CHKCHARADATA](CHKCHARADATA.md)
