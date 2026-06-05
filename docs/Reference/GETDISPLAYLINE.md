---
hide:
  - toc
---

# GETDISPLAYLINE

| 関数名                                                                   | 引数  | 戻り値     |
| :----------------------------------------------------------------------- | :---- | :--------- |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.md) | `int` | `istring`  |

!!! info "API"

	``` { #language-erbapi }
	string GETDISPLAYLINE lineNumber
	```

	表示済みの行から、指定した行の文字列を返す

	!!! warning "Skia 拡張"

		負数引数で下から逆順インデックス：`-1` = 最後の行、`-2` = 下から2番目の行、など。範囲外の場合は空文字列を返す。

!!! hint "ヒント"

    命令、式中関数両方対応しています。  
	表示行は配列で管理されているため、0からのスタートとなる。`LINECOUNT`変数でループを回すと全行取得できる  
	注意：`LINECOUNT`は論理行数、`GETDISPLAYLINE`は表示行インデックスであり、両者は整合しない場合がある。負数インデックスで下から直接カウントすることで、不整合を回避できる。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTL AAA
		PRINTL BBB
		PRINTL CCC

		REPEAT LINECOUNT
			PRINTFORML {COUNT}行目:%GETDISPLAYLINE(COUNT)%
		REND
		WAIT
	```
	``` title="結果"
	Now Loading...
	AAA
	BBB
	CCC
	0行目:Now Loading...
	1行目:AAA
	2行目:BBB
	3行目:CCC
	```

### 関連項目
- [HTML_POPPRINTINGSTR](HTML_POPPRINTINGSTR.md)
