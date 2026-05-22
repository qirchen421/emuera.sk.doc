---
hide:
  - toc
---

# BAR(L)

| Function name                                                  | Arguments         | Return |
| :------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.en.md)     | `int`, `int`, `int`  | none   |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.en.md)    | `int`, `int`, `int`  | none   |

!!! info "API"

    ```  { #language-erbapi }
	BAR value, maxValue, length
    ```
    Draws a bar graph representing the ratio of the first argument to the second argument. The third argument sets the length of the graph.  
	`BAR` does not add a newline after displaying, while `BARL` adds a newline.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		BAR 2, 10, 20
		PRINTL (2/10)
		BARL 114, 514, 81
    ``` 
    ``` title="Result"
	[****................](2/10)
	[*****************................................................................]
    ```

### Related
* [BARSTR](BARSTR.en.md)
