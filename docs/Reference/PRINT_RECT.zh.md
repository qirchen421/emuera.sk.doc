---
hide:
  - toc
---

# PRINT_RECT

| 函数名                                                               | 参数                       | 返回值 |
| :------------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.zh.md) | `int`                      | 无     |
|                                                                      | `int`, `int`, `int`, `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_RECT width
	PRINT_RECT xPos, yPos, width, height
    ```
	在行内显示一个宽度为字体大小参数百分比的长方形。或者，在行内显示一个`x`、`y`、`宽度`、`高度`分别为参数百分比的长方形。  
	可以通过`SETCOLOR`命令像改变字体颜色一样改变其颜色。  
	相当于[`HTML_PRINT`命令的`<shape type='rect'>`标签](../Emuera/HTML_PRINT.md#shape)。  
	在EM+EE中，也支持使用`px`单位进行指定。  

!!! hint "提示"

    仅支持命令形式。