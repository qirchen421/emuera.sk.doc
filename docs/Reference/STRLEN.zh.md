---
hide:
  - toc
---

# STRLEN系

| 函数名                                                            | 参数     | 返回值 |
| :---------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.zh.md)      | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.zh.md)     | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.zh.md)  | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.zh.md)     | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.zh.md)    | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.zh.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	STRLEN string
	int STRLENS string
	STRLENFORM formedString
	STRLENU string
	int STRLENSU string
	STRLENFORMU formedString
    ```
	`STRLEN`、`STRLENS`、`STRLENFORM` 用于测量字符串长度，并将结果赋值给 `RESULT:0`。
	长度以 `SHIFT-JIS` 编码的字节数为准。即全角字符按 2 个字符计数。

	`STRLENU`、`STRLENSU`、`STRLENFORMU` 是 Unicode 版本。区别在于全角字符也按 1 个字符计数。

!!! hint "提示"

    `STRLENS`、`STRLENSU` 支持在表达式中作为函数使用。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STRLEN ABCあいう
		PRINTFORML <TEST1> = {RESULT}
		STR:0 = ABCあいう
		STRLENS STR:0
		PRINTFORML <TEST2> = {RESULT}
		STRLENFORM abc%STR:0%
		PRINTFORML <TEST3> = {RESULT}

		;STRLENSは文字列式にも対応
		STRLENS "abc" + STR:0
		PRINTFORML <TEST4> = {RESULT}
		WAIT
    ``` 
    ``` title="结果"
	<TEST1> = 9
	<TEST2> = 9
	<TEST3> = 12
	<TEST4> = 12
    ```