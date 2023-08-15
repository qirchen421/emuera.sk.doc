---
hide:
  - toc
---

# POWER

| 関数名                                                     | 引数                              | 戻り値 |
| :--------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.md) | `integerVariable`, `int`, `int`   | `int`  |
|                                                            | `int`, `int`                      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	POWER integerVariable, int, int
	int POWER int, int
    ```
    命令と式中関数で引数が違います。  
	命令の場合、第1引数の変数に、第2引数の数値を第3引数で乗じた値が代入されます。  
	式中関数の場合は、第1引数の数値を第2引数で乗じた値が代入されます。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		X = 11
		Y = 2
		POWER A, X, 2
		PRINTFORML <TEST1> = {A}
		POWER CFLAG:2, X + 1, Y + 1
		PRINTFORML <TEST2> = {CFLAG:2}
    ``` 
    ``` title="結果"
	<TEST1> = 121
	<TEST2> = 1728
    ```
