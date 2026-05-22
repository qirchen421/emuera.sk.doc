---
hide:
  - toc
---

# ABS, SIGN

| 函数名                                                  | 参数 | 返回值 |
| :------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.zh.md)  | `int`| `int`  |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.zh.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int ABS int
	int SIGN int
    ```
	这是分别用于计算绝对值和表示正负方向的命令/表达式函数。
	`ABS`返回绝对值，`SIGN`在值为负时返回`-1`，为`0`时返回`0`，为正时返回`1`。

!!! hint "提示"

    同时支持指令和表达式函数。