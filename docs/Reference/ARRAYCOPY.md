---
hide:
  - toc
---

# ARRAYCOPY

| 関数名                                                             | 引数                  | 戻り値 |
| :----------------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.md) | `varible`, `variable` | なし   |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYCOPY variableName, variableName
		```
	無頓着な配列コピー命令ARRAYCOPY実装  
	書式：ARRAYCOPY <コピー元変数名>, <コピー先変数名>  
	内容：コピー元変数の値をコピー先変数へコピーする  
	　　　型変数は型が同じで次元数が同じである必要がある  
	　　　また、キャラクター変数には非対応  
	　　　要素数が異なる場合はコピーできる分だけコピーする  

!!! hint "ヒント"

    命令のみ対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
		#DIM HOGE, 10
		#DIM HOGE2, 10

		REPEAT 10
			HOGE:COUNT = RAND:10
			HOGE2:COUNT = RAND:10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND


		ARRAYCOPY "HOGE", "HOGE2"

		PRINTL After copy...

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="結果"
	HOGE:0=9 HOGE2:0=3
	HOGE:1=0 HOGE2:1=3
	HOGE:2=7 HOGE2:2=0
	HOGE:3=3 HOGE2:3=3
	HOGE:4=1 HOGE2:4=3
	HOGE:5=2 HOGE2:5=0
	HOGE:6=3 HOGE2:6=9
	HOGE:7=3 HOGE2:7=3
	HOGE:8=4 HOGE2:8=9
	HOGE:9=5 HOGE2:9=2
	After copy...
	HOGE:0=9 HOGE2:0=9
	HOGE:1=0 HOGE2:1=0
	HOGE:2=7 HOGE2:2=7
	HOGE:3=3 HOGE2:3=3
	HOGE:4=1 HOGE2:4=1
	HOGE:5=2 HOGE2:5=2
	HOGE:6=3 HOGE2:6=3
	HOGE:7=3 HOGE2:7=3
	HOGE:8=4 HOGE2:8=4
	HOGE:9=5 HOGE2:9=5
    ```
