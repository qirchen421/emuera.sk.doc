---
hide:
  - toc
---

# SPLIT, STRJOIN

| 関数名                                                       | 引数                                    | 戻り値   |
| :----------------------------------------------------------- | :-------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.md)   | `string`, `string`, `stringArray`       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.md) | `stringArray`(, `string`, `int`, `int`) | `string` |

!!! info "API"

    ```  { #language-erbapi }
	SPLIT string, sepalateWord, stringArray
	string STRJOIN stringArray(, sepalateWord, startIndex, joinCount)
    ```
	`SPLIT`は第1引数で指定した文字列を、第2引数で指定した文字列を区切りとして分割し、第3引数で指定した文字列配列変数に代入します。  
	また、分割した数を`RESULT`に代入します。  
	第3引数で指定する変数は配列変数でなければなりません。  

    ```  { #language-erbapi }
	SPLIT "あい,うえ,,お", ",", LOCALS
	```

	上記のスクリプトの結果、`LOCALS:0`に`あい`、`LOCALS:1`に`うえ`、`LOCALS:2`に空文字列、`LOCALS:3`に`お`、`RESULT`に`4`が代入されます。  
	分割後の要素数が第3引数に代入可能な要素数を超えた分については代入が行われません  
	`RESULT`には実際の分割数が入れられるのでそちらで判別してください  

	`STRJOIN`は`SPLIT`とは反対の文字列結合命令です。キャラ変数を指定した場合エラーになるかも  
	`sepalateWord`は結合のさいに要素間に加える文字列です。他の言語の同一処理同様、省略時は`,`が自動的に適用されます（区切り文字が必要ない場合は`""`を与えてください）  
	`startIndex`と`joinCount`を指定した場合、`配列添え字開始位置≦i＜開始位置＋配列添え字要素数`の範囲で結合します  
	後者を指定する場合、前者は省略不可  

!!! hint "ヒント"

    `STRJOIN`は式中関数対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		SPLIT "あい,うえ,,お", ",", LOCALS
		REPEAT RESULT
			PRINTFORML %LOCALS:COUNT%
		REND
		PRINTFORMW %STRJOIN(LOCALS, "")%
    ``` 
    ``` title="結果"
	あい
	うえ
	
	お
	あいうえお
    ```
