---
hide:
  - toc
---

# SKIP functions

| Function name                                                           | Arguments | Return |
| :----------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.en.md)    | `int`| none   |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.en.md)       | none | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.en.md)    | none | none   |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.en.md)       | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.en.md)    | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.en.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	SKIPDISP bool
	NOSKIP
	ENDNOSKIP
	int ISSKIP
	int MOUSESKIP
	int MESSKIP
    ```
	Commands related to screen output control such as PRINT and control commands like WAIT, TWAIT, etc.
	
	- `SKIPDISP` `<value>`
		- Argument: `0` = Do not ignore
		-         : Non-zero = Ignore
		- Effect: When this flag is set, output from [`PRINT`](./PRINT.en.md) etc. will not occur at all
			- Also, if [`INPUT` or `INPUTS`](./INPUT.en.md) is reached while this flag is set,
			- An error will occur with a warning message and solution because there is no way for the user to know what to do, and skipping could lead to infinite loops

	In current general dialogue implementations, when dialogue can be hidden,  
	the command results or behavior may differ between displayed and hidden states.  
	By setting this flag and calling the dialogue, the display will not occur but other processing will,  
	so the same behavior can be expected for both display/hide.  
	If [`INPUT/INPUTS`](./INPUT.en.md) overlaps, you can wrap it with `NOSKIP~ENDNOSKIP`,  
	or set `SKIPDISP 0`, then after `INPUT` processing, set `SKIPDISP 1` again (the former is recommended).  
	By the way, you can check if the skip flag is currently set with `ISSKIP`.  
	Since ver1.808, this also works when placed immediately after an [`SIF`](./IF.en.md) statement. Note that using `SKIPDISP` resets `RESULT:0` to `0` regardless of the argument - this is by design.
	
	`NOSKIP~ENDNOSKIP` specifies a range to ignore the skip display flag.  
	The area between these two will be displayed even when `SKIPDISP 1` is set.  
	This is mainly useful when `INPUT` is needed.  
	Also, this command does not affect the `SKIPDISP` state,  
	so in code where `SKIPDISP` flag may be set (such as dialogue-related code with display/hide),  
	using this ensures that places that absolutely must be displayed are properly displayed.
	
	`ISSKIP` returns `1` in `RESULT:0` if the `SKIPDISP` flag is non-zero (ignoring `PRINT` etc. output), otherwise returns `0`.

	`MOUSESKIP` was integrated into `MESSKIP` in Emuera1.810.  
	Please use `MESSKIP`.  
	This function used to handle the following:

		If right-click is pressed and WAIT skip state is active, returns 1; otherwise returns 0.
		Returns 0 during macro processing skip.
		If macro processing skip and right-click conflict, macro takes priority and returns 0.
		Currently, it returns 1 without distinguishing between Esc key skip and right-click skip.
	
	`MESSKIP` returns `1` if the [`WAIT`](./WAIT.en.md) skip state is active, otherwise returns `0`.

!!! hint "Hint"

    `ISSKIP`, `MOUSESKIP`, and `MESSKIP` are supported as expression functions.
