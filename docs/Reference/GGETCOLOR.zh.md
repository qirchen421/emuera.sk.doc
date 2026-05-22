---
hide:
  - toc
---

# GGETCOLOR

| 函数名                                                             | 参数                | 返回值 |
| :----------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GGETCOLOR`](./GGETCOLOR.zh.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GGETCOLOR gID, x, y
    ```
    获取指定`gID`的`Graphics`在指定位置的颜色，以`0xAARRGGBB`格式的整数值返回。  
    如果`Graphics`未创建或已销毁，或者`x,y`位于图像范围之外，则返回-1。

    请注意，此命令是唯一一个在失败时返回-1而非0的命令。  
    当获取到黑色且完全透明位置的颜色时，此命令将返回0。

!!! hint "提示"

    同时支持作为命令和表达式函数使用。

### 相关项目
- [GSETCOLOR](GSETCOLOR.zh.md)