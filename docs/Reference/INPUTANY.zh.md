---
hide:
  - toc
---

# INPUTANY

| 函数名                                                       | 参数 | 返回值           |
| :----------------------------------------------------------- | :--- | :--------------- |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.md) | 无   | `int` / `string` |

!!! info "API"

    ``` { #language-erbapi }
	INPUTANY
    ```

	同时接受整数和字符串输入的 `INPUT` 命令  
	执行时也接受用鼠标点击 `PRINTBUTTON` 以及 `[{int}]` 的输入  
	整数型的输入保存进 `RESULT`，字符串类型的输入保存进 `RESULTS` 中

!!! hint "提示"

	只能作为命令中使用。

!!! example "示例代码" 
    
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

	PRINTL [0] 输入0
	PRINTL [1] 输入1
	PRINTBUTTON "[A] 输入A", "A"
	PRINTL 

	INPUTANY

	PRINTFORMW 输入结果为\@ RESULTS != "" ? %RESULTS% # {RESULT} \@

    ``` 
    ``` title="结果(当输入为1时)"
	[0] 输入0
	[1] 输入1
	[A] 输入A
	1
	输入结果为1
    ```

    ``` title="结果(当输入为A时)"
	[0] 输入0
	[1] 输入1
	[A] 输入A
	A
	输入结果为A
    ```
