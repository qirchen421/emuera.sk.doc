---
hide:
  - toc
---

# JUMP

| 関数名                                                     | 引数             | 戻り値 |
| :--------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md) | `functionName`   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	JUMP functionName
    ```
	`@`から始まる文字列で定義された関数を呼び出す  
	関数の終端に達するか[`RETURN`](./RETURN.md)が行われると、関数を終了する  
	[`CALL`](./CALL.md)との違いは、実行時に関数をスタックしないため、遷移先の関数が終了しても戻ってこない。そのため、呼び出しスタックが無い場合はエラー終了の恐れがある  


!!! hint "ヒント"

    命令のみ両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL CALL to AAA
		CALL AAA

		PRINTW Backed SYSTEM_TITLE

		@AAA
		PRINTL JUMP to BBB
		JUMP BBB

		PRINTL Can not reach here

		@BBB
		PRINTL Exit BBB
		RETURN
    ``` 
    ``` title="結果"
	CALL to AAA
	JUMP to BBB
	Exit BBB
	Backed SYSTEM_TITLE
    ```
