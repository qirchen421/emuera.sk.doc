---
hide:
  - toc
---

# OUTPUTLOG

| Function name                                                                                           | Arguments    | Return |
| :------------------------------------------------------------------------------------------------------ | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.en.md) | (`string`)   | none   |

!!! info "API"

    ```  { #language-erbapi }
	OUTPUTLOG (filePath)
    ```
    The log output command OUTPUTLOG. Don't overuse it as it can shorten the lifespan of your disk.  
    Note that the log encoding is Unicode.  
    In EM+EE, specifying an argument allows output to that filename.extension. Literals work the same as `PRINTS`.  
    In `v5fix`, a vulnerability that allowed specifying parent directories was fixed. Subdirectories are still allowed.  


!!! hint "Hint"

    Command only.

### See Also
- [SAVETEXT](SAVETEXT.en.md)
