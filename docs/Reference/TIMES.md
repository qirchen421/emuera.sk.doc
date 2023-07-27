---
hide:
  - toc
---

# TIMES

| 関数名                                                       | 引数             | 戻り値 |
| :----------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.md) | `int`, `float`   | なし   |

!!! info "API"

    ```  { #language-erbapi }
	TIMES integerVariable, float
    ```
    第一引数の変数に、第二引数の小数を乗算する。デフォルトの設定では端数切り捨て


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE

		HOGE = 100
		TIMES HOGE, 1.25
		PRINTFORML {HOGE}
		TIMES HOGE, 2.672
		PRINTFORMW {HOGE}
    ``` 
    ``` title="結果"
	125
	334
    ```
