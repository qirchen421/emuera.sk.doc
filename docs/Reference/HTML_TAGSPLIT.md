---
hide:
  - toc
---

# HTML_TAGSPLIT

| 関数名                                                                        | 引数                                              | 戻り値          |
| :---------------------------------------------------------------------------- | :------------------------------------------------ | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.md) | `string`(, `integerVariable`, `stringVariable`)   | `int`, `string` |

!!! info "API"

    ```  { #language-erbapi }
	HTML_TAGSPLIT string(, integerVariable, stringVariable)
    ```

	対象文字列をHTML文字列と解釈し、タグと平文に分割して分割数を`RESULT`に、分割後文字列を`RESULTS`に代入します  
	第二、第三引数が指定されている場合、`RESULT`、`RESULTS`の代わりに指定された変数に代入します。  
	分割処理中にエラーが生じた場合、RESULTに-1が代入されます。  
	`HTML_TAGSPLIT`はタグの内容や対応関係の適否までは検証しません。  
	分割数が`RESULTS`の配列サイズを超えた場合、超えた分は`RESULTS`に代入されません。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		HTML_TAGSPLIT "<p align='right'>あ<!--comment-->い<font color='red'>う</font></p>"  
		REPEAT 8
			PRINTFORML RESULTS:{COUNT} = %RESULTS:COUNT%
		REND
		PRINTFORML RESULT = {RESULT}
		WAIT
    ``` 
    ``` title="結果"
	RESULTS:0 = <p align='right'>  
	RESULTS:1 = あ  
	RESULTS:2 = <!--comment-->  
	RESULTS:3 = い  
	RESULTS:4 = <font color='red'>  
	RESULTS:5 = う  
	RESULTS:6 = </font>  
	RESULTS:7 = </p>  
	RESULT = 8  

    ```
