# GGETFONT

| 函数名                                                       | 参数  | 返回值   |
| :----------------------------------------------------------- | :---- | :------- |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md) | `int` | `string` |

!!! info "API"

    ``` { #language-erbapi }
    int GGETFONT gID
    ```

    返回指定的 `gID` 使用 `GSETFONT` 设置的字体名称。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	GCREATE 0, 100, 100
    	GSETFONT 0, "Arial", 100

    	GCREATE 1, 100, 100
    	GSETFONT 1, "ＭＳ ゴシック", 100

    	PRINTSL GGETFONT(0)
    	PRINTSL GGETFONT(1)
    	WAIT
    ```

    ``` title="输出结果"
    Arial
    ＭＳ ゴシック
    ```
