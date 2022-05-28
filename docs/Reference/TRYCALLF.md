# TRYCALLF

| 関数名| 引数 | 戻り値 |
| :-----| :--- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	TRYCALLF funcName
	```

	`CALLF`の`TRY`機能版。呼び出し先の関数が無くてもエラーにならないが、`CALLF`同様に`RETURNF`の返り値は破棄される

!!! hint "ヒント"

	命令のみの機能となります。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		TRYCALLF NULL
		TRYCALLF TEST
		WAIT

	@TEST
	#FUNCTION

		PRINT Called "TEST" function.
		RETURNF 0
	```

	``` title="結果"
	Called "TEST" function.
	```
