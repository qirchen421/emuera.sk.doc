---
hide:
  - toc
---

# CBRT, LOG, LOG10, EXPOMENT

| 関数名                                                                 | 引数  | 戻り値 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)     | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)      | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)    | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBRT value
	int LOG value
	int LOG10 value
	int EXPOMENT value
    ```
	以下、私家改造版更新履歴より  

		数学関数を式中関数として追加
		CBRT（三重根）
		LOG（自然関数）
		LOG10(常用対数）
		EXPONENT（指数関数）
		書式は全部：関数名(引数)

	Emueraでは小数を扱うことができないため、使用の際には工夫を必要とします。  

!!! hint "ヒント"

    命令、式中関数両方対応しています。
