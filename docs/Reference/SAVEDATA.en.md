---
hide:
  - toc
---

# SAVEDATA

| Function name                                                       | Arguments         | Return |
| :------------------------------------------------------------------ | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVEDATA`](./SAVEDATA.md) | `int`, `string`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEDATA saveID, saveInfo
    ```
    Saves the current state to the file with the number specified by `saveID`.  
    Since the `SAVEDATA` command does not call `@SAVEINFO`, you cannot add a comment using [`PUTFORM`](./PUTFORM.md).  
    Instead, specify a comment using the second argument `saveInfo`.  
    (From 1.704, string expressions can be used in addition to string variables) Below is an example.  

    ```  { #language-erbapi }
	GETTIME
	STR:0 = %RESULTS:0% {DAY+1}日目
	SAVEDATA 14, STR:0
	SAVEDATA 15, RESULTS:0 + " " + @"{DAY+1}日目"
    ```

		Result (Load screen)
		[13] ----
		[14] 2009年03月28日 00:31:27 1日目
		[15] 2009年03月28日 00:31:27 1日目
		[16] ----

    No overwrite confirmation is performed; please implement it in ERB if needed.  
    You can check if data already exists using the [`CHKDATA`](./CHKDATA.md) command.  
    Unlike the [`SAVEGAME`](./SAVEGAME.md) command, `SAVEDATA` can be called from anywhere in the script.  


!!! hint "Hint"

    Command only.

### See Also
- [LOADDATA](LOADDATA.md)
