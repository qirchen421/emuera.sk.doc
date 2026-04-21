---
hide:
  - toc
---

# CALLF, CALLFORMF

| 函数名                                                         | 参数           | 返回值 |
| :------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.md)     | `functionName` | 无     |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.md) | `formedString` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	CALLF functionName
	CALLFORMF formedString
    ```
	以下摘自私家改造版更新日志：

		实现了用于忽略返回值调用表达式中函数的指令 CALLF、CALLFORMF。
		格式：CALLF 函数名, 参数1, ....
		　　（虽然是表达式中函数，但请使用普通函数的参数格式调用）
		内容：将表达式中函数当作普通函数调用，返回值会被丢弃。
		当初是为了制作伪 SETTER 而做的，现在正在反省。

	当然，除非在被调用的表达式中函数内部进行了操作，否则 RESULT 或 RESULTS 不会发生变化。  
	同系列的指令中，EM+EE 版本新增了 [`TRYCALLF`](./TRYCALLF.md)、[`TRYCALLFORMF`](./TRYCALLFORMF.md)。  

!!! hint "提示"

    仅指令支持此功能。

### 相关项目
* [TRYCALLF](TRYCALLF.md)
* [TRYCALLFORMF](TRYCALLFORMF.md)
* [EXISTFUNCTION](EXISTFUNCTION.md)
* [表达式中可用的函数](../Emuera/in_expression_function.md)