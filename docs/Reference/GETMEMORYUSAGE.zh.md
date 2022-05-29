# GETMEMORYUSAGE

| 函数名                                       | 参数   | 返回值 |
| :------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[``](./.md) | `void` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int GETMEMORYUSAGE
    ```

    返回当前运行中的 Emuera 占用的内存使用量（单位为 byte）。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        PRINTFORMW 当前的内存使用量为 {GETMEMORYUSAGE()/1024/1024} MB
        REPEAT 10000
            ADDVOIDCHARA
        REND
        PRINTFORMW 运行 10000 次 ADDVOIDCHARA 之后的内存使用量为 {GETMEMORYUSAGE()/1024/1024} MB
    ```

    ``` title="输出结果"
    当前的内存使用量为 65 MB
    运行 10000 次 ADDVOIDCHARA 之后的内存使用量为 913 MB
    ```
