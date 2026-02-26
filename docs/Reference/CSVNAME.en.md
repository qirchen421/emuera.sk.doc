---
hide:
  - toc
---

# CSVNAME Functions

| Function name                                                                  | Arguments | Return   |
| :------------------------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.md)       | `int`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.md)   | `int`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.md)   | `int`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.md) | `int`     | `string` |

!!! info "API"

    ```  { #language-erbapi }
	CSVNAME charaNo
	CSVCALLNAME charaNo
	CSVNICKNAME charaNo
	CSVMASTERNAME charaNo
    ```
	Functions to directly call `NAME`, `CALLNAME`, `NICKNAME`, and `MASTERNAME` defined in CSV.  
	Use this when you want to get the name of a character you don't own.  
	The first argument is the character number (the `NO` value).

!!! hint "Hint"

    Both command and expression function are supported.


!!! example "Example" 
	``` { title="Chara0.csv" }
	番号,0
	名前,Emu Era
	呼び名,江良
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW Full name of character 0:%CSVNAME(0)% Call name:%CSVCALLNAME(0)%
    ``` 
    ``` title="Result"
	Full name of character 0:Emu Era Call name:江良
    ```

### Related Items
- [CSV Status Functions](CSV_STATUS.md)
