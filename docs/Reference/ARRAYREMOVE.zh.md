---
hide:
  - toc
---

# ARRAYREMOVE

| 函数名                                                                 | 参数                     | 返回值 |
| :--------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.md) | `variable`, `int`, `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYREMOVE variableName, startIndex, clearCount
    ```
	实现用于部分删除数组元素的指令 ARRAYREMOVE。  
	格式：`ARRAYREMOVE` `<目标变量>, <删除范围起始索引>, <删除元素数量>`  
	说明：从指定的起始索引开始，删除数组变量中指定数量的元素，并将后续元素向前移动填补空缺。  
　　　　　若删除元素数量设置为0或负数，则会删除从起始索引开始到数组末尾的所有元素。

!!! hint "提示"

    仅支持指令形式。

!!! example "示例" 
    
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
    ``` title="结果"
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