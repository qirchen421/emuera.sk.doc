---
hide:
  - toc
---

# ARRAYREMOVE

| 関数名                                                                 | 引数                     | 戻り値 |
| :--------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.md) | `variable`, `int`, `int` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYREMOVE variableName, startIndex, clearCount
    ```
	配列要素を部分削除する命令ARRAYREMOVE実装  
	書式：`ARRAYREMOVE`` <対象変数>, <消す範囲初値>, <消す要素数>  
	内容：配列変数を指定した初期値から要素数分だけ削除し、後ろを値を詰める  
　　　　　消す要素数を0以下にすると初期値から後ろ全て消去になります  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = COUNT
			HOGE2:COUNT = COUNT
		REND

		ARRAYREMOVE HOGE, 4, 3
		ARRAYREMOVE HOGE2, 6, -1

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="結果"
	HOGE:0=0 HOGE2:0=0
	HOGE:1=1 HOGE2:1=1
	HOGE:2=2 HOGE2:2=2
	HOGE:3=3 HOGE2:3=3
	HOGE:4=7 HOGE2:4=4
	HOGE:5=8 HOGE2:5=5
	HOGE:6=9 HOGE2:6=0
	HOGE:7=0 HOGE2:7=0
	HOGE:8=0 HOGE2:8=0
	HOGE:9=0 HOGE2:9=0
    ```
