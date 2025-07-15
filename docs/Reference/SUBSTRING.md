---
hide:
  - toc
---

# SUBSTRING

| 関数名                                                              | 引数                   | 戻り値   |
| :------------------------------------------------------------------ | :--------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.md)  | `string`, `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.md) | `string`, `int`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string SUBSTRING string, startPosition, characterCount
	string SUBSTRINGU string, startPosition, characterCount
    ```
	指定した文字列式の、第一引数で指定した箇所から第二引数で指定した文字数の部分文字列を返します。  
	開始位置は文字列の最初が`0`です。元文字列の長さより後を指定した場合、空文字列が返されます。  
	文字数は`SUBSTRING`の場合、SHIFT-JISでのバイト数で指定します。つまり全角文字を2文字と数えます。`SUBSTRINGU`はUnicodeでカウントするため、全角文字も1文字として数えます  
	文字数に負の値を指定するか、元文字列の終端より後の位置を指定した場合、開始位置から最後までの文字列を返します。  
	開始位置または終了位置で文字を切ることができない場合（全角文字の途中を指している場合）、1つ後ろを指定されたと判断されます。  
	このことで指定した文字数よりも1文字分だけ長い文字列が返される場合があるので注意してください。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		STR:0 = 01234あいうえお
		SUBSTRING STR:0, 0, -1
		PRINTFORML <TEST1> = %RESULTS:0%
		SUBSTRING STR:0, 1, 3
		PRINTFORML <TEST2> = %RESULTS:0%
		SUBSTRING STR:0, 6, 3
		PRINTFORML <TEST3> = %RESULTS:0%
		WAIT
    ``` 
    ``` title="結果"
	<TEST1> = 01234あいうえお
	<TEST2> = 123
	<TEST3> = いう
    ```

### 関連項目
- [STRFIND](STRFIND.md)
