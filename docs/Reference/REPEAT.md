---
hide:
  - toc
---

# REPEAT-REND

| 関数名                                                         | 引数  | 戻り値 |
| :------------------------------------------------------------- | :---  | :----- |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.md) | `int` | なし   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.md)   | なし  | なし   |

!!! info "API"

    ```  { #language-erbapi }
	REPEAT loopCount
	REND
    ```
    `REPEAT`～`REND`間を、引数で指定した回数ループする。ループした回数は`COUNT`変数に記録される
	[`CONTINUE`](./CONTINUE.md)が行われると`REPEAT`行に戻り、`COUNT`変数を+1する
	[`BREAK`](./CONTINUE.md)が行われると以降のループ処理を打ち切り、`REND`行に移る


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
		PRINTFORMW {COUNT}
    ``` 
    ``` title="結果"
	0
	1
	3
	5
    ```

### 関連項目
- [FOR-NEXT](FOR.md)
- [WHILE_WEND](WHILE.md)
- [CONTINUE,BREAK](CONTINUE.md)
