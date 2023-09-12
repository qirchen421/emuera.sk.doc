---
hide:
  - toc
---

# INRANGEARRAY, INRANGECARRAY

| 関数名                                                                   | 引数                                         | 戻り値 |
| :----------------------------------------------------------------------- | :------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int INRANGEARRAY integerArray, minValue, maxValue(, start, end)
	int INRANGEARRAY charaArray, minValue, maxValue(, start, end)
    ```
	`INRANGEARRAY`は指定された配列において、`minValue <= value < maxValue`をとなる値を持つ要素の数を返します。  
	`INRANGECARRAY`は指定したキャラクタ配列において、`minValue` <= value < maxValue`をとなる値を持つ要素の数を返します

!!! hint "ヒント"

    命令、式中関数両方対応しています。
