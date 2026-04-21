---
hide:
  - toc
---

# DEBUGPRINT 系列

| 函数名                                                                     | 参数           | 返回值 |
| :------------------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.md)       | `string`       | 无     |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.md)      | `string`       | 无     |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.md)   | `formedString` | 无     |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.md)  | `formedString` | 无     |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.md)       | 无             | 无     |

!!! info "API"

    ```  { #language-erbapi }
	DEBUGPRINT string
	DEBUGPRINTL string
	DEBUGPRINTFORM formedString
	DEBUGPRINTFORML formedString
    ```
	`DEBUG` 系列命令仅在以[调试模式](../Emuera/debug.md)启动时才会执行。  
	在非调试模式下，这些命令不会执行任何操作。  
	在非调试模式下，甚至不会对参数进行解析，因此即使<格式化字符串>中存在错误，也不会引发错误。  

	`DEBUGPRINT` 系列命令分别与 [`PRINT`](./PRINT.md) 命令和 [`PRINTL`](./PRINT.md) 命令具有相同的功能。  
	不同之处在于，它们的输出目标是调试控制台，而非主控制台。  
	此外，它们不受 [`SKIPDISP`](./SKIP_RELATE.md) 命令的影响，也无法使用 `n` 参数。

    `DEBUGCLEAR` 会删除调试控制台中的所有 PRINT 内容。

!!! hint "提示"

    仅支持命令形式。