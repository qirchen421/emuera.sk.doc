---
hide:
  - toc
---

# VARSETEX

| 函数名                                                       | 参数                                   | 返回值 |
| :----------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.zh.md) | `string`, `any`(, `int`, `int`, `int`) | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    1 VARSETEX varName, value(, setAllDim, from, to)
    ```
    
    与本家的 [`VARSET`](https://osdn.net/projects/emuera/wiki/excom#h5-VARSET.20.3C.E5.A4.89.E6.95.B0.E5.90.8D.3E.7B.2C.20.3C.E6.95.B0.E5.BC.8F.20or.20.E6.96.87.E5.AD.97.E5.88.97.E5.BC.8F.3E.2C.20.3C.E9.85.8D.E5.88.97.E7.AF.84.E5.9B.B2.E5.88.9D.E5.80.A4.3E.2C.20.3C.E9.85.8D.E5.88.97.E7.AF.84.E5.9B.B2.E7.B5.82.E5.80.A4.2B1.3E.7D) 类似，将名为 `varName`（字符串）的变量赋值为 `value`，而不是直接使用变量标识符。  
    `setAllDim` 不为 `0` 或直接省略时，将整个数组的所有元素赋值为 `value`；否则，只赋值给最低维度的数组。  
    可以用 `from` / `to` 两个参数来指定赋值数组开始和结束的位置（不包括下标为 `to` 的元素）。  
    省略 `to` 参数时，一直赋值到数组的末尾；省略 `from` 参数时，从数组的第一个元素（下标为 `0`）开始赋值。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码" 
    
    ``` { #language-erh title="DEFINE.ERH" }
    #DIM 整型数组 = 1, 2, 3, 4, 5, 6
    #DIM 二维整型数组, 3, 4
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS 临时字符串数组 = "Cat1", "Cat2", "Cat3"
        #DIM i
        #DIM j

        ; 省略第二个参数：预计在 v8 版本实现
        ; VARSETEX "临时字符串数组"
        VARSETEX "临时字符串数组", "dog"
        FOR i, 0, 3
            PRINTS 临时字符串数组:i + " "
        NEXT
        PRINTL
        ; 对于一维数组来说，第三个参数无所谓
        VARSETEX "整型数组", -1, 0, 3, 5
        FOR i, 0, 6
            PRINTFORMS @"{整型数组:i} "
        NEXT
        PRINTL
        ; 开始位置是数组 1 的下标 2，第四个参数为 1（包括的范围比 2 大，视为 2）
        ; 第三个参数为 0，因此只对数组 1 生效
        VARSETEX "二维整型数组:1:2", -1, 0, 1
        FOR i, 0, 3
            PRINTFORMS @"数组{i} -> "
            FOR j, 0, 4
                PRINTFORM {二维整型数组:i:j, 3, RIGHT}
            NEXT
            PRINTL
        NEXT
        PRINTL
        VARSET 二维整型数组

        ; 第三个参数省略时
        VARSETEX "二维整型数组:1:2", -1
        FOR i, 0, 3
            PRINTFORMS @"数组{i} -> "
            FOR j, 0, 4
                PRINTFORM {二维整型数组:i:j, 3, RIGHT}
            NEXT
            PRINTL
        NEXT

        ONEINPUT
    ``` 
    ``` title="输出结果"
    dog dog dog 
    1 2 3 -1 -1 6 
    数组0 ->   0  0  0  0
    数组1 ->   0  0 -1 -1
    数组2 ->   0  0  0  0
    
    数组0 ->   0  0 -1 -1
    数组1 ->   0  0 -1 -1
    数组2 ->   0  0 -1 -1
    ```

### 相关项目
- [VARSET](VARSET.zh.md)
