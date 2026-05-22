---
hide:
  - toc
---

# CALLFORM, JUMPFORM, GOTOFORM

| Function name | Arguments | Return |
| :----------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.en.md) | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.en.md) | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.en.md) | `labelName`                | none   |

!!! info "API"

    ```  { #language-erbapi }
	CALLFORM functionName(, argument...)
	JUMPFORM functionName(, argument...)
	GOTOFORM labelName
    ```
	Same as [`CALL`](./CALL.en.md), [`JUMP`](./JUMP.en.md), and [`GOTO`](./GOTO.en.md), but allows specifying function names in the same format as [`PRINTFORM`](./PRINT.en.md).

    ```  { #language-erbapi }
	CALLFORM KOJO_{NO:TARGET}_{SELECTCOM}
    ```

	Can be used like the example above. `JUMPFORM` and `CALLFORM` can accept arguments. See the [function argument specification](../Emuera/function.en.md#argument-specification-in-user-defined-functions) section for details.  
	Note: For entering loop/branch syntax directly via `GOTOFORM`, see [`TRYGOTO`](./TRY.en.md), [Loop/Branch Syntax](../Reference/README.en.md#flow-control), and the [TRYC system](./TRYC.en.md).

!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGE
		HOGES = AAA
		CALLFORM %HOGES%
		JUMPFORM %"C"*3%

	@AAA
		PRINTL AAA

	@CCC
		PRINTL CCC
		WAIT
    ``` 
    ``` title="Result"
	AAA
	CCC
    ```

### Related
- [CALL](CALL.en.md)
- [JUMP](JUMP.en.md)
- [GOTO](GOTO.en.md)
- [TRYC system](TRYC.en.md)
