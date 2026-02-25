---
hide:
  - toc
---

# DEBUGPRINT

| 関数名                                                                    | 引数           | 戻り値 |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.md)      | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.md)     | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.md)  | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.md) | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.md)      | none           | none   |

!!! info "API"

    ```  { #language-erbapi }
	DEBUGPRINT string
	DEBUGPRINTL string
	DEBUGPRINTFORM formedString
	DEBUGPRINTFORML formedString
    ```
	`DEBUG` commands only operate when launched in [debug mode](../Emuera/debug.md).  
	In non-debug mode, nothing is done; argument parsing is also not performed, so even if there are issues with the <formedString>, no error will occur.  

	`DEBUGPRINT` commands work similarly to [`PRINT`](./PRINT.md) and [`PRINTL`](./PRINT.md) commands, respectively.  
	The difference is that the output goes to the debug console instead of the main console.  
	Also, it is not affected by the [`SKIPDISP`](./SKIP_RELATE.md) command, and n cannot be used.  

	`DEBUGCLEAR` clears all printed content from the debug console.

!!! hint "Hint"

    Only commands are supported.
