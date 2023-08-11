---
hide:
  - toc
---

# CVARSET

| 関数名                                                         | 引数                                          | 戻り値 |
| :------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.md) | `charaVariable`(, `int`, `int`, `int`, `int`) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	CVARSET characterVariable, index, value, startID, endID
    ```
	指定した登録キャラクタについてキャラクタ変数の特定要素へ代入する命令です。  
	第一引数で指定した変数の第四引数以降で指定した登録キャラクタについて、第二引数で指定した要素へ第三引数で指定した値を代入します。  
	`NAME`、`ISASSI`などの一次元配列変数の場合、第二引数は処理に影響しません。そのため第三引数を省略しない場合、適当な値を指定してください。  
	第三引数を省略した場合、`0`又は空文字列が代入されます。  
	第二引数も省略した場合、`0`番目の要素に代入されます。  
	第四引数以降を省略した場合、全ての登録キャラクタに代入されます。  

    ```  { #language-erbapi }
	CVARSET CFLAG, 10, 123
	```

	このスクリプトは以下と同じことです。

    ```  { #language-erbapi }
	REPEAT CHARANUM
		CFLAG:COUNT:10 = 123
	REND
	```

!!! hint "ヒント"

    命令のみ対応しています。
