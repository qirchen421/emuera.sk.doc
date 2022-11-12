---
hide:
  - toc
---

# GGETPENWIDTH

| 関数名                                                               | 引数  | 戻り値 |
| :------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETPENWIDTH gID
	```

	指定した`gID`の、`GSETPEN`で指定したペン幅を返す

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETPEN 0, 0xFF00FF00, 5

		PRINTFORMW Color:{GGETPEN(0)}(%CONVERT(GGETPEN(0), 16)%) Width:{GGETPENWIDTH(0)}
	```

	``` title="結果"
	Color:4278255360(ff00ff00) Width:5
	```
