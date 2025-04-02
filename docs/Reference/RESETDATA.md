---
hide:
  - toc
---

# RESETDATA

| 関数名                                                             | 引数 | 戻り値 |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	RESETDATA
    ```
	グローバル変数を除く全ての変数を初期化します。  
	具体的には全てのキャラを削除し、全てのローカル変数および全ての通常の変数に`0`又は空文字列を代入します。  
	また、`PALAMLV`や`STR`など初期値が設定されている変数については初期値を代入します。  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		RESULT = 123
		LOCAL = 456

		RESETDATA
		PRINTFORMW {RESULT} {LOCAL}
    ``` 
    ``` title="結果"
	0 0
    ```

### 関連項目
- [RESETGLOBAL](RESETGLOBAL.md)
