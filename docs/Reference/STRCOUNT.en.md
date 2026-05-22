---
hide:
  - toc
---

# STRCOUNT

| Function name                                                     | Arguments          | Return |
| :--------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.en.md) | `string`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int STRCOUNT string, searchWord
    ```
	Command that retrieves the number of occurrences of a specified substring in a string. Assigns the hit count to `RESULT:0` or returns it.  
	The search string format follows C# regular expression specifications.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORML Number of "も":{STRCOUNT("すもももももももものうち", "も")}
		PRINTFORMW Number of half-width digits:{STRCOUNT("1日1歩 3日で3歩 3歩進んで2歩下がる", "[0-9]")}
    ``` 
    ``` title="Result"
	Number of "も":8
	Number of half-width digits:6
    ```

### See Also
- [STRFIND](STRFIND.en.md)
