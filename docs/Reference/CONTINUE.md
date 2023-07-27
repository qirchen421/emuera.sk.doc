---
hide:
  - toc
---

# CONTINUE, BREAK

| 関数名                                                             | 引数 | 戻り値 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.md) | なし | なし   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.md)    | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	loopInstruction
		CONTINUE
		BREAK
	loopendInstruction
    ```
    [`REPEAT`](./REPEAT.md)、[`FOR`](./FOR.md)、[`WHILE`](./WHILE.md)、[`DO`](./DO.md)内で使用可能なループ制御命令
	`CONTINUE`は実行時にループ開始行に戻り、`REPEAT`及び`FOR`の場合は該当のカウント変数を加算もしくは減算する
	`BREAK`は実行時に以降のループ処理を打ち切り、ループ終端行に飛ぶ


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		REPEAT 5
			SIF COUNT == 2
				CONTINUE
			SIF COUNT == 4
				BREAK
			PRINTFORML {COUNT}
		REND
		PRINTFORML {COUNT}

		DO
			COUNT++
			IF UNICODE(COUNT) == "A"
				FOR COUNT, COUNT, COUNT+26
					PRINTFORM %UNICODE(COUNT)%
				NEXT
				BREAK
			ENDIF
		LOOP 1
		WAIT
    ``` 
    ``` title="結果"
	0
	1
	3
	5
	ABCDEFGHIJKLMNOPQRSTUVWXYZ
    ```
