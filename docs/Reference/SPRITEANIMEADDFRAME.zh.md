---
hide:
  - toc
---

# SPRITEANIMEADDFRAME

| 函数名                                                                                 | 参数                                                             | 返回值 |
| :------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMEADDFRAME spriteName, gID, x, y, width, height, offsetx, offsety, delay
    ```
	向`spriteName`指定的资源名所对应的动画精灵添加帧。  
	将`gID`指定的`Graphics`中，由`x`, `y`, `width`, `height`指定的矩形区域作为帧，并放置在精灵左上角偏移`offsetx`, `offsety`的位置。  
	超出创建动画精灵时设定尺寸范围的部分将不会被绘制。  
	`delay`用于指定此帧的显示时间，单位为毫秒。  
	如果`spriteName`指定的资源名不存在，或者不是动画精灵，则此命令失败，不执行任何操作。  
	如果帧添加成功则返回1，失败则返回0。  

!!! hint "提示"

命令、式中函数均可使用。

### 相关项目
- [SPRITRANIMECREATE](SPRITEANIMECREATE.md)