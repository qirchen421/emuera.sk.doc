---
hide:
  - toc
---

# SPRITEDISPOSEALL

| 関数名                                                                       | 引数  | 戻り値 |
| :--------------------------------------------------------------------------- | :-----| :----- |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int SPRITEDISPOSEALL, containCsvSprite
	```

	SPRITEを全て破棄する。引数が0ならERB上で作成されたものだけを、非0ならresources内CSVで作成されたものも含めて全て破棄する  
	破棄されたスプライト数が返される

!!! hint "ヒント"

	命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100

		SPRITECREATE "AAA", 0
		SPRITECREATE "BBB", 0
		SPRITECREATE "CCC", 0

		PRINTFORMW {SPRITEDISPOSEALL(0)}
	```

	``` title="結果"
	3
	```

### 関連項目
- [SPRITEDISPOSE](./SPRITEDISPOSE.md)
