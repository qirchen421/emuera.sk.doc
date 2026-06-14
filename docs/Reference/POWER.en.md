---
hide:
  - toc
---

# POWER

| Function name                                               | Arguments                        | Return               |
| :---------------------------------------------------------- | :------------------------------- | :------------------- |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.en.md) | `integerVariable`, `int`, `int`  | `int`                |
|                                                             | `int`, `int`                    | `int`/`float`（同型） |

!!! info "API"

    ```  { #language-erbapi }
	POWER integerVariable, int, int
	int POWER int, int
	int/float POWER int/float, int/float
    ```
    Arguments differ between command and expression function.  
    For the command form, the value of the second argument multiplied by the third argument is assigned to the variable specified in the first argument.  
    For the expression function form, the value of the first argument multiplied by the second argument is returned.

    !!! warning "Skia: Dynamic Return Type for Expression Function"

        In the Skia version, the expression function `POWER` returns Float when given Float arguments (`CanReturnFloat` mechanism). When all arguments are Integer, it returns Integer as before.

        ``` { #language-erb }
        POWER(2, 32) - 1      ; Integer → 4294967295
        POWER(1.1, 6) * 200   ; Float → 354.3122
        ```


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
