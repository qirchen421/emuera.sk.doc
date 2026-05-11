---
hide:
  - toc
---

# CALL

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.md) | `functionName` | `void` |

!!! info "API"

	``` { #language-erbapi }
	CALL funcName
	```

	Calls a function defined with a string starting with `@`  
	When the function reaches its end or executes [`RETURN`](./RETURN.md), the function ends and control returns to the line that executed `CALL`  
	If `RETURN` is executed, its argument is stored in `RESULT`; if the function reaches its end, `0` is stored in `RESULT`

!!! hint "Hint"

	Only available as a statement.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		CALL AAA
		PRINTFORML {RESULT}
		CALL BBB
		PRINTFORML {RESULT}
		WAIT
	
	@AAA
		PRINTL Here is @AAA
		RETURN 123
	
	@BBB
		PRINTL Here is @BBB
	```

	``` title="Result"
	Here is @AAA
	123
	Here is @BBB
	0
	```

### Related
- [CALLFORM](FORM.md)
- [TRYCALLFORM](TRYFORM.md)
- [EXISTFUNCTION](EXISTFUNCTION.md)
- [CALLSTR](CALLSTR.en.md)

### ![](../assets/images/IconSK.webp)Skia Version Changes

!!! info "Parameter Safety Optimization"

    The Skia version improves the safety of parameter handling in function calls:

    - **Silent discarding of extra parameters**: In the original version, passing more arguments than the function definition's parameter count causes an error. The Skia version silently ignores extra arguments, maintaining consistency with the [CALLSTR](CALLSTR.en.md) series runtime parsing behavior.
    - **TRY series safety net**: In the original version, `ConvertArg` failure causes a crash even in `TRYCALL`. The Skia version uses the `isTry` flag to safely jump to the `CATCH` clause.
