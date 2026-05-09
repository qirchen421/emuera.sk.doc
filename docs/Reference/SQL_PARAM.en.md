---
hide:
  - toc
---

# SQL Parameterized Queries

| Function name | Arguments | Return |
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

    Functions for SQLite parameterized queries, used to prevent SQL injection attacks.

    - `SQL_ESCAPE`: Escapes a string for SQL (doubles single quotes `'` to `''`). For use when manually constructing SQL strings.
    - `SQL_P_EXECUTE_NONQUERY`: Executes a parameterized non-query SQL. Uses `@0`, `@1`, `@2`... as placeholders in the SQL, with subsequent arguments replacing them in order. Returns the number of affected rows.
    - `SQL_P_EXECUTE_READER`: Executes a parameterized query SQL. Returns a Reader ID.
    - `SQL_P_EXECUTE_SCALAR_LONG`: Executes a parameterized scalar query, returns an integer.
    - `SQL_P_EXECUTE_SCALAR_STRING`: Executes a parameterized scalar query, returns a string.
    - `SQL_P_EXECUTE_SCALAR_FLOAT`: Executes a parameterized scalar query, returns a float.

    !!! warning "Warning"

        - **Parameterized queries are recommended** over manual SQL string concatenation to prevent SQL injection attacks.
        - `SQL_ESCAPE` should only be used as a fallback when parameterized queries are not available.
        - Parameter placeholders are `@0`, `@1`, `@2`... (0-based), not `?` or named parameters.
        - All parameter values are passed as strings; SQLite automatically converts them based on column types.

!!! hint "Hint"

    Available as both command and function in expressions.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)"

        ; Parameterized insert (safe)
        SQL_P_EXECUTE_NONQUERY "test", "INSERT INTO users VALUES (@0, @1)", "Alice", "25"
        SQL_P_EXECUTE_NONQUERY "test", "INSERT INTO users VALUES (@0, @1)", "Bob", "30"

        ; Parameterized query
        LOCAL = SQL_P_EXECUTE_READER("test", "SELECT * FROM users WHERE age > @0", "26")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORML {SQL_READER_GET_STRING(LOCAL, 0)}: {SQL_READER_GET_LONG(LOCAL, 1)} years old
        REND
        SQL_READER_CLOSE LOCAL

        ; Parameterized scalar query
        PRINTFORML Users over 25: {SQL_P_EXECUTE_SCALAR_LONG("test", "SELECT COUNT(*) FROM users WHERE age > @0", "25")}

        SQL_DISCONNECT "test"
        WAIT
    ```
