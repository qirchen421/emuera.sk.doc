---
hide:
  - toc
---

# CUSTOMDRAWLINE, DRAWLINEFORM

| 関数名                                                                       | 引数           | 戻り値 |
| :--------------------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md) | `string`       | なし   |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md)   | `formedString` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	CUSTOMDRALINE string
	DRAWLINEFORM formedString
    ```
	指定した文字列を使って1行の区切りを表示します。 DRAWLINEFORMではFORM構文に対応しています。

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		CUSTOMDRAWLINE *
		DRAWLINEFORM {123+211}
		WAIT
    ``` 
    ``` title="結果"
	************************************************************************************************************************************************
	334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334334
    ```
