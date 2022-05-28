# GDRAWTEXT

| 関数名| 引数 | 戻り値 |
| :-----| :--- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md) | `int`, `string`(, `int`, `int`) | `int` |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWTEXT gID, text(, x, y)
	```

	`gID`で指定した`Graphics`に`text`を描写する。フォント等は`GSETFONT`で指定したものを使う  
	`x`,`y`を省略した場合は`0`, `0`の位置に描写する

!!! hint "ヒント"

	命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIM DYNAMIC LCOUNT

		FOR LCOUNT, 1, 6
			GCREATE LCOUNT, 2000, 250
			GSETFONT LCOUNT, "Arial", LCOUNT*50, 0
			GDRAWTEXT LCOUNT, "ABC"
			SPRITECREATE @"TEST{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='TEST{LCOUNT}' srcb='' height='250'>"
			REPEAT 2
				PRINTL 
			REND
		NEXT
	```

	![](../assets/images/GDRAWTEXT.png)
