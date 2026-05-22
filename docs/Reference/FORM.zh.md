---
hide:
  - toc
---

# CALLFORM, JUMPFORM, GOTOFORM

| 函数名                                                       | 参数                       | 返回值 |
| :----------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.zh.md) | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.zh.md) | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.zh.md) | `labelName`                | 无     |

!!! info "API"

    ```  { #language-erbapi }
	CALLFORM functionName(, argument...)
	JUMPFORM functionName(, argument...)
	GOTOFORM labelName
    ```
	与 [`CALL`](./CALL.zh.md)、[`JUMP`](./JUMP.zh.md)、[`GOTO`](./GOTO.zh.md) 相同，但可以像 [`PRINTFORM`](./PRINT.zh.md) 一样指定函数名。

    ```  { #language-erbapi }
	CALLFORM KOJO_{NO:TARGET}_{SELECTCOM}
	```

    可以像这样使用。`JUMPFORM`和`CALLFORM`可以指定参数，详情请参见[函数的`自定义函数中的参数指定`](../Emuera//function.md#_2)一节。
    另外，关于使用`GOTOFORM`直接进入循环/分支结构内部的情况，请参阅[`TRYGOTO`](./TRY.zh.md)、[`循环/分支结构`](../Reference/README.zh.md#flow-control)以及[`TRYC`系列](./TRYC.zh.md)等章节。


!!! hint "提示"

    仅支持命令形式。

!!! example "示例" 
    
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
    ``` title="结果"
	AAA
	CCC
    ```

### 相关项目
- [CALL](CALL.zh.md)
- [JUMP](JUMP.zh.md)
- [GOTO](GOTO.zh.md)
- [TRYC系命令](TRYC.zh.md)
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — CALLFORM 属于第二代"函数名反射"