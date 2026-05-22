---
hide:
  - toc
---

# ESCAPE

| Function name                                                 | Arguments | Return   |
| :----------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.en.md) | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string ESCAPE string
    ```
	Escapes regular expression meta-characters in the argument string so that it is treated as plain text in regular expressions.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %ESCAPE("!#$%&'()")%
    ``` 
    ``` title="Result"
	!\#\$%&'\(\)
    ```
