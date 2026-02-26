---
hide:
  - toc
---

# LOADDATA

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADDATA`](./LOADDATA.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	LOADDATA saveID
    ```
    Loads the data from the file with the number specified by `saveID`.  
    If loading fails, the game ends with an error.  
    Always use the [`CHKDATA`](./CHKDATA.md) command to check if loading is possible before executing.  
    Unlike the [`LOADGAME`](./SAVEGAME.md) command, `LOADDATA` can be called from anywhere in the script.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADDATA](LOADDATA.md)
- [CHKDATA](CHKDATA.md)
