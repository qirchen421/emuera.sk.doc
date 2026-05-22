---
hide:
  - toc
---

# GDISPOSE

| Function name                                                          | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.en.md) | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDISPOSE gID
    ```
	Disposes the `Graphics` with the specified `gID`.  
	Returns non-zero on success.  
	Returns 0 if the `Graphics` with the specified `gID` does not exist (including if already disposed).

!!! hint "Hint"

    Both command and expression function supported.
