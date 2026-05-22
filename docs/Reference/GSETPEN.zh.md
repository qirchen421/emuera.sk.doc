---
hide:
  - toc
---

# GSETPEN

| 函数名                                                         | 参数                | 返回值 |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.zh.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETPEN gID, cARGB, penWidth
    ```
	为指定`gID`的`Graphics`对象设置指定颜色和宽度的画笔。  
	指定的画笔将被记忆，直到通过[`GDISPOSE`](./GDISPOSE.zh.md)命令销毁该`Graphics`对象为止。  
	处理成功时返回非0值。  
	要获取已设置的画笔颜色和画笔宽度，请分别使用[`GGETPEN`](./GGETPEN.zh.md)和[`GGETPENWIDTH`](./GGETPENWIDTH.zh.md)。  
	通过`GSETPEN`设置的画笔颜色和宽度将用于以下命令/表达式函数：

	- [`GDRAWTEXT`](./GDRAWTEXT.zh.md)
	- [`GDRAWLINE`](./GDRAWLINE.zh.md)

!!! hint "提示"

    同时支持命令形式和表达式函数形式。

### 相关项目
- [GDRAWTEXT](GDRAWTEXT.zh.md)
- [GDRAWLINE](GDRAWLINE.zh.md)
- [GGETPEN](GGETPEN.zh.md)
- [GGETPENWIDTH](GGETPENWIDTH.zh.md)