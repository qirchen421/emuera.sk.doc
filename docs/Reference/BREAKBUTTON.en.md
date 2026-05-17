---
hide:
  - toc
---

# BREAKBUTTON

| Function Name                                                   | Arguments | Return Value |
| :------------------------------------------------------------- | :-------- | :----------- |
| ![](../assets/images/IconEE.webp)[`BREAKBUTTON`](./BREAKBUTTON.md) | `()`      | None         |

!!! info "API"

    ``` { #language-erbapi }
	BREAKBUTTON
    ```

    Force updates the button state on the screen.  
    Normally, buttonization is performed automatically every frame, but using this command allows immediate button state updates.  
    Particularly useful when you need to immediately enable buttons after dynamically changing text.

!!! hint "Hint"

    This is a command and cannot be used as an expression function.  
    No arguments.

### Related Items
* [INPUT](INPUT.md)