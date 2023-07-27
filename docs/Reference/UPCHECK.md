---
hide:
  - toc
---

# UPCHECK

| 関数名                                                           | 引数 | 戻り値 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	UPCHECK
    ```
    `TARGET`の`UP`,`DOWN`ステータスを`PALAM`に加算しつつ、増減量を表示する


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    ``` { #language-erb title="PALAM.csv" }
	0,能力0
	1,能力1
	2,能力2
	```
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		TARGET = 0
		UP:0 = 123
		UP:1 = 456
		UP:2 = 789

		UPCHECK
		WAIT
    ``` 
    ``` title="結果"
	能力0 0+123=123
	能力1 0+456=456
	能力2 0+789=789
    ```
