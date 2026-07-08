---
hide:
  - toc
---

# DISABLE_INPUT_MACRO ![](../assets/images/IconSK.webp)

| Function name                                                         | Arguments     | Return   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`DISABLE_INPUT_MACRO`](./DISABLE_INPUT_MACRO.en.md) | none | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int DISABLE_INPUT_MACRO
    ```
    Disables macro parsing for all input (textbox + SEQUENCEINPUT). After calling, input is passed literally as a single segment, without parsing `(...)` repeat macros, without `\n` splitting, and without `\e` MesSkip processing.

    - Default state is macro parsing enabled (matches original PressEnterKey behavior)
    - Can be restored to default behavior with `ENABLE_INPUT_MACRO`
    - Return value is always `0`

!!! warning "Note"

    Because `CanRestructure = false`, it is not subject to constant folding.

### Related items
- [ENABLE_INPUT_MACRO](ENABLE_INPUT_MACRO.en.md)
- [SEQUENCEINPUT](SEQUENCEINPUT.en.md)
- [INPUT](INPUT.en.md)
