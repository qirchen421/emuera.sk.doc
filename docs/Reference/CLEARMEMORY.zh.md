# CLEARMEMORY

| 函数名                                                             | 参数   | 返回值 |
| :----------------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md) | `void` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int CLEARMEMORY
    ```

    释放内存，并返回释放的内存量（单位为 byte）。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。  
    在运行 `LOADDATA`、`DELCHARA`、重启 Emuera 这三种情况之后使用效果比较好，其他场景下就没什么效果了。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        REPEAT 10000
            ADDVOIDCHARA
        REND
        DELALLCHARA
        PRINTFORMW CLEARMEMORY 已执行完成，合计释放了 {CLEARMEMORY()/1024/1024} MB 的内存
    ```

    ``` title="输出结果"
    CLEARMEMORY 已执行完成，合计释放了 840 MB 的内存
    ```
