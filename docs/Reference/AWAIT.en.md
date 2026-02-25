---
hide:
  - toc
---

# AWAIT

| 関数名                                                     | 引数 | 戻り値 |
| :--------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.md) | `int` | none  |

!!! info "API"

    ```  { #language-erbapi }
	AWAIT milliSecond
    ```
	Temporarily stops ERB execution and performs Windows processing.  
	If an argument is specified, it waits for the specified number of milliseconds.  
	The `AWAIT` command interrupts Emuera's infinite loop warning and prevents Emuera's process from becoming "Not Responding".  
	Use this when performing time-consuming operations.  
	However, since the `AWAIT` command itself takes a considerable amount of execution time, running it too frequently will slow things down.  
	Also, to avoid alarming the user, it is recommended to periodically display the progress of work, for example as shown below:
    ```  { #language-erbapi }
	REDRAW 0
	FOR LCNT, 0, 100
		PRINTSL "Working... " + TOSTR(LCNT) + "% complete"
		AWAIT 
		CLEARLINE 1
		;Time-consuming processing
	NEXT
    ```

!!! hint "Hint"

    Only commands are supported.

### See Also
* [WAIT](WAIT.md)
* [TWAIT](TWAIT.md)
