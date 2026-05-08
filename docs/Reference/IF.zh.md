---
hide:
  - toc
---

# (S)IF

| 函数名                                                    | 参数      | 返回值 |
| :-------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF`](./IF.md) | `operand` | `void` |

!!! info "API"

    ```  { #language-erbapi }
	IF operand(int)
	ELSEIF operand(int)
	ELSE
	ENDIF
	SIF operand(int)
    ```
    `SIF` 在条件表达式成立时，执行下一行。不成立时，则跳过下一行。  
    `IF` 在条件表达式成立时，执行从下一行开始直到遇到 `ELSEIF`、`ELSE`、`ENDIF` 为止的代码，然后跳转到 `ENDIF` 所在行。不成立时，则跳过直到遇到 `ELSEIF`、`ELSE`、`ENDIF` 为止的代码。  
    `ELSEIF` 在其条件表达式成立时，执行从下一行开始直到遇到 `ELSEIF`、`ELSE` 或 `ENDIF` 为止的代码，然后跳转到 `ENDIF` 所在行。如果不成立，则跳过直到遇到下一个 `ELSEIF`、`ELSE` 或 `ENDIF` 为止的代码，并重复此过程。  
    `ELSE` 则执行从下一行开始直到遇到 `ENDIF` 为止的代码。`ELSE` 必须跟在 `ELSEIF` 之后执行，并且 `ELSE` 之后必须是 `ENDIF`。  
    条件表达式严格来说是 `int` 类型，0 视为不成立，非 0 视为成立。

!!! hint "提示"

    仅支持命令形式

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	#DIM CONST TRUE = 1
	#DIM CONST FALSE = 0
		IF TRUE
			PRINTL IF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF

		IF FALSE
			PRINTL Can not reach here
		ELSEIF TRUE
			PRINTL ELSEIF=TRUE
		ELSE
			PRINTL Can not reach here
		ENDIF
		
		IF FALSE
			PRINTL Can not reach here
		ELSEIF FALSE
			PRINTL Can not reach here
		ELSE
			PRINTL Reached ELSE
		ENDIF

		WAIT
    ``` 
    ``` title="結果"
	Now Loading...
	IF=TRUE
	ELSEIF=TRUE
	Reached ELSE
    ```

### 相关项目
- [SELECTCASE](SELECTCASE.md)