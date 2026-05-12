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

!!! warning "RESULTの上書きと関数末尾の暗黙的代入"

    `RETURN`は**必ず**`RESULT`を上書きします。関数内で手動で`RESULT`に値を代入しても、`RETURN`実行時に失われます。
    
    また、関数の終端に達した場合（`RETURN`が実行されなかった場合）、`RESULT:0`に暗黙的に`0`が代入されます。

    ``` { #language-erb }
    @MY_FUNC
        RESULT = 999
        RETURN 1
        ; 呼び出し元の RESULT は 999 ではなく 1
    
    @MY_FUNC2
        RESULT = 999
        ; RETURN なし → 関数終端で RESULT:0 = 0 になる
    ```

    ただし、[`#FUNCTION`](../Emuera/function.md)宣言された式中関数では`RETURNF`を使用し、`RETURNF`は`RESULT`を**上書きしません**。また関数末尾でも`RESULT`への暗黙的代入は行われません。

    ``` { #language-erb }
    @MY_EXPR_FUNC
        #FUNCTION
        RESULT = 999
        RETURNF 1
        ; 呼び出し元の RESULT は 999 のまま（RETURNF は RESULT を上書きしない）
    ```


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
