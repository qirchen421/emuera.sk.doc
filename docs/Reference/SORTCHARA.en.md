---
hide:
  - toc
---

# SORTCHARA

| Function name                                                     | Arguments                 | Return |
| :--------------------------------------------------------------- | :---------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.md) | `charaVariable`, `keyword` | none   |

!!! info "API"

    ```  { #language-erbapi }
	SORTCHARA charaVariable, FORWARDorBACK
    ```
    Sorts the character list by any key.  
    Sort keys can be string variables like `NAME`, integer variables like `NO`, or integer array variables like `CFLAG`.  
    `charaVariable` can be omitted, in which case sorting is done by character number (`NO:XX`).  
    If `FORWARD` is specified, sorting is ascending; if `BACK` is specified, sorting is descending. If omitted, sorting is ascending.  
    `MASTER` is not included in the sort.  
    Also, `TARGET:0` and `ASSI:0` are automatically tracked, so manual adjustment is not required after use.  
    However, variants that use `TARGET:1` etc. require manually tracking these.

    ```  { #language-erbapi }
	;Sort by NO in ascending order
	SORTCHARA 
	;Sort by NO in descending order
	SORTCHARA BACK
	;Sort by CFLAG:2 in ascending order
	SORTCHARA CFLAG:2
	;Sort by NAME in descending order
	SORTCHARA NAME, BACK
    ```

    Note that even if `TARGET == -1`, no error occurs because values like `CFLAG:2` are not actually referenced.

!!! hint "Hint"

    Command only.

### Related
- [SWAPCHARA](SWAPCHARA.md)
