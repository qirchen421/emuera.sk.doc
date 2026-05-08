---
hide:
  - toc
---

# RETURN

| 函数名                                                                                              | 参数                   | 返回值                    |
| :-------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------ |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.md) | `int`(, `int`,...)     | `与参数相同`              |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.md)                                    | `string`(, `string`,...)| `与参数相同（转换为数值类型）`|

!!! info "API"

    ```  { #language-erbapi }
	RETURN result:0(, result:1,...)
	RETURNFORM formedString(, formedString,...)
    ```
    将参数指定的值赋值给 `RESULT`，并结束正在执行的函数。  
    `RETURN` 将参数从左到右依次赋值给 `RESULT:0`, `RESULT:1`,...  

    `RETURNFORM` 是 `RETURN` 的变体。  
    它将参数指定的格式化字符串解析为算术表达式，然后执行 `RETURN`。  
    例如，可以实现以下操作：

    ```  { #language-erbapi }
	A = 100
	CALL TEST
	PRINTFORMW RESULT == {RESULT}

	@TEST
	STR = A * 10
	RETURNFORM %STR%
	```

    请注意，与 `RETURN` 不同，`%` 在此处被视为字符串表达式的开始，而不是取模运算符。

    ```  { #language-erbapi }
	;正确。返回A的低2位。
		RETURN A % 100

	;错误。因为会将%之后的内容作为字符串表达式读取。
		RETURNFORM A % 100
	```
	此外，它还支持多个返回值。  
	当指定多个返回值时，会按顺序赋值给`RESULT:0`、`RESULT:1`...。

!!! hint "提示"

    仅支持指令。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CALL AAA

		PRINTFORML {RESULT:0}, {RESULT:1}, {RESULT:2}

		CALL BBB

		PRINTFORMW {RESULT:0}

		@AAA
		RETURN 5, 7, 3

		@BBB
		#DIMS HOGES

		HOGES '= "3"*2

		RETURNFORM %HOGES%4
    ``` 
    ``` title="结果"
		5, 7, 3
		334
    ```

### 相关项目
- [RESTART](RESTART.md)