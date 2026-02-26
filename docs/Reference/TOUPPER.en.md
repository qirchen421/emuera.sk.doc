---
hide:
  - toc
---

# TOUPPER, TOLOWER, TOHALF, TOFULL

| Function name                                                      | Arguments | Return   |
| :----------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.md)   | `string`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.md)   | `string`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.md)    | `string`  | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.md)    | `string`  | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string TOUPPER string
	string TOLOWER string
	string TOHALF string
	string TOFULL string
    ```
	Applies specific conversions to the argument string and assigns the result to `RESULTS:0` or returns it.  
	`TOUPPER` converts alphabets to uppercase. `TOLOWER` converts to lowercase.  
	`TOHALF` converts full-width characters to half-width, but full-width characters without corresponding half-width equivalents remain unchanged.  
	`TOFULL` converts half-width characters to full-width.  

!!! hint "Hint"

    Supported as both command and expression function.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
	PRINTFORML %TOUPPER("eRAseRmOToRpHAntOM")%
	PRINTFORML %TOLOWER("BEATMANIA")+"IIDX"%
	PRINTFORML %TOHALF("パルスのファルシのルシがパージでコクーン")%
	PRINTFORMW %TOFULL("SUGOI DEKAI")%
    ``` 
    ``` title="Result"
	ERASERMOTORPHANTOM
	beatmaniaIIDX
	ﾊﾟﾙｽのﾌｧﾙｼのﾙｼがﾊﾟｰｼﾞでｺｸｰﾝ
	ＳＵＧＯＩ　ＤＥＫＡＩ
    ```
