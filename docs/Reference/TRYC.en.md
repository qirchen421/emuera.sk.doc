---
hide:
  - toc
---

# TRYC system

| Function name | Arguments | Return |
| :--------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.md)     | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.md)     | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.md)      | `labelName`                | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.md) | `labelName`                | none   |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.md)        | none                       | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.md)     | none                       | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCCALL functionName(, argument...)
	TRYCJUMP functionName(, argument...)
	TRYCJUMP labelName
	TRYCCALLFORM formedString(, argument...)
	TRYCJUMPFORM formedString(, argument...)
	TRYCGOTOFORM formedString
	CATCH
	ENDCATCH
    ```
	Controls the behavior when a function is not found during TRYC system function calls.  
	If the function exists, it calls the function and executes the lines after TRYC; if it does not exist, it executes the lines after CATCH.  
	Grammatically, this is similar to [`IF～ELSE～ENDIF`](./IF.md) (the difference is that if the function exists, you may omit the processing).  
	Therefore, if entering the `TRYC～CATCH～ENDCATCH` block directly via [`GOTO`](./GOTO.md) or similar commands, execution proceeds normally up to just before `CATCH` and `ENDCATCH`, then jumps to the line after `ENDCATCH`, similar to [`IF～ELSEIF～ELSE～ENDIF`](./IF.md).  
	Also, for entering loop/branch syntax directly via `TRYCGOTO` or `TRYCGOTOFORM`, see [`TRYGOTO`](./TRY.md) and [Loop/Branch Syntax](../Reference/README.en.md#loopbranch-syntax).

    ```  { #language-erbapi }
		TRYCCALL UNKNOWN_FUNC ;Function that does not exist
			;Processing after function execution if function existed (optional; can be omitted and go directly to CATCH)
		CATCH
			;Processing when function does not exist
		ENDCATCH
	```

	Note: Nesting is possible.

!!! hint "Hint"

    Only available as a statement.

### Related
- [TRY system](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
