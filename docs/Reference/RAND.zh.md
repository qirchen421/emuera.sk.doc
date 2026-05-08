---
hide:
  - toc
---

# RAND

| 函数名                                                   | 参数           | 返回值 |
| :------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RAND`](./RAND.md) | `int`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int RAND min(, max)
    ```
	与同名的变量功能几乎相同。  
	`RAND(X)` 与 `RAND:X` 的行为完全相同。  
	使用完全相同的随机数生成器，可以通过 [`RANDOMIZE`](./RANDOMIZE.md) 或 [`INITRAND`](./RANDOMIZE.md) 来控制随机数。  
	`RAND` 函数可以指定两个参数，当指定两个参数时，第一个参数将用作随机数的最小值。  
	此函数生成一个 `0～18446744073709551615` (2的64次方-1) 之间的随机数，将其除以 `max-min` 取余数，然后加上 `min` 并返回结果。  
	因此，`max` 必须是一个大于 `min` 的值（不能相等）。  
	如果 `max-min` 超过有符号64位整数 (`9223372036854775807`) 的最大值，将会出错。  
	此外，当 `max-min` 非常大时（大约1京？），由取余方法导致的偏差将变得不可忽视。

!!! hint "提示"

    命令和表达式函数均支持。

### 相关项目
- [PRINTDATA](PRINTDATA.md)
- [STRDATA](STRDATA.md)