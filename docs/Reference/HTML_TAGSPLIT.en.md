---
hide:
  - toc
---

# HTML_TAGSPLIT

| Function name                                                                        | Arguments                                              | Return          |
| :---------------------------------------------------------------------------- | :------------------------------------------------ | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.md) | `string`(, `integerVariable`, `stringVariable`)   | `int`, `string` |

!!! info "API"

    ```  { #language-erbapi }
	HTML_TAGSPLIT string(, integerVariable, stringVariable)
    ```

	Interprets the target string as an HTML string, splits it into tags and plain text, assigns the split count to `RESULT` and the split string to `RESULTS`.  
	If the second and third arguments are specified, they are assigned to the specified variables instead of `RESULT` and `RESULTS`.  
	If an error occurs during splitting, -1 is assigned to RESULT.  
	`HTML_TAGSPLIT` does not verify the validity of tag contents or relationships.  
	If the split count exceeds the size of the `RESULTS` array, the excess is not assigned to `RESULTS`.

!!! hint "Hint"

    Only commands are supported.


!!! example "Example" 
 
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		HTML_TAGSPLIT "<p align='right'>あ<!--comment-->い<font color='red'>う</font></p>"  
		REPEAT 8
			PRINTFORML RESULTS:{COUNT} = %RESULTS:COUNT%
		REND
		PRINTFORML RESULT = {RESULT}
		WAIT
    ``` 
    ``` title="Result"
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

### See Also
- [SPLIT](SPLIT.md)
