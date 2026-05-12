---
hide:
  - toc
---

# TRYLIST system

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.md) | none                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.md) | none                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.md) | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.md)        | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.md)     | none                       | none   |

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
	Note: For entering loop/branch syntax directly via `TRYGOTOLIST`, see [`TRYGOTO`](./TRY.md), [Loop/Branch Syntax](../Reference/README.en.md#loopbranch-syntax), and the [TRYC system](./TRYC.md).  
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
- [TRY system](TRY.md)
- [TRYC system](TRYC.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
