---
hide:
  - toc
---

# GSETBRUSH

| 函数名                                                             | 参数         | 返回值 |
| :----------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GSETBRUSH gID, cARGB
    ```
    为指定ID的Graphics对象设置指定颜色的画刷。  
    指定的画刷在Graphics对象被GDISPOSE命令销毁前会一直保持。  
    处理成功时返回非0值。  
    设置好的画刷颜色可以通过[`GGETBRUSH`](./GGETBRUSH.md)获取。  
    此处设置的画刷颜色将在以下命令/表达式中函数中使用：

    - [`GFILLRECTANGLE`](./GFILLRECTANGLE.md)

!!! hint "提示"

    同时支持命令形式和表达式函数形式。

### 相关项目
- [GGETBRUSH](GGETBRUSH.md)
- [GFILLRECTANGLE](GFILLRECTANGLE.md)