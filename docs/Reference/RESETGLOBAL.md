---
hide:
  - toc
---

# RESETGLOBAL

| 関数名                                                                 | 引数 | 戻り値 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	RESETGLOBAL
    ```
	グローバル変数を初期化します。  
	具体的には数値型グローバル変数に`0`を代入し、文字列型グローバル変数に空文字列を代入します。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		GLOBAL = 123

		RESETGLOBAL
		PRINTFORMW {GLOBAL}
    ``` 
    ``` title="結果"
	0
    ```

### 関連項目
- [RESETDATA](RESETDATA.md)
