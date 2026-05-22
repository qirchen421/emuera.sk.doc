---
hide:
  - toc
---

# PRINT_STATUS Related

| Function name                                                                       | Arguments | Return   |
| :---------------------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.en.md)      | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.en.md)   | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.en.md)       | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.en.md)      | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.en.md)    | `int`     | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.en.md)     | none      | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.en.md) | none      | none     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_ABL charaID
	PRINT_TALENT charaID
	PRINT_MARK charaID
	PRINT_EXP charaID
	PRINT_PALAM charaID
	PRINT_ITEM
	PRINT_SHOPITEM
    ```
    Each displays the current status in a simple format.
    For `PRINT_ABL`, `PRINT_TALENT`, `PRINT_MARK`, `PRINT_EXP`, and `PRINT_PALAM`, specify the character ID as the argument.


!!! hint "Hint"

    Command only.


!!! example "Example" 
    

    ``` { #language-erb title="ABL.csv" }
	0,能力0
	1,能力1
	2,能力2
    ```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		ABL:0:0 = 2
		ABL:0:2 = 3

		PRINT_ABL 0
		WAIT
    ``` 
    ``` title="Result"
	能力0LV2 能力2LV3 
    ```
