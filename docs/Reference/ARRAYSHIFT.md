---
hide:
  - toc
---

# ARRAYSHIFT

| 関数名                                                               | 引数                                       | 戻り値 |
| :------------------------------------------------------------------- | :----------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.md) | `variable`, `int`, `value`(, `int`, `int`) | なし   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYSHIFT variable, shiftCount, value(, startIndex, targetCount)
    ```
	配列をシフトする命令ARRAYSHIFT実装  
	書式：`ARRAYSHIFT <対象変数>, <ずらす数>, <ずらしてできた空白領域の初期値>{, <ずらず配列範囲の初値>, <ずらす配列要素の範囲の数>}``  
	内容：配列変数を指定した数だけずらす、正の値で添え字の大きい方へ、負の値で小さい方にずらす  
	　　　配列の範囲からはみでた値は掃き捨て、ずらして出来た空白領域は第2引数で指定した値で満たす  
	　　　省略可能な第4および第5引数を使うと一部の範囲のみをずらすことができる  

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

		ARRAYSHIFT HOGE, 3, -1
		ARRAYSHIFT HOGE2, 3, -1, 5, 5

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="結果"
	HOGE:0=-1 HOGE2:0=0
	HOGE:1=-1 HOGE2:1=1
	HOGE:2=-1 HOGE2:2=2
	HOGE:3=0 HOGE2:3=3
	HOGE:4=1 HOGE2:4=4
	HOGE:5=2 HOGE2:5=-1
	HOGE:6=3 HOGE2:6=-1
	HOGE:7=4 HOGE2:7=-1
	HOGE:8=5 HOGE2:8=5
	HOGE:9=6 HOGE2:9=6
    ```
