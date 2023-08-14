---
hide:
  - toc
---

# FONT操作系

| 関数名                                                                    | 引数 | 戻り値 |
| :------------------------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.md)    | なし | なし   |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.md)  | なし | なし   |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.md)   | `int`| なし   |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.md) | なし | なし   |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.md)    | なし | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	FONTBOLD
	FONTITALIC
	FONTSTYLE
	FONTREGULAR bitStyle
	int GETSTYLE
    ```
	以降の文字を指定したスタイルに変更する  
	`BOLD`と`ITALIC`は重複可（太字斜体）  
	`REGULAR`を呼ぶと、太字・斜体指定が解除されます  

	FONTSTYLEは以降の文字を指定したスタイルに変更します。  
	0であれば通常、1なら太字(`FONTBOLD`と同義)、2なら斜体(`FONTITALIC`と同義)、4なら打ち消し線、8なら下線が引かれます。  
	これらはビットごとに組み合わせることができます。  
	例えばFONTSTYLE 3なら太字かつ斜体になります。  
	`FONTBOLD`、`FONTITALIC`は現在のスタイルに太字、斜体スタイルを加えます。  
	`FONTREGULAR`は`FONTSTYLE 0`と等価です。つまり通常のスタイルに戻します。  

	`GETSTYLE`は現在のフォントのスタイル（太字、斜線など）を`RESULT:0`に代入します。  
	これは`SETSTYLE`命令で指定した値と同じです。  
	`SETSTYLE`命令が行われていない時は`0`を返します。  

!!! hint "ヒント"

    `GETSTYLE`のみ式中関数対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		FONTSTYLE 1 + 2
		PRINTL 太字＋斜体
		FONTSTYLE 5
		PRINTL 太字＋打ち消し
		FONTITALIC
		PRINTL 太字＋斜体＋打ち消し
		PRINTFORML GETSTYLE:{GETSTYLE()}
		FONTSTYLE 0
		PRINTW 通常
    ``` 
	![](../assets/images/FONT_OPERATION.png)
