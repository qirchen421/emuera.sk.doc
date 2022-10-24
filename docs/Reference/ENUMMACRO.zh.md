---
hide:
  - toc
---

# ENUMMACRO 系列

| 函数名                                                                   | 参数     | 返回值 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md) | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)       | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMMACROBEGINSWITH keyword
    int ENUMMACROENDSWITH keyword
    int ENUMMACROWITH keyword
    ```

    将定义的宏名中包含 `keyword` 的具体宏名保存到 `RESULTS` 数组，同时返回总数（`RESULT`）。

    - `ENUMMACROBEGINSWITH` 返回以 `keyword` 开头的宏命令数量。
    - `ENUMMACROENDSWITH` 返回以 `keyword` 结尾的宏命令数量。
    - `ENUMMACROWITH` 返回包含 `keyword` 的宏命令数量。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST Foo1 = "1"
    #DEFINE Foo2 "Test"
    #DEFINE Foo3
    #DEFINE MyFoo 1 + 1
    #DEFINE YourFoo 1 + 1
    #DEFINE AFooInTheMiddle
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML 宏名以"Foo"开头的宏命令数量:{ENUMMACROBEGINSWITH("Foo")}
        ENUMMACROENDSWITH "Foo"
        PRINTFORML 宏名以"Foo"结尾的宏命令数量:{RESULT}
        CALL PrintFoo
        ENUMMACROWITH "Foo"
        PRINTFORML 宏名包含"Foo"的宏命令数量:{RESULT}
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
    宏名以"Foo"开头的宏命令数量:2
    宏名以"Foo"结尾的宏命令数量:2
    MyFoo, YourFoo
    宏名包含"Foo"的宏命令数量:5
    Foo2, Foo3, MyFoo, YourFoo, AFooInTheMiddle
    ```
