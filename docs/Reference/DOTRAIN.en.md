---
hide:
  - toc
---

# DOTRAIN

| Function name                                                   | Arguments | Return |
| :------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.md) | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	DOTRAIN trainNo
    ```
	Command that forces `TRAIN` execution.  
	Can only be used inside `@EVENTTRAIN`, `@SHOW_STATUS`, `@SHOW_USERCOM`, `@USERCOM`, `@EVENTCOMEND`, and functions called from there.  
	The number specified in the argument corresponds to the number defined in `train.csv`.  
	The behavior is the same as when a command is selected: it initializes variables like `UP` and `DOWN`, assigns the argument to `SELECTCOM`, calls `@EVENTCOM`, calls `@COM{SELECTCOM}`, and so on.

	If the argument is less than 0 or greater than or equal to the number of elements in `TRAINNAME`, an error occurs, but no other checks are performed.  
	Even if the argument is a number not defined in `train.csv`, it will attempt to force execution.  
	Also, it does not call `@COM_ABLE` and is forcibly executed.  
	If necessary, perform checks like the following before `DOTRAIN`:

    ```  { #language-erbapi }
	SIF ( X < 0 || X >= VARSIZE("TRAINNAME") || TRAINNAME:X == "" )
		RETURN
	RESULT = 1
	TRYCALLFORM COM_ABLE{X}
	SIF RESULT == 0
		RETURN
	DOTRAIN X
    ```
	Conversely, you can implement your own `TRAIN` commands using `DOTRAIN`.  
	For example, leave `train.csv` empty, display your own in `@SHOW_USERCOM`, and perform `DOTRAIN` in `@USERCOM`.  
	Alternatively, instead of leaving `train.csv` empty, you can make all `@COM_ABLE` return 0.  
	Another method is to delete all `@COM_ABLE` and set [`COM_ABLE default value` in `_replace.csv`](../Emuera/replace.en.md#com_able-default-value) to 0.  
	Note that if `DOTRAIN` is executed during `CALLTRAIN` processing, the remaining `CALLTRAIN` is invalidated.

!!! hint "Hint"

    Commands only.

### See Also
- [CALLTRAIN](CALLTRAIN.md)
