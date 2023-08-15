---
hide:
  - toc
---

# STRLEN系

| 関数名                                                            | 引数     | 戻り値 |
| :---------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.md)      | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.md)     | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.md)  | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.md)     | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.md)    | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	STRLEN string
	int STRLENS string
	STRLENFORM formedString
	STRLENU string
	int STRLENSU string
	STRLENFORMU formedString
    ```
	`STRLEN`、`STRLENS`、`STRLENFORM`は文字列の長さを測定し、`RESULT:0`に代入します。
	長さは`SHIFT-JIS`でのバイト数です。つまり全角文字を2文字と数えます。

	`STRLENU`、`STRLENSU`、`STRLENFORMU`はUnicode版です。違いは全角文字も1文字と数えることです。

!!! hint "ヒント"

    `STRLENS`、`STRLENSU`は式中関数対応しています。


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
    ``` title="結果"
	<TEST1> = 9
	<TEST2> = 9
	<TEST3> = 12
	<TEST4> = 12
    ```
