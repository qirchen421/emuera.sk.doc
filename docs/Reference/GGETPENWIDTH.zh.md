---
hide:
  - toc
---

# GGETPENWIDTH

| 函数名                                                               | 参数  | 返回值 |
| :------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.zh.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETPENWIDTH gID
	```

	返回  `gID` 代表的图像中 `GSETPEN` 所指定的画笔宽度。

!!! warning "Skia版注意"

	`GCREATE` 后未调用 `GSETPEN` 就调用 `GGETPENWIDTH` 时，EM+EE 会抛出 NullReferenceException，而 Skia 版返回 `0`。

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
- [GSETPEN](GSETPEN.zh.md)
- [GGETPENWIDTH](GGETPENWIDTH.zh.md)