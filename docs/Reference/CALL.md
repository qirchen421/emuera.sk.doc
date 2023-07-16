---
hide:
  - toc
---

# CALL

| 関数名                                                     | 引数           | 戻り値 |
| :--------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.md) | `functionName` | `void` |

!!! info "API"

	``` { #language-erbapi }
	CALLF funcName
	```

	`@`から始まる文字列で定義された関数を呼び出す
	関数の終端に達するか`RETURN`が行われると、関数を終了し`CALL`を実行した行に戻る
	`RETURN`が行われた場合は`RESULT`にその引数が、終端に達した場合は`RESULT`に`0`が入る

!!! hint "ヒント"

	命令のみの機能となります。

!!! example "例"

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

	``` title="結果"
	Here is @AAA
	123
	Here is @BBB
	0
	```
