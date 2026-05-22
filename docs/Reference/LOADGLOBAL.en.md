---
hide:
  - toc
---

# LOADGLOBAL

| Function name                                                         | Arguments | Return |
| :-------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.en.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	LOADGLOBAL
    ```
    Loads `GLOBAL` and `GLOBALS`. Save destination is `global.sav`.  
    Does not error even if loading fails.  
    Assigns `1` to `RESULT` on success, and `0` on failure.  
    Like regular save data, files with incorrect [`code` and `version`](../Emuera/variables.en.md#gamebasecsv-variables) set in `gamebase.csv` cannot be loaded.  
    See the variables section for details on the `GLOBAL` variable.  


!!! hint "Hint"

    Command only.

### See Also
- [SAVEGLOBAL](SAVEGLOBAL.en.md)
- [Variables shared between save data](../Emuera/variables.en.md#variables-shared-between-save-data)
