---
hide:
  - toc
---

# GGETBRUSH

| 関数名                                                         | 引数  | 戻り値 |
| :------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETBRUSH gID
	```

	指定した`gID`の、`GSETBRUSH`で指定した色名を返す(cARGB)

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETBRUSH 0, 0xFF112233

		PRINTFORMW Color:{GGETBRUSH(0)}(%CONVERT(GGETBRUSH(0), 16)%)
	```

	``` title="結果"
	Color:4279312947(ff112233)
	```

### 関連項目
- [GSETBRUSH](GSETBRUSH.md)
