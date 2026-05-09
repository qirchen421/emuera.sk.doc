---
hide:
  - toc
---

# MATCHALL / MATCHALLEX

| 函数名                                                                              | 参数                                      | 返回值 |
| :---------------------------------------------------------------------------------- | :---------------------------------------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALL`](./MATCHALL.md)     | `variable`, `any`(, `int`, `int`, `variable`) | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALLEX`](./MATCHALL.md)   | `string`, `any`(, `int`, `int`, `variable`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    MATCHALL var, value[, beg, end[, outArr]]
    MATCHALLEX "varName", value[, beg, end[, outArr]]
    ```
    在数组中搜索所有匹配值的索引，返回匹配数量。

    - 第一参数：`MATCHALL` 为变量引用，`MATCHALLEX` 为字符串变量名
    - 第二参数：搜索值（类型需与数组元素类型一致）
    - 第三参数（可选）：搜索起始索引（默认 0）
    - 第四参数（可选）：搜索结束索引（默认数组长度）
    - 第五参数（可选）：输出数组变量引用，匹配的索引将写入该数组（从 0 开始）

    返回值：匹配的元素数量。未找到返回 0。

!!! hint "提示"

    支持命令语法（`MATCHALL ARR, 2`）与表达式语法（`LOCAL = MATCHALL(ARR, 2)`）两种形式。作为命令调用时结果写入 `RESULT` 数组。与 [MATCH](MATCH.md) 不同，MATCHALL 返回所有匹配位置而非仅计数。

    `MATCHALL` 与 `MATCHALLEX` 的区别类似于 `GETNUM` 与 `GETNUMB`：
    - `MATCHALL` 第一参数是变量引用（编译期解析），性能更好
    - `MATCHALLEX` 第一参数是字符串变量名（运行期解析），灵活性更高

    当第五参数数组长度不足时，多余的匹配索引被静默丢弃，返回值仍为实际匹配数量。

!!! example "示例"
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM ARR, 10 = 1, 2, 3, 2, 5, 2, 7, 8, 2, 10
        #DIM IDX, 10

        ; 仅计数
        LOCAL = MATCHALL(ARR, 2)
        PRINTFORML 找到 {LOCAL} 个 2

        ; 输出索引到 IDX
        LOCAL = MATCHALL(ARR, 2, 0, 10, IDX)
        FOR I, 0, LOCAL
            PRINTFORML IDX:{I} = {IDX:I}
        NEXT
    ``` 
    ``` title="结果"
    找到 4 个 2
    IDX:0 = 1
    IDX:1 = 3
    IDX:2 = 5
    IDX:3 = 8
    ```

### 相关项目
- [MATCH](MATCH.md) — 仅计数首个匹配
- [FINDELEMENT](FINDELEMENT.md) — 查找单个元素位置
