---
hide:
  - toc
---

# STRFIND

| 函数名                                                          | 参数                        | 返回值 |
| :-------------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.zh.md)  | `string`, `string`(, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.zh.md) | `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int STRFIND string, searchWord(, startPosition)
    int STRFINDU string, searchWord(, startPosition)
    ```
    字符串搜索指令。  
    第一参数指定被搜索的目标字符串，使用字符串表达式。第二参数指定要搜索的字符串，使用字符串表达式。  
    `STRFIND` 将全角字符计为2个字符，`STRFINDU` 将全角字符计为1个字符，并返回从0开始的索引。如果未找到，则返回-1。  
    自1.712版本起，STRFIND(U)指令可以指定第三参数。  
    第三参数指定搜索的起始位置，使用从0开始的索引。

    ```  { #language-erbapi }
    STRFIND "abcdeabced","a",3
    ```

	根据上一行的结果，`RESULT` 将被赋值为 `5`。  
	虽然 `a` 也存在于位置 0，但由于指定了第三参数，搜索将从位置 3（即 `d`）开始，因此找到的第一个 `a` 位于位置 5。

!!! hint "提示"

    该功能同时支持命令形式和函数形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = abcdefghi
		STR:1 = あいうえお
		STR:2 = うえ
		STRFIND STR:0, "cde"
		PRINTFORML <TEST1> = {RESULT:0}
		STRFIND STR:1, "いうえ"
		PRINTFORML <TEST2> = {RESULT:0}
		STRFIND STR:1, STR:2
		PRINTFORML <TEST3> = {RESULT:0}
		STRFIND STR:1, "か"
		PRINTFORML <TEST4> = {RESULT:0}
    ``` 
    ``` title="结果"
	<TEST1> = 2
	<TEST2> = 2
	<TEST3> = 4
	<TEST4> = -1
    ```

### 相关项目
- [STRCOUNT](STRCOUNT.zh.md)
- [SUBSTRING](SUBSTRING.zh.md)