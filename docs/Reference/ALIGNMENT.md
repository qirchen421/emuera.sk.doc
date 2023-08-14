---
hide:
  - toc
---

# ALIGNMENT, CURRENTALIGN

| 関数名                                                                  | 引数      | 戻り値   |
| :---------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.md)    | `keyword` | なし     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.md) | なし      | `string` |

!!! info "API"

    ```  { #language-erbapi }
	ALIGHNMENT keyword
	string CURRENTALIGHN
    ```
	`ALIGNMENT`以降の行を指定した位置に揃えます。  
	キーワードには`LEFT`、`CENTER`、`RIGHT`のいずれかを指定します。  
	通常の表示は`ALIGNMENT LEFT`であり、左端に揃えられます。  
	`ALIGNMENT CENTER`によりタイトル画面のように中央に揃えることができます。  
	`ALIGNMENT`が適用されるのは改行された時点です。  

	現在の`ALIGNMENT`は`CURRENTALIGN`で取得することができます。  

!!! hint "ヒント"

    `CURRENTALIGHN`は式中関数対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		ALIGNMENT RIGHT
		PRINTFORML あああ CURRENTALIGHN:%CURRENTALIGN()%
		ALIGNMENT CENTER
		PRINTFORMW いいい CURRENTALIGHN:%CURRENTALIGN()%
    ``` 
	![](../assets/images/ALIGNMENT.png)
