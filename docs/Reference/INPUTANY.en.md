---
hide:
  - toc
---

# INPUTANY

| Function name                                                      | Arguments | Return           |
| :----------------------------------------------------------------- | :-------- | :--------------- |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.md)      | none      | `int` / `string` |

!!! info "API"

    ``` { #language-erbapi }
	INPUTANY
    ```

    An INPUT command that accepts both numeric and string input.  
    When executed, [`PRINTBUTTON`](./PRINTBUTTON.md) and `[{int}]` become clickable.  
    If numeric input is entered, it is assigned to `RESULT`; if string input is entered, it is assigned to `RESULTS`.  


!!! hint "Hint"

    Since it is a command, it cannot be used as an expression function.

!!! example "Example" 

    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

	PRINTL [0] 0です
	PRINTL [1] 1です
	PRINTBUTTON "[A] Aです", "A"
	PRINTL 

	INPUTANY

	PRINTFORMW \@ RESULTS != "" ? %RESULTS% # {RESULT} \@が入力されました

    ``` 
    ``` title="Result (when 1 is entered)"
	[0] 0です
	[1] 1です
	[A] Aです
	1
	1が入力されました
    ```

    ``` title="Result (when A is entered)"
	[0] 0です
	[1] 1です
	[A] Aです
	A
	Aが入力されました
    ```

### See Also
- [INPUT](INPUT.md)
