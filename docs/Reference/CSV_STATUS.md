---
hide:
  - toc
---

# CSVステータス取得系

| 関数名                                                                | 引数         | 戻り値   |
| :-------------------------------------------------------------------- | :----------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.md)     | `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.md)   | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.md)      | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.md) | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.md)     | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.md)    | `int`, `int` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CFLAG`](./CSV_STATUS.md)       | `int`, `int` | `int`    |

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
	CSVで定義された値を直接呼び出す関数です。  
	第一引数がキャラ番号、第二引数が各変数のインデックスです。  
	`CSVCSTR`は`RESULTS`に文字列を代入し、その他は`RESULT`に数値を代入します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
	``` { title Chara0.csv }
	番号,0
	名前,絵夢 江良
	呼び名,江良

	能力,0,3
	経験,1,200
	CSTR,2,このキャラはテスト用キャラです
	```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %CSVNAME(0)%のABL:0={CSVABL(0, 0)} EXP:1={CSVEXP(0, 1)} %CSVCSTR(0, 2)%
    ``` 
    ``` title="結果"
	絵夢 江良のABL:0=3 EXP:1=200 このキャラはテスト用キャラです
    ```
