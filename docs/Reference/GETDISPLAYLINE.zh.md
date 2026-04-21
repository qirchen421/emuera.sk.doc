---
hide:
  - toc
---

# GETDISPLAYLINE

| 函数名                                                                   | 参数  | 返回值     |
| :----------------------------------------------------------------------- | :---- | :--------- |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.md) | `int` | `istring`  |

!!! info "API"

	``` { #language-erbapi }
	string GETDISPLAYLINE lineNumber
	```

	从已显示的行中，返回指定行的字符串

!!! hint "提示"

    该函数既可作为命令使用，也可在表达式中作为函数使用。  
    显示行以数组形式管理，因此索引从0开始。使用`LINECOUNT`变量进行循环即可获取所有行。

!!! example "示例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTL AAA
		PRINTL BBB
		PRINTL CCC

		REPEAT LINECOUNT
			PRINTFORML {COUNT}行目:%GETDISPLAYLINE(COUNT)%
		REND
		WAIT
	```
	``` title="结果"
	Now Loading...
	AAA
	BBB
	CCC
	0行目:Now Loading...
	1行目:AAA
	2行目:BBB
	3行目:CCC
	```

### 相关项目
- [HTML_POPPRINTINGSTR](HTML_POPPRINTINGSTR.md)