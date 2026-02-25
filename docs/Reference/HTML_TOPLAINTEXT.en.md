---
hide:
  - toc
---

# HTML_TOPLAINTEXT

| Function name                                                                           | Arguments     | Return  |
| :------------------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_TOPLAINTEXT, string  
    ```
	Converts the target HTML string to plain text.  
	Specifically, it removes HTML tags from the string and expands character references.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_TOPLAINTEXT("<b>AAA</b><i><b>BBB</b></i><s>CCC</s>")%
    ``` 
    ``` title="Result"
	AAABBBCCC
    ```
