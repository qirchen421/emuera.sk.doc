---
hide:
  - toc
---

# ARGLEN

| 函数名 | 参数 | 返回值 |
| :----- | :--- | :----- |
| ![](../assets/images/IconSK.webp)[`ARGLEN`](./ARGLEN.zh.md) | 无 | `int` |

!!! info "API"

	``` { #language-erbapi }
	int ARGLEN
	```

	返回当前函数调用中传入的可变长参数（VARIADIC）的数量。仅在用 `VARIADIC` 关键字声明的函数内返回有意义的值。

	- `VARIADIC` 只能指定在函数参数声明的最后一个参数位置。
	- `VARIADIC` 只能修饰 `ARG`、`ARGS`、`ARGF`。
	- 同类型的 `ARG`/`ARGS`/`ARGF` 不能同时出现在固定参数和 VARIADIC 参数中（固定参数请使用私有变量）。
	- ARGLEN 本身不接受任何参数。

!!! example "示例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTFORML 参数数量: {MYFUNC(1, 2, 3)}

	@MYFUNC(VARIADIC ARG:0)
		#FUNCTION
		RETURNF ARGLEN
	```
	``` title="输出结果"
	参数数量: 3
	```

	混合固定参数与可变长参数的示例：

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		CALL GREET("你好", "田中", "佐藤")

	@GREET(PREFIX, VARIADIC ARGS:0)
		; PREFIX 是私有变量（固定参数），ARGS:0... 是可变长字符串参数
		PRINTFORM %PREFIX%:
		REPEAT ARGLEN
			PRINTFORM  %ARGS:COUNT%
		REND
		PRINTL
	```
	``` title="输出结果"
	你好: 田中 佐藤
	```
