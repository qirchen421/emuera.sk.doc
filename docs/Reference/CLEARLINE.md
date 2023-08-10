---
hide:
  - toc
---

# CLEARLINE

| 関数名                                                             | 引数 | 戻り値 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLEARLINE`](./CLEARLINE.md) | `int`| なし   |

!!! info "API"

    ```  { #language-erbapi }
	CLEARLINE line
    ```
	指定した行数の文字列を削除します（行の数え方は`LINECOUNT`と同様です）  
	行数は[`PRINTL`](./PRINT.md)等で改行が行われるまでのものを1つの行とします。  
	なお、長い文字列が複数行に分割されたものもまとめて1行として扱うので気をつけてください。  

!!! hint "ヒント"

    命令のみ両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		PRINTL SSS
		PRINTL OOO
		PRINTL UUU
		PRINTL NNN
		PRINTL DDD
		PRINTL VVV
		PRINTL OOO
		PRINTL LLL
		PRINTL TTT
		CLEARLINE 8
		PRINTL EEE
		PRINTW XXX
    ``` 
    ``` title="結果"
	SSS
	EEE
	XXX
    ```
