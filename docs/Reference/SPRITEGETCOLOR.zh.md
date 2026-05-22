---
hide:
  - toc
---

# SPRITEGETCOLOR

| 函数名                                                                       | 参数                   | 返回值 |
| :--------------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.zh.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEGETCOLOR spriteName, x, y
    ```
    获取指定`spriteName`资源名对应的精灵在指定位置的颜色，以`0xAARRGGBB`格式的整数值返回。  
    如果`spriteName`指定的精灵未创建或已销毁，或者`x, y`坐标位于图像范围之外，则返回-1。

    请注意，这是唯一一个在失败时返回-1而非0的命令。  
    当获取到的位置颜色为黑色且完全透明时，此命令将返回0。

!!! hint "提示"

    此功能同时支持作为命令和表达式函数使用。