---
hide:
  - toc
---

# CALL

| 函数名                                                     | 参数           | 返回值 |
| :--------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.md) | `functionName` | `void` |

!!! info "API"

	``` { #language-erbapi }
	CALL funcName
	```

    调用以`@`开头的字符串定义的函数  
    当到达函数末尾或执行[`RETURN`](./RETURN.md)时，函数结束并返回到执行`CALL`的那一行  
    如果执行了`RETURN`，则其参数会存入`RESULT`；如果到达函数末尾，则`0`会存入`RESULT`

!!! hint "提示"

	此功能仅作为指令使用。

!!! example "示例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		CALL AAA
		PRINTFORML {RESULT}
		CALL BBB
		PRINTFORML {RESULT}
		WAIT
	
	@AAA
		PRINTL Here is @AAA
		RETURN 123
	
	@BBB
		PRINTL Here is @BBB
	```

	``` title="结果"
	Here is @AAA
	123
	Here is @BBB
	0
	```

### 相关项目
- [CALLFORM](FORM.md)
- [TRYCALLFORM](TRYFORM.md)
- [EXISTFUNCTION](EXISTFUNCTION.md)