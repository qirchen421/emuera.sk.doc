---
hide:
  - toc
---

# COLOR_FROMNAME, COLOR_FROMRGB

| 函数名                                                                   | 参数                | 返回值   |
| :----------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.md) | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.md)  | `int`, `int`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	int COLOR_FROMNAME colorName
	string COLOR_ROMRGB R, G, B
    ```
	`COLOR_FROMNAME` 将给定的参数作为颜色名进行判断，并返回 `0xRRGGBB` 格式的数值。  
	如果不存在对应的颜色名，则返回 -1。

	`COLOR_FROMRGB` 将给定的 `R, G, B` 值作为 `0xRRGGBB` 格式的数值返回。
	如果参数超出 `0-255` 的范围，将发生错误。

!!! hint "提示"

    同时支持指令和表达式函数。

### 相关项目
- [SETCOLOR](SETCOLOR.md)