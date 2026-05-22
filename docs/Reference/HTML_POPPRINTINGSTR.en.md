---
hide:
  - toc
---

# HTML_POPPRINTINGSTR

| Function name                                                                                    | Arguments  | Return  |
| :---------------------------------------------------------------------------------------- | :---- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.en.md)    | `void`| `string`|

!!! info "API"

    ```  { #language-erbapi }
	string HTML_POPPRINTINGSTR
    ```
	Gets the current string buffer waiting for newline in [`PRINT`](./PRINT.en.md) in HTML format and clears the buffer.  
	Since `p` tags are not used, `align` from the `ALIGNMENT` command is not reflected.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HOGES
		FONTBOLD
		PRINT AAA
		FONTITALIC
		PRINT BBB
		FONTSTYLE 4
		PRINT CCC
		FONTSTYLE 0
		FONTREGULAR

		HOGES = %HTML_POPPRINTINGSTR()%
		PRINTL DDD

		PRINTFORMW %HOGES%
    ``` 
    ``` title="Result"
	DDD
	<b>AAA</b><i><b>BBB</b></i><s>CCC</s>
    ```
