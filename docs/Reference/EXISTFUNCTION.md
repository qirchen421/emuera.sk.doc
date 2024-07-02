---
hide:
  - toc
---

# EXISTFUNCTION

| 関数名                                                                 | 引数     | 戻り値 |
| :--------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
	int EXISTFUNCTION funcName
    ```

	引数で指定した関数が存在するかの式中関数。通常関数なら1を、式中関数(数値型)なら2を、式中関数(文字列型)なら3を返す  
	システム組み込み式中関数は0を返す。システム関数はERB内で記述されている場合は1を、そうでなければ0を返す

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		PRINTVL EXISTFUNCTION("TEST1")
		PRINTVL EXISTFUNCTION("TEST2")
		PRINTVL EXISTFUNCTION("TEST3")
		PRINTVL EXISTFUNCTION("SYSTEM_TITLE")
		PRINTVL EXISTFUNCTION("SHOP")
		WAIT

	@TEST1

	@TEST2
	#FUNCTION

	@TEST3
	#FUNCTIONS
    ```

    ``` title="結果"
	1
	2
	3
	1
	0
    ```

### 関連項目
- [ENUMFUNC](ENUMFUNC.md)
