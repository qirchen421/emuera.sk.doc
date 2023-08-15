---
hide:
  - toc
---

# UNICODE, ENCODETOUNI

| 関数名                                                             | 引数     | 戻り値   |
| :----------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.md)     | `int`    | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.md) | `string` | `int`    |

!!! info "API"

    ```  { #language-erbapi }
	string UNICODE characterCode
	int ENCODETOUNI string(, position)
    ```
	`UNICODE`は引数の値に対応したunicodeの文字を返す命令・式中関数です。
	例えば、以下のスクリプトは白抜きのハートマークを表示します。
	ただし、この関数ではサロゲートペアを扱うことはできません。
	また、フォントが対応していなければ表示できません。

    ```  { #language-erbapi }
	UNICODE 0x2661
	PRINTFORMW %RESULTS%
	```

	なお、EmueraのUnicode対応は完全ではないことに注意してください。
	例えばEmueraはサロゲートペアを使用した場合、正確な動作は保証できません。

	`ENCODETOUNI`は与えられた文字列をユニコードにエンコードしてそのバイトを数値として返します
	命令の場合

	- RESULT:0 　文字数
	- RESULT:1～ バイト数値

	式中関数の場合は対象位置の文字をユニコードのコード値に変換して返します。位置は省略可で、その場合は`0`（先頭）を対象とします

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGES = @"%UNICODE(0x2661)%"
		PRINTFORMW %HOGES% %CONVERT(ENCODETOUNI(HOGES), 16)%
    ``` 
    ``` title="結果"
	♡ 2661
    ```
