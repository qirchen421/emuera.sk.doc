---
hide:
  - toc
---

# GETMEMORYUSAGE

| 関数名                                                     | 引数   | 戻り値 |
| :--------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[``](./GETMEMORYUSAGE.md) | `void` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GETMEMORYUSAGE
	```

	現在起動中のEmueraで使用中のメモリ使用量を返す(byte)

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTFORMW 現在のメモリ使用量は{GETMEMORYUSAGE()/1024/1024}MBです
		REPEAT 10000
			ADDVOIDCHARA
		REND
		PRINTFORMW ADDVOIDCHARAを10000回実行した後のメモリ使用量は{GETMEMORYUSAGE()/1024/1024}MBです
	```

	``` title="結果"
	現在のメモリ使用量は112MBです
	ADDVOIDCHARAを10000回実行した後のメモリ使用量は934MBです
	```

### 関連項目
- [CLEARMEMORY](CLEARMEMORY.md)
