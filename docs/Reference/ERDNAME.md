---
hide:
  - toc
---

# ERDNAME

| 関数名                                                     | 引数                        | 戻り値    |
| :--------------------------------------------------------- | :-------------------------- | :-------- |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.md) | `variable`, `int`(, `int`)  | `string`  |

!!! info "API"

	``` { #language-erbapi }
	string ERDNAME variableName, index(, dimension)
	```

	`ERD`変数のインデックスを指定し、その要素の名前を返す。第三引数で次元を指定可能（ファイル名と同じく左から1,2,3）

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

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
	``` title="結果"
	AAA EEE III
	```

### 関連項目
- [ユーザー定義の変数>ERD機能](../Emuera/user_defined_variables.md#erderabasic-define)
