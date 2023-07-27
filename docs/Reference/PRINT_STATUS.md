---
hide:
  - toc
---

# PRINT_STATUS系

| 関数名                                                                       | 引数 | 戻り値 |
| :--------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.md)      | `int`| なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.md)   | `int`| なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.md)     | `int`| なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.md)      | `int`| なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.md)    | `int`| なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.md)     | なし | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.md) | なし | なし   |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_ABL charaID
	PRINT_TALENT charaID
	PRINT_MARK charaID
	PRINT_EXP charaID
	PRINT_PALAM charaID
	PRINT_ITEM
	PRINT_SHOPITEM
    ```
    それぞれ現在のステータスを簡易表示します。`PRINT_ABL`、`PRINT_TALENT`、`PRINT_MARK`、`PRINT_EXP`、`PRINT_PALAM`はキャラ番号を引数に指定してください  


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    

    ``` { #language-erb title="ABL.csv" }
	0,能力0
	1,能力1
	2,能力2
	```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ADDVOIDCHARA
		ABL:0:0 = 2
		ABL:0:2 = 3

		PRINT_ABL 0
		WAIT
    ``` 
    ``` title="結果"
	能力0LV2 能力2LV3 
    ```
