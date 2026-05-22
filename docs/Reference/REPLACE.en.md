---
hide:
  - toc
---

# REPLACE

| Function name                                                   | Arguments                       | Return   |
| :------------------------------------------------------------- | :----------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.en.md) | `string`, `string`, `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string REPLACE string, searchWord, replaceWord
    ```
	Searches the target string for the replacement pattern, and if a match is found, replaces it with the replacement string.  
	The internal processing uses regular expressions. The second argument follows C# regular expression specifications.  
	Therefore, characters used in regular expressions such as `()`, `[]`, `$`, `/`, `.`, `*`, `+` must be escaped.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %REPLACE("12億3456万7890円", "[^0-9]", "")%
    ``` 
    ``` title="Result"
	1234567890
    ```
