---
hide:
  - toc
---

# RAND

| Function name                                           | Arguments        | Return |
| :----------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RAND`](./RAND.en.md) | `int`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int RAND min(, max)
    ```
	Almost the same as the variable with the same name.  
	`RAND(X)` behaves exactly the same as `RAND:X`.  
	The random number generator is exactly the same, and random numbers can be controlled by [`RANDOMIZE`](./RANDOMIZE.en.md) or [`INITRAND`](./RANDOMIZE.en.md).  
	The `RAND` function can specify two arguments; when two are specified, the first argument is used as the minimum value of the random number.  
	This function generates a random number between 0 and 18446744073709551615 (2^64 - 1), divides it by `max-min`, adds `min`, and returns the result.  
	Therefore, `max` must be greater than `min` (cannot be the same).  
	An error occurs if `max-min` exceeds the maximum value of signed 64-bit integer (9223372036854775807).  
	Also, if `max-min` is very large (about 1 trillion?), the bias from the modulo operation becomes significant.

!!! hint "Hint"

    Available as both command and function in expressions

### Related
- [PRINTDATA](PRINTDATA.en.md)
- [STRDATA](STRDATA.en.md)
