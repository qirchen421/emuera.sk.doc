---
hide:
  - toc
---

# TRYCALLFORMF

| Function name | Arguments | Return |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md) | `string` | `void`¹ |

!!! info "API"

	``` { #language-erbapi }
	TRYCALLFORMF funcName
    ```

	The TRY version of `CALLFORMF`. Does not throw an error even if the called function does not exist; however, like `CALLFORMF`, the return value of `RETURNF` is discarded.

!!! hint "Hint"

	Only available as a statement.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		REPEAT 5
			TRYCALLFORMF TEST{COUNT}
			SIF !LINEISEMPTY()
				PRINTL 
		REND
		WAIT

	@TEST1
	#FUNCTION

		PRINT Called "TEST1" function.
		RETURNF 0

	@TEST3
	#FUNCTIONS

		PRINT Called "TEST3" function.
		RETURNF "HOGE"
	```

	``` title="Result"
	Called "TEST1" function.
	Called "TEST3" function.
	```

### Related
- [CALLF](CALLF.md)
- [TRYCALLF](TRYCALLF.md)
