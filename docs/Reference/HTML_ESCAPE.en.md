---
hide:
  - toc
---

# HTML_ESCAPE

| 関数名                                                                 | 引数     | 戻り値  |
| :--------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_ESCAPE, htmlString  
    ```
	Escapes (converts to character references) the target string for HTML.  
	Use the [`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) function to unescape.


!!! hint "Hint"

    Both commands and expression functions are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_ESCAPE("A&B<C>D'E")%
    ``` 
    ``` title="Result"
	A&amp;B&lt;C&gt;D&apos;E
    ```

### See Also
- [HTML_TOPLAINTEXT](HTML_TOPLAINTEXT.md)
- [ESCAPE](ESCAPE.md)
