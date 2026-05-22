---
hide:
  - toc
---

# RESETGLOBAL

| Function name                                                               | Arguments | Return |
| :------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.en.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESETGLOBAL
    ```
	Initializes global variables.  
	Specifically, assigns `0` to numeric global variables and assigns empty string to string global variables.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		GLOBAL = 123

		RESETGLOBAL
		PRINTFORMW {GLOBAL}
    ``` 
    ``` title="Result"
	0
    ```

### Related Items
- [RESETDATA](RESETDATA.en.md)
