---
hide:
  - toc
---

# HTML_TOPLAINTEXT

| 関数名                                                                           | 引数     | 戻り値  |
| :------------------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_TOPLAINTEXT, string  
    ```
	対象のhtml文字列をプレーンテキストに変換します。  
	具体的には、文字列からhtmlタグを削除し文字参照を展開します。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_TOPLAINTEXT("<b>AAA</b><i><b>BBB</b></i><s>CCC</s>")%
    ``` 
    ``` title="結果"
	AAABBBCCC
    ```
