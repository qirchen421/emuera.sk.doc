# GDRAWGWITHROTATE

| 関数名                                                                       | 引数                                | 戻り値 |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWGWITHROTATE gID, destID, Angle(, x, y)
	```

	`destID`の画像を`Angle`の角度で右回転させて`gID`に貼り付ける  
	`x`と`y`は回転の中心点を指定する。省略した場合は`x/2`, `y/2`となる（画像全体の中心点）

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HTML

		GCREATE 0, 400, 400
		GCREATE 1, 400, 400
		GCREATE 2, 400, 400

		GSETFONT 0, "Arial", 100
		GDRAWTEXT 0, "Emuera", 30, 150
		
		GDRAWGWITHROTATE 1, 0, 90
		GDRAWGWITHROTATE 2, 0, 180

		REPEAT 3
			SPRITECREATE @"TEST{COUNT}", COUNT
			HTML += @"<img src='TEST{COUNT}' height = '400' width = '400'>"
		REND
		HTML_PRINT HTML
		PRINTL 
		PRINTL 
		PRINTL 
		WAIT
	```

	![](../assets/images/GDRAWGWITHROTATE.png)
