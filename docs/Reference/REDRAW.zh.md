---
hide:
  - toc
---

# REDRAW, CURRENTREDRAW

| 函数名                                                              | 参数 | 返回值 |
| :------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.zh.md)        | `int`| 无     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.zh.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    REDRAW int
    int CUREENTREDRAW
    ```
	这是绘图控制命令。  
	当参数指定为`0`时，仅在需要用户输入的时刻进行绘图。  
	当参数指定为`1`时，将如常按照[配置中的`每秒帧数`](../Emuera/config.md#_16)所指定的时机进行绘图。  
	若在参数上加上`2`（例如`REDRAW 2`或`REDRAW 3`），则在上述效果的基础上，还会在执行`REDRAW`命令的瞬间强制进行绘图。  
	当前的`REDRAW`状态（`0`或`1`）可以通过`CURRENTREDRAW`获取。  

!!! hint "提示"

    `CURRENTREDRAW`支持在表达式中作为函数使用。