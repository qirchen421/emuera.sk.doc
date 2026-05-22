---
hide:
  - toc
---

# MAX, MIN, LIMIT, INRANGE

| 函数名                                                     | 参数                | 返回值 |
| :--------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.zh.md)     | `int`(, `int`...)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.zh.md)     | `int`(, `int`...)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.zh.md)   | `int`, `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.zh.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAX int(, int...)
	int MIN int(, int...)
	int LIMIT int, minValue, maxValue
	int INRANGE int, minValue, maxValue
    ```
	`MAX` 返回参数中的最大值。

	`MIN` 返回参数中的最小值。

	`LIMIT` 返回第一个参数的值。
	但是，如果第一个参数小于第二个参数，则返回第二个参数的值；如果大于第三个参数，则返回第三个参数的值。
	例如，当你想将 `X - Y` 赋值给 `A`，但希望赋值后的值在 `0` 到 `100` 之间时，通常需要这样写：

    ```  { #language-erbapi }
	A = X - Y
	SIF A < 0
		A = 0
	SIF A > 100
		A = 100
	```

	使用 `LIMIT` 命令可以将此操作简化为两行甚至一行。

    ```  { #language-erbapi }
    LIMIT X - Y, 0, 100
    A = RESULT

    A = LIMIT(X - Y, 0, 100)
    ```

    `INRANGE` 在第一参数的值大于等于第二参数且小于等于第三参数时返回 `1`，在第一参数小于第二参数或大于第三参数时返回 `0`。

!!! hint "提示"

    该功能同时支持命令形式和函数形式。

### 相关项目
- [MAXARRAY,MINARRAY](MAXMINARRAY.zh.md)