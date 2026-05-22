---
hide:
  - toc
---

# VARSIZE

| 函数名                                                           | 参数                      | 返回值 |
| :--------------------------------------------------------------- | :------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.zh.md)   | `variable`                | `int`  |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.zh.md) | `variable`(, `dimension`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    VARSIZE variableName
    VARSIZE(variableName(, dimension))
    ```
    命令和表达式中函数的规格不同。  
    作为命令使用时，会将指定变量数组的大小赋值给`RESULT:0`。  
    对于多维数组变量，会按从左到右的顺序依次赋值给`RESULT:0`、`RESULT:1`、`RESULT:2`。  
    数组的大小是在`VariableSize.csv`中指定的值。  

    ```  { #language-erbapi }
    VARSIZE FLAG
    PRINTFORML <TEST1> = {RESULT:0}
    VARSIZE SAVESTR
    PRINTFORML <TEST2> = {RESULT:0}
    VARSIZE TALENT
    PRINTFORML <TEST3> = {RESULT:0}
    WAIT
    ```

    结果（未更改大小时）

		<TEST1> = 10000
		<TEST2> = 100
		<TEST3> = 1000

	※由于实际上并不引用变量，因此不会发生数组越界错误。  
	　在上面的例子中，即使`TARGET == -1`，也不会尝试引用第`-1`个人的`TALENT`而导致错误。

	作为表达式函数使用时：

	```  { #language-erbapi }
	X = VARSIZE("FLAG")
	```

    必须以字符串形式指定。  
    此外，获取`DITEMTYPE`或`TA`等多维数组变量的大小时，需要通过第二个参数指定维度（从最左侧的元素开始，依次为`0, 1, 2`）。  
    若要一次性获取多维数组变量的元素总数，请使用对应的命令形式。  
    另外，如果在EM+EE中启用了[`使VARSIZE的维度指定与ERD保持一致`](../Emuera/config.md#varsizeerd)选项，则维度指定将遵循ERD系统，从左到右变为`1, 2, 3`。

!!! hint "提示"

    同时支持命令形式和表达式函数形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM HOGE, 1, 2, 3
        #DIMS HOGES, 4, 5, 6
    ```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 1, 2, 3
		#DIMS HOGES, 4, 5, 6
		VARSIZE HOGE
		PRINTFORML HOGE 1维:{RESULT:0} 2维:{RESULT:1} 3维:{RESULT:2}
		PRINTFORMW HOGES 1维:{VARSIZE("HOGES", 0)} 2维:{VARSIZE("HOGES", 1)} 3维:{VARSIZE("HOGES", 2)}
    ``` 
    ``` title="结果"
	HOGE 1维:1 2维:2 3维:3
	HOGES 1维:4 2维:5 3维:6
    ```