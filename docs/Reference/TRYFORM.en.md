---
hide:
  - toc
---

# TRYCALLFORM, TRYJUMPFORM, TRYGOTOFORM

| Function name | Arguments | Return |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.md) | `formedString`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.md) | `formedString`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.md) | `formedString`             | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLFORM formedString(, argument...)
	TRYJUMPFORM formedString(, argument...)
	TRYGOTOFORM formedString
    ```
	Same as [`JUMP`](./JUMP.md), [`CALL`](./CALL.md), and [`GOTO`](./GOTO.md), but allows specifying function names in the same format as [`PRINTFORM`](./PRINT.md), and does not throw an error even if the function does not exist.  
	`TRYJUMPFORM` and `TRYCALLFORM` can accept arguments. See the [function argument specification](../Emuera/function.en.md#argument-specification-in-user-defined-functions) section for details.  
	Note: For entering loop/branch syntax directly via `TRYGOTOFORM`, see [`TRYGOTO`](./TRY.md), [Loop/Branch Syntax](../Reference/README.en.md#loopbranch-syntax), and the [TRYC system](./TRYC.md).

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
- [TRY system](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
