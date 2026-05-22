---
hide:
  - toc
---

# MAX, MIN, LIMIT, INRANGE

| Function name                                               | Arguments              | Return |
| :---------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.en.md)       | `int`(, `int`...)     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.en.md)       | `int`(, `int`...)     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.en.md)    | `int`, `int`, `int`   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.en.md)  | `int`, `int`, `int`   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAX int(, int...)
	int MIN int(, int...)
	int LIMIT int, minValue, maxValue
	int INRANGE int, minValue, maxValue
    ```
	`MAX` returns the maximum value among the arguments.

	`MIN` returns the minimum value among the arguments.

	`LIMIT` returns the value of the first argument.
	However, if the first argument is less than the second argument, it returns the second argument. If it is greater than the third argument, it returns the third argument.
	For example, if you want to assign `X - Y` to `A` but ensure the value after assignment is between `0` and `100`, you would normally write:

    ```  { #language-erbapi }
	A = X - Y
	SIF A < 0
		A = 0
	SIF A > 100
		A = 100
    ```

	The `LIMIT` command allows you to combine this into two lines or one line.

    ```  { #language-erbapi }
	LIMIT X - Y, 0, 100
	A = RESULT

	A = LIMIT(X - Y, 0, 100)
    ```

	`INRANGE` returns `1` if the first argument's value is greater than or equal to the second argument and less than or equal to the third argument. It returns `0` if the first argument is less than the second or greater than the third.

!!! hint "Hint"

    Both command and expression function forms are available.

### Related
- [MAXARRAY, MINARRAY](MAXMINARRAY.en.md)
