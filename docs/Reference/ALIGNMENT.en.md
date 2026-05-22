---
hide:
  - toc
---

# ALIGNMENT, CURRENTALIGN

| Function name                                                                  | Arguments    | Return    |
| :----------------------------------------------------------------------------- | :----------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.en.md)            | `keyword`    | none      |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.en.md)         | none         | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	ALIGNMENT keyword
	string CURRENTALIGN
    ```
	Aligns subsequent lines to the specified position.  
	The keyword can be one of `LEFT`, `CENTER`, or `RIGHT`.  
	Normal display is `ALIGNMENT LEFT`, aligned to the left edge.  
	`ALIGNMENT CENTER` allows centering like on title screens.  
	`ALIGNMENT` takes effect when a newline occurs.

	The current `ALIGNMENT` can be obtained with `CURRENTALIGN`.

!!! hint "Hint"

    `CURRENTALIGN` is supported as an expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ALIGNMENT RIGHT
		PRINTFORML AAA CURRENTALIGN:%CURRENTALIGN()%
		ALIGNMENT CENTER
		PRINTFORMW BBB CURRENTALIGN:%CURRENTALIGN()%
    ``` 
	![](../assets/images/ALIGNMENT.png)
