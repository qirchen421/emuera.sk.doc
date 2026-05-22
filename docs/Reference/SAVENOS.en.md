---
hide:
  - toc
---

# SAVENOS

| Function name                                                     | Arguments | Return |
| :---------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.en.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVENOS variable
    ```
    As a command, retrieves the number specified in the config [`Save data count per page`](../Emuera/config.en.md#number-of-save-data-to-display) and assigns it to the specified numeric variable. The default is `20`.  
    Numeric variable cannot be omitted.

    As an expression function, returns the number specified in the config `Save data count per page`. The default is 20.  
    It is synonymous with `GETCONFIG("Save data count per page")`  


!!! hint "Hint"

    Command and expression function both supported.
