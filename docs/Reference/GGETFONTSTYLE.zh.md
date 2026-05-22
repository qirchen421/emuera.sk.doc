---
hide:
  - toc
---

# GGETFONTSTYLE

| 函数名                                                                 | 参数  | 返回值 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.zh.md) | `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int GGETFONTSTYLE gID
    ```

    返回指定的 `gID` 使用 `GSETFONT` 设置的字体样式标记。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        GCREATE 0, 100, 100
        GSETFONT 0, "Arial", 100, 1|8  ; 0b0001|0b1000 => 0b1001 => 9

        GCREATE 1, 100, 100
        GSETFONT 1, "ＭＳ ゴシック", 100, 2|4  ; 0b0010|0b0100 => 0b0110 => 6

        PRINTVL GGETFONTSTYLE(0)
        PRINTVL GGETFONTSTYLE(1)
        WAIT
    ```

    ``` title="输出结果"
    9
    6
    ```

### 相关项目
- [GSETFONT](GSETFONT.zh.md)
- [GGETFONT](GGETFONT.zh.md)
- [GGETFONTSIZE](GGETFONTSIZE.zh.md)