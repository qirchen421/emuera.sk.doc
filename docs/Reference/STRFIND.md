---
hide:
  - toc
---

# STRFIND

| 関数名                                                          | 引数                        | 戻り値 |
| :-------------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.md)  | `string`, `string`(, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.md) | `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int STRFIND string, searchWord(, startPosition)
	int STRFINDU string, searchWord(, startPosition)
    ```
	文字列検索命令です。  
	第一引数には検索される対象の文字列を文字列式で、第二引数には検索する文字列を文字列式で指定します。  
	`STRFIND`は全角文字を2文字、`STRFINDU`は全角文字を1文字と数え、0から始まるインデックスを返します。見つからなかった場合は-1です。  
	1.712以降、STRFIND(U)命令に第3引数が指定できるようにしました。  
	第3引数には検索の開始位置を`0`から始まるインデックスで指定します。  

    ```  { #language-erbapi }
	STRFIND "abcdeabced","a",3
	```

	上の行の結果、`RESULT`には`5`が代入されます。  
	`a`は0の位置にもありますが、第3引数により検索は3の位置(`d`)から開始されるので最初に見つかる`a`は5の位置になります。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = abcdefghi
		STR:1 = あいうえお
		STR:2 = うえ
		STRFIND STR:0, "cde"
		PRINTFORML <TEST1> = {RESULT:0}
		STRFIND STR:1, "いうえ"
		PRINTFORML <TEST2> = {RESULT:0}
		STRFIND STR:1, STR:2
		PRINTFORML <TEST3> = {RESULT:0}
		STRFIND STR:1, "か"
		PRINTFORML <TEST4> = {RESULT:0}
    ``` 
    ``` title="結果"
	<TEST1> = 2
	<TEST2> = 2
	<TEST3> = 4
	<TEST4> = -1
    ```
