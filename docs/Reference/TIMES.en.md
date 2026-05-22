---
hide:
  - toc
---

# TIMES

| Function name                                                 | Arguments     | Return |
| :------------------------------------------------------------ | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.en.md) | `int`, `float` | none   |

!!! info "API"

    ```  { #language-erbapi }
	TIMES integerVariable, float
    ```
    Multiplies the first argument variable by the decimal value of the second argument. Fractional parts are truncated by default.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE

		HOGE = 100
		TIMES HOGE, 1.25
		PRINTFORML {HOGE}
		TIMES HOGE, 2.672
		PRINTFORMW {HOGE}
    ``` 
    ``` title="Result"
	125
	334
    ```
