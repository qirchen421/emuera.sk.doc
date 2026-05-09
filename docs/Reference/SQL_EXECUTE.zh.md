---
hide:
  - toc
---

# SQL 执行操作

| 函数名 | 参数 | 返回值 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_NONQUERY`](./SQL_EXECUTE.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_READER`](./SQL_EXECUTE.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_LONG`](./SQL_EXECUTE.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_STRING`](./SQL_EXECUTE.md) | `string`, `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_EXECUTE_SCALAR_FLOAT`](./SQL_EXECUTE.md) | `string`, `string` | `float` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_EXECUTE_NONQUERY dbName, sql
    int SQL_EXECUTE_READER dbName, sql
    int SQL_EXECUTE_SCALAR_LONG dbName, sql
    str SQL_EXECUTE_SCALAR_STRING dbName, sql
    float SQL_EXECUTE_SCALAR_FLOAT dbName, sql
    ```

    SQLite 数据库的 SQL 语句执行相关函数。

    - `SQL_EXECUTE_NONQUERY`：执行非查询 SQL 语句（INSERT / UPDATE / DELETE / CREATE TABLE 等），返回受影响的行数。
    - `SQL_EXECUTE_READER`：执行查询 SQL 语句（SELECT），返回 Reader ID（用于后续 [`SQL_READER_READ`](./SQL_READER.md) 等操作）。
    - `SQL_EXECUTE_SCALAR_LONG`：执行标量查询，返回结果的第一行第一列的整数值。若结果为 NULL 或无结果，返回 `0`。
    - `SQL_EXECUTE_SCALAR_STRING`：执行标量查询，返回结果的第一行第一列的字符串值。若结果为 NULL 或无结果，返回空字符串。
    - `SQL_EXECUTE_SCALAR_FLOAT`：执行标量查询，返回结果的第一行第一列的浮点数值。若结果为 NULL 或无结果，返回 `0.0`。

    !!! warning "注意"

        - 执行前必须先通过 [`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) 或 [`SQL_CONNECT`](./SQL_CONNECT.md) 建立连接。
        - 若需要参数化查询（防 SQL 注入），请使用 [`SQL_P_EXECUTE_*`](./SQL_PARAM.md) 系列函数。
        - `SQL_EXECUTE_READER` 返回的 Reader ID 使用完毕后必须调用 [`SQL_READER_CLOSE`](./SQL_READER.md) 关闭，否则会泄漏资源。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"

        ; 建表
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS scores (name TEXT, score INTEGER)"

        ; 插入数据
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO scores VALUES ('Alice', 95)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO scores VALUES ('Bob', 82)"

        ; 标量查询
        PRINTFORML 最高分：{SQL_EXECUTE_SCALAR_LONG("test", "SELECT MAX(score) FROM scores")}
        PRINTFORML 第一名姓名：{SQL_EXECUTE_SCALAR_STRING("test", "SELECT name FROM scores ORDER BY score DESC LIMIT 1")}

        ; Reader 查询
        LOCAL = SQL_EXECUTE_READER("test", "SELECT * FROM scores")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORML {SQL_READER_GET_STRING(LOCAL, 0)}: {SQL_READER_GET_LONG(LOCAL, 1)}分
        REND
        SQL_READER_CLOSE LOCAL

        SQL_DISCONNECT "test"
        WAIT
    ```
