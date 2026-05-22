---
hide:
  - toc
---

# SPRITESETPOS

| 函数名                                                                   | 参数                   | 返回值 |
| :----------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.zh.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITESETPOS spriteName, posX, posY
    ```
    设置指定名称的精灵的相对位置 `X`、`Y`。  
    成功时返回非0值，若因指定精灵未创建或已销毁等原因失败则返回0。

!!! hint "提示"

    同时支持指令和表达式函数形式。