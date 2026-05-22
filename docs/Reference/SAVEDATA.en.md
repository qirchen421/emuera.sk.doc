---
hide:
  - toc
---

# SAVEDATA

| Function name                                                       | Arguments         | Return |
| :------------------------------------------------------------------ | :---------------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVEDATA`](./SAVEDATA.en.md) | `int`, `string`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	SAVEDATA saveID, saveInfo
    ```
    Saves the current state to the file with the number specified by `saveID`.  
    Since the `SAVEDATA` command does not call `@SAVEINFO`, you cannot add a comment using [`PUTFORM`](./PUTFORM.en.md).  
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
    You can check if data already exists using the [`CHKDATA`](./CHKDATA.en.md) command.  
    Unlike the [`SAVEGAME`](./SAVEGAME.en.md) command, `SAVEDATA` can be called from anywhere in the script.  

!!! info "EM+EE Extension: Save Data Format Enhancement"

    EM+EE extends the `SAVEDATA` save data format, appending EM-specific data after the standard save data:

    - **Map data**: [`MAP`](./MAP_MANAGE.en.md) dictionaries marked with the `SAVEDATA` keyword
    - **Xml data**: XML documents marked with the `SAVEDATA` keyword
    - **DataTable data**: DataTable tables marked with the `SAVEDATA` keyword

    This data is cleared first and then restored from the save file during [`LOADDATA`](./LOADDATA.en.md), ensuring data consistency when switching between saves.

!!! hint "Hint"

    Command only.

### See Also
- [LOADDATA](LOADDATA.en.md)
- [CHKDATA](CHKDATA.en.md)
