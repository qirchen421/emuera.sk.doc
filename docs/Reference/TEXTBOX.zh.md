---
hide:
    - toc
---

# 输入框相关命令

| 函数名                                                           | 参数                | 返回值   |
| :--------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.zh.md)    | `string`            | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.zh.md)    | 无                  | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.zh.md)   | `int`, `int`, `int` | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.zh.md) | 无                  | `1`      |

!!! info "API"

    ``` { #language-erbapi }
    1 SETTEXTBOX text
    string GETTEXTBOX
    1 MOVETEXTBOX xPos, yPos, width
    1 RESUMETEXTBOX
    ```

    - `SETTEXTBOX`：将输入框内容替换为 `text`。
    - `GETTEXTBOX`：返回执行时输入框内的字符串。
    - `MOVETEXTBOX`：下次执行 `INPUT` / `INPUTS` 时将输入框移的宽度设置为`width`，并移动端指定位置。
        - 基准位置 (`xPos`, `yPos`) = (`0`, `0`) 为画面左下角。`yPos` 为正时向上移动。
        - 画面向上卷动（浏览历史记录）时，输入框会暂时返回原本位置。
        - `INPUT` / `INPUTS` 结束后，输入框返回原本位置。
    - `RESUMETEXTBOX`：无效上一次 `MOVETEXTBOX` 的设置，令输入框返回原本位置。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。
