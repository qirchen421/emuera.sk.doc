---
hide:
  - toc
---

# TIMES

| 函数名                                                       | 参数             | 返回值 |
| :----------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.md) | `int`, `float`   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	TIMES integerVariable, float
    ```
    将第二参数的浮点数乘以第一参数的变量。默认设置下会舍去小数部分。

!!! hint "提示"

    仅支持作为指令使用。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE

		HOGE = 100
		TIMES HOGE, 1.25
		PRINTFORML {HOGE}
		TIMES HOGE, 2.672
		PRINTFORMW {HOGE}
    ``` 
    ``` title="结果"
	125
	334
    ```