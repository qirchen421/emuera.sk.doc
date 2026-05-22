---
hide:
  - toc
---

# TRYCALLFORM, TRYJUMPFORM, TRYGOTOFORM

| 函数名                                                             | 参数                       | 返回值 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.zh.md) | `formedString`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.zh.md) | `formedString`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.zh.md) | `formedString`             | 无     |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLFORM formedString(, argument...)
	TRYJUMPFORM formedString(, argument...)
	TRYGOTOFORM formedString
    ```
	与 [`JUMP`](./JUMP.zh.md)、[`CALL`](./CALL.zh.md)、[`GOTO`](./GOTO.zh.md) 相同，但可以像 [`PRINTFORM`](./PRINT.zh.md) 一样指定函数名，即使函数不存在也不会报错。  
	`TRYJUMPFORM` 和 `TRYCALLFORM` 可以指定参数。详情请参阅[函数页面的`自定义函数中的参数指定`一节](../Emuera//function.md#_2)。  
	另外，关于使用 `TRYGOTOFORM` 直接进入循环/分支结构内部的情况，请参阅 [`TRYGOTO`](./TRY.zh.md)、[`循环/分支结构`](../Reference/README.zh.md#flow-control) 以及 [`TRYC` 系列](./TRYC.zh.md) 的说明。

!!! hint "提示"

    仅支持命令。

!!! example "示例" 
    
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
    ``` title="结果"
	AAA
	CCC
    ```

### 相关项目
- [TRY系](TRY.zh.md)
- [CALL](CALL.zh.md)
- [JUMP](JUMP.zh.md)
- [GOTO](GOTO.zh.md)