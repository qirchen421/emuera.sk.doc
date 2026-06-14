---
hide:
  - toc
---

# POWER

| 関数名                                                     | 引数                              | 戻り値              |
| :--------------------------------------------------------- | :-------------------------------- | :------------------ |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.md) | `integerVariable`, `int`, `int`   | `int`               |
|                                                            | `int`, `int`                      | `int`/`float`（同型） |

!!! info "API"

    ```  { #language-erbapi }
	POWER integerVariable, int, int
	int POWER int, int
	int/float POWER int/float, int/float
    ```
    命令と式中関数で引数が違います。  
	命令の場合、第1引数の変数に、第2引数の数値を第3引数で乗じた値が代入されます。  
	式中関数の場合は、第1引数の数値を第2引数で乗じた値が代入されます。  

    !!! warning "Skia版：式中関数の動的戻り値型"

        Skia版では、式中関数`POWER`にFloat型引数を渡すとFloat型を返します（`CanReturnFloat`機構）。引数がすべてInteger型の場合は従来通りInteger型を返します。

        ``` { #language-erb }
        POWER(2, 32) - 1      ; Integer → 4294967295
        POWER(1.1, 6) * 200   ; Float → 354.3122
        ```


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

### 関連項目
- [CBRT, LOG, LOG10, EXPOMENT](MATH_EXTENSION.md)
