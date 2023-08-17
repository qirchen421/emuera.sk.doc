---
hide:
  - toc
---

# FINDCHARA, FINDLASTCHARA

| 関数名                                                                 | 引数                                     | 戻り値 |
| :--------------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.md)     | `charaVariable`, `int`(, `int`, `int`)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.md) | `charaVariable`, `int`(, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int FINDCHARA charaVariable, value(, startID, endID)
	int FINDLASTCHARA charaVariable, value(, startID, endID)
    ```
	`FINDCHARA`命令はキャラクタ変数と値を指定し、変数がその値であるキャラクタの登録番号を返します。  
	複数見つかった場合、`FINDCHARA`は最初にヒットしたキャラを、  
	`FINDLASTCHARA`は最後にヒットしたキャラを返します。見つからなかった場合は`-1`を返します。  
	また、第3引数を指定することで検索の開始位置を、第4引数を指定することで検索の終了位置を指定できます。  
	ただし、検索範囲がキャラクタ数の範囲を超える場合はエラーとなります。  

    ```  { #language-erbapi }
	X = -1
	WHILE 1
		FINDCHARA CFLAG:10, 123, X + 1
		X = RESULT
		SIF X < 0
			BREAK
		PRINTFORML %NAME:X%
	WEND
	```

	上記のスクリプトは`CFLAG:10`が`123`のキャラを全員羅列するスクリプトになります。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
