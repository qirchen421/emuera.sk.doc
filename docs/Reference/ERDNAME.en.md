---
hide:
  - toc
---

# ERDNAME

| Function name                                                 | Arguments                  | Return   |
| :----------------------------------------------------------- | :------------------------ | :-------- |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.md) | `variable`, `int`(, `int`) | `string` |

!!! info "API"

	``` { #language-erbapi }
	string ERDNAME variableName, index(, dimension)
	```

	Specifies the index of the `ERD` variable and returns the name of that element. The dimension can be specified with the third argument (numbered from left to right like file names: 1, 2, 3).

!!! hint "Hint"

    Both command and expression function are supported.

!!! example "Example"

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
	``` title="Result"
	AAA EEE III
	```

### Related Items
- [User-defined Variables>ERD Function](../Emuera/user_defined_variables.md#erderabasic-define)
