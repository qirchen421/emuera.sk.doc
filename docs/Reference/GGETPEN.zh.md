---
hide:
  - toc
---

# GGETPEN

| 函数名                                                     | 参数  | 返回值 |
| :--------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](./GGETPEN.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETPEN gID
	```

	返回  `gID` 代表的图像中 `GSETPEN` 所指定的颜色（cARGB）。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETPEN 0, 0xFF00FF00, 5

		PRINTFORMW Color:{GGETPEN(0)}(%CONVERT(GGETPEN(0), 16)%) Width:{GGETPENWIDTH(0)}
	```

	``` title="输出结果"
	Color:4278255360(ff00ff00) Width:5
	```

### 相关项目
- [GSETPEN](GSETPEN.md)
- [GGETPENWIDTH](GGETPENWIDTH.md)