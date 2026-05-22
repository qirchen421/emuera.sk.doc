---
hide:
  - toc
---

# SPRITEPOSX, SPRITEPOSY

| 函数名                                                                | 参数     | 返回值 |
| :-------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.zh.md) | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.zh.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int SPRITEPOSX spriteName
    int SPRITEPOSY spriteName
    ```
    获取指定名称的精灵的相对位置的 `X`、`Y` 坐标。
    如果精灵尚未创建或已被销毁，则返回 0。
    要区分相对位置的 `X`、`Y` 坐标是 0 还是精灵未创建/已销毁，请另外调用 [`SPRITECREATED`](./SPRITECREATED.zh.md)。

!!! hint "提示"

    该函数在指令和表达式中均可使用。