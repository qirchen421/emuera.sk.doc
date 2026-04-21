---
hide:
  - toc
---

# SETCOLOR, RESETCOLOR

| 函数名                                                             | 参数                  | 返回值 |
| :----------------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.md)   | `int`, `int`, `int`   | 无     |
|                                                                    | `int`                 | 无     |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.md) | 无                    | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SETCOLOR R, G, B
	SETCOLOR hexaDecimal
	RESETCOLOR
    ```
	将文字颜色更改为指定颜色，该设置将持续生效，直到调用`RESETCOLOR`。  
	指定方式为`RGB`格式。  
	使用`SETCOLOR`指定的颜色可以通过`RESETCOLOR`重置。  
	当前文字颜色可通过[`GETCOLOR`](./GETCOLOR.md)获取，默认文字颜色可通过[`GETDEFCOLOR`](./GETCOLOR.md)获取。  
	自1.731版本起，`SETCOLOR`支持使用`0xRRGGBB`格式指定颜色。  
	如需使用颜色名称指定，请使用[`SETCOLORBYNAME`](./SETCOLORBYNAME.md)。

    ```  { #language-erbapi }
	SETCOLOR 255, 128, 0
	SETCOLOR 0xFF8000
	```

这两行代码具有相同的效果。通过 [`GETCOLOR`](./GETCOLOR.md) 命令获取到的颜色值将是后一种格式。

!!! hint "提示"

    此功能仅支持命令形式。

### 相关项目
- [SETBGMCOLOR](SETBGCOLOR.md)
- [SETCOLORBYNAME](SETCOLORBYNAME.md)