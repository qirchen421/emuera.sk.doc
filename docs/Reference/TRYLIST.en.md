---
hide:
  - toc
---

# TRYLIST system

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.en.md) | none                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.en.md) | none                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.en.md) | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.en.md)        | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.en.md)     | none                       | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLLIST
	TRYJUMPLIST
	TRYGOTOLIST
	FUNC functionName(, argument...)
	ENDFUNC
    ```
	A syntax to specify multiple functions (labels) and call only the first one found.  
	No statements other than the above syntax can be written within `TRYLIST～ENDFUNC`.  
	Note: For entering loop/branch syntax directly via `TRYGOTOLIST`, see [`TRYGOTO`](./TRY.en.md), [Loop/Branch Syntax](../Reference/README.en.md#flow-control), and the [TRYC system](./TRYC.en.md).  
	Used as follows:

    ```  { #language-erbapi }
	TRYCALLLIST
		FUNC function1
		FUNC function2
	ENDFUNC
    ```

	Attempts to call the function specified by `FUNC` in order; if successful, proceeds to `ENDFUNC` after calling; if failed, moves to the next `FUNC` (or `ENDFUNC`).  
	This is equivalent to:

    ```  { #language-erbapi }
	TRYCCALL function1
	CATCH
		TRYCCALL function2
		CATCH
		ENDCATCH
	ENDCATCH
    ```

!!! hint "Hint"

    Only available as a statement.

### Related
- [TRY system](TRY.en.md)
- [TRYC system](TRYC.en.md)
- [CALL](CALL.en.md)
- [JUMP](JUMP.en.md)
- [GOTO](GOTO.en.md)
