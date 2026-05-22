---
hide:
  - toc
---

# REPEAT-REND

| 函数名                                                         | 参数  | 返回值 |
| :------------------------------------------------------------- | :---  | :----- |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.zh.md) | `int` | 无     |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.zh.md)   | 无    | 无     |

!!! info "API"

    ``` { #language-erbapi }
	REPEAT loopCount
	REND
    ```
    `REPEAT`～`REND`之间的代码块，将按照参数指定的次数进行循环。循环次数被记录在`COUNT`变量中。
	当执行[`CONTINUE`](./CONTINUE.zh.md)时，将返回到`REPEAT`行，并将`COUNT`变量加1。
	当执行[`BREAK`](./CONTINUE.zh.md)时，将终止后续的循环处理，并跳转到`REND`行。

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		REPEAT 5
			SIF COUNT == 2
				CONTINUE
			SIF COUNT == 4
				BREAK
			PRINTFORML {COUNT}
		REND
		PRINTFORMW {COUNT}
    ``` 
    ``` title="结果"
	0
	1
	3
	5
    ```

### 相关项目
- [FOR-NEXT](FOR.zh.md)
- [WHILE_WEND](WHILE.zh.md)
- [CONTINUE,BREAK](CONTINUE.zh.md)