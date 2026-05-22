---
hide:
  - toc
---

# PRINT_IMG

| 函数名                                                                                              | 参数                                                         | 返回值 |
| :-------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.zh.md) | `string`                                                     | 无     |
|                                                                                                     | `string`, `int`, `int`, `int`                                | 无     |
|                                                                                                     | `string`, `string`, `int`, `int`, `int`                      | 无     |
|                                                                                                     | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_IMG spriteName
	PRINT_IMG spriteName, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, width, height, ypos
	PRINT_IMG spriteName, spriteNameBack, colorMatrix, width, height, ypos
    ```
	在行中显示指定的图像。  
	相当于 [`HTML_PRINT` 命令的 `<img>` 标签](../Emuera/HTML_PRINT.md#img)。  
	EM+EE 中扩展了语法。详情请参阅[摘要](../EMEE/EMEE_Summary.zh.md)。  

!!! hint "提示"

    仅支持命令形式。  

### 相关项目
- [SPRITECREATE](SPRITECREATE.zh.md)