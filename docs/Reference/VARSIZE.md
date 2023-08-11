---
hide:
  - toc
---

# VARSIZE

| 関数名                                                           | 引数                      | 戻り値 |
| :--------------------------------------------------------------- | :------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.md)   | `variable`                | `int`  |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.md) | `variable`(, `dimension`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	VARSIZE variableName
	VARSIZE(variableName(, dimension))
    ```
	命令と式中関数で仕様が違います。  
	命令の場合、指定した変数の配列のサイズを`RESULT:0`に代入します。  
	多次元配列変数の場合、一番左の要素から順に`RESULT:0`, `RESULT:1`, `RESULT:2`と代入されます。  
	配列のサイズは`VariableSize.csv`で指定した値です。  

    ```  { #language-erbapi }
	VARSIZE FLAG
	PRINTFORML <TEST1> = {RESULT:0}
	VARSIZE SAVESTR
	PRINTFORML <TEST2> = {RESULT:0}
	VARSIZE TALENT
	PRINTFORML <TEST3> = {RESULT:0}
	WAIT
	```

	結果(サイズを変更していない場合)  

		<TEST1> = 10000
		<TEST2> = 100
		<TEST3> = 1000

	※実際に変数を参照するわけではないので配列外参照が発生することはありません。  
	　上の例では`TARGET == -1`の場合でも`-1`人目の`TALENT`を参照しようとしてエラー、ということにはなりません。  

	式中関数として使用する場合、

	```  { #language-erbapi }
	X = VARSIZE("FLAG")
	```

	のような形で文字列として指定する必要があります。  
	また、`DITEMTYPE`や`TA`などの多次元配列変数のサイズを取得する場合、第2引数により次元を指定する必要があります（一番左の要素から順に、`0, 1, 2`となる）。  
	多次元配列変数の要素数を一度に取得する場合については命令の方を用いてください。  
	また、EM+EEにて追加された[`VARSIZEの次元指定をERDに合わせる`](../Emuera/config.md#varsizeerd)を有効にすると、次元指定がERDシステムに合わせて左から`1, 2, 3`となります。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 1, 2, 3
		#DIMS HOGES, 4, 5, 6

		VARSIZE HOGE
		PRINTFORML HOGE 1Dim:{RESULT:0} 2Dim:{RESULT:1} 3Dim:{RESULT:2}
		PRINTFORMW HOGES 1Dim:{VARSIZE("HOGES", 0)} 2Dim:{VARSIZE("HOGES", 1)} 3Dim:{VARSIZE("HOGES", 2)}
    ``` 
    ``` title="結果"
	HOGE 1Dim:1 2Dim:2 3Dim:3
	HOGES 1Dim:4 2Dim:5 3Dim:6
    ```
