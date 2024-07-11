---
hide:
  - toc
---


# HTML_GETPRINTEDSTR

| 関数名                                                                               | 引数 | 戻り値  |
| :----------------------------------------------------------------------------------- | :--- | :------ |
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.md) | `int`| `string`|

!!! info "API"

    ```  { #language-erbapi }
	str HTML_GETPRINTEDSTR, lineNo  
    ```
	表示済みのラインのうち`lineNo`で指定した行の内容をhtml形式の文字列として取得します。  
	行の数え方は`LINECOUNT`や`CLEARLINE`命令と同じです。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES, 4
		FONTBOLD
		PRINTL AAA
		FONTITALIC
		PRINTL BBB
		FONTSTYLE 4
		PRINTL CCC
		FONTSTYLE 0
		FONTREGULAR

		REPEAT 4
			HOGES:COUNT = %HTML_GETPRINTEDSTR(COUNT)%
		REND
		REPEAT 4
			PRINTFORML %HOGES:COUNT%
		REND

		WAIT
    ``` 
	![](../assets/images/HTML_GETPRINTEDSTR.png)

### 関連項目
- [GETDISPLAULINE](GETDISPLAYLINE.md)
