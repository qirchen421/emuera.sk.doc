---
hide:
  - toc
---

# GETDOINGFUNCTION

| 関数名 | 引数 | 戻り値 |
| :----- | :--- | :----- |
| ![](../assets/images/IconEE.webp)[`GETDOINGFUNCTION`](./GETDOINGFUNCTION.md) | なし | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GETDOINGFUNCTION
	```

	現在実行中の関数のラベル名を返します。システム待機中（タイトル画面など）に呼び出された場合は空文字列を返します。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@EVENTSHOP
		PRINTFORML 現在の関数: %GETDOINGFUNCTION%
	```
	``` title="結果"
	現在の関数: EVENTSHOP
	```
