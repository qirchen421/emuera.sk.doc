---
hide:
  - toc
---

# CSVNAME系

| 関数名                                                                  | 引数 | 戻り値   |
| :---------------------------------------------------------------------- | :--- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.md)       | `int`| `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.md)   | `int`| `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.md)   | `int`| `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.md) | `int`| `string` |

!!! info "API"

    ```  { #language-erbapi }
	CSVNAME charaNo
	CSVCALLNAME charaNo
	CSVNICKNAME charaNo
	CSVMASTERNAME charaNo
    ```
	CSVで定義された`NAME`、`CALLNAME`、`NICKNAME`、`MASTERNAME`を直接呼び出す関数です。  
	所有してないキャラの名前とかが欲しいときとかにどうぞ  
	第一引数はキャラ番号(`NO`の方)です。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
	``` { title Chara0.csv }
	番号,0
	名前,絵夢 江良
	呼び名,江良
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW キャラ番号0のフルネーム:%CSVNAME(0)% 呼び名:%CSVCALLNAME(0)%
    ``` 
    ``` title="結果"
	キャラ番号0のフルネーム:絵夢 江良 呼び名:江良
    ```
