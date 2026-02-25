---
hide:
  - toc
---

# PRINTPLAIN

| Function name                                                                                  | Arguments | Return   |
| :--------------------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(|FORM)</code>](./PRINTPLAIN.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTPLAIN(|FORM) string
    ```
    Outputs the argument string as plain text. Even if there are button strings (like numbers), they will not be converted to buttons.
    The keyword in parentheses specifies the argument type.

    - None - <string>
    - `FORM` - <formed string>

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)
