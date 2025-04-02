---
hide:
  - toc
---

# MATCH

| 関数名                                                     | 引数                         | 戻り値 |
| :--------------------------------------------------------- | :--------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.md) | `array`, `any`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MATCH array, value(, start, end)
    ```
	`array`で指定した配列変数の中に`value`と一致する要素がいくつあるかを返す関数です。  
	`value`は`array`と同じ型である必要があります。  
	`array`に検索対象となる1次元配列を指定し、`start`以上`end`未満の要素の範囲で検索します。  
	`end`を省略した場合、配列の最後までを対象とします。  
	`RESULT = MATCH(X, Y, A, B)`の結果は  

		RESULT = 0
		FOR COUNT, A, B
			IF X:COUNT == Y
				RESULT += 1
			ENDIF
		REND

	と同等です。（`X`、`Y`の代わりに文字列配列と文字列式を指定しても動作します）  
	`array`に指定できるものは1次元配列変数のみで多次元配列は指定できません。  
	`array`に`CFLAG`などのキャラクタ配列を指定した場合、指定されたキャラについてのみ数え上げます。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。

### 関連項目
- [GROUPMATCH](GROUPCHECK.md)
