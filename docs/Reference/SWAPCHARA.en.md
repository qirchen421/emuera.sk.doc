---
hide:
  - toc
---

# SWAPCHARA

| Function name                                                     | Arguments      | Return |
| :--------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.md) | `int`, `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	SWAPCHARA charaID, charaID
    ```
    Swaps the registration numbers of the two specified characters.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;Assume only MASTER exists
		ADDCHARA 10
		ADDCHARA 11
		PRINTFORML NO:1 = {NO:1}, NO:2 = {NO:2}
		SWAPCHARA 1,2
		PRINTFORMW NO:1 = {NO:1}, NO:2 = {NO:2}
    ``` 
    ``` title="Result"
	NO:1 = 10, NO:2 = 11
	NO:1 = 11, NO:2 = 10
    ```

### Related
- [SORTCHARA](SORTCHARA.md)
