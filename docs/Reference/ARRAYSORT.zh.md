---
hide:
  - toc
---

# ARRAYSORT

| 函数名                                                             | 参数                                     | 返回值 |
| :----------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.md) | `variable`(, `sortFormat`, `int`, `int`) | 无     |

!!! info "API"

    ```  { #language-erbapi }
    ARRAYSORT variableName(, FORWARD or BACK, startIndex, targetCount)
    ```
    对数组变量进行排序的ARRAYSORT实现  
    格式：`ARRAYSORT` \[目标变量\](, \[排序方式(FORWARD or BACK)\], \[起始索引\], \[目标元素数量\])  
    说明：从起始索引开始，对指定数量的数组数据进行排序  
    　　　`FORWARD`为升序，`BACK`为降序  

!!! hint "提示"

    仅支持命令形式。

!!! example "示例" 
    
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

		PRINTL 排序后...

		REPEAT 10
			PRINTFORML HOGE:{COUNT}={HOGE:COUNT} HOGE2:{COUNT}={HOGE2:COUNT}
		REND
		WAIT
    ``` 
    ``` title="结果"
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

### 相关项目
* [ARRAYMSORT](ARRAYMSORT.md)
* [ARRAYMSORTEX](ARRAYMSORTEX.md)