---
hide:
  - toc
---

# GROUPMATCH, NOSAMES, ALLSAMES

| Function name                                                         | Arguments          | Return |
| :------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.en.md) | `any`, `any`...   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.en.md)    | `any`, `any`...   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.en.md)   | `any`, `any`...   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GROUPMATCH key, value...
	int NOSAMES value, value...
	int ALLSAMES value, value...
    ```
	All arguments must be the same type.  
	`GROUPMATCH` returns the total number of matches between the value specified in the first argument and the values specified in the subsequent arguments.  
	`NOSAMES` returns `1` if all specified values are different, otherwise returns `0`.  
	`ALLSAMES` returns `1` if all specified values are the same, otherwise returns `0`.


!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [MATCH](MATCH.en.md)
