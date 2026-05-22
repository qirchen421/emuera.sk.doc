---
hide:
  - toc
---

# SQL Reader 操作

| 函数名 | 参数 | 返回值 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_READ`](./SQL_READER.zh.md) | `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_LONG`](./SQL_READER.zh.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_STRING`](./SQL_READER.zh.md) | `int`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_READER_GET_FLOAT`](./SQL_READER.zh.md) | `int`, `int` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_ISNULL`](./SQL_READER.zh.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_CLOSE`](./SQL_READER.zh.md) | `int` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_READER_READ readerId
    int SQL_READER_GET_LONG readerId, columnIndex
    str SQL_READER_GET_STRING readerId, columnIndex
    float SQL_READER_GET_FLOAT readerId, columnIndex
    int SQL_READER_ISNULL readerId, columnIndex
    int SQL_READER_CLOSE readerId
    ```

    SQLite 查询结果（Reader）的读取与操作相关函数。

    - `SQL_READER_READ`：将 Reader 前进到下一行。有数据返回 `1`，无更多行返回 `0`。
    - `SQL_READER_GET_LONG`：获取当前行指定列（从 0 开始）的整数值。
    - `SQL_READER_GET_STRING`：获取当前行指定列的字符串值。
    - `SQL_READER_GET_FLOAT`：获取当前行指定列的浮点数值。
    - `SQL_READER_ISNULL`：判断当前行指定列是否为 NULL，是返回 `1`，否返回 `0`。
    - `SQL_READER_CLOSE`：关闭 Reader 并释放资源。返回 `1`。

    !!! warning "注意"

        - `readerId` 由 [`SQL_EXECUTE_READER`](./SQL_EXECUTE.zh.md) 返回。
        - 读取列值前必须先调用 `SQL_READER_READ` 至少一次。
        - 使用完毕后**必须**调用 `SQL_READER_CLOSE` 关闭，否则会泄漏资源。
        - `columnIndex` 从 0 开始。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS data (k TEXT, v INTEGER, f REAL)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO data VALUES ('a', 10, 3.14)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO data VALUES ('b', NULL, NULL)"

        LOCAL = SQL_EXECUTE_READER("test", "SELECT * FROM data")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORM %SQL_READER_GET_STRING(LOCAL, 0)%: 
            SIF SQL_READER_ISNULL(LOCAL, 1)
                PRINT NULL
            SIF !SQL_READER_ISNULL(LOCAL, 1)
                PRINTFORM {SQL_READER_GET_LONG(LOCAL, 1)}
            PRINTFORM  / 
            SIF SQL_READER_ISNULL(LOCAL, 2)
                PRINT NULL
            SIF !SQL_READER_ISNULL(LOCAL, 2)
                PRINTFORM {SQL_READER_GET_FLOAT(LOCAL, 2)}
            PRINTL
        REND
        SQL_READER_CLOSE LOCAL

        SQL_DISCONNECT "test"
        WAIT
    ```
