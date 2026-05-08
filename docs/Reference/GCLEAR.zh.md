---
hide:
  - toc
---

# GCLEAR

| 函数名                                                       | 参数         | 返回值 |
| :----------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.md) | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCLEAR gID, cARGB
    ```
	将指定`gID`的`Graphics`对象的整个区域替换为指定颜色。
	处理成功时返回非0值。
	若`gID`或颜色指定不恰当，将发生错误。

!!! hint "提示"

    同时支持指令形式和表达式函数形式。

### 相关项目
- [GSETCOLOR](GSETCOLOR.md)