---
hide:
  - toc
---

# GGETTEXTSIZE

| 函数名                                                               | 参数                               | 返回值       |
| :------------------------------------------------------------------- | :--------------------------------- | :----------- |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md) | `string`, `string`, `int`(, `int`) | `int`, `int` |

!!! info "API"

    ``` { #language-erbapi }
    int GGETTEXTSIZE text, fontName, fontSize(, fontStyle)
    ```

    预测 `GDRAWTEXT` 使用指定的参数绘制时生成的 `Width` / `Height`（分别代入 `RESULT:0` / `RESULT:1`）。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。若使用行内函数形式需要另行处理 `RESULT:1`，因此推荐使用命令形式。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        GGETTEXTSIZE "USA", "Arial", 150
        PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
        GGETTEXTSIZE "日本", "Arial", 150
        PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
        GGETTEXTSIZE "USA", "ＭＳ Ｐゴシック", 150
        PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
        GGETTEXTSIZE "日本", "ＭＳ Ｐゴシック", 150
        PRINTFORML Width:{RESULT:0} Height:{RESULT:1}
        WAIT
    ```

    ``` title="输出结果"
    Width:308 Height:167
    Width:330 Height:172
    Width:281 Height:150
    Width:300 Height:150
    ```
