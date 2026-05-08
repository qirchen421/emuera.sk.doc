---
hide:
  - toc
---

# MAXARRAY, MINARRAY

| 函数名                                                              | 参数                         | 返回值 |
| :------------------------------------------------------------------ | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.md) | `integerArray`, `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.md) | `integerArray`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAXARRAY integerArray(, start, end)
	int MINARRAY integerArray(, start, end)
    ```
	返回数组最大值或最小值的函数。  
	在`integerArray`中指定要搜索的一维数组，并在`start`以上`end`未满的元素范围内进行搜索。  
	如果省略`end`，则搜索范围直到数组的最后一个元素。  
	`RESULT = MAXARRAY(X, A, B)`的结果等同于  

		RESULT = X:A
		FOR COUNT, A, B
			IF X:COUNT > RESULT
				RESULT = X:COUNT
			ENDIF
		REND

    与以下代码等价。  
    `integerArray` 仅可指定数值型一维数组变量，不能指定字符串变量或多维数组。  
    若在 `integerArray` 中指定了 `CFLAG` 等角色数组，则仅搜索指定的角色。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

### 相关项目
- [MAX,MIN](MAX.md)