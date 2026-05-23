---
hide:
  - toc
---

# GGETBRUSH

| 函数名                                                         | 参数  | 返回值 |
| :------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.zh.md) | `int` | `int`  |

!!! info "API"

	``` { #language-erbapi }
	int GGETBRUSH gID
	```

	返回  `gID` 代表的图像中 `GSETBRUSH` 所指定的颜色（cARGB）。

!!! warning "Skia版注意"

	`GCREATE` 后未调用 `GSETBRUSH` 就调用 `GGETBRUSH` 时，EM+EE 会抛出 NullReferenceException，而 Skia 版返回 `0`。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		GCREATE 0, 100, 100
		GSETBRUSH 0, 0xFF112233

		PRINTFORMW Color:{GGETBRUSH(0)}(%CONVERT(GGETBRUSH(0), 16)%)
	```

	``` title="输出结果"
	Color:4279312947(ff112233)
	```

### 相关项目
- [GSETBRUSH](GSETBRUSH.zh.md)