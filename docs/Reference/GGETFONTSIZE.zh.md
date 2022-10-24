---
hide:
  - toc
---

# GGETFONTSIZE

| 函数名                                                               | 参数  | 返回值 |
| :------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md) | `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int GGETFONTSIZE gID
    ```

    返回指定的 `gID` 使用 `GSETFONT` 设置的字体大小。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	GCREATE 0, 100, 100
    	GSETFONT 0, "Arial", 100

    	GCREATE 1, 100, 100
    	GSETFONT 1, "ＭＳ ゴシック", 200

    	PRINTVL GGETFONTSIZE(0)
    	PRINTVL GGETFONTSIZE(1)
    	WAIT
    ```

    ``` title="输出结果"
    100
    200
    ```
