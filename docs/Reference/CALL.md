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
	CALL funcName
	```

	`@`から始まる文字列で定義された関数を呼び出す  
	関数の終端に達するか[`RETURN`](./RETURN.md)が行われると、関数を終了し`CALL`を実行した行に戻る  
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

### 関連項目
- [CALLFORM](FORM.md)
- [TRYCALLFORM](TRYFORM.md)
- [EXISTFUNCTION](EXISTFUNCTION.md)
- [CALLSTR](CALLSTR.md)

### ![](../assets/images/IconSK.webp)Skia版の変更点

!!! info "パラメータ安全性最適化"

    Skia版では、原版の関数呼び出しにおけるパラメータ処理の安全性を以下の点で改善しています：

    - **多余パラメータの静默破棄**：原版では呼び出し時の引数が関数定義のパラメータ数を超えるとエラーになりますが、Skia版では余分な引数を静かに無視します。これにより、[CALLSTR](CALLSTR.md)系の実行時解析との整合性が保たれます。
    - **TRY系の安全網**：原版では`ConvertArg`が失敗した場合、`TRYCALL`等でもクラッシュしますが、Skia版では`isTry`フラグにより`CATCH`句に安全にジャンプします。
