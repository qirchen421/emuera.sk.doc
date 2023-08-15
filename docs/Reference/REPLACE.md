---
hide:
  - toc
---

# REPLACE

| 関数名                                                         | 引数                         | 戻り値   |
| :------------------------------------------------------------- | :--------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.md) | `string`, `string`, `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string REPLACE string, searchWord, replaceWord
    ```
	置換対象文字列を置換対象パターンで検索し、ヒットしたら置換後の文字列で置き換える
	内部処理は思いっきり正規表現です。第２引数はC#の正規表現の仕様に準じて動作します。
	そのため、`()`や`[]`、`$`、`/` `.` `*` `+`等の正規表現で用いられる記号はエスケープ必須となります

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %REPLACE("12億3456万7890円", "[^0-9]", "")%
    ``` 
    ``` title="結果"
	1234567890
    ```
