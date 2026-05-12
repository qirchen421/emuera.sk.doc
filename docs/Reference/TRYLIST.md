---
hide:
  - toc
---

# TRYLIST系

| 関数名                                                             | 引数                       | 戻り値 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.md) | なし                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.md) | なし                       | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.md) | なし                       | なし   |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.md)        | `functionName`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.md)     | なし                       | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLLIST
	TRYJUMPLIST
	TRYGOTOLIST
	FUNC functionName(, argument...)
	ENDFUNC
    ```
	複数の関数（ラベル）を指定し、最初に見つかった関数（のみ）を呼び出すための構文です。  
	`TRYLIST系～ENDFUNC`内に上記の文法以外の記述をすることはできません。  
	なお、`TRYGOTOLIST`で直接ループ・分岐構文内に入った場合については[`TRYGOTO`](./TRY.md)や[`ループ・分岐構文`](../Reference/README.md#_8)、[`TRYC`系](./TRYC.md)の項を参照してください。  
	以下のように使用します。  

    ```  { #language-erbapi }
	TRYCALLLIST
		FUNC 関数1
		FUNC 関数2
	ENDFUNC
	```

	`FUNC`で指定された関数の呼び出しを順に試み、成功すれば呼び出した後`ENDFUNC`へ、失敗すれば次の行の`FUNC`（又は`ENDFUNC`）へ移動します。  
	これは以下のスクリプトと同等です。  

    ```  { #language-erbapi }
	TRYCCALL 関数1
	CATCH
		TRYCCALL 関数2
		CATCH
		ENDCATCH
	ENDCATCH
	```

!!! hint "ヒント"

    命令のみ対応しています。

### 関連項目
- [TRY系](TRY.md)
- [TRYC系](TRYC.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
