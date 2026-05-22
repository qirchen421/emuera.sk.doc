---
hide:
  - toc
---

# LOADDATA

| Function name                                                       | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADDATA`](./LOADDATA.en.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	LOADDATA saveID
    ```
    Loads the data from the file with the number specified by `saveID`.  
    If loading fails, the game ends with an error.  
    Always use the [`CHKDATA`](./CHKDATA.en.md) command to check if loading is possible before executing.  
    Unlike the [`LOADGAME`](./SAVEGAME.en.md) command, `LOADDATA` can be called from anywhere in the script.  

!!! info "EM+EE Extension: Save Data Format Enhancement"

    EM+EE extends the `LOADDATA` loading behavior, clearing current EM-specific data from memory before loading the standard save data:

    - **Map data**: [`MAP`](./MAP_MANAGE.en.md) dictionaries marked with the `SAVEDATA` keyword are cleared
    - **Xml data**: XML documents marked with the `SAVEDATA` keyword are removed
    - **DataTable data**: DataTable tables marked with the `SAVEDATA` keyword are cleared

    After clearing, the corresponding EM-specific data is restored from the save file, ensuring data consistency when switching between saves.  
    This means that if the save file does not contain certain EM-specific data, it will not exist after loading (the pre-load values are not preserved).

!!! hint "Hint"

    Command only.

### See Also
- [SAVEDATA](SAVEDATA.en.md)
- [CHKDATA](CHKDATA.en.md)
