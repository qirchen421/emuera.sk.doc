---
hide:
  - toc
---

# BITSET / BITGET / BITTOGGLE / BITINDEXOFFIRST

| 函数名                                                                   | 参数                                   | 返回值 |
| :----------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`BITSET`](./BITARRAY.zh.md)           | `ref int[]`, `int`(, `int`, `int`)     | `int`  |
| ![](../assets/images/IconSK.webp)[`BITGET`](./BITARRAY.zh.md)           | `ref int[]`, `int`                     | `int`  |
| ![](../assets/images/IconSK.webp)[`BITTOGGLE`](./BITARRAY.zh.md)        | `ref int[]`, `int`                     | `int`  |
| ![](../assets/images/IconSK.webp)[`BITINDEXOFFIRST`](./BITARRAY.zh.md)  | `ref int[]`(, `int`)                   | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int BITSET arrayRef, idxID{, val, length}
    int BITGET arrayRef, idxID
    int BITTOGGLE arrayRef, idxID
    int BITINDEXOFFIRST arrayRef{, val}
    ```

    使用整数数组模拟位图（Bitmap），提供位的设置、读取、翻转和查找功能。

    1. **BITSET** - 设置位图中指定位置的一个或多个连续位
       - `array`: 位图数组（REF传递，会被修改）
       - `idx`: 起始位索引（从0开始）
       - `val`: 要设置的值（0为清除，1为设置，非0值也视为1），默认为1
       - `length`: 连续设置的位数，默认为1
       - 返回 1 表示操作成功

    2. **BITGET** - 读取位图中指定位置的位值
       - `array`: 位图数组
       - `idx`: 要读取的位索引（从0开始）
       - 返回位值（0或1），索引超出范围时返回-1

    3. **BITTOGGLE** - 翻转位图中指定位置的位值（0变1，1变0）
       - `array`: 位图数组（REF传递，会被修改）
       - `idx`: 要翻转的位索引（从0开始）
       - 返回 1=成功翻转，0=索引超出范围

    4. **BITINDEXOFFIRST** - 查找位图中第一个具有指定值的位的位置
       - `array`: 位图数组
       - `val`: 要查找的位值（0或1，0以外的值都视为1），默认为0
       - 返回第一个匹配位的索引，未找到时返回-1

    !!! warning "注意"
        - 位图使用小端序存储，每个数组元素存储64位
        - 索引从0开始，超出范围的操作会被忽略
        - 使用前需先声明整数数组作为位图的存储容器

!!! hint "提示"

    支持命令和表达式函数两种形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 创建位图数组（4个元素 = 256位）
        #DIM DYNAMIC BIT_ARRAY, 4

        ; BITSET - 设置位
        BITSET BIT_ARRAY, 5, 1, 1
        PRINTFORML BITGET(BIT_ARRAY, 5) = {BITGET(BIT_ARRAY, 5)}

        ; BITGET - 读取位
        PRINTFORML BITGET(BIT_ARRAY, 4) = {BITGET(BIT_ARRAY, 4)}
        PRINTFORML BITGET(BIT_ARRAY, 6) = {BITGET(BIT_ARRAY, 6)}

        ; BITTOGGLE - 翻转位
        BITTOGGLE BIT_ARRAY, 5
        PRINTFORML BITGET(BIT_ARRAY, 5) = {BITGET(BIT_ARRAY, 5)} (应为0)

        ; 批量设置
        BITSET BIT_ARRAY, 10, 1, 6
        PRINTFORML BITINDEXOFFIRST(BIT_ARRAY, 1) = {BITINDEXOFFIRST(BIT_ARRAY, 1)}

        ; 清除位
        BITSET BIT_ARRAY, 5, 0, 1
        PRINTFORML BITINDEXOFFIRST(BIT_ARRAY, 1) = {BITINDEXOFFIRST(BIT_ARRAY, 1)}

        ; 越界访问
        PRINTFORML BITGET(BIT_ARRAY, 300) = {BITGET(BIT_ARRAY, 300)} (应返回-1)

        ONEINPUT
    ```
    ``` title="结果"
    BITGET(BIT_ARRAY, 5) = 1
    BITGET(BIT_ARRAY, 4) = 0
    BITGET(BIT_ARRAY, 6) = 0
    BITGET(BIT_ARRAY, 5) = 0 (应为0)
    BITINDEXOFFIRST(BIT_ARRAY, 1) = 5
    BITINDEXOFFIRST(BIT_ARRAY, 1) = 10
    BITGET(BIT_ARRAY, 300) = -1 (应返回-1)
    ```
