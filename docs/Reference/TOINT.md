---
hide:
  - toc
---

# TOINT, ISNUMERIC

| 関数名                                                         | 引数     | 戻り値 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.md)     | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int TOINT string
	int ISNUMERIC string
    ```
	`TOINT`は引数文字列を数値化して`RESULT:0`に代入もしくは返します。ただし、半角数字で構成された文字列のみ数値化できます。  
	引数を数値として解釈できない場合、`0`が代入もしくは返されます。全角数字の場合も同様です。  
	渡される値が不定の場合、`TOINT`の前に`ISNUMERIC`を使うことでコードの安定性が上がります  

	`ISNUMERIC`は文字列を数値としてパース可能か（`TOINT`で値を取れるか）を判断します。  
	引数を数値として解釈できる場合`1`を、それ以外の場合`0`をRESULT:0に代入もしくは返します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES
		REPEAT 3
			SELECTCASE COUNT
				CASE 0
					HOGES = 123
				CASE 1
					HOGES = 一二三
				CASE 2
					HOGES = １２３
			ENDSELECT
			IF ISNUMERIC(HOGES)
				PRINTFORML 変数HOGESは数値型に変換可能です({TOINT(HOGES)})
			ELSE
				PRINTFORML 変数HOGESは数値型に変換できません(%HOGES%)
			ENDIF
		REND
		WAIT
    ``` 
    ``` title="結果"
	変数HOGESは数値型に変換可能です(123)
	変数HOGESは数値型に変換できません(一二三)
	変数HOGESは数値型に変換できません(１２３)
    ```
