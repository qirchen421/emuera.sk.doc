---
hide:
  - toc
---

# SQL 参数化查询

| 函数名 | 参数 | 返回值 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SQL_ESCAPE`](./SQL_PARAM.md) | `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_NONQUERY`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_READER`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_LONG`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_STRING`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_FLOAT`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `float` |

!!! info "API"

    ```  { #language-erbapi }
    str SQL_ESCAPE str
    int SQL_P_EXECUTE_NONQUERY dbName, sql(, param0, param1, ...)
    int SQL_P_EXECUTE_READER dbName, sql(, param0, param1, ...)
    int SQL_P_EXECUTE_SCALAR_LONG dbName, sql(, param0, param1, ...)
    str SQL_P_EXECUTE_SCALAR_STRING dbName, sql(, param0, param1, ...)
    float SQL_P_EXECUTE_SCALAR_FLOAT dbName, sql(, param0, param1, ...)
    ```

    SQLite 参数化查询相关函数，用于防止 SQL 注入攻击。

    - `SQL_ESCAPE`：对字符串进行 SQL 转义（将单引号 `''` 双写），返回转义后的字符串。适用于手动拼接 SQL 的场景。
    - `SQL_P_EXECUTE_NONQUERY`：参数化执行非查询 SQL。SQL 中使用 `@0`、`@1`、`@2`... 作为占位符，后续参数按顺序替换。返回受影响的行数。
    - `SQL_P_EXECUTE_READER`：参数化执行查询 SQL。返回 Reader ID。
    - `SQL_P_EXECUTE_SCALAR_LONG`：参数化执行标量查询，返回整数值。
    - `SQL_P_EXECUTE_SCALAR_STRING`：参数化执行标量查询，返回字符串值。
    - `SQL_P_EXECUTE_SCALAR_FLOAT`：参数化执行标量查询，返回浮点数值。

    !!! warning "注意"

        - **推荐使用参数化查询**而非手动拼接 SQL 字符串，以防止 SQL 注入攻击。
        - `SQL_ESCAPE` 仅在无法使用参数化查询时作为后备方案。
        - 参数占位符为 `@0`、`@1`、`@2`...（从 0 开始编号），而非 `?` 或命名参数。
        - 所有参数值均以字符串形式传入，SQLite 会根据列类型自动转换。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)"

        ; 参数化插入（安全）
        SQL_P_EXECUTE_NONQUERY "test", "INSERT INTO users VALUES (@0, @1)", "Alice", "25"
        SQL_P_EXECUTE_NONQUERY "test", "INSERT INTO users VALUES (@0, @1)", "Bob", "30"

        ; 参数化查询
        LOCAL = SQL_P_EXECUTE_READER("test", "SELECT * FROM users WHERE age > @0", "26")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORML {SQL_READER_GET_STRING(LOCAL, 0)}: {SQL_READER_GET_LONG(LOCAL, 1)}岁
        REND
        SQL_READER_CLOSE LOCAL

        ; 参数化标量查询
        PRINTFORML 25岁以上的人数：{SQL_P_EXECUTE_SCALAR_LONG("test", "SELECT COUNT(*) FROM users WHERE age > @0", "25")}

        SQL_DISCONNECT "test"
        WAIT
    ```
