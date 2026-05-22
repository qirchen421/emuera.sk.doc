---
hide:
  - toc
---

# INRANGEARRAY, INRANGECARRAY

| 函数名                                                                   | 参数                                         | 返回值 |
| :----------------------------------------------------------------------- | :------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.zh.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.zh.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int INRANGEARRAY integerArray, minValue, maxValue(, start, end)
	int INRANGEARRAY charaArray, minValue, maxValue(, start, end)
    ```
	`INRANGEARRAY` 返回指定数组中，值满足 `minValue <= value < maxValue` 的元素数量。  
	`INRANGECARRAY` 返回指定角色数组中，值满足 `minValue <= value < maxValue` 的元素数量。

!!! hint "提示"

    同时支持作为指令和表达式函数使用。