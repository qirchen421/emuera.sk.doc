---
hide:
  - toc
---

# SQL Execution

| Function name | Arguments | Return |
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

    Functions for executing SQL statements on SQLite databases.

    - `SQL_EXECUTE_NONQUERY`: Executes a non-query SQL statement (INSERT / UPDATE / DELETE / CREATE TABLE, etc.) and returns the number of affected rows.
    - `SQL_EXECUTE_READER`: Executes a query SQL statement (SELECT) and returns a Reader ID (for subsequent operations like [`SQL_READER_READ`](./SQL_READER.md)).
    - `SQL_EXECUTE_SCALAR_LONG`: Executes a scalar query and returns the first column of the first row as an integer. Returns `0` if the result is NULL or empty.
    - `SQL_EXECUTE_SCALAR_STRING`: Executes a scalar query and returns the first column of the first row as a string. Returns an empty string if the result is NULL or empty.
    - `SQL_EXECUTE_SCALAR_FLOAT`: Executes a scalar query and returns the first column of the first row as a float. Returns `0.0` if the result is NULL or empty.

    !!! warning "Warning"

        - A connection must be established via [`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) or [`SQL_CONNECT`](./SQL_CONNECT.md) before executing any SQL.
        - For parameterized queries (SQL injection prevention), use the [`SQL_P_EXECUTE_*`](./SQL_PARAM.md) series.
        - The Reader ID returned by `SQL_EXECUTE_READER` must be closed with [`SQL_READER_CLOSE`](./SQL_READER.md) after use, otherwise resources will leak.

!!! hint "Hint"

    Available as both command and function in expressions.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"

        ; Create table
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS scores (name TEXT, score INTEGER)"

        ; Insert data
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO scores VALUES ('Alice', 95)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO scores VALUES ('Bob', 82)"

        ; Scalar queries
        PRINTFORML Highest score: {SQL_EXECUTE_SCALAR_LONG("test", "SELECT MAX(score) FROM scores")}
        PRINTFORML Top scorer: {SQL_EXECUTE_SCALAR_STRING("test", "SELECT name FROM scores ORDER BY score DESC LIMIT 1")}

        ; Reader query
        LOCAL = SQL_EXECUTE_READER("test", "SELECT * FROM scores")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORML {SQL_READER_GET_STRING(LOCAL, 0)}: {SQL_READER_GET_LONG(LOCAL, 1)} pts
        REND
        SQL_READER_CLOSE LOCAL

        SQL_DISCONNECT "test"
        WAIT
    ```
