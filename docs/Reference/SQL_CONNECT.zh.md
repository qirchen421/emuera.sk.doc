---
hide:
  - toc
---

# SQL 连接管理

| 函数名 | 参数 | 返回值 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) | `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_CONNECT`](./SQL_CONNECT.md) | `string`(, `string`) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_DISCONNECT`](./SQL_CONNECT.md) | `string` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_CONNECTION_OPEN name
    int SQL_CONNECT dbName(, connectionString)
    int SQL_DISCONNECT dbName
    ```

    SQLite 数据库的连接与断开相关函数。

    - `SQL_CONNECTION_OPEN`：以 `name` 为名，在 `sav/sql/` 目录下自动创建或打开 SQLite 数据库文件（`name.db`）。若已存在同名连接则先关闭再重新打开。成功返回 `1`。
        - DotNet 上游行为：自动设置 `PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;` 以追求极致写入性能，但游戏崩溃时数据库有损坏风险。且 `name` 参数未做路径校验，恶意或写错的 ERB 脚本可通过 `../../` 等路径穿越 `sav/sql/` 目录，在系统任意位置创建或覆盖 `.db` 文件。
        - **Skia 变体变更**：改为 `PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;`，写入性能接近 OFF 模式且崩溃时数据库不会损坏。同时 `name` 参数增加安全校验，仅允许合法文件名，禁止包含路径分隔符或 `..`（防止路径穿越）。
    - `SQL_CONNECT`：以 `dbName` 为标识名，使用 `connectionString` 连接 SQLite 数据库。若省略 `connectionString`，默认使用内存数据库（`Data Source=:memory:`）。若已存在同名连接则直接返回 `1`。成功返回 `1`，失败抛出错误。
    - `SQL_DISCONNECT`：断开名为 `dbName` 的数据库连接并释放资源。返回 `1`。

    !!! warning "注意"

        - `SQL_CONNECTION_OPEN` 是 DotNet 版新增的便捷函数，自动处理路径映射，适合大多数场景。
        - `SQL_CONNECT` 是 Skia 版的底层连接函数，提供更灵活的持久化交互能力：
            - 可指定任意路径的数据库文件（如 `Data Source=plugins/my_data.db`），不限于 `sav/sql/` 目录
            - 可使用内存数据库（`Data Source=:memory:`）进行临时数据处理
            - 可通过连接字符串自定义 SQLite 行为（WAL 模式、缓存大小、只读模式等）
            - 不自动设置 PRAGMA，可自行控制 `journal_mode`、`synchronous` 等参数
        - 两者共享同一连接池，不可对同一 `name`/`dbName` 同时使用两种方式连接。
        - 「返回标题界面」或 `RESETDATA` 时会自动关闭所有连接。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 使用 SQL_CONNECTION_OPEN 便捷连接（数据库文件位于 sav/sql/mydb.db）
        SQL_CONNECTION_OPEN "mydb"
        PRINTFORML 连接成功：{RESULT}

        ; 执行建表
        SQL_EXECUTE_NONQUERY "mydb", "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)"

        ; 使用 SQL_CONNECT 连接内存数据库（临时数据处理）
        SQL_CONNECT "memdb"
        PRINTFORML 内存数据库连接成功：{RESULT}

        ; 使用 SQL_CONNECT 连接自定义路径的数据库（如插件数据目录）
        SQL_CONNECT "QOL_DATA", "Data Source=plugins/qol_data.db"
        PRINTFORML 插件数据库连接成功：{RESULT}

        ; 断开连接
        SQL_DISCONNECT "mydb"
        SQL_DISCONNECT "memdb"
        SQL_DISCONNECT "QOL_DATA"

        WAIT
    ```
