---
hide:
  - toc
---

# HTML_TAGSPLIT

| 函数名                                                                        | 参数                                              | 返回值          |
| :---------------------------------------------------------------------------- | :------------------------------------------------ | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.md) | `string`(, `integerVariable`, `stringVariable`)   | `int`, `string` |

!!! info "API"

    ```  { #language-erbapi }
	HTML_TAGSPLIT string(, integerVariable, stringVariable)
    ```

	将目标字符串解释为HTML字符串，分割为标签和纯文本，并将分割数量赋值给`RESULT`，分割后的字符串赋值给`RESULTS`。  
	如果指定了第二、第三个参数，则赋值给指定的变量，而不是`RESULT`和`RESULTS`。  
	分割处理过程中发生错误时，会将-1赋值给RESULT。  
	`HTML_TAGSPLIT`不会验证标签内容或对应关系的正确性。  
	如果分割数量超过`RESULTS`数组的大小，超出部分将不会被赋值到`RESULTS`中。  

!!! hint "提示"

    仅支持指令形式。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		HTML_TAGSPLIT "<p align='right'>あ<!--comment-->い<font color='red'>う</font></p>"  
		REPEAT 8
			PRINTFORML RESULTS:{COUNT} = %RESULTS:COUNT%
		REND
		PRINTFORML RESULT = {RESULT}
		WAIT
    ``` 
    ``` title="结果"
	RESULTS:0 = <p align='right'>  
	RESULTS:1 = あ  
	RESULTS:2 = <!--comment-->  
	RESULTS:3 = い  
	RESULTS:4 = <font color='red'>  
	RESULTS:5 = う  
	RESULTS:6 = </font>  
	RESULTS:7 = </p>  
	RESULT = 8  

    ```

### 相关项目
- [SPLIT](SPLIT.md)