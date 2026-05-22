---
hide:
  - toc
---

# SPRITEWIDTH, SPRITEHEIGHT

| 函数名                                                                        | 参数     | 返回值 |
| :---------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.zh.md)  | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.zh.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int SPRITEWIDTH spriteName
    int SPRITEHEIGHT spriteName
    ```
    获取指定名称的精灵的宽度或高度。
    如果精灵尚未创建或已被销毁，则返回0。

!!! hint "提示"

    该函数同时支持在指令和表达式中使用。