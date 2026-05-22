---
hide:
  - toc
---

# SUMARRAY

| 函数名                                                           | 参数                           | 返回值 |
| :--------------------------------------------------------------- | :----------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.zh.md) | `integerArray`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMARRAY integerArray(, startIndex, endIndex)
    ```
	此函数用于返回数组值的总和。  
	指定 `integerArray` 为要求总和的1维数值型数组，并合计 `startIndex` 以上、`endIndex` 未满的元素范围。  
	若省略 `endIndex`，则合计至数组末尾。  
	`RESULT = SUMARRAY(X, A, B)` 的结果等同于：

		RESULT = 0
		FOR COUNT, A, B
			RESULT += X:COUNT
		REND

	请注意，被加算的值到 `X:(B - 1)` 为止，`X:B` 不会被加算。
	`integerArray` 仅可指定数值型1维数组变量，不能指定字符串变量或多维数组。
	若为 `integerArray` 指定了 `CFLAG` 等角色数组，则仅合计指定的角色。

!!! hint "提示"

    命令和表达式函数两种形式均支持。