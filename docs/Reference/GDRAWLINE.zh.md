---
hide:
  - toc
---

# GDRAWLINE

| 函数名                                                         | 参数                              | 返回值 |
| :------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.md) | `int`, `int`, `int`, `int`, `int` | 1      |

!!! info "API"

	``` { #language-erbapi }
	int GDRAWline gID, fromX, fromY, forX, forY
	```

    在`gID`指定的`Graphics`上，从`fromX`,`fromY`坐标到`forX`,`forY`坐标绘制一条直线。  
    线条的颜色和粗细使用`GSETPEN`指定的设置。

!!! hint "提示"

    该功能同时支持命令形式和函数形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIM DYNAMIC LCOUNT

		FOR LCOUNT, 0, 5
			GCREATE LCOUNT, 100, 100
			GCLEAR LCOUNT, 0xFFFFFFFF
			GSETPEN LCOUNT, 0xFFFF0000, 5
			GDRAWLINE LCOUNT, 0, 0, 100, (LCOUNT+1)*20
			SPRITECREATE @"LINE{LCOUNT}", LCOUNT
			HTML_PRINT @"<img src='LINE{LCOUNT}' srcb='' height='500'>"
			REPEAT 4
				PRINTL
			REND
		NEXT
		WAIT
	```

	![](../assets/images/GDRAWLINE.png)

### 相关项目
- [GSETPEN](GSETPEN.md)
- [GDASHSTYLE](GDASHSTYLE.md)