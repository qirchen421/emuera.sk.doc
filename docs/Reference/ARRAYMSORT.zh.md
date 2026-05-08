---
hide:
  - toc
---

# ARRAYMSORT

| 函数名                                                               | 参数                          | 返回值 |
| :------------------------------------------------------------------- | :---------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.md) | `variable`(, `variable`...)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	ARRAYMSORT variableName1(, variableName2,...)
    ```
	`ARRAYMSORT` 将 `variableName1` 按升序排序，并按照相同的顺序重新排列 `variableName2` 及后续的数组。  
	`variableName1` 必须是一维数组。`variableName2` 及后续参数可以接受多维数组。  
	当 `variableName1` 中存在 `0` 或空字符串元素时，会将其视为数组的结束标志，其后的元素将不参与排序。  
	如果 `variableName2` 及后续数组的元素数量少于 `variableName1` 排序后的元素数量，则指令会中断，并将 `0` 赋值给 `RESULT:0` 后结束。  
	如果所有数组排序成功，此指令会将非 0 值赋值给 `RESULT:0` 后结束。

    ```  { #language-erbapi }
    @TEST
    #DIM ARRAY1,4
    #DIM ARRAY2,4
    #DIM ARRAY3,4,3
    ARRAY1 = 3,1,2,0
    ARRAY2 = 1001,1002,1003,0
    ARRAY3:0:0 = 1, 101, 2763
    ARRAY3:1:0 = 2, 102, 9615
    ARRAY3:2:0 = 3, 103, 7035

    ARRAYMSORT ARRAY1,ARRAY2,ARRAY3
    PRINTFORML > ARRAY1 == {ARRAY1:0},{ARRAY1:1},{ARRAY1:2},{ARRAY1:3}
    PRINTFORML > ARRAY2 == {ARRAY2:0},{ARRAY2:1},{ARRAY2:2},{ARRAY2:3}
    FOR I,0,3
        PRINTFORML > ARRAY3:{I}:0 == {ARRAY3:I:0},{ARRAY3:I:1},{ARRAY3:I:2}
    NEXT

	;;;输出
	> ARRAY1 == 1,2,3,0
	> ARRAY2 == 1002,1003,1001,0
	> ARRAY3:0:0 == 2,102,9615
	> ARRAY3:1:0 == 3,103,7035
	> ARRAY3:2:0 == 1,101,2763
	```

!!! hint "提示"

    仅支持命令。

### 相关项目
* [ARRAYSORT](ARRAYSORT.md)