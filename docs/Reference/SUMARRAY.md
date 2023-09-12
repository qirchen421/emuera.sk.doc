---
hide:
  - toc
---

# SUMARRAY

| 関数名                                                           | 引数                           | 戻り値 |
| :--------------------------------------------------------------- | :----------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.md) | `integerArray`(, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMARRAY integerArray(, startIndex, endIndex)
    ```
	配列の値の総和を返す関数です。  
	`integerArray`に総和を求めたい1次元数値型配列を指定し、`startIndex`以上`endIndex`未満の要素の範囲を合計します。  
	`endIndex`を省略した場合、配列の最後までを合計します。  
	`RESULT = SUMARRAY(X, A, B)`の結果は  

		RESULT = 0
		FOR COUNT, A, B
			RESULT += X:COUNT
		REND

	と同等です。
	加算される値は`X:(B - 1)`までで`X:B`が加算されないことに注意してください。
	`integerArray`に指定できるものは数値型1次元配列変数のみで文字列変数や多次元配列は指定できません。
	`integerArray`に`CFLAG`などのキャラクタ配列を指定した場合、指定されたキャラについてのみ合計します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
