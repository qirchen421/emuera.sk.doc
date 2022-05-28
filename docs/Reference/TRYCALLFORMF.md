# TRYCALLFORMF

| 関数名                                                               | 引数     | 戻り値 |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md) | `string` | `void` |

!!! info "API"

	``` { #language-erbapi }
	TRYCALLFORMF funcName
	```

	`CALLFORMF`の`TRY`機能版。呼び出し先の関数が無くてもエラーにならないが、`CALLFORMF`同様に`RETURNF`の返り値は破棄される

!!! hint "ヒント"

	命令のみの機能となります。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		REPEAT 5
			TRYCALLFORMF TEST{COUNT}
			SIF !LINEISEMPTY()
				PRINTL 
		REND
		WAIT

	@TEST1
	#FUNCTION

		PRINT Called "TEST1" function.
		RETURNF 0

	@TEST3
	#FUNCTIONS

		PRINT Called "TEST3" function.
		RETURNF "HOGE"
	```

	``` title="結果"
	Called "TEST1" function.
	Called "TEST3" function.
	```
