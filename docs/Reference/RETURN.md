---
hide:
  - toc
---

# RETURN

| 関数名                                                                                              | 引数                   | 戻り値                    |
| :-------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------ |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.md) | `int`(, `int`,...)     | `引数に同じ`              |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.md)                                    | `strng`(, `string`,...)| `引数に同じ(数値型に変換)`|

!!! info "API"

    ```  { #language-erbapi }
	RETURN result:0(, result:1,...)
	RETURNFORM formedString(, formedString,...)
    ```
    引数で指定した値を`RESULT`に代入し、実行中の関数を終了する  
	`RETURN`は引数を左から`RESULT:0`, `RESULT:1`,...と代入する  
	
	`RETURNFORM`は`RETURN`の亜種です。  
	引数に指定された書式付文字列を数式として解析し、`RETURN`を行います。  
	例えば、以下のようなことができます。  

    ```  { #language-erbapi }
	A = 100
	CALL TEST
	PRINTFORMW RESULT == {RESULT}

	@TEST
	STR = A * 10
	RETURNFORM %STR%
	```

	`RETURN`と異なり、%は剰余演算子ではなく文字列式の開始とみなされるので注意してください。  

    ```  { #language-erbapi }
	;OK。Aの下２ケタを返す。
		RETURN A % 100

	;エラー。%以降を文字列式として読もうとするので。
		RETURNFORM A % 100
	```
	また、複数の返り値に対応しています。  
	複数の返り値を指定した場合、先頭から`RESULT:0`、`RESULT:1``...という風に代入されます。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CALL AAA

		PRINTFORML {RESULT:0}, {RESULT:1}, {RESULT:2}

		CALL BBB

		PRINTFORMW {RESULT:0}

		@AAA
		RETURN 5, 7, 3

		@BBB
		#DIMS HOGES

		HOGES '= "3"*2

		RETURNFORM %HOGES%4
    ``` 
    ``` title="結果"
		5, 7, 3
		334
    ```

### 関連項目
- [RESTART](RESTART.md)
