---
hide:
  - toc
---

# SPRITEMOVE

| 函数名                                                               | 参数                   | 返回值 |
| :------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.zh.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEMOVE spriteName, movex, movey
    ```
	将指定的值加到指定名称的精灵的相对位置的X、Y坐标上。
	也就是说，

		SPRITESETPOS spriteName, SPRITEPOSX(spriteName) + movex, SPRITEPOSY(spriteName) + movey

	是等价的。
	成功时返回非0值，如果因指定的精灵未创建或已销毁等原因失败，则返回0。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。