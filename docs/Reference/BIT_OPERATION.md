---
hide:
  - toc
---

# BIT操作系

| 関数名                                                                 | 引数                                 | 戻り値 |
| :--------------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.md)    | `int`, `int`                         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.md)    | `integerVariable`, `int`(, `int`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.md)  | `integarVariable`, `int`(, `int`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.md) | `integarVariable`, `int`(, `int`...) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	int GETBIT targetInt, bit
	SETBIT integerVariable, bit(, bit...)
	CLEARBIT integerVariable, bit(, bit...)
	INVERTBIT integerVariable, bit(, bit...)
    ```
	ビット操作関数です。  

	`GETBIT`は引数の特定のビットを取得します。
	第1引数に対象となる数字を、第2引数には取得したいビットの位置を指定します。 第2引数に指定できる値は`0～63`までで、範囲外の数値を指定するとエラーになります。
	第2引数が定数の場合、例えば`5`であれば、

    ```  { #language-erbapi }
	GETBIT X, 5
	RESULT = (X & 1p5) != 0
	```
	
	2つの行は同じ結果になります。

	`SETBIT`、`CLEARBIT`、`INVERTBIT`は第1引数で指定した変数の、第2引数以降で指定した位置のビットを操作します。
	`SETBIT`はビットを`1`にし、`CLEARBIT`は`0`にし、`INVERTBIT`は反転させます。

    ```  { #language-erbapi }
	SETBIT X, A
	CLEARBIT Y, B
	INVERTBIT Z, C
	```

	の結果は以下と同じです。

    ```  { #language-erbapi }
	X |= 1 << A
	Y &= ~(1 << B)
	Z ^= 1 << C
	```

	また、これらの書式は`GETBIT`と対応しています。
	`SETBIT X, A`で変更したビットを`GETBIT(X, A)`で参照することができます。

!!! hint "ヒント"

    `SETBIT`以外は式中関数対応しています。
