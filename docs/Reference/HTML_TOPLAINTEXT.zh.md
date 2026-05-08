---
hide:
  - toc
---

# HTML_TOPLAINTEXT

| 函数名                                                                           | 参数     | 返回值  |
| :------------------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_TOPLAINTEXT, string  
    ```
	将目标HTML字符串转换为纯文本。  
	具体来说，会删除字符串中的HTML标签并展开字符引用。  

!!! hint "提示"

    该函数同时支持指令和表达式内函数两种使用方式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_TOPLAINTEXT("<b>AAA</b><i><b>BBB</b></i><s>CCC</s>")%
    ``` 
    ``` title="结果"
	AAABBBCCC
    ```