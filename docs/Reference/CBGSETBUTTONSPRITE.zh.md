---
hide:
  - toc
---

# CBGSETBUTTONSPRITE

| 函数名                                                                               | 参数                                                        | 返回值 |
| :----------------------------------------------------------------------------------- | :---------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.zh.md) | `int`, `string`, `string`, `int`, `int`, `zDepth`           | `int`  |
|                                                                                      | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth
	int CBGSETBUTTONSPRITE button, spriteName, spriteNameB, x, y, zDepth, tooltip
    ```
	此命令与[`CBGSETBMAPG`](./CBGSETBMAPG.zh.md)命令设置的按钮映射联动，用于设置可选择的按钮。  
	当鼠标正下方的按钮映射图像颜色的`0xRRGGBB`值与参数`button`相等时，将显示`spriteNameB`指定的精灵；其他情况下，则显示`spriteName`指定的精灵。  
	`spriteName`或`spriteNameB`可以指定为空字符串，这种情况下，在非选中或选中状态将不显示任何内容。  
	`x, y, zdepth`参数与[`CBGSETSPRITE`](./CBGSETSPRITE.zh.md)命令相同。请注意，基准位置`(x,y) = (0,0)`是屏幕左下角与图像左下角重合的位置。  
	可选地，可以通过`tooltip`参数指定选中该按钮时显示的工具提示字符串。  
	可以为同一个`button`值分配多个`CBGSETBUTTONSPRITE`命令，并且按钮的位置无需与图像位置一致。  
	在这种情况下，工具提示的显示与图像的`x, y`位置无关，将优先显示在设置了工具提示字符串的精灵中`zDepth`值最大的那个（最先被绘制、看起来在最底层的精灵）。

!!! hint "提示"

    命令和表达式函数均支持。