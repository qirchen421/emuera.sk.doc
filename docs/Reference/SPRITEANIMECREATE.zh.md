---
hide:
  - toc
---

# SPRITEANIMECREATE

| 函数名                                                                             | 参数                   | 返回值 |
| :--------------------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMECREATE spriteName, width, height
    ```
	创建一个动画精灵，其资源名由 `spriteName` 指定，尺寸由 `width` 和 `height` 指定。创建成功时返回非0值。  
	若因已存在相同资源名的精灵等原因导致失败，则返回0。  
	要使其产生动画效果，需要使用 [`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) 指令添加帧。  
	关于动画精灵的注意事项，也请参阅 [`resouces`](../Emuera/resources.md)。  

!!! hint "提示"

    该指令同时支持在指令和表达式中使用。

### 相关项目
- [SPRITEANIMEADDFRAME](SPRITEANIMEADDFRAME.md)
- [SETANIMETIMER](SETANIMETIMER.md)