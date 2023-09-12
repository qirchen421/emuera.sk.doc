---
hide:
  - toc
---

# SUMCARRAY, CMATCH, MAXCARRAY, MINCARRAY

| 関数名                                                          | 引数                                | 戻り値 |
| :-------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)        | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.md)    | `charaArray`, `any`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)        | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.md) | `charaArray`(, `int`, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMCARRAY charaArray(, start, end)
	int CMATCH charaArray, value(, start, end)
	int MAXCARRAY charaArray(, start, end)
	int MINCARRAY charaArray(, start, end)
    ```
	キャラクタ間を走査する[`SUMARRAY`](./SUMARRAY.md)、[`MATCH`](./MATCH.md)、[`MAXARRAY`](./MAXMINARRAY.md)、[`MINARRAY`](./MAXMINARRAY.md)のバリエーションです。  
	`charaArray`はキャラクタ配列変数でなければなりません。  
	`start, end`はキャラクタ登録番号で指定します。  
	例えば`RESULT = SUMCARRAY(CFLAG:2, A, B)`は以下のようも書けます。  
	（`B`は`CHARANUM`より小さくなければなりません）  

		RESULT = 0
		FOR COUNT, A, B
			RESULT += CFLAG:COUNT:2
		REND

!!! hint "ヒント"

    命令、式中関数両方対応しています。
