---
hide:
  - toc
---

# HTML_PRINT

| 函数名                                                               | 参数     | 返回值 |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	HTML_PRINT htmlStyleString
    ```
	这是一个使用类似HTML标签进行[`PRINT`](./PRINT.zh.md)的命令。  
	其参数不是像`PRINT`那样的字符串，而是与`PRINTS`相同的字符串表达式，并且会自动换行，因此其行为实际上更接近`PRINTSL`。（在EM+EE版本中，添加了不换行的选项）
	`HTML_PRINT`的绘制不受[`ALIGNMENT`](./ALIGNMENT.zh.md)、[`SETFONT`](./SETFONT.zh.md)、[`SETCOLOR`](./SETCOLOR.zh.md)、[`FONTSTYLE`](./FONT_OPERATION.zh.md)命令及其类似命令的影响。
	要获得这些效果，必须全部通过标签来指定。
	详情请参阅[`HTML_PRINT`相关](../Emuera/HTML_PRINT.zh.md)。

!!! hint "提示"

    仅支持作为命令使用。

### 相关项目
- [HTML_PRINT相关](../Emuera/HTML_PRINT.zh.md)