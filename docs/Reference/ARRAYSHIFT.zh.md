---
hide:
  - toc
---

# ARRAYSHIFT

| 函数名                                                               | 参数                                       | 返回值 |
| :------------------------------------------------------------------- | :----------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.md) | `variable`, `int`, `value`(, `int`, `int`) | 无     |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYSHIFT variable, shiftCount, value(, startIndex, targetCount)
    ```
	实现用于数组位移的命令 ARRAYSHIFT  
	格式：`ARRAYSHIFT <目标变量>, <位移数量>, <位移后空白区域的初始值>{, <位移数组范围的起始索引>, <位移数组元素的范围数量>}`  
	说明：将数组变量按指定数量进行位移，正数向索引增大的方向位移，负数向索引减小的方向位移  
	　　　超出数组范围的值将被丢弃，位移后产生的空白区域将用第二个参数指定的值填充  
	　　　使用可选的第四和第五个参数，可以仅对数组的一部分范围进行位移  

!!! hint "提示"

    仅支持命令形式。

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
    ``` title="结果"
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