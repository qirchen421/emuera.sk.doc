---
hide:
  - toc
---

# SUBSTRING

| 函数名                                                              | 参数                   | 返回值   |
| :------------------------------------------------------------------ | :--------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.zh.md)  | `string`, `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.zh.md) | `string`, `int`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string SUBSTRING string, startPosition, characterCount
	string SUBSTRINGU string, startPosition, characterCount
    ```
	返回指定字符串表达式中，从第一个参数指定的位置开始、长度为第二个参数指定字符数的子字符串。  
	起始位置以字符串开头为`0`。如果指定的起始位置超过原字符串长度，则返回空字符串。  
	对于字符数，`SUBSTRING` 以 SHIFT-JIS 编码的字节数指定。即全角字符计为2个字符。`SUBSTRINGU` 则以 Unicode 字符数计数，全角字符也计为1个字符。  
	如果指定的字符数为负值，或者指定的结束位置超过原字符串末尾，则返回从起始位置到字符串末尾的字符串。  
	如果起始位置或结束位置无法在字符边界处切割（例如指向全角字符的中间部分），则会被视为指定了下一个字符边界。  
	请注意，这可能导致返回的子字符串长度比指定的字符数多一个字符。

!!! hint "提示"

    支持命令和表达式函数两种形式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = 01234あいうえお
		SUBSTRING STR:0, 0, -1
		PRINTFORML <TEST1> = %RESULTS:0%
		SUBSTRING STR:0, 1, 3
		PRINTFORML <TEST2> = %RESULTS:0%
		SUBSTRING STR:0, 6, 3
		PRINTFORML <TEST3> = %RESULTS:0%
		WAIT
    ``` 
    ``` title="结果"
	<TEST1> = 01234あいうえお
	<TEST2> = 123
	<TEST3> = いう
    ```

### 相关项目
- [STRFIND](STRFIND.zh.md)