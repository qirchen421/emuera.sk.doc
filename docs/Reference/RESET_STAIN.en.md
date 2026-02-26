---
hide:
  - toc
---

# RESET_STAIN

| Function name                                                               | Arguments | Return |
| :------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.md) | `int`     | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESET_STAIN charaID
    ```
	Command to initialize the `STAIN` of the character specified by the first argument. The initial value is the same as the value assigned when [`BEGIN TRAIN` is called, and can be specified in [`_replace.csv>Initial stain value`](../Emuera/replace.md#_5).

!!! hint "Hint"

    Command only.

### Related Items
- [_replace.csv>Initial stain value](../Emuera/replace.md#_5)
