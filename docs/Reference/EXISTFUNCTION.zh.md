---
hide:
  - toc
---

# EXISTFUNCTION

| 函数名                                                                 | 参数     | 返回值 |
| :--------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.zh.md) | `string` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int EXISTFUNCTION funcName
    ```

    判定是否定义过以参数 `funcName` 为名的函数 / 行内函数。  
    常规函数（命令）返回 `1`，行内函数（数值型）返回 `2`，行内函数（字符串型）返回 `3`，其他情况返回 `0`。  
    如果在 ERB 中覆写过系统函数，返回 `1`，否则也返回 `0`。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTVL EXISTFUNCTION("TEST1")
        PRINTVL EXISTFUNCTION("TEST2")
        PRINTVL EXISTFUNCTION("TEST3")
        PRINTVL EXISTFUNCTION("SYSTEM_TITLE")
        PRINTVL EXISTFUNCTION("SHOP")
        WAIT

    @TEST1

    @TEST2
    #FUNCTION

    @TEST3
    #FUNCTIONS
    ```

    ``` title="输出结果"
    1
    2
    3
    1
    0
    ```

### 相关项目
- [ENUMFUNC](ENUMFUNC.zh.md)