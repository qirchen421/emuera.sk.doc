---
hide:
  - toc
---

# BITMAP_CACHE_ENABLE

制作者：JukesBouver99

| 函数名                                             | 参数  | 返回值 |
| :------------------------------------------------- | :---- | :----- |
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.zh.md) | `int` | void   |

!!! info "API"

    ```  { #language-erbapi }
    BITMAP_CACHE_ENABLE bool
    ```

    通过将频繁改变颜色的文本作为位图进行绘制，以提高绘制速度。  
    启用后，将应用于之后的所有行。通过用 `BITMAP_CACHE_ENABLE 1` 和 `BITMAP_CACHE_ENABLE 0` 包围处理负荷较重的部分，有望实现加速。

    启用此功能后，文本的显示位置可能会发生偏移。

!!! hint "提示"

    该功能同时支持指令和表达式函数两种形式。

!!! skia "Skia版的变更"

    | 项目 | EM+EE | Skia版 |
    |:---|:---|:---|
    | `BITMAP_CACHE_ENABLE` | 式中函数（有返回值） | 命令（无返回值） |

    EM+EE 中作为式中函数实现，Skia 版重构为命令。功能本身无变化。

### 相关项目
- [命令 vs 表达式 — 两种求值路径的根本差异](../tutorial/command-vs-expression.zh.md) — RESULT 污染问题与式中函数重构为命令的原因
- [Skia版规格变更一览](../Skia/Skia_Summary.zh.md#changed-commands)