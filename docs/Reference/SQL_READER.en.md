---
hide:
  - toc
---

# SQL Reader Operations

| Function name | Arguments | Return |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_READ`](./SQL_READER.md) | `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_LONG`](./SQL_READER.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_STRING`](./SQL_READER.md) | `int`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_READER_GET_FLOAT`](./SQL_READER.md) | `int`, `int` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_ISNULL`](./SQL_READER.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_CLOSE`](./SQL_READER.md) | `int` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_READER_READ readerId
    int SQL_READER_GET_LONG readerId, columnIndex
    str SQL_READER_GET_STRING readerId, columnIndex
    float SQL_READER_GET_FLOAT readerId, columnIndex
    int SQL_READER_ISNULL readerId, columnIndex
    int SQL_READER_CLOSE readerId
    ```

    Functions for reading and manipulating SQLite query results (Reader).

    - `SQL_READER_READ`: Advances the Reader to the next row. Returns `1` if data is available, `0` if no more rows.
    - `SQL_READER_GET_LONG`: Gets the integer value of the specified column (0-based index) in the current row.
    - `SQL_READER_GET_STRING`: Gets the string value of the specified column in the current row.
    - `SQL_READER_GET_FLOAT`: Gets the float value of the specified column in the current row.
    - `SQL_READER_ISNULL`: Checks if the specified column in the current row is NULL. Returns `1` if NULL, `0` otherwise.
    - `SQL_READER_CLOSE`: Closes the Reader and releases resources. Returns `1`.

    !!! warning "Warning"

        - `readerId` is returned by [`SQL_EXECUTE_READER`](./SQL_EXECUTE.md).
        - You must call `SQL_READER_READ` at least once before reading column values.
        - You **must** call `SQL_READER_CLOSE` after use, otherwise resources will leak.
        - `columnIndex` is 0-based.

!!! hint "Hint"

    Available as both command and function in expressions.

!!! example "Example"

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
