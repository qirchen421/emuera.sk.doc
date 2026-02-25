---
hide:
  - toc
---

# RESETDATA

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESETDATA
    ```
	Initializes all variables except global variables.  
	Specifically, it deletes all characters, assigns `0` or empty string to all local variables and all regular variables.  
	Also, variables with initial values set such as `PALAMLV` and `STR` are assigned their initial values.

!!! hint "Hint"

    Command only.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		RESULT = 123
		LOCAL = 456

		RESETDATA
		PRINTFORMW {RESULT} {LOCAL}
    ``` 
    ``` title="Result"
	0 0
    ```

### Related Items
- [RESETGLOBAL](RESETGLOBAL.md)
