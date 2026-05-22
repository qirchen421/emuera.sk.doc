---
hide:
  - toc
---

# CALLTRAIN

| Function name                                                       | Arguments | Return |
| :----------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.en.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	CALLTRAIN comCount
    ```
	Sequential command execution command.  
	Pre-assign command numbers to `SELECTCOM:(1～)`, then execute with the number of commands to execute as the argument.

    ```  { #language-erbapi }
	SELECTCOM:1 = XXX
	SELECTCOM:2 = YYY
	　　　·
	　　　·
	　　　·
	SELECTCOM:N = ZZZ

	CALLTRAIN (number of commands set)
    ```
	Like normal command execution, it calls `SHOW_STATUS` and `SHOW_USERCOM`, but the display of `TRAIN` commands and `USERCOM` is not shown.  
	If you really want to display `USERCOM`, you can use [`NOSKIP～ENDNOSKIP`](./SKIP_RELATE.en.md).  
	After automatic execution by `CALLTRAIN` ends, the system function `@CALLTRAINEND` is called.  
	However, note that `@CALLTRAINEND` is not an event function and cannot be overloaded.  
	The command numbers used for specifying commands are the values specified in `TRAIN.CSV`, not the in-game values.

!!! hint "Hint"

    Commands only.

### See Also
* [DOTRAIN](DOTRAIN.en.md)
* [STOPCALLTRAIN](STOPCALLTRAIN.en.md)
