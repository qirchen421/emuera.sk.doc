---
hide:
  - toc
---

# HTML_GETPRINTEDSTR

| 函数名                                                                               | 参数 | 返回值  |
| :----------------------------------------------------------------------------------- | :--- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.md) | `int`| `string`|

!!! info "API"

    ```  { #language-erbapi }
    str HTML_GETPRINTEDSTR, lineNo  
    ```
    获取已显示行中由`lineNo`指定行的内容，以HTML格式字符串形式返回。  
    行号计数方式与`LINECOUNT`或`CLEARLINE`指令相同。

!!! hint "提示"

    该函数同时支持指令形式和表达式函数形式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES, 4
		FONTBOLD
		PRINTL AAA
		FONTITALIC
		PRINTL BBB
		FONTSTYLE 4
		PRINTL CCC
		FONTSTYLE 0
		FONTREGULAR

		REPEAT 4
			HOGES:COUNT = %HTML_GETPRINTEDSTR(COUNT)%
		REND
		REPEAT 4
			PRINTFORML %HOGES:COUNT%
		REND

		WAIT
    ``` 
	![](../assets/images/HTML_GETPRINTEDSTR.png)

### 相关项目
- [GETDISPLAYLINE](GETDISPLAYLINE.md)