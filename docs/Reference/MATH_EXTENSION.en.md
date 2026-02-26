---
hide:
  - toc
---

# CBRT, LOG, LOG10, EXPONENT

| Function name                                                                  | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)            | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)             | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)           | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPONENT`](./MATH_EXTENSION.md)        | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBRT value
	int LOG value
	int LOG10 value
	int EXPONENT value
    ```
	From the private modification changelog:

		Added mathematical functions as expression functions
		CBRT (cube root)
		LOG (natural logarithm)
		LOG10 (common logarithm)
		EXPONENT (exponential function)
		Format for all: functionName(argument)

	Since Emuera cannot handle decimal values, some ingenuity is required when using these functions.

!!! hint "Hint"

    Both command and expression function forms are available.
