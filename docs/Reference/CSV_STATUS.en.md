---
hide:
  - toc
---

# CSV Status Functions

| Function name                                                                  | Arguments  | Return   |
| :----------------------------------------------------------------------------- | :--------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.en.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.en.md)     | `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.en.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.en.md)   | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.en.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.en.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.en.md) | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.en.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.en.md)    | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCFLAG`](./CSV_STATUS.en.md)    | `int`, `int` | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	CSVBASE charaNo, index
	CSVCSTR charaNo, index
	CSVABL charaNo, index
	CSVTALENT charaNo, index
	CSVMARK charaNo, index
	CSVEXP charaNo, index
	CSVRELATION charaNo, index
	CSVJUEL charaNo, index
	CSVEQUIP charaNo, index
	CSVCFLAG charaNo, index
    ```
	Functions to directly call values defined in CSV.  
	The first argument is the character number, and the second argument is the index of each variable.  
	`CSVCSTR` assigns the string to `RESULTS`, while the others assign numeric values to `RESULT`.

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
	
	``` { title="Chara0.csv" }
	番号,0
	名前,Emu Era
	呼び名,江良

	能力,0,3
	経験,1,200
	CSTR,2,This is a test character
	```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %CSVNAME(0)%'s ABL:0={CSVABL(0, 0)} EXP:1={CSVEXP(0, 1)} %CSVCSTR(0, 2)%
    ``` 
    ``` title="Result"
	Emu Era's ABL:0=3 EXP:1=200 This is a test character
    ```

### Related Items
- [CSVNAME Functions](CSVNAME.en.md)
