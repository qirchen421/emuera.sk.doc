---
hide:
  - toc
---

# GETLINESTR

| Function name                                                               | Arguments | Return   |
| :-------------------------------------------------------------------------- | :-------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.en.md) | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string GETLINESTR pattern
    ```
	Returns the string that would be displayed when passed to [`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.en.md) or [`DRAWLINEFORM`](./CUSTOMDRAWLINE.en.md).
	The length of the string returned by this command or expression function is not guaranteed to correspond to the "string length that can be displayed on one line".

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [DRAWLINE](DRAWLINE.en.md)
- [CUSTOMDRAWLINE](CUSTOMDRAWLINE.en.md)
