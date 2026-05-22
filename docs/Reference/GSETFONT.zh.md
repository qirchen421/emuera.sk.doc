---
hide:
  - toc
---

# GSETFONT

| 函数名                                                           | 参数                               | 返回值 |
| :--------------------------------------------------------------- | :--------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.zh.md) | `int`, `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETFONT gID, fontName, fontSize(, fontStyle)
    ```
	为指定`gID`的`Graphics`对象设置指定名称和尺寸的字体。  
	指定的字体将被记忆，直到使用[`GDISPOSE`](./GDISPOSE.zh.md)命令销毁该`Graphics`对象为止。  
	处理成功时返回非0值。  
	要获取已设置的字体名称和字体尺寸，请使用[`GGETFONT`](./GGETFONT.zh.md)和[`GGETFONTSIZE`](./GGETFONTSIZE.zh.md)。  
	EM+EE版本中增加了可选的第四个参数。可以指定字体样式。使用与[`SETFONT`](./SETFONT.zh.md)相同的4位数值来指定。  
	EM+EE版本中，现在也可以指定[`font`文件夹内的`ttf`、`otf`文件](../EMEE/EMEE_Summary.zh.md)。  
	通过`GSETFONT`设置的字体将在以下命令/表达式中函数中使用。

    - [`GDRAWTEXT`](./GDRAWTEXT.zh.md)

!!! hint "提示"

    该命令同时支持在命令和表达式函数中使用。

### 相关项目
- [GDRAWTEXT](GDRAWTEXT.zh.md)
- [GGETFONT](GGETFONT.zh.md)
- [GGETFONTSIZE](GGETFONTSIZE.zh.md)
- [GGETFONTSTYLE](GGETFONTSTYLE.zh.md)