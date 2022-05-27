# EXISTFUNCTION

| 関数名                                                                       | 引数              | 戻り値 |
| :----------------------------------------------------------------------------| :---------------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string` | `int` |

!!! info "API"

    ``` { #language-erbapi }
	int EXISTFUNCTION funcName
    ```

	引数で指定した関数が存在するかの式中関数。通常関数なら1を、式中関数(数値型)なら2を、式中関数(文字列型)なら3を返す
	システム関数やシステム組み込み式中関数は0を返す

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE

		PRINTSL EXISTFUNCTION("TEST1")
		PRINTSL EXISTFUNCTION("TEST2")
		PRINTSL EXISTFUNCTION("TEST3")
		PRINTSL EXISTFUNCTION("SYSTEM_TITLE")
		WAIT

	@TEST1

	@TEST2
	#FUNCTION

	@TEST3
	#FUNCTIONS
    ```

    ``` title="結果"
	1
	2
	3
	0
    ```
