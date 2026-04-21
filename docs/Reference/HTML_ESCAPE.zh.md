---
hide:
  - toc
---

# HTML_ESCAPE

| 函数名                                                                 | 参数     | 返回值  |
| :--------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
    str HTML_ESCAPE, htmlString  
    ```
    将目标字符串转义为HTML格式（转换为字符引用）。  
    要取消转义，请使用[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md)函数。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

!!! example "示例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_ESCAPE("A&B<C>D'E")%
    ``` 
    ``` title="结果"
	A&amp;B&lt;C&gt;D&apos;E
    ```

### 相关项目
- [HTML_TOPLAINTEXT](HTML_TOPLAINTEXT.md)
- [ESCAPE](ESCAPE.md)