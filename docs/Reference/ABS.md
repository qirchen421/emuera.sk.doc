---
hide:
  - toc
---

# ABS, SIGN

| 関数名                                                  | 引数 | 戻り値 |
| :------------------------------------------------------ | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.md)  | `int`| `int`  |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int ABS int
	int SIGN int
    ```
	それぞれ、絶対値を正負の方向を表す命令・式中関数です。
	`ABS`は絶対値を、`SIGN`負の値なら`-1`、`0`なら`0`、正の値なら`1`を返します。


!!! hint "ヒント"

    命令、式中関数両方対応しています。
