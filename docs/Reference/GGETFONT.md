---
hide:
  - toc
---

# GGETFONT

| 関数名                                                       | 引数  | 戻り値   |
| :----------------------------------------------------------- | :---- | :------- |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md) | `int` | `string` |

!!! info "API"

	``` { #language-erbapi }
	string GGETFONT gID
	```

	指定した`gID`の、`GSETFONT`で指定したフォント名を返す

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100

		GCREATE 1, 100, 100
		GSETFONT 1, "ＭＳ ゴシック", 100

		PRINTSL GGETFONT(0)
		PRINTSL GGETFONT(1)
		WAIT
	```

	``` title="結果"
	Arial
	ＭＳ ゴシック
	```
