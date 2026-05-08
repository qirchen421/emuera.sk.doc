---
hide:
  - toc
---

# SETCOLORBYNAME, SETBGCOLORBYNAME

| 函数名                                                                         | 参数        | 返回值 |
| :----------------------------------------------------------------------------- | :---------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SETCOLORBYNAME`](./SETCOLORBYNAME.md)   | `colorName` | 无     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md) | `colorName` | 无     |

!!! info "API"

    ``` { #language-erbapi }
	SETCOLOBYNAME colorName
	SETBGCOLORBYNAME colorName
    ```
	此指令用于根据预定义的颜色名称来指定字体显示颜色或背景颜色。  
	所有其他规范均与 [`SETCOLOR`](./SETCOLOR.md) 和 [`SETBGCOLOR`](./SETBGCOLOR.md) 相同。参数为颜色名称。预定义的颜色名称遵循 [KnownColor 枚举](https://learn.microsoft.com/ja-jp/dotnet/api/system.drawing.knowncolor)，请参考该文档。

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		SETCOLORBYNAME yellow
		PRINTL yellow
		SETCOLORBYNAME green
		PRINTL green
		SETCOLORBYNAME blue
		PRINTW blue
    ``` 
	![](../assets/images/SETCOLORBYNAME.png)

### 相关项目
- [SETCOLOR](SETCOLOR.md)