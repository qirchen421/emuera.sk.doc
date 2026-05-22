---
hide:
  - toc
---

# GETTIME

| Function name                                                       | Arguments | Return          |
| :------------------------------------------------------------------ | :-------- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.en.md)     | none      | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.en.md)   | none      | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.en.md)  | none      | `string`        |

!!! info "API"

    ```  { #language-erbapi }
	GETTIME
	int GETTIME
	string GETTIMES
    ```
    Assigns information about the current date and time of the PC to `RESULT:0` and `RESULTS:0`.  
    If the current date and time is March 28, 2009 13:05:23.678, then `RESULT:0` is assigned `20090328130523678`.  
    `RESULTS:0` is assigned `2009/03/28 13:05:23`.  
    `RESULTS:0` is primarily intended for use in save data comments.  
    If you want to use a custom format for the date, please decompose `RESULT:0` and use it.  
    Note that the precision of `RESULT:0` depends on the execution environment, but is around several tens of milliseconds.  
    (If only a few milliseconds have passed, the same value may be returned.)  
    Please be careful if measuring performance is your goal.

    As expression functions, `GETTIME()` and `GETTIMES()` return the values that would be assigned to `RESULT:0` and `RESULTS:0` when the `GETTIME` command is executed.  


!!! hint "Hint"

    Command and expression function both supported.

### See Also
- [GETSECOND](GETSECOND.en.md)
- [GETMILLISECOND](GETMILLISECOND.en.md)
