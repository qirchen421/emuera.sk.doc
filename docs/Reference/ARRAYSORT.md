---
hide:
  - toc
---

# ARRAYSORT

| 関数名                                                             | 引数                                     | 戻り値 |
| :----------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.md) | `variable`(, `sortFormat`, `int`, `int`) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYSORT variableName(, FORWARD or BACK, startIndex, targetCount)
    ```
	配列変数をソートするARRAYSORT実装  
	書式：`ARRAYSORT` \[対象変数\](, \[ソート方式(FORWARD or BACK)\], \[開始インデックス\], \[対象要素数\])  
	内容：開始インデックスから対象要素数個の配列データをソートする  
	　　　`FORWARD`で昇順、`BACK`で降順  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = RAND:10
			HOGE2:COUNT = COUNT
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND


		ARRAYSORT HOGE
		ARRAYSORT HOGE2, BACK, 4, 4

		PRINTL After sort...

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="結果"
	HOGE:0=9 HOGE2:0=0
	HOGE:1=9 HOGE2:1=1
	HOGE:2=0 HOGE2:2=2
	HOGE:3=8 HOGE2:3=3
	HOGE:4=3 HOGE2:4=4
	HOGE:5=8 HOGE2:5=5
	HOGE:6=6 HOGE2:6=6
	HOGE:7=7 HOGE2:7=7
	HOGE:8=5 HOGE2:8=8
	HOGE:9=1 HOGE2:9=9
	After sort...
	HOGE:0=0 HOGE2:0=0
	HOGE:1=1 HOGE2:1=1
	HOGE:2=3 HOGE2:2=2
	HOGE:3=5 HOGE2:3=3
	HOGE:4=6 HOGE2:4=7
	HOGE:5=7 HOGE2:5=6
	HOGE:6=8 HOGE2:6=5
	HOGE:7=8 HOGE2:7=4
	HOGE:8=9 HOGE2:8=8
	HOGE:9=9 HOGE2:9=9
    ```

### 関連項目
* [ARRAYMSORT](ARRAYMSORT.md)
* [ARRAYMSORTEX](ARRAYMSORTEX.md)
