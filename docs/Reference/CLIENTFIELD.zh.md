---
hide:
  - toc
---

# CLIENTWIDTH, CLIENTHEIGHT

| 函数名                                                                  | 参数 | 返回值 |
| :---------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.zh.md)  | 无   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.zh.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CLIENTWIDTH
	INT CLIENTHEIGHT
    ```
    获取客户端区域（窗口绘图区域）的当前宽度或高度。  
    此数值不包含窗口边框、菜单栏、滚动条或文本输入区域的宽度或高度。  
    请注意，`CLIENTHEIGHT` 的值可能在游戏过程中被用户更改。

!!! hint "提示"

    该函数同时支持在指令和表达式中使用。