---
hide:
  - toc
---

# SWAPCHARA

| 関数名                                                             | 引数         | 戻り値 |
| :----------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.md) | `int`, `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	SWAPCHARA charaID, charaID
    ```
    指定した二人のキャラクタの登録番号を入れ替えます。


!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		;MASTERしかいない状態とする
		ADDCHARA 10
		ADDCHARA 11
		PRINTFORML NO:1 = {NO:1}, NO:2 = {NO:2}
		SWAPCHARA 1,2
		PRINTFORMW NO:1 = {NO:1}, NO:2 = {NO:2}
    ``` 
    ``` title="結果"
	NO:1 = 10, NO:2 = 11
	NO:1 = 11, NO:2 = 10
    ```
