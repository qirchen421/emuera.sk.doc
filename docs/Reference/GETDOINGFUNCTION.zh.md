---
hide:
  - toc
---

# GETDOINGFUNCTION

| 函数名 | 参数 | 返回值 |
| :----- | :--- | :----- |
| ![](../assets/images/IconEE.webp)[`GETDOINGFUNCTION`](./GETDOINGFUNCTION.zh.md) | 无 | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GETDOINGFUNCTION
	```

	返回当前正在执行的函数的标签名。若在系统待机中（如标题画面）调用，则返回空字符串。

!!! example "示例"

	``` { #language-erb title="MAIN.ERB" }
	@EVENTSHOP
		PRINTFORML 当前函数: %GETDOINGFUNCTION%
	```
	``` title="输出结果"
	当前函数: EVENTSHOP
	```
