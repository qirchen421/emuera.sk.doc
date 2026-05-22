---
hide:
  - toc
---

# CALL

| 函数名                                                     | 参数           | 返回值 |
| :--------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.zh.md) | `functionName` | `void`¹ |

!!! info "API"

	``` { #language-erbapi }
	CALL funcName
	```

    调用以`@`开头的字符串定义的函数  
    当到达函数末尾或执行[`RETURN`](./RETURN.zh.md)时，函数结束并返回到执行`CALL`的那一行  
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
- [CALLFORM](FORM.zh.md)
- [TRYCALLFORM](TRYFORM.zh.md)
- [EXISTFUNCTION](EXISTFUNCTION.zh.md)
- [CALLSTR](CALLSTR.zh.md)

### ![](../assets/images/IconSK.webp)Skia 版变更

!!! info "参数安全性优化"

    Skia 版对原版函数调用中的参数处理安全性进行了以下改善：

    - **多余参数静默丢弃**：原版中调用时的参数超过函数定义的参数数量会报错，Skia 版则静默忽略多余参数。这与 [CALLSTR](CALLSTR.zh.md) 系的运行时解析行为保持一致。
    - **TRY 系安全网**：原版中 `ConvertArg` 失败时，`TRYCALL` 等也会崩溃，Skia 版通过 `isTry` 标志安全跳转到 `CATCH` 句。