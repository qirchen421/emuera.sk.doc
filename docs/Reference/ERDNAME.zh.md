---
hide:
  - toc
---

# ERDNAME

| 函数名                                                     | 参数                       | 返回值   |
| :--------------------------------------------------------- | :------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.md) | `variable`, `int`(, `int`) | `string` |

!!! info "API"

	``` { #language-erbapi }
	string ERDNAME variableName, index(, dimension)
	```

	指定 `ERD` 变量的下标，返回元素的名称。可以用 `dimension` 来指定数组维度（与文件名规则相同，从左开始依次为 1, 2, 3）

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

	``` { #language-erb title="HOGE3D@1.ERD" }
	0,AAA
	1,BBB
	2,CCC
	```
	``` { #language-erb title="HOGE3D@2.ERD" }
	0,DDD
	1,EEE
	2,FFF
	```
	``` { #language-erb title="HOGE3D@3.ERD" }
	0,GGG
	1,HHH
	2,III
	```
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		PRINTFORMW %ERDNAME(HOGE3D, 0, 1)% %ERDNAME(HOGE3D, 1, 2)% %ERDNAME(HOGE3D, 2, 3)%
	```
	``` title="输出结果"
	AAA EEE III
	```

### 相关项目
- [用户定义变量>ERD功能](../Emuera/user_defined_variables.md#erderabasic-define)
