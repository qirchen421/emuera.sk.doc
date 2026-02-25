---
hide:
  - toc
---

# LINEISEMPTY

| Function name                                                           | Arguments | Return |
| :----------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int LINEISEMPTY
    ```
	Command to determine whether the line currently being printed with [`PRINT`](./PRINT.md) is empty.  
	At the point this command is executed, if executing `PRINTL` would result in just an empty line, it returns `1` in `RESULT:0`; otherwise, it returns `0`.  
	When using `PRINTC` to sequentially write buttons based on conditions, using this command at the end allows you to determine whether there are any buttons to display, and if not, display something specific instead.

!!! hint "Hint"

    Command and expression function both supported.
