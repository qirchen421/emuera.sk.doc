---
hide:
  - toc
---

# SQL Connection Management

| Function name | Arguments | Return |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_CONNECTION_OPEN`](./SQL_CONNECT.en.md) | `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_CONNECT`](./SQL_CONNECT.en.md) | `string`(, `string`) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_DISCONNECT`](./SQL_CONNECT.en.md) | `string` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_CONNECTION_OPEN name
    int SQL_CONNECT dbName(, connectionString)
    int SQL_DISCONNECT dbName
    ```

    Functions for connecting to and disconnecting from SQLite databases.

    - `SQL_CONNECTION_OPEN`: Creates or opens an SQLite database file (`name.db`) in the `sav/sql/` directory using `name` as the identifier. If a connection with the same name already exists, it is closed first before reopening. Returns `1` on success.
        - DotNet upstream behavior: Automatically sets `PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;` for maximum write performance, but the database is at risk of corruption on crash. Additionally, the `name` parameter has no path validation — a malicious or buggy ERB script can use `../../` to traverse outside the `sav/sql/` directory and create or overwrite `.db` files anywhere on the system (path traversal vulnerability).
        - **Skia variant change**: Changed to `PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;`, which provides write performance close to OFF mode while ensuring the database will not be corrupted on crash. Also added security validation for the `name` parameter — only valid filenames are allowed; path separators and `..` are prohibited (path traversal prevention).
    - `SQL_CONNECT`: Connects to an SQLite database using `dbName` as the identifier and `connectionString` as the connection string. If `connectionString` is omitted, an in-memory database (`Data Source=:memory:`) is used. If a connection with the same name already exists, returns `1` directly. Returns `1` on success, throws an error on failure.
    - `SQL_DISCONNECT`: Disconnects the database connection named `dbName` and releases resources. Returns `1`.

    !!! warning "Warning"

        - `SQL_CONNECTION_OPEN` is a convenience function added in the DotNet version that automatically handles path mapping, suitable for most scenarios.
        - `SQL_CONNECT` is the Skia version's low-level connection function, providing more flexible persistence interaction:
            - Can specify database files at any path (e.g., `Data Source=plugins/my_data.db`), not limited to the `sav/sql/` directory
            - Supports in-memory databases (`Data Source=:memory:`) for temporary data processing
            - Allows customizing SQLite behavior via connection string (WAL mode, cache size, read-only mode, etc.)
            - Does not auto-set PRAGMA, giving full control over `journal_mode`, `synchronous`, and other parameters
        - Both share the same connection pool; you cannot connect to the same `name`/`dbName` using both methods simultaneously.
        - All connections are automatically closed when "Return to Title Screen" or `RESETDATA` is called.

!!! hint "Hint"

    Available as both command and function in expressions.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Easy connection with SQL_CONNECTION_OPEN (DB file at sav/sql/mydb.db)
        SQL_CONNECTION_OPEN "mydb"
        PRINTFORML Connection successful: {RESULT}

        ; Create table
        SQL_EXECUTE_NONQUERY "mydb", "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)"

        ; Connect to in-memory database with SQL_CONNECT (for temporary data processing)
        SQL_CONNECT "memdb"
        PRINTFORML In-memory DB connected: {RESULT}

        ; Connect to a custom-path database with SQL_CONNECT (e.g., plugin data directory)
        SQL_CONNECT "QOL_DATA", "Data Source=plugins/qol_data.db"
        PRINTFORML Plugin DB connected: {RESULT}

        ; Disconnect
        SQL_DISCONNECT "mydb"
        SQL_DISCONNECT "memdb"
        SQL_DISCONNECT "QOL_DATA"

        WAIT
    ```
