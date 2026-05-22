---
hide:
  - toc
---

# POWER

| 函数名                                                     | 参数                              | 返回值 |
| :--------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.zh.md) | `integerVariable`, `int`, `int`   | `int`  |
|                                                            | `int`, `int`                      | `int`  |

!!! info "API"

    ``` { #language-erbapi }
	POWER integerVariable, int, int
	int POWER int, int
    ```
    命令和函数形式的参数不同。  
    命令形式下，会将第二个参数的数值以第三个参数为指数进行乘方运算，结果赋值给第一个参数的变量。  
    函数形式下，会将第一个参数的数值以第二个参数为指数进行乘方运算，并返回结果。

!!! hint "提示"

    同时支持命令形式和函数形式。

!!! example "例" 
    
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
    ``` title="结果"
	<TEST1> = 121
	<TEST2> = 1728
    ```

### 相关项目
- [CBRT, LOG, LOG10, EXPOMENT](MATH_EXTENSION.zh.md)