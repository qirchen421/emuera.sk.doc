---
hide:
  - toc
---

# STRFORM

| Function name                                                   | Arguments | Return   |
| :------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.en.md) | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string STRFORM formedString
    ```
	Treats the given string as a formatted string similar to PRINTFORM, and returns the expanded string.  


!!! hint "Hint"

    Supported as both command and expression function.

---

# STRFORMCHECK ![](../assets/images/IconSK.webp)

| Function name | Arguments | Return |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`STRFORMCHECK`](./STRFORM.en.md#strformcheck) | `string` | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int STRFORMCHECK formedString
    ```
    Treats the given string as a formatted string similar to STRFORM, and checks whether it can be expanded. Returns `1` if expandable, `0` if not.

    - Syntax errors (e.g., unclosed braces) → `0`
    - Runtime evaluation failures (e.g., non-existent variables) → `0`
    - Uses the same parser as STRFORM, ensuring semantic consistency

!!! warning "Note"

    Since `CanRestructure = false`, this function is not a candidate for constant folding.

### See Also
- [GETVAR, GETVARS](GETSETVAR.en.md)
- [GETMETH, GETMETHS](GETMETH.en.md)
