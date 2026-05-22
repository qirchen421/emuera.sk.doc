---
hide:
  - toc
---

# RETURN

| 函数名                                                                                              | 参数                   | 返回值                    |
| :-------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------ |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.zh.md) | `int`(, `int`,...)     | `与参数相同`              |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.zh.md)                                    | `string`(, `string`,...)| `与参数相同（转换为数值类型）`|

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

!!! warning "RESULT 的覆盖与函数末尾的隐式赋值"

    `RETURN` **必定**覆盖 `RESULT`。即使在函数中手动给 `RESULT` 赋值，`RETURN` 执行时也会被覆盖。
    
    此外，当函数到达末尾（没有执行 `RETURN`）时，`RESULT:0` 会被隐式赋值为 `0`。

    ``` { #language-erb }
    @MY_FUNC
        RESULT = 999
        RETURN 1
        ; 调用方的 RESULT 是 1 而非 999
    
    @MY_FUNC2
        RESULT = 999
        ; 无 RETURN → 函数末尾 RESULT:0 = 0
    ```

    但是，声明了 [`#FUNCTION`](../Emuera/function.zh.md) 的表达式函数使用 `RETURNF`，`RETURNF` **不会覆盖 RESULT**。函数末尾也不会对 `RESULT` 进行隐式赋值。

    ``` { #language-erb }
    @MY_EXPR_FUNC
        #FUNCTION
        RESULT = 999
        RETURNF 1
        ; 调用方的 RESULT 仍为 999（RETURNF 不覆盖 RESULT）
    ```

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
- [RESTART](RESTART.zh.md)
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — RETURNFORM 属于第二代"FORM 动态求值"