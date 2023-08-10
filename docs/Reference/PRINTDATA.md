---
hide:
  - toc
---

# PRINTDATA系

| 関数名                                                                         | 引数          | 戻り値 |
| :----------------------------------------------------------------------------- | :------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINTDATA(|K|D)(|L|W)`](./PRINTDATA.md) | なし          | なし   |
| ![](../assets/images/IconEmuera.webp)[`DATA`](./PRINTDATA.md)                  | `string`      | なし   |
| ![](../assets/images/IconEmuera.webp)[`DATAFORM`](./PRINTDATA.md)              | `formedString`| なし   |
| ![](../assets/images/IconEmuera.webp)[`DATALIST`](./PRINTDATA.md)              | なし          | なし   |
| ![](../assets/images/IconEmuera.webp)[`ENDLIST`](./PRINTDATA.md)               | なし          | なし   |
| ![](../assets/images/IconEmuera.webp)[`ENDDATA`](./PRINTDATA.md)               | なし          | なし   |

!!! info "API"

    ```  { #language-erbapi }
	PRINTDATA(|K|D)(|L|W)
		DATA string
		DATAFORM formedString
		DATALIST
		ENDLIST
	ENDDATA
	```
	`PRINTDATA`系命令です。 私家改造版readmeによれば、  

		*書式*  
		PRINTDATA (数値変数：省略可)  
			DATA (文字)  
			DATAFORM (FORM文字列)  
			DATALIST  
				(DATA or DATAFORMの羅列)  
			ENDLIST  
		ENDDATA  

		*内容*  
		DATA、DATAFORMおよびDATALIST～ENDLISTで指定した文字列を確率均一でランダムで表示  
		IFとRANDを使わずにランダム表示を実装可能  
		引数に数値変数を指定した場合は表示された変数DATAの番号が入ります  
		表示された文字列によって後の処理をいじりたい場合にどうぞ  
		DATALIST～ENDLIST内ではDATAorDATAFORM1個が1行に相当します  

	とのことです。  
	`K`、`D`、`L`、`W`キーワードの効果は[`PRINT`](./PRINT.md)系と同じです。  
	`PRINTDATA`系～`ENDDATA`の内部に`DATA`系による表示データが与えられてない場合、何もせずに次に進みます。  
	`PRINTDATA`系～`ENDDATA`、および`DATALIST`～`ENDLIST`内に上記の文法以外の記述をすることはできません。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		REPEAT 10
			PRINTDATA
				DATA A
				DATA B
				DATA C
				DATA D
				DATA E
			ENDDATA
		REND

		WAIT
    ``` 
    ``` title="結果"
	DBDAEACDAE
    ```
