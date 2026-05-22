---
hide:
  - toc
---

# BIT Operation

| Function name                                                                  | Arguments                               | Return |
| :----------------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.en.md)            | `int`, `int`                           | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.en.md)            | `integerVariable`, `int`(, `int`...)   | none   |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.en.md)          | `integerVariable`, `int`(, `int`...)   | none   |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.en.md)        | `integerVariable`, `int`(, `int`...)   | none   |

!!! info "API"

    ```  { #language-erbapi }
	int GETBIT targetInt, bit
	SETBIT integerVariable, bit(, bit...)
	CLEARBIT integerVariable, bit(, bit...)
	INVERTBIT integerVariable, bit(, bit...)
    ```
	Bit manipulation functions.

	`GETBIT` retrieves a specific bit of the first argument.
	Specify the target number as the first argument and the bit position to retrieve as the second argument. The second argument accepts values from `0` to `63`. Specifying a value outside this range results in an error.
	When the second argument is a constant, for example `5`:

    ```  { #language-erbapi }
	GETBIT X, 5
	RESULT = (X & 1p5) != 0
	```
	
	Both lines produce the same result.

	`SETBIT`, `CLEARBIT`, and `INVERTBIT` manipulate the bits at the positions specified by the second and subsequent arguments in the variable specified by the first argument.
	`SETBIT` sets the bit to `1`, `CLEARBIT` sets it to `0`, and `INVERTBIT` inverts it.

    ```  { #language-erbapi }
	SETBIT X, A
	CLEARBIT Y, B
	INVERTBIT Z, C
    ```

	The results above are equivalent to:

    ```  { #language-erbapi }
	X |= 1 << A
	Y &= ~(1 << B)
	Z ^= 1 << C
    ```

	These formats also correspond to `GETBIT`.
	Bits changed with `SETBIT X, A` can be referenced with `GETBIT(X, A)`.

!!! hint "Hint"

    Expression function forms are available for all except `SETBIT`.

### Related
* [System Modification Q&A>Binary Bit Operations](../manual/erawiki-modification-QandA.en.md#2stain)
* [ERB Creation Practice>About Bit Numbers](../manual/erawiki-ERBmanual.en.md#about-bit-numbers)
