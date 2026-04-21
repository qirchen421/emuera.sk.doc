---
hide:
  - toc
---

# TRYC系

| 函数名                                                           | 参数                       | 返回值 |
| :--------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.md)     | `functionName`(, `any`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.md)     | `functionName`(, `any`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.md)      | `labelName`                | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.md) | `functionName`(, `any`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.md) | `labelName`                | 无     |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.md)        | 无                         | 无     |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.md)     | 无                         | 无     |

!!! info "API"

    ```  { #language-erbapi }
    TRYCCALL functionName(, argument...)
    TRYCJUMP functionName(, argument...)
    TRYCJUMP labelName
    TRYCCALLFORM formedString(, argument...)
    TRYCJUMPFORM formedString(, argument...)
    TRYCGOTOFORM formedString
    CATCH
    ENDCATCH
    ```
    `TRYC` 系列指令可以在函数调用时，控制当函数未找到时的行为。  
    如果函数存在，则调用该函数并执行 `TRYC` 之后的行；如果函数不存在，则执行 `CATCH` 之后的行。  
    其语法与 [`IF～ELSE～ENDIF`](./IF.md) 类似（区别在于即使函数存在时没有要执行的处理也可以省略）。  
    因此，当使用 [`GOTO`](./GOTO.md) 等指令直接跳转到 `TRYC系列～CATCH～ENDCATCH` 内部时，其行为与 `IF～ELSEIF～ELSE～ENDIF` 类似：  
    会正常执行到 `CATCH` 或 `ENDCATCH` 的前一行，然后跳转到 `ENDCATCH` 的下一行继续执行。  
    另外，关于使用 `TRYCGOTO` 或 `TRYCGOTOFORM` 直接跳入循环或分支结构内部的情况，请参阅 [`TRYGOTO`](./TRY.md) 或 [`循环·分支结构`](../Reference/README.md#_8) 章节。

    ```  { #language-erbapi }
		TRYCCALL UNKNOWN_FUNC ;调用不存在的函数
			;函数存在时，函数执行后要进行的处理（如果有的话，没有则可以省略，直接接CATCH即可）
		CATCH
			;函数不存在时要进行的处理
		ENDCATCH
	```

	此外，支持嵌套使用。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [TRY系](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)