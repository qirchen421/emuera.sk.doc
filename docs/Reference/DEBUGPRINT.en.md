---
hide:
  - toc
---

# DEBUGPRINT

| Function name                                                                    | Arguments           | Return |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.en.md)      | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.en.md)     | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.en.md)  | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.en.md) | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.en.md)      | none           | none   |

!!! info "API"

    ```  { #language-erbapi }
	DEBUGPRINT string
	DEBUGPRINTL string
	DEBUGPRINTFORM formedString
	DEBUGPRINTFORML formedString
    ```
	`DEBUG` commands only operate when launched in [debug mode](../Emuera/debug.en.md).  
	In non-debug mode, nothing is done; argument parsing is also not performed, so even if there are issues with the <formedString>, no error will occur.  

	`DEBUGPRINT` commands work similarly to [`PRINT`](./PRINT.en.md) and [`PRINTL`](./PRINT.en.md) commands, respectively.  
	The difference is that the output goes to the debug console instead of the main console.  
	Also, it is not affected by the [`SKIPDISP`](./SKIP_RELATE.en.md) command, and n cannot be used.  

	`DEBUGCLEAR` clears all printed content from the debug console.

!!! hint "Hint"

    Only commands are supported.
