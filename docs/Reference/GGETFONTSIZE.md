---
hide:
  - toc
---

# GGETFONTSIZE

| 関数名                                                               | 引数  | 戻り値 |
| :------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETFONTSIZE gID
	```

	指定した`gID`の、`GSETFONT`で指定したフォントサイズを返す

!!! warning "Skia版の注意"

	`GCREATE`後に`GSETFONT`を呼び出さずに`GGETFONTSIZE`を呼ぶと、EM+EEではNullReferenceExceptionが発生しますが、Skia版では`0`を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETFONT 0, "Arial", 100

		GCREATE 1, 100, 100
		GSETFONT 1, "ＭＳ ゴシック", 200

		PRINTVL GGETFONTSIZE(0)
		PRINTVL GGETFONTSIZE(1)
		WAIT
	```

	``` title="結果"
	100
	200
	```

### 関連項目
- [GSETFONT](GSETFONT.md)
- [GGETFONT](GGETFONT.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.md)
