---
hide:
  - toc
---

# MONEYSTR

| Function name                                                       | Arguments         | Return   |
| :------------------------------------------------------------------ | :---------------- | :--------|
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.md)  | `int`, `option`  | `string`|

!!! info "API"

    ```  { #language-erbapi }
	string MONEYSTR
    ```
	Returns in `RESULTS:0` a string with the [configured money unit](../Emuera/replace.md#_1) appended to the number given as the argument.  
	Unit prefix/suffix is automatically handled.  
	The second argument is the conversion format specifier for numeric string conversion, similar to the [`TOSTR`](./TOSTR.md) command.

!!! hint "Hint"

    Command and expression function both supported.
