# GGETFONTSTYLE

| 関数名| 引数 | 戻り値 |
| :-----| :--- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.md) | `void` | `void` |

!!! info "API"

	``` { #language-erbapi }
	int GGETFONTSTYLE gID
	```

	指定した`gID`の、`GSETFONT`で指定したフォントスタイルを返す

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100, 1|8

		GCREATE 1, 100, 100
		GSETFONT 1, "ＭＳ ゴシック", 100, 2|4

		PRINTVL GGETFONTSTYLE(0)
		PRINTVL GGETFONTSTYLE(1)
		WAIT
	```

	``` title="結果"
	9
	6
	```
