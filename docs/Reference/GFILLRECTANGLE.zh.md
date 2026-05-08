---
hide:
  - toc
---

# GFILLRECTANGLE

| 函数名                                                                       | 参数                              | 返回值 |
| :--------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GFILLRECTANGLE gID, x, y, width, height
    ```
    在指定的`gID`对应的`Graphics`上，绘制由`x`, `y`, `width`, `height`定义的矩形。  
    如果处理成功，则返回非0值。  
    绘制颜色必须预先通过[`GSETBRUSH`](./GSETBRUSH.md)命令指定，否则将使用Emuera配置中的文字颜色进行绘制。

!!! hint "提示"

    此功能同时支持作为命令和表达式内函数使用。

### 相关项目
- [GSETBRUSH](GSETBRUSH.md)