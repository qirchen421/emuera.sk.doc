---
hide:
  - toc
---

# TOOLTIP_SETCOLOR

| 函数名                                                                           | 参数         | 返回值 |
| :------------------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.md) | `int`, `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	TOOLTIP_SETCOLOR colorCode, colorCode
    ```
	设置工具提示的前景色和背景色，使用 0xRRGGBB 格式的数值。第一个参数是文字颜色，第二个参数是背景颜色。  
	如果想使用 R、G、B 值或字符串来指定颜色，请使用 [`COLOR_FROMRGB`](./COLOR_FROM.md) 或 [`COLOR_FROMNAME`](./COLOR_FROM.md) 函数。  

	此指令在原版 Emuera 中无效。它是 EM+EE 中新增的功能，需与 [`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md) 配合使用才能生效。  

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [工具提示扩展功能](TOOLTIP_EXTENSION.md)
- [工具提示显示操作](TOOLTIP_SET.md)