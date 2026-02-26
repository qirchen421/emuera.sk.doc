---
hide:
  - toc
---

# EXISTFUNCTION

| Function name | Arguments | Return |
| :--------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
	int EXISTFUNCTION funcName
    ```

	In-expression function that checks if the function specified by the argument exists. Returns 1 for regular functions, 2 for in-expression functions (numeric type), or 3 for in-expression functions (string type).  
	Built-in in-expression functions return 0. System functions return 1 if defined in ERB, otherwise 0.

!!! hint "Hint"

	Available as both a statement and in-expression function.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		PRINTVL EXISTFUNCTION("TEST1")
		PRINTVL EXISTFUNCTION("TEST2")
		PRINTVL EXISTFUNCTION("TEST3")
		PRINTVL EXISTFUNCTION("SYSTEM_TITLE")
		PRINTVL EXISTFUNCTION("SHOP")
		WAIT

	@TEST1

	@TEST2
	#FUNCTION

	@TEST3
	#FUNCTIONS
    ```

    ``` title="Result"
	1
	2
	3
	1
	0
    ```

### Related
- [ENUMFUNC](ENUMFUNC.md)
