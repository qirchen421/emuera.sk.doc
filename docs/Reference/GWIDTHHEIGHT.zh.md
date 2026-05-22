---
hide:
  - toc
---

# GWIDTH, GHEIGHT

| 函数名                                                              | 参数  | 返回值 |
| :------------------------------------------------------------------ | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.zh.md)  | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.zh.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GWIDTH gID
	int GHEIGHT gID
    ```
	获取指定`gID`的`Graphics`的宽度或高度。  
	如果`Graphics`尚未创建（包括已销毁的），则返回0。  

!!! hint "提示"

    该函数同时支持指令和表达式函数两种使用方式。