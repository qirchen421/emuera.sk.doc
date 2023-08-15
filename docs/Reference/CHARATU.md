---
hide:
  - toc
---

# CHARATU

| 関数名                                                         | 引数            | 戻り値   |
| :------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.md) | `string`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string CHARATU string, position
    ```
	文字列中の任意の文字数目の文字を取得する式中関数`CHARATU``  

		CHARATU(<参照文字列>, [取得文字位置])

	文字列の指定した位置の文字を取得する  
　　処理系はユニコードとなります  

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = "いろはにほ"

		REPEAT 5
			PRINTFORML %CHARATU(HOGES, COUNT)%
		REND
		WAIT
    ``` 
    ``` title="結果"
	い
	ろ
	は
	に
	ほ
    ```
