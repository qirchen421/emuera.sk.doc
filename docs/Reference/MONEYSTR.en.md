---
hide:
  - toc
---

# MONEYSTR

| Function name                                                       | Arguments         | Return   |
| :------------------------------------------------------------------ | :---------------- | :--------|
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.en.md)  | `int`, `option`  | `string`|

!!! info "API"

    ```  { #language-erbapi }
	string MONEYSTR
    ```
	Returns in `RESULTS:0` a string with the [configured money unit](../Emuera/replace.en.md#money-unit) appended to the number given as the argument.  
	Unit prefix/suffix is automatically handled.  
	The second argument is the conversion format specifier for numeric string conversion, similar to the [`TOSTR`](./TOSTR.en.md) command.

!!! hint "Hint"

    Command and expression function both supported.
