---
hide:
  - toc
---

# TRYCALLFORM, TRYJUMPFORM, TRYGOTOFORM

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.en.md) | `formedString`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.en.md) | `formedString`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.en.md) | `formedString`             | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLFORM formedString(, argument...)
	TRYJUMPFORM formedString(, argument...)
	TRYGOTOFORM formedString
    ```
	Same as [`JUMP`](./JUMP.en.md), [`CALL`](./CALL.en.md), and [`GOTO`](./GOTO.en.md), but allows specifying function names in the same format as [`PRINTFORM`](./PRINT.en.md), and does not throw an error even if the function does not exist.  
	`TRYJUMPFORM` and `TRYCALLFORM` can accept arguments. See the [function argument specification](../Emuera/function.en.md#argument-specification-in-user-defined-functions) section for details.  
	Note: For entering loop/branch syntax directly via `TRYGOTOFORM`, see [`TRYGOTO`](./TRY.en.md), [Loop/Branch Syntax](../Reference/README.en.md#flow-control), and the [TRYC system](./TRYC.en.md).

!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGE
		HOGES = AAA

		TRYCALLFORM %HOGES%
		TRYCALLFORM %HOGES%BBB
		TRYJUMPFORM %"C"*3%

	@AAA
		PRINTL AAA

	@BBB
		PRINTL BBB

	@CCC
		PRINTL CCC
		WAIT
    ``` 
    ``` title="Result"
	AAA
	CCC
    ```

### Related
- [TRY system](TRY.en.md)
- [CALL](CALL.en.md)
- [JUMP](JUMP.en.md)
- [GOTO](GOTO.en.md)
