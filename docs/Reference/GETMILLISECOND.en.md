---
hide:
  - toc
---

# GETMILLISECOND

| Function name                                                               | Arguments | Return |
| :-------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETMILLISECOND
    ```
    Gets the elapsed time in milliseconds since January 1, 1 AD.  
    Since it can be added/subtracted as-is, it is more suitable than GETTIME for measuring elapsed time, etc.  
    Note that the precision of the return value depends on the execution environment, but is around several tens of milliseconds.  
    (If only a few milliseconds have passed, the same value may be returned.)  
    Please be careful if measuring performance is your goal.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [GETSECOND](GETSECOND.md)
- [GETTIME](GETTIME.md)
