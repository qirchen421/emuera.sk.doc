# ENUMVAR 系列

| 函数名                                                               | 参数     | 返回值 |
| :------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md) | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)       | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMVARBEGINSWITH keyword
    int ENUMVARENDSWITH keyword
    int ENUMVARWITH keyword
    ```

    将定义的变量 / 常量名中包含 `keyword` 的具体变量 / 常量名保存到 `RESULTS` 数组，同时返回总数（`RESULT`）。

    - `ENUMVARBEGINSWITH` 返回以 `keyword` 开头的变量 / 常量数量。
    - `ENUMVARENDSWITH` 返回以 `keyword` 结尾的变量 / 常量数量。
    - `ENUMVARWITH` 返回包含 `keyword` 的变量 / 常量数量。

    !!! warning "注意"

        与 [`EXISTVAR`](./EXISTVAR.md) 不同，不会列举局部变量 / 常量。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DIM Foo2, 2, 2
    #DIMS CONST Foo3 = "3", "4"
    #DIM MyFoo 
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS Local3DFoo, 2, 2, 2

        PRINTFORML 以"Foo"开头的变量/常量数量:{ENUMVARBEGINSWITH("Foo")}
        ENUMVARENDSWITH "Foo"
        PRINTFORML 以"Foo"结尾的变量/常量数量:{RESULT}
        CALL PrintFoo
        ENUMVARWITH "Foo"
        PRINTFORML 包含"Foo"的变量/常量数量:{RESULT}
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
    ```
    ``` title="输出结果"
    以"Foo"开头的变量/常量数量:3
    以"Foo"结尾的变量/常量数量:1
    MyFoo
    包含"Foo"的变量/常量数量:4
    Foo1, Foo2, Foo3, MyFoo
    ```
