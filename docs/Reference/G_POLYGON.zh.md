---
hide:
  - toc
---

# G_POLYGON 系列

| 函数名                                                                         | 参数               | 返回值 |
| :----------------------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_DRAW`](./G_POLYGON.md)        | `int`              | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_FILL`](./G_POLYGON.md)        | `int`              | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_ADD`](./G_POLYGON.md)   | `int`, `int`, `int` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_CLEAR`](./G_POLYGON.md) | `int`              | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int G_POLYGON_DRAW gID
	int G_POLYGON_FILL gID
	int G_POLYGON_POINT_ADD gID, x, y
	int G_POLYGON_POINT_CLEAR gID
	```

	`G_POLYGON_POINT_ADD`向指定`gID`的图形添加顶点。  
	`G_POLYGON_DRAW`用当前画笔将添加的顶点绘制为多边形。  
	`G_POLYGON_FILL`用当前画刷将添加的顶点填充为多边形。  
	`G_POLYGON_POINT_CLEAR`清除所有已添加的顶点。  

	这些函数仅在 SkiaSharp 绘图模式下可用。GDI 模式下会报错。

!!! hint "提示"

    支持命令和表达式函数两种形式。

!!! example "示例"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		; 创建 400x300 的画布
		GCREATE 0, 400, 300
		GCLEAR 0, 0xFFFFFF

		; 设置红色画笔和蓝色画刷
		GSETPEN 0, 0xFF0000, 3
		GSETBRUSH 0, 0x0000FF

		; 添加三角形顶点
		G_POLYGON_POINT_ADD 0, 50, 50
		G_POLYGON_POINT_ADD 0, 350, 50
		G_POLYGON_POINT_ADD 0, 200, 250

		; 先填充再描边
		G_POLYGON_FILL 0
		G_POLYGON_DRAW 0

		; 显示
		CBGSETG 0, 0, 0, 0
		WAIT
	```

### 相关项目
- [GCREATE](GCREATE.md)
- [GSETPEN](GSETPEN.md)
- [GSETBRUSH](GSETBRUSH.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.md)