---
hide:
  - toc
---

# CONTINUE, BREAK

| 函数名                                                             | 参数 | 返回值 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.zh.md) | 无   | 无     |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.zh.md)    | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	loopInstruction
		CONTINUE
		BREAK
	loopendInstruction
    ```
    可在 [`REPEAT`](./REPEAT.zh.md)、[`FOR`](./FOR.zh.md)、[`WHILE`](./WHILE.zh.md)、[`DO`](./DO.zh.md) 内部使用的循环控制指令。
    `CONTINUE` 在执行时会返回到循环开始行，对于 `REPEAT` 和 `FOR` 循环，还会递增或递减对应的计数变量。
    `BREAK` 在执行时会中断后续的循环处理，并跳转到循环结束行。

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
		PRINTFORML {COUNT}

		DO
			COUNT++
			IF UNICODE(COUNT) == "A"
				FOR COUNT, COUNT, COUNT+26
					PRINTFORM %UNICODE(COUNT)%
				NEXT
				BREAK
			ENDIF
		LOOP 1
		WAIT
    ``` 
    ``` title="结果"
	0
	1
	3
	5
	ABCDEFGHIJKLMNOPQRSTUVWXYZ
    ```