---
hide:
  - toc
---

# MAXARRAY, MINARRAY

| 関数名                                                              | 引数                         | 戻り値 |
| :------------------------------------------------------------------ | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.md) | `integerArray`, `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.md) | `integerArray`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAXARRAY integerArray(, start, end)
	int MINARRAY integerArray(, start, end)
    ```
	配列の値の最大又は最小値を返す関数です。  
	`integerArray`に検索対象となる1次元配列を指定し、`start`以上`end`未満の要素の範囲で検索します。  
	`end`を省略した場合、配列の最後までを対象とします。  
	`RESULT = MAXARRAY(X, A, B)`の結果は  

		RESULT = X:A
		FOR COUNT, A, B
			IF X:COUNT > RESULT
				RESULT = X:COUNT
			ENDIF
		REND

	と同等です。  
	`integerArray`に指定できるものは数値型1次元配列変数のみで文字列変数や多次元配列は指定できません。  
	`integerArray`に`CFLAG`などのキャラクタ配列を指定した場合、指定されたキャラについてのみ検索します。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [MAX,MIN](MAX.md)
