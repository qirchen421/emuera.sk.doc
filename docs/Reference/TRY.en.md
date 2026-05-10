---
hide:
  - toc
---

# TRYJUMP, TRYCALL, TRYGOTO

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.md) | `functionName`(, `any`...) | none   |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.md) | `labelName`                | none   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALL functionName(, `argument`...)
	TRYJUMP functionName(, `argument`...)
	TRYGOTO labelName
    ```
	Same as [`JUMP`](./JUMP.md), [`CALL`](./CALL.md), and [`GOTO`](./GOTO.md), but does not throw an error even if the specified function does not exist.  
	If the specified function does not exist, nothing happens.  
	`TRYJUMP` and `TRYCALL` can accept arguments. See the [function argument specification](../Emuera/function.md#自作関数における引数指定) section for details.  
	Note: If entering an [`IF～ELSEIF～ELSE～ENDIF`](./IF.md) block directly via `TRYGOTO`, execution proceeds normally up to just before `ELSEIF`, `ELSE`, or `ENDIF`, then jumps to the line after `ENDIF`.  
	Also, if entering a [`REPEAT～REND`](./REPEAT.md) block directly, execution proceeds normally up to just before `REND`, then continues from the next line, ignoring `REND`.  
	These behaviors are processed the same as `GOTO` and other GOTO-related commands. For other loop/branch syntax added in Emuera, see [Loop/Branch Syntax](../Reference/README.en.md#loopbranch-syntax) and the [TRYC system](./TRYC.md).

!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		TRYCALL AAA
		TRYCALL BBB
		TRYCALL CCC
		WAIT

	@AAA
		PRINTL AAA

	@CCC
		PRINTL CCC
    ``` 
    ``` title="Result"
	AAA
	CCC
    ```

### Related
- [TRY◯◯FORM](TRYFORM.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
