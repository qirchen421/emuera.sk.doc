---
hide:
  - toc
---

# ARRAYMSORTEX

| 函数名                                                               | 参数                                   | 返回值 |
| :------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md) | `string`, `ref` `string[]`(, `int`)    | `1`    |
|                                                                      | `ref` `int`, `ref` `string[]`(, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1. 1 ARRAYMSORTEX array_indexName, arrayNameList(, sortAscending)
    2. 1 ARRAYMSORTEX array_indexArray, arrayNameList(, sortAscending)
    ```
    
    与本家的 [`ARRAYMSORTEX`](https://osdn.net/projects/emuera/wiki/excom#h5-ARRAYMSORT.20array_a.7B.2C.20array_b....7D) 函数类似。
    
    1. 将名为 `array_indexName` 的数组变量重新排序，以排序后的顺序为基准，继续排列 `arrayNameList` 里的矩阵。
    2. 将数组变量 `array_indexArray` 重新排序，以排序后的顺序为基准，继续排列 `arrayNameList` 里的矩阵。

    `sortAscending` 参数设置为「`0` 以外的数值」或直接省略时，顺序排列；否则倒序排列。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。


!!! example "示例代码" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM array_index = 4, 3, 1, 2
        #DIMS array_key = "1", "2", "3", "4"
        #DIM array_a = 14, 13, 11, 12
        #DIMS array_b = "D", "C", "A", "B"
        #DIMS arrays_name = "array_index", "array_a", "array_b"  ; 不加入 array_index 就不会重新排序

        ARRAYMSORTEX array_index, arrays_name  ; 顺序
        PRINTFORML > array_index == {array_index},{array_index:1},{array_index:2},{array_index:3}
        PRINTFORML > array_a == {array_a},{array_a:1},{array_a:2},{array_a:3}
        PRINTFORML > array_b == %array_b%,%array_b:1%,%array_b:2%,%array_b:3%
        PRINTL
        ARRAYMSORTEX "array_key", arrays_name, 0  ; 倒序
        PRINTFORML > array_key == %array_key%,%array_key:1%,%array_key:2%,%array_key:3%
        PRINTFORML > array_a == {array_a},{array_a:1},{array_a:2},{array_a:3}
        PRINTFORML > array_b == %array_b%,%array_b:1%,%array_b:2%,%array_b:3%

        ONEINPUT
    ``` 
    ``` title="输出结果"
    > array_index == 1,2,3,4
    > array_a == 11,12,13,14
    > array_b == A,B,C,D
    
    > array_key == 1,2,3,4
    > array_a == 14,13,12,11
    > array_b == D,C,B,A
    ```
