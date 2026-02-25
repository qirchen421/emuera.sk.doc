---
hide:
  - toc
---

# PICKUPCHARA

| Function name                                                                 | Arguments            | Return |
| :----------------------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.md) | `int`(, `int`...)  | none   |

!!! info "API"

    ```  { #language-erbapi }
	PICKUPCHARA charaID(, charaID...)
    ```
    Command that deletes all characters except those specified in the arguments.  
    `MASTER:0`, `TARGET:0`, `ASSI:0` etc. are automatically tracked. No manual adjustment is required after the command.  
    Specifying a negative value for the target character results in an error. However, if `MASTER`, `TARGET`, `ASSI`, etc. are set as targets and the result is a negative value, it does not cause an error (it is ignored).

!!! hint "Hint"

    Command only.

### Related
- [DELCHARA](DELCHARA.md)
- [DELALLCHARA](DELALLCHARA.md)
