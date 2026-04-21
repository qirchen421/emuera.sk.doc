---
hide:
  - toc
---

# SETBGCOLOR

| 函数名                                                                 | 参数                | 返回值 |
| :--------------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.md)   | `int`, `int`, `int` | 无     |
|                                                                        | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.md) | 无                  | 无     |

!!! info "API"

    ```  { #language-erbapi }
	SETBGCOLOR R, G, B
	SETBGCOLOR hexaDecimal
	RESETBGCOLOR
    ```
	此命令用于将背景色更改为指定颜色。  
	其基本规格与 [`SETCOLOR`・`RESETCOLOR`](./SETCOLOR.md) 相同，但出于安全考虑，如果在更改后的 0.2 秒内再次更改，将强制等待直到 0.2 秒过去。  
	可以使用 [`GETBGCOLOR`](./GETCOLOR.md) 获取当前背景色，使用 [`GETDEFBGCOLOR`](GETCOLOR.md) 获取默认背景色。  
	如需使用颜色名称指定，请使用 [`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md)。

    ```  { #language-erbapi }
	SETBGCOLOR 255, 128, 0
	SETBGCOLOR 0xFF8000
	```

这两行代码具有相同的含义。通过 [`GETBGCOLOR`](./GETCOLOR.md) 指令获取的值为后者（即十六进制格式）。

!!! hint "提示"

    仅指令本身支持两种格式。

### 相关项目
- [SETCOLOR](SETCOLOR.md)