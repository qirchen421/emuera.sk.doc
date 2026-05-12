---
hide:
  - toc
---

# CALLF, CALLFORMF

| Function name | Arguments | Return |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.md)     | `functionName` | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.md) | `formedString` | `void`¹ |

!!! info "API"

    ```  { #language-erbapi }
	CALLF functionName
	CALLFORMF formedString
    ```
	From the private modification update history:

		Implemented CALLF and CALLFORMF commands that call in-expression functions while ignoring the return value
		Format: CALLF functionName, argument1, ...
			(Although it's an in-expression function, call it with regular function argument syntax)
		Behavior: Calls in-expression functions as regular functions; the return value is discarded
		I wanted to make a pseudo-SETTER, but now I'm regretting it

	Of course, RESULT and RESULTS remain unchanged unless the called in-expression function modifies them within itself.  
	Related commands in EM+EE include [`TRYCALLF`](./TRYCALLF.md) and [`TRYCALLFORMF`](./TRYCALLFORMF.md).

!!! hint "Hint"

    Only available as a statement.

### Related
* [TRYCALLF](TRYCALLF.md)
* [TRYCALLFORMF](TRYCALLFORMF.md)
* [EXISTFUNCTION](EXISTFUNCTION.md)
* [In-expression functions](../Emuera/in_expression_function.md)
