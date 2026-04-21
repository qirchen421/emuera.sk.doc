---
hide:
  - toc
---

# TRYJUMP, TRYCALL, TRYGOTO

| 函数名                                                     | 参数                       | 返回值 |
| :--------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.md) | `functionName`(, `any`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.md) | `functionName`(, `any`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.md) | `labelName`                | 无     |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALL functionName(, `argument`...)
	TRYJUMP functionName(, `argument`...)
	TRYGOTO labelName
    ```
	与 [`JUMP`](./JUMP.md)、[`CALL`](./CALL.md)、[`GOTO`](./GOTO.md) 相同，但即使指定的函数不存在也不会报错。  
	如果指定的函数不存在，则不执行任何操作。  
	`TRYJUMP` 和 `TRYCALL` 可以指定参数。详情请参阅[函数页面的`自定义函数中的参数指定`一节](../Emuera//function.md#_2)。  
	另外，当使用 `TRYGOTO` 直接跳转到 [`IF～ELSEIF～ELSE～ENDIF`](./IF.md) 内部时，会正常执行到 `ELSEIF`、`ELSE`、`ENDIF` 之前，然后跳转到 `ENDIF` 的下一行继续处理。  
	当直接跳转到 [`REPEAT～REND`](./REPEAT.md) 内部时，会正常执行到 `REND` 之前，然后忽略 `REND` 并从下一行继续处理。  
	这些处理方式与 `GOTO` 或其他 `GOTO` 系命令相同。关于 Emuera 中新增的其他循环/分支语法，请参阅 [`循环/分支语法`](../Reference/README.md#_8) 和 [`TRYC` 系](./TRYC.md) 章节。

!!! hint "提示"

    仅支持命令。

!!! example "示例" 
    
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
    ``` title="结果"
	AAA
	CCC
    ```

### 相关项目
- [TRY◯◯FORM](TRYFORM.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)