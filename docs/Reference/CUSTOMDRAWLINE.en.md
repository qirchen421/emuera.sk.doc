---
hide:
  - toc
---

# CUSTOMDRAWLINE, DRAWLINEFORM

| Function name                                                                       | Arguments      | Return   |
| :---------------------------------------------------------------------------------- | :------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md) | `string`       | none     |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md)   | `formedString` | none     |

!!! info "API"

    ```  { #language-erbapi }
	CUSTOMDRAWLINE string
	DRAWLINEFORM formedString
    ```
	Displays a single line separator using the specified string. DRAWLINEFORM supports FORM syntax.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CUSTOMDRAWLINE *
		DRAWLINEFORM {123+211}
		WAIT
    ``` 
    ``` title="Result"
	************************************************************************************************************************************************
	334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334
    ```

### Related Items
- [DRAWLINE](DRAWLINE.md)
