---
hide:
  - toc
---

# CBRT, LOG, LOG10, EXPOMENT

| 函数名                                                                 | 参数  | 返回值 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)     | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)      | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)    | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBRT value
	int LOG value
	int LOG10 value
	int EXPOMENT value
    ```
	以下摘自私家改造版更新日志  

		新增数学函数作为表达式内函数
		CBRT（立方根）
		LOG（自然对数）
		LOG10（常用对数）
		EXPONENT（指数函数）
		所有格式均为：函数名(参数)

	由于 Emuera 无法处理小数，使用时需要一些技巧。  

!!! hint "提示"

    同时支持指令和表达式内函数两种形式。