---
hide:
  - toc
---

# GGETTEXTSIZE

| 関数名                                                               | 引数                               | 戻り値       |
| :------------------------------------------------------------------- | :--------------------------------- | :----------- |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md) | `string`, `string`, `int`(, `int`) | `int`, `int` |

!!! info "API"

	``` { #language-erbapi }
	int GGETTEXTSIZE text, fontName, fontSize(, fontStyle)
	```

	指定の引数で`GDRAWTEXT`を行った際の描写範囲を`Width`,`Height`をそれぞれ`RESULT:0`,`RESULT:1`に代入する

!!! hint "ヒント"

	命令、式中関数両方に対応していますが、式中関数は別途RESULT:1を処理する必要があるため、命令としての使用を推奨します

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		GGETTEXTSIZE "USA", "Arial", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "日本", "Arial", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "USA", "ＭＳ Ｐゴシック", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		GGETTEXTSIZE "日本", "ＭＳ Ｐゴシック", 150
		PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
		WAIT
	```

	``` title="結果"
	Width:308 Height:167
	Width:330 Height:172
	Width:281 Height:150
	Width:300 Height:150
	```

### 関連項目
- [GDRAWTEXT](GDRAWTEXT.md)
