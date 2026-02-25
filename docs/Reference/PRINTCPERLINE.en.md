---
hide:
  - toc
---

# PRINTCPERLINE

| Function name                                                             | Arguments | Return |
| :------------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int PRINTCPERLINE
    ```
	Returns the number specified by the [config `PRINTCを並べる数`](../Emuera/config.md#printc) in `RESULT:0`. The default is 3.  
	This is equivalent to `RESULT = GETCONFIG("PRINTCを並べる数")`.


!!! hint "Hint"

    Command and expression function both supported.

### Related
- [PRINTCLENGTH](PRINTCLENGTH.md)
