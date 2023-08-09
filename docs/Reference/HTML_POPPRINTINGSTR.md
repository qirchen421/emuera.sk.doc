---
hide:
  - toc
---

# HTML_POPPRINTINGSTR

| 関数名                                                                                    | 引数  | 戻り値  |
| :---------------------------------------------------------------------------------------- | :---- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.md)    | `void`| `string`|

!!! info "API"

    ```  { #language-erbapi }
	string HTML_POPPRINTINGSTR
    ```
	現在[`PRINT`](./PRINT.md)中で改行待ちの文字列バッファをHtml形式で取得し、バッファを空にします  
	`p`タグはつかないので`ALIGNMENT`命令による`align`は反映されません。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
	#DIMS HOGES
		FONTBOLD
		PRINT AAA
		FONTITALIC
		PRINT BBB
		FONTSTYLE 4
		PRINT CCC
		FONTSTYLE 0
		FONTREGULAR

		HOGES = %HTML_POPPRINTINGSTR()%
		PRINTL DDD

		PRINTFORMW %HOGES%
    ``` 
    ``` title="結果"
	DDD
	<b>AAA</b><i><b>BBB</b></i><s>CCC</s>
    ```
