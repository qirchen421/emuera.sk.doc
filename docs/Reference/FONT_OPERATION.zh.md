---
hide:
  - toc
---

# 字体操作相关

| 函数名                                                                     | 参数 | 返回值 |
| :------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.zh.md)     | 无   | 无     |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.zh.md)   | 无   | 无     |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.zh.md)    | `int`| 无     |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.zh.md)  | 无   | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.zh.md)     | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	FONTBOLD
	FONTITALIC
	FONTSTYLE
	FONTREGULAR bitStyle
	int GETSTYLE
    ```
	将后续文字更改为指定样式  
	`BOLD`和`ITALIC`可以叠加（粗斜体）  
	调用`REGULAR`将取消粗体和斜体设置  

	FONTSTYLE 将后续文字更改为指定样式。  
	0为常规，1为粗体（与`FONTBOLD`同义），2为斜体（与`FONTITALIC`同义），4为删除线，8为下划线。  
	这些样式可以按位组合。  
	例如，FONTSTYLE 3 表示粗体且斜体。  
	`FONTBOLD`、`FONTITALIC`会在当前样式上分别添加粗体、斜体样式。  
	`FONTREGULAR`等同于`FONTSTYLE 0`，即恢复为常规样式。

    `GETSTYLE` 会将当前字体的样式（粗体、斜体等）赋值给 `RESULT:0`。
    这与 `SETSTYLE` 指令指定的值相同。
    当未执行 `SETSTYLE` 指令时，返回 `0`。

!!! hint "提示"

    只有 `GETSTYLE` 支持在表达式中作为函数使用。

!!! example "示例"
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		FONTSTYLE 1 + 2
		PRINTL 粗体+斜体
		FONTSTYLE 5
		PRINTL 粗体+删除线
		FONTITALIC
		PRINTL 粗体+斜体+删除线
		PRINTFORML GETSTYLE:{GETSTYLE()}
		FONTSTYLE 0
		PRINTW 正常
    ``` 
	![](../assets/images/FONT_OPERATION.png)