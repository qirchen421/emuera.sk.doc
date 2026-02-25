---
hide:
  - toc
---

# TRYCALLF

| Function name | Arguments | Return |
| :----------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	TRYCALLF funcName
    ```

	The TRY version of `CALLF`. Does not throw an error even if the called function does not exist; however, like `CALLF`, the return value of `RETURNF` is discarded.

!!! hint "Hint"

	Only available as a statement.

!!! example "Example"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		TRYCALLF NULL
		TRYCALLF TEST
		WAIT

	@TEST
	#FUNCTION

		PRINT Called "TEST" function.
		RETURNF 0
	```

	``` title="Result"
	Called "TEST" function.
	```

### Related
- [CALLF](CALLF.md)
- [TRYCALLFORMF](TRYCALLFORMF.md)
