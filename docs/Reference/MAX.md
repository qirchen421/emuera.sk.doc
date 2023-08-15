---
hide:
  - toc
---

# MAX, MIN, LIMIT, INRANGE

| 関数名                                                     | 引数                | 戻り値 |
| :--------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.md)     | `int`(, `int`...)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.md)     | `int`(, `int`...)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.md)   | `int`, `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int MAX int(, int...)
	int MIN int(, int...)
	int LIMIT int, maxValue, minValue
	int INRANGE int, maxValue, minValue
    ```
	`MAX`は引数の中で最大の数値を返します。

	`MIN`は引数の中で最小の数値を返します。

	第一引数の値を返します。
	ただし、第一引数が第二引数より小さいなら第二引数の値を、第三引数より大きいなら第三引数を返します。
	例えば`A`に`X - Y`を代入したいが、代入後の値が`0`以上`100`以下であってほしい場合、通常は以下のように書きます。

    ```  { #language-erbapi }
	A = X - Y
	SIF A < 0
		A = 0
	SIF A > 100
		A = 100
	```

	`LIMIT`命令を使うとこれを二行にまとめることができます。

    ```  { #language-erbapi }
	LIMIT X - Y, 0, 100
	A = RESULT
	```

	`INRANGE`は第一引数の値が第二引数以上かつ第三引数以下であれば`1`を、第一引数が第二引数より小さい、または第三引数より大きいなら`0`を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。
