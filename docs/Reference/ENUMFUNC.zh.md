---
hide:
  - toc
---

# ENUMFUNC 系列

| 函数名                                                                 | 参数     | 返回值 |
| :--------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md) | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)       | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFUNCBEGINSWITH keyword
    int ENUMFUNCENDSWITH keyword
    int ENUMFUNCWITH keyword
    ```

    将定义的函数名中包含 `keyword` 的具体函数名保存到 `RESULTS` 数组，同时返回总数（`RESULT`）。

    - `ENUMFUNCBEGINSWITH` 返回以 `keyword` 开头的函数数量。
    - `ENUMFUNCENDSWITH` 返回以 `keyword` 结尾的函数数量。
    - `ENUMFUNCWITH` 返回包含 `keyword` 的函数数量。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML 函数名以"Foo"开头的函数数量:{ENUMFUNCBEGINSWITH("Foo")}
        ENUMFUNCENDSWITH "Foo"
        PRINTFORML 函数名以"Foo"结尾的函数数量:{RESULT}
        CALL PrintFoo
        ENUMFUNCWITH "Foo"
        PRINTFORML 函数名包含"Foo"的函数数量:{RESULT}
        CALL PrintFoo

        ONEINPUT

    @PrintFoo
        #DIM i
        FOR i, 0, RESULT
            SIF i > 0
                PRINTS ", "
            PRINTS RESULTS:i
        NEXT
        PRINTL

    @Foo1
    @Foo2
    @Foo3
    @Dummy1Foo
    @Dummy2Foo
    @My_Foo_Func
    ```
    ``` title="输出结果"
    函数名以"Foo"开头的函数数量:3
    函数名以"Foo"结尾的函数数量:3
    PrintFoo, Dummy1Foo, Dummy2Foo
    函数名包含"Foo"的函数数量:7
    PrintFoo, Foo1, Foo2, Foo3, Dummy1Foo, Dummy2Foo, My_Foo_Func
    ```
