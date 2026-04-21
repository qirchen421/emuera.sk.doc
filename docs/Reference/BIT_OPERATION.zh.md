---
hide:
  - toc
---

# BIT操作系

| 函数名                                                                 | 参数                                 | 返回值 |
| :--------------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.md)    | `int`, `int`                         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.md)    | `integerVariable`, `int`(, `int`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.md)  | `integerVariable`, `int`(, `int`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.md) | `integerVariable`, `int`(, `int`...) | 无     |

!!! info "API"

    ```  { #language-erbapi }
	int GETBIT targetInt, bit
	SETBIT integerVariable, bit(, bit...)
	CLEARBIT integerVariable, bit(, bit...)
	INVERTBIT integerVariable, bit(, bit...)
    ```
	这是用于位操作的函数。  

	`GETBIT` 用于获取参数中特定的位。
	第一个参数指定目标数字，第二个参数指定要获取的位的位置。第二个参数可以指定的值范围为 `0～63`，指定范围外的数值会导致错误。
	如果第二个参数是常量，例如 `5`，那么：

    ```  { #language-erbapi }
	GETBIT X, 5
	RESULT = (X & 1p5) != 0
	```
	
	这两行代码会产生相同的结果。

    `SETBIT`、`CLEARBIT`、`INVERTBIT` 用于操作第一个参数指定的变量中，由第二个及后续参数指定位置的比特位。
        `SETBIT` 将比特位设为 `1`，`CLEARBIT` 设为 `0`，`INVERTBIT` 则进行翻转。

    ```  { #language-erbapi }
	SETBIT X, A
	CLEARBIT Y, B
	INVERTBIT Z, C
	```

	其结果与以下代码相同：

    ```  { #language-erbapi }
	X |= 1 << A
	Y &= ~(1 << B)
	Z ^= 1 << C
	```

	此外，这些格式与 `GETBIT` 相对应。
	可以通过 `GETBIT(X, A)` 来引用由 `SETBIT X, A` 更改的比特位。

!!! hint "提示"

    除 `SETBIT` 外，其他函数均支持在表达式中使用。

### 相关项目
* [系统改造Q&A>二进制位操作](../manual/erawiki-modification-QandA.md#2stain)
* [ERB制作实践篇>关于位数](../manual/erawiki-ERBmanual.md#_7)