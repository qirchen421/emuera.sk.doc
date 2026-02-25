---
hide:
  - toc
---

# PRINTSINGLE Related

| Function name                                                                                                         | Arguments | Return   |
| :--------------------------------------------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(|V|S|FORM|FORMS)(|K|D)</code>](./PRINTSINGLE.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTSINGLEV(|K|D) integerVariable
    PRINTSINGLES(|K|D) stringVariable
    PRINTSINGLEFORM(|K|D) formedString
    PRINTSINGLEFORMS(|K|D) string
    ```
    The `PRINTSINGLE` family is almost the same as `PRINTL`, but `PRINTSINGLE` does not wrap text and always displays on a single line.
    Characters beyond the screen edge are not drawn.
    Since newline is automatically added, there are no `(|L|W)` keywords.
    Other keywords work the same as the [PRINT](./PRINT.md) family.

!!! hint "Hint"

    Command only.

### Related Items
- [PRINT](PRINT.md)
