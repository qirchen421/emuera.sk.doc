---
hide:
  - toc
---

# STRCOUNT

| 関数名                                                           | 引数               | 戻り値 |
| :--------------------------------------------------------------- | :----------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.md) | `string`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int STRCOUNT string, searchWord
    ```
	文字列中の指定部分文字列の数を取得する命令です。ヒットした数を`RESULT:0`に代入もしくは返します。  
	検索文字列の書式はC#の正規表現の仕様に準じます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORML 「も」の数:{STRCOUNT("すもももももももものうち", "も")}
		PRINTFORMW 半角数字の数:{STRCOUNT("1日1歩 3日で3歩 3歩進んで2歩下がる", "[0-9]")}
    ``` 
    ``` title="結果"
	「も」の数:8
	半角数字の数:6
    ```

### 関連項目
- [STRFIND](STRFIND.md)
