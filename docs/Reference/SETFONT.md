---
hide:
  - toc
---

# SETFONT系

| 関数名                                                         | 引数     | 戻り値   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.md) | `string` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.md) | `string` | なし     |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.md) | なし     | `string` |

!!! info "API"

    ```  { #language-erbapi }
	int CHKFONT fontName
	SETFONT fontName
	string GETFONT
    ```
	`CHKFONT`は指定された名前のフォントがインストールされているかどうかを調べます。  
	インストールされていれば1、されていなければ0が`RESULT:0`に代入もしくは返されます。  

	`SETFONT`命令は以降の文字列表示に指定された名前のフォントを用います。   
	引数を省略、または空文字列を指定した場合、[`emuera.config`に指定された標準のフォント](../Emuera/config.md#_31)に戻します。  
	指定されたフォントがインストールされていない場合、代わりに`Microsoft Sans Serif`が使用されます。  
	インストールされていない可能性があるフォントを指定する場合は`SETFONT`の前に`CHKFONT`を参照してください。  

	`GETFONT`は現在使用しているフォントの名前を`RESULTS:0`に代入もしくは返します。  
	これは`SETFONT`命令で指定した名前と同じです。  
	`SETFONT`命令が行われていない時は[`emuera.config`で指定されている標準のフォント](../Emuera/config.md#_31)の名前を代入します。  

	それぞれEM+EEの追加機能で、Emueraと同ディレクトリ内にある`font`フォルダ内の`ttf`,`otf`も使用可能になりました   

!!! hint "ヒント"

    `CHKFONT`、`GETFONT`は式中関数対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL abc123あいう(標準フォント)
		CHKFONT "ＭＳ Ｐゴシック"
		IF RESULT
			SETFONT "ＭＳ Ｐゴシック"
			PRINTL abc123あいう(ＭＳ Ｐゴシック)
		ENDIF
		CHKFONT "ＭＳ 明朝"
		IF RESULT
			SETFONT "ＭＳ 明朝"
			PRINTL abc123あいう(ＭＳ 明朝)
		ENDIF
		STR:0 = ＭＳ Ｐ明朝
		CHKFONT STR:0
		IF RESULT
			SETFONT STR:0
			PRINTL abc123あいう(ＭＳ Ｐ明朝)
		ENDIF
		SETFONT
    ``` 
	![](../assets/images/SETFONT.png)
