---
hide:
  - toc
---

# RESTART

| Function name | Arguments | Return |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.md) | none | none   |

!!! info "API"

    ```  { #language-erbapi }
	RESTART
    ```
    Returns to the beginning of the currently executing function. Dynamic variables defined using `DYNAMIC` are not initialized


!!! hint "Hint"

    Only available as a statement.


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM DYNAMIC RESTARTCOUNT

		RESTARTCOUNT++

		SELECTCASE RESTARTCOUNT
			CASE 1
				PRINTL Doe, a deer, a female deer
				RESTART
			CASE 2
				PRINTL Ray, a drop of golden sun
				RESTART
			CASE 3
				PRINTL Me, a name I call my self
				RESTART
			CASE 4
				PRINTL Far, a long, long way to run
				RESTART
			CASE 5
				PRINTL Sew, a needle pulling thread
				RESTART
			CASE 6
				PRINTL La, a note to follow Sew
				RESTART
			CASE 7
				PRINTL Tea, a drink with jam and bread
				RESTART
		ENDSELECT

		PRINTW That will bring us back to Do
    ``` 
    ``` title="Result"
	Doe, a deer, a female deer
	Ray, a drop of golden sun
	Me, a name I call my self
	Far, a long, long way to run
	Sew, a needle pulling thread
	La, a note to follow Sew
	Tea, a drink with jam and bread
	That will bring us back to Do
    ```

### Related
- [RETURN](RETURN.md)
