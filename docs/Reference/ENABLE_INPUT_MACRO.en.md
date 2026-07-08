---
hide:
  - toc
---

# ENABLE_INPUT_MACRO ![](../assets/images/IconSK.webp)

| Function name                                                         | Arguments     | Return   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`ENABLE_INPUT_MACRO`](./ENABLE_INPUT_MACRO.en.md) | none | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int ENABLE_INPUT_MACRO
    ```
    Restores input macro parsing (default behavior). After calling `DISABLE_INPUT_MACRO`, calling this function restores the original PressEnterKey macro parsing, `\n` splitting, and `\e` MesSkip processing.

    - Return value is always `0`

!!! warning "Note"

    Because `CanRestructure = false`, it is not subject to constant folding.

### Related items
- [DISABLE_INPUT_MACRO](DISABLE_INPUT_MACRO.en.md)
- [SEQUENCEINPUT](SEQUENCEINPUT.en.md)
- [INPUT](INPUT.en.md)
