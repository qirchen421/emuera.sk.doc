---
hide:
  - toc
---

# ARGLEN

| 関数名 | 引数 | 戻り値 |
| :----- | :--- | :----- |
| ![](../assets/images/IconSK.webp)[`ARGLEN`](./ARGLEN.md) | なし | `int` |

!!! info "API"

	``` { #language-erbapi }
	int ARGLEN
	```

	現在の関数に渡された可変長引数（VARIADIC）の数を返します。`VARIADIC`キーワードで宣言された関数内でのみ意味のある値を返します。

	- `VARIADIC`は関数の引数宣言で最後の引数にのみ指定できます。
	- `VARIADIC`は`ARG`、`ARGS`、`ARGF`にのみ修飾できます。
	- 同じ型の`ARG`/`ARGS`/`ARGF`は固定引数とVARIADIC引数に同時に宣言できません（固定引数には私有変数を使用してください）。
	- ARGLEN自体は引数を取りません。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		PRINTFORML 引数の数: {MYFUNC(1, 2, 3)}

	@MYFUNC(VARIADIC ARG:0)
		#FUNCTION
		RETURNF ARGLEN
	```
	``` title="結果"
	引数の数: 3
	```

	混合固定引数と可変長引数の例：

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		CALL GREET("こんにちは", "田中", "佐藤")

	@GREET(PREFIX, VARIADIC ARGS:0)
		; PREFIXは私有変数（固定引数）、ARGS:0...は可変長文字列引数
		PRINTFORM %PREFIX%:
		REPEAT ARGLEN
			PRINTFORM  %ARGS:COUNT%
		REND
		PRINTL
	```
	``` title="結果"
	こんにちは: 田中 佐藤
	```
