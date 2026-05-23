---
hide:
  - toc
---

# GGETFONT

| 函数名                                                       | 参数  | 返回值   |
| :----------------------------------------------------------- | :---- | :------- |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.zh.md) | `int` | `string` |

!!! info "API"

    ``` { #language-erbapi }
    string GGETFONT gID
    ```

    返回指定的 `gID` 使用 `GSETFONT` 设置的字体名称。

!!! warning "Skia版注意"

    `GCREATE` 后未调用 `GSETFONT` 就调用 `GGETFONT` 时，EM+EE 会抛出 NullReferenceException，而 Skia 版返回空字符串 `""`。

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

### 相关项目
- [GSETFONT](GSETFONT.zh.md)
- [GGETFONTSIZE](GGETFONTSIZE.zh.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.zh.md)