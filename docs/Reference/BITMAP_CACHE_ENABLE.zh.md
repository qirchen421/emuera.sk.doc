---
hide:
  - toc
---

# BITMAP_CACHE_ENABLE

制作者：JukesBouver99

| 函数名                                             | 参数  | 返回值 |
| :------------------------------------------------- | :---- | :----- |
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.md) | `int` | void   |

!!! info "API"

    ```  { #language-erbapi }
    BITMAP_CACHE_ENABLE bool
    ```

    通过将频繁改变颜色的文本作为位图进行绘制，以提高绘制速度。  
    启用后，将应用于之后的所有行。通过用 `BITMAP_CACHE_ENABLE 1` 和 `BITMAP_CACHE_ENABLE 0` 包围处理负荷较重的部分，有望实现加速。

    启用此功能后，文本的显示位置可能会发生偏移。

!!! hint "提示"

    该功能同时支持指令和表达式函数两种形式。