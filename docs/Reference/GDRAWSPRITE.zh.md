---
hide:
  - toc
---

# GDRAWSPRITE

| 函数名                                                                 | 参数                                                           | 返回值 |
| :--------------------------------------------------------------------- | :------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.zh.md) | `int`, `string`                                                | `int`  |
|                                                                        | `int`, `string`, `int`, `int`                                  | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                    | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWSPRITE gID, spriteName
	int GDRAWSPRITE gID, spriteName, destX, destY
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight, colorMatrix
    ```
	在指定`gID`的`Graphics`上，绘制指定`spriteName`的`Sprite`。  
	可选地，通过`destX,destY`指定`Graphics`内部的位置，将`Sprite`绘制在该位置。  
	此外，通过`destWidth,destHeight`指定绘制宽度和高度，可以将`Sprite`放大或缩小到该尺寸进行绘制。  
	更进一步，在`colorMatrix`中指定一个5x5矩阵，可以应用颜色矩阵进行绘制。  
	注意，`Sprite`的尺寸可以通过`SPRITEWIDTH(str imgName), SPRITEHEIGHT(str imgName)`函数获取。  
	处理成功时，返回非0值。

    当指定动画精灵时，将绘制运行时的一个帧。

!!! hint "提示"

    同时支持指令和表达式函数。

### 相关项目
- [GDRAWG](GDRAWG.zh.md)