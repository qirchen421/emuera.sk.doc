---
hide:
  - toc
---

# DELCHARA

| 関数名                                                                                                  | 引数                 | 戻り値 |
| :------------------------------------------------------------------------------------------------------ | :------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.md) | `int`(, `int`,...)   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	DELCHARA charaID(, charaID,...)
    ```
    指定したIDのキャラを削除する  
	`Emuera`にて一度に複数のキャラを削除することが可能に


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;キャラ番号0のキャラの名前が浩之で主人公。
		;キャラ番号3のキャラの名前が智子、5のキャラの名前がレミィ、6のキャラの名前が琴音だとする
		PRINTFORML 今いるキャラは{CHARANUM}人です。
		ADDCHARA 3
		ADDCHARA 5
		ADDCHARA 6
		PRINTFORML 今いるキャラは{CHARANUM}人です。
		REPEAT CHARANUM
			PRINTFORML {COUNT}番目に%NAME:COUNT%。
		REND
		DELCHARA 2
		PRINTFORML 今いるキャラは{CHARANUM}人です。
		REPEAT CHARANUM
		PRINTFORML {COUNT}番目に%NAME:COUNT%。
			REND
	``` 
    ``` title="結果"
	今いるキャラは1人です。
	今いるキャラは4人です。
	0番目に浩之。
	1番目に智子。
	2番目にレミィ。
	3番目に琴音。
	今いるキャラは3人です。
	0番目に浩之。
	1番目に智子。
	2番目に琴音。
    ```
