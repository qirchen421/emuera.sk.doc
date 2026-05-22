---
hide:
  - toc
---

# EXISTCSV

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.en.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTCSV charaNO
    ```
    Checks if the corresponding character is defined and assigns the result to `RESULT:0` or returns it.  
    Returns `1` if defined, `0` if not.  
    Can be used to check whether `ADDCHARA no` will execute without error.

!!! hint "Hint"

    Both command and expression function forms are available.
