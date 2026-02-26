---
hide:
  - toc
---

# GOTO

| Function name | Arguments | Return |
| :--------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.md) | `labelName`   | none   |

!!! info "API"

    ```  { #language-erbapi }
	GOTO labelName
	$labelName
    ```
    Moves to a label defined with `$` within a function


!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL 1
		GOTO THREE

		$TWO
		PRINTL 2
		GOTO FIVE

		$THREE
		PRINTL 3
		GOTO TWO

		$FOUR
		PRINTL 4
		GOTO END

		$FIVE
		PRINTL 5
		GOTO FOUR

		$END
		PRINTW END
    ``` 
    ``` title="Result"
	1
	3
	2
	5
	4
	END
    ```

### Related
- [GOTOFORM](FORM.md)
