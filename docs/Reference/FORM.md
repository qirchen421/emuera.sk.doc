---
hide:
  - toc
---

# CALLFORM, JUMPFORM, GOTOFORM

| 関数名                                                       | 引数                       | 戻り値 |
| :----------------------------------------------------------- | :------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.md) | `functionName`(, `any`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.md) | `functionName`(, `any`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.md) | `labelName`                | なし   |

!!! info "API"

    ```  { #language-erbapi }
	CALLFORM functionName(, argument...)
	JUMPFORM functionName(, argument...)
	GOTOFORM labelName
    ```
	[`CALL`](./CALL.md)、[`JUMP`](./JUMP.md)、[`GOTO`](./GOTO.md)と同じですが、[`PRINTFORM`](./PRINT.md)などと同じ形式で関数名を指定できます。  

    ```  { #language-erbapi }
	CALLFORM KOJO_{NO:TARGET}_{SELECTCOM}
	```

	のような使い方ができます。 `JUMPFORM`と`CALLFORM`は引数を指定できます。詳しくは[関数の`自作関数における引数指定`](../Emuera//function.md#_2)の項を参照してください。
	なお、`GOTOFORM`で直接ループ・分岐構文内に入った場合については[`TRYGOTO`](./TRY.md)や[`ループ・分岐構文`](../Reference/README.md#_9)、[`TRYC`系](./TRYC.md)の項を参照してください。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIMS HOGE
		HOGES = AAA
		CALLFORM %HOGES%
		JUMPFORM %"C"*3%

	@AAA
		PRINTL AAA

	@CCC
		PRINTL CCC
		WAIT
    ``` 
    ``` title="結果"
	AAA
	CCC
    ```
