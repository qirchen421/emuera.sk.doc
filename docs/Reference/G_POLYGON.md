---
hide:
  - toc
---

# G_POLYGON系

| 関数名                                                                         | 引数               | 戻り値 |
| :----------------------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`G_POLYGON_DRAW`](./G_POLYGON.md)        | `int`              | `int`  |
| ![](../assets/images/Icondotnet.webp)[`G_POLYGON_FILL`](./G_POLYGON.md)        | `int`              | `int`  |
| ![](../assets/images/Icondotnet.webp)[`G_POLYGON_POINT_ADD`](./G_POLYGON.md)   | `int`, `int`, `int` | `int`  |
| ![](../assets/images/Icondotnet.webp)[`G_POLYGON_POINT_CLEAR`](./G_POLYGON.md) | `int`              | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int G_POLYGON_DRAW gID
	int G_POLYGON_FILL gID
	int G_POLYGON_POINT_ADD gID, x, y
	int G_POLYGON_POINT_CLEAR gID
	```

	`G_POLYGON_POINT_ADD`は指定した`gID`のグラフィックスに頂点を追加します。  
	`G_POLYGON_DRAW`は追加された頂点を現在のペンで多角形として描画します。  
	`G_POLYGON_FILL`は追加された頂点を現在のブラシで多角形として塗りつぶします。  
	`G_POLYGON_POINT_CLEAR`は追加された頂点をすべてクリアします。  

	これらの関数はSkiaSharp描画モードでのみ使用可能です。GDIモードではエラーになります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		; 400x300のキャンバスを作成
		GCREATE 0, 400, 300
		GCLEAR 0, 0xFFFFFF

		; 赤いペンと青いブラシを設定
		GSETPEN 0, 0xFF0000, 3
		GSETBRUSH 0, 0x0000FF

		; 三角形の頂点を追加
		G_POLYGON_POINT_ADD 0, 50, 50
		G_POLYGON_POINT_ADD 0, 350, 50
		G_POLYGON_POINT_ADD 0, 200, 250

		; 塗りつぶしてから描画
		G_POLYGON_FILL 0
		G_POLYGON_DRAW 0

		; 表示
		CBGSETG 0, 0, 0, 0
		WAIT
	```

### 関連項目
- [GCREATE](GCREATE.md)
- [GSETPEN](GSETPEN.md)
- [GSETBRUSH](GSETBRUSH.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.md)