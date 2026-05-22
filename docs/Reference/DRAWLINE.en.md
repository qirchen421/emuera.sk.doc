---
hide:
  - toc
---

# DRAWLINE

| Function name                                                             | Arguments | Return   |
| :------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.en.md) | none      | none     |

!!! info "API"

    ```  { #language-erbapi }
	DRAWLINE
    ```
    Draws a line from the right edge of the screen to the left edge using `-`.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		DRAWLINE
		WAIT
    ``` 
    ``` title="Result"
	------------------------------------------------------------------------------------------------------------------------------------------------
    ```

### Related Items
- [CUSTOMDRAWLINE](CUSTOMDRAWLINE.en.md)
