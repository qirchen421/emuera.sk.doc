---
hide:
  - toc
---

# GDASHSTYLE

| 関数名                                                         | 引数                  | 戻り値 |
| :------------------------------------------------------------- | :---------------------| :----- |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.md) | `int`, `int`, `int` | 1      |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWline gID, DashStyle, DashCap
	```

	GDRAWLINEの線のスタイルを指定する。DashStyle、DashCapそれぞれC#のDashStyle、DashCap列挙型の数値で指定可能  
	DashStyle 0=普通の線 1=ダッシュで構成された線 2=ドットで構成された線 3=ダッシュとドットで構成された線 4=ダッシュとドット2個で構成された線  
	DashCap(線の端の形) 0=普通の形(直角) 2=丸めた形 3=三角形の形 1は欠番。文句はMicrosoftに言ってください  

!!! hint "ヒント"

	命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		#DIM DYNAMIC LCOUNT
		FOR LCOUNT, 0, 5
			GCREATE LCOUNT, 100, 100

			GSETPEN LCOUNT, 0xFFFF0000, 5
			
			GDASHSTYLE LCOUNT, 1, 3
			GSETPEN LCOUNT, 0xFFFF0000, 4

			GCLEAR LCOUNT, 0xFFFFFFFF

			GDRAWLINE LCOUNT, 0, 0, 100, (LCOUNT+1)*20

			SPRITECREATE @"LINE{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='LINE{LCOUNT}' srcb='' height='500'>"
			REPEAT 4
				PRINTL
			REND
		NEXT
		WAIT
	```

	![](../assets/images/GDASHSTYLE.png)
