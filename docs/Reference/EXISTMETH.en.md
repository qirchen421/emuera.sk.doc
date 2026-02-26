---
hide:
  - toc
---

# EXISTMETH

| Function name | Arguments | Return |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.md)  | `string`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTMETH functionName
    ```
	In-expression function that checks if an in-expression function exists. Returns 1 for `#FUNCTION`, 2 for `#FUNCTIONS`, or 0 if not found.

!!! hint "Hint"

	Available as both a statement and in-expression function.

### Related
- [EXISTFUNCTION](EXISTFUNCTION.md)
- [GETMETH,GETMETHS](GETMETH.md)
