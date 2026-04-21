---
hide:
  - toc
---

# ARRAYCOPY

| 函数名                                                             | 参数                  | 返回值 |
| :----------------------------------------------------------------- | :-------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.md) | `varible`, `variable` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYCOPY variableName, variableName
	```
	实现无差别数组复制指令 ARRAYCOPY  
	格式：ARRAYCOPY <源变量名>, <目标变量名>  
	说明：将源变量的值复制到目标变量  
	　　　类型变量要求类型相同且维度数相同  
	　　　此外，不支持角色变量  
	　　　若元素数量不同，则仅复制可复制的部分  

!!! hint "提示"

    仅支持指令形式。

!!! example "示例" 
    
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

		PRINTL 复制后...

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="结果"
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