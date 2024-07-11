---
hide:
  - toc
---

# HTML_ESCAPE

| 関数名                                                                 | 引数     | 戻り値  |
| :--------------------------------------------------------------------- | :------- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.md) | `string` | `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_ESCAPE, htmlString  
    ```
	対象の文字列をHtml向けにエスケープ（文字参照に変換）します。  
	アンエスケープには[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md)関数を使用します。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTFORMW %HTML_ESCAPE("A&B<C>D'E")%
    ``` 
    ``` title="結果"
	A&amp;B&lt;C&gt;D&apos;E
    ```

### 関連項目
- [HTML_TOPLAINTEXT](HTML_TOPLAINTEXT.md)
- [ESCAPE](ESCAPE.md)
