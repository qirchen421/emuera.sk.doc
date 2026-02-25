---
hide:
  - toc
---

# UPCHECK

| Function name                                                             | Arguments | Return |
| :----------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.md) | none      | none   |

!!! info "API"

    ```  { #language-erbapi }
	UPCHECK
    ```
    Adds the `UP` and `DOWN` status values of `TARGET` to `PALAM` and displays the change amounts.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    ``` { #language-erb title="PALAM.csv" }
	0,Ability0
	1,Ability1
	2,Ability2
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		UP:0 = 123
		UP:1 = 456
		UP:2 = 789

		UPCHECK
		WAIT
    ``` 
    ``` title="Result"
	Ability0 0+123=123
	Ability1 0+456=456
	Ability2 0+789=789
    ```

### Related Items
- [CUPCHECK](CUPCHECK.md)
