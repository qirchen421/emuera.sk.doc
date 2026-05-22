---
hide:
  - toc
---

# POWER

| Function name                                               | Arguments                        | Return |
| :---------------------------------------------------------- | :------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.en.md) | `integerVariable`, `int`, `int`  | `int`  |
|                                                             | `int`, `int`                    | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	POWER integerVariable, int, int
	int POWER int, int
    ```
    Arguments differ between command and expression function.  
    For the command form, the value of the second argument multiplied by the third argument is assigned to the variable specified in the first argument.  
    For the expression function form, the value of the first argument multiplied by the second argument is returned.


!!! hint "Hint"

    Both command and expression function forms are available.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		X = 11
		Y = 2
		POWER A, X, 2
		PRINTFORML <TEST1> = {A}
		POWER CFLAG:2, X + 1, Y + 1
		PRINTFORML <TEST2> = {CFLAG:2}
    ``` 
    ``` title="Result"
	<TEST1> = 121
	<TEST2> = 1728
    ```

### Related
- [CBRT, LOG, LOG10, EXPONENT](MATH_EXTENSION.en.md)
