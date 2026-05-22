---
hide:
  - toc
---

# TRYCALLFORM, TRYJUMPFORM, TRYGOTOFORM

| 関数名                                                             | 引数                       | 戻り値 |
| :----------------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.md) | `formedString`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.md) | `formedString`(, `any`...) | `void`¹ |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.md) | `formedString`             | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TRYCALLFORM formedString(, argument...)
	TRYJUMPFORM formedString(, argument...)
	TRYGOTOFORM formedString
    ```
	[`JUMP`](./JUMP.md)、[`CALL`](./CALL.md)、[`GOTO`](./GOTO.md)と同じですが、[`PRINTFORM`](./PRINT.md)などと同じ形式で関数名を指定でき、関数が存在しなくてもエラーになりません。  
	`TRYJUMPFORM`と`TRYCALLFORM`は引数を指定できます。詳しくは[関数ページの`自作関数における引数指定`の項](../Emuera//function.md#_2)を参照してください。  
	なお、`TRYGOTOFORM`で直接ループ・分岐構文内に入った場合については[`TRYGOTO`](./TRY.md)や[`ループ・分岐構文`](../Reference/README.md#flow-control)、[`TRYC`系](./TRYC.md)の項を参照してください。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGE
		HOGES = AAA

		TRYCALLFORM %HOGES%
		TRYCALLFORM %HOGES%BBB
		TRYJUMPFORM %"C"*3%

	@AAA
		PRINTL AAA

	@BBB
		PRINTL BBB

	@CCC
		PRINTL CCC
		WAIT
    ``` 
    ``` title="結果"
	AAA
	CCC
    ```

### 関連項目
- [TRY系](TRY.md)
- [CALL](CALL.md)
- [JUMP](JUMP.md)
- [GOTO](GOTO.md)
