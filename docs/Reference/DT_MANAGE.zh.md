---
hide:
  - toc
---

# DataTable 管理相关函数

| 函数名                                                          | 参数            | 返回值 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.md)  | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.md) | `string`        | `1`    |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.md)  | `string`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CREATE dataTableName
    int DT_EXIST dataTableName
    1 DT_RELEASE dataTableName
    int DT_CLEAR dataTableName
    int DT_NOCASE dataTableName, ignoreCase
    ```

    `DataTable` （数据库，基于 [`DataTable`](https://learn.microsoft.com/zh-cn/dotnet/api/system.data.datatable?view=netframework-4.8) 类）的创建 / 删除 / 判断是否存在 / 数据清除 / 大小写无视设定相关的一系列函数。
    
    - `DT_CREATE`：生成名为 `dataTableName` 的 `DataTable`。  
        如果已经存在名为 `dataTableName` 的 `DataTable`（创建失败），返回 `0`；若创建成功，返回 `1`。
    - `DT_EXIST`：判断是否存在名为 `dataTableName` 的 `DataTable`，若存在，返回 `1`；否则返回 `0`。
    - `DT_RELEASE`：删除名为 `dataTableName` 的 `DataTable`。
    - `DT_CLEAR`：删除名为 `dataTableName` 的 `DataTable` 中保存的所有行（不会清除列的设置），返回 `1`。若指定的 `DataTable` 本身就不存在，返回 `-1`。
    - `DT_NOCASE`：设置名为 `dataTableName` 的 `DataTable` 在 [`DT_SELECT`](./DT_SELECT.md) 函数处理字符串比较时是否无视大小写。返回 `1`。若指定的 `DataTable` 本身就不存在，返回 `-1`。
        - `ignoreCase` 为 `0` 时（默认值）：大小写敏感
        - `ignoreCase` 为其它值时：无视大小写

    !!! warning "注意"

        生成 `DataTable` 之后会自动添加 `id` 列。若需要保存进存档文件请参考「[`XML`、`MAP`、`DataTable` 保存功能](./README.md)」。「タイトル画面へ戻る（返回标题界面）」或 [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) 后会自动删除。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。
!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML DataTable「db」是否存在：{DT_EXIST("db")}
        DT_CREATE "db"
        PRINTSL RESULT ? "创建成功" # "已经存在"
        DT_CREATE "db"
        PRINTSL RESULT ? "创建成功" # "已经存在"

        CALL GEN_DB_DATA
        
        PRINTFORML DataTable「db」中的数据：{DT_ROW_LENGTH("db")}行ｘ{DT_COLUMN_LENGTH("db")}列
        PRINTFORML 「name」以「n」开头的列数：{DT_SELECT("db", "name LIKE 'n%'")}
        DT_NOCASE "db", 1
        PRINTFORML 「name」以「n」开头的列数：{DT_SELECT("db", "name LIKE 'n%'")}
        DT_CLEAR "db"
        PRINTFORML DataTable「db」中的数据：{DT_ROW_LENGTH("db")}行ｘ{DT_COLUMN_LENGTH("db")}列

        RESETDATA ; すべてのDataTableが自動的に削除される

        DT_CREATE "db"
        PRINTSL RESULT ? "创建成功" # "已经存在"
        PRINTFORML DataTable「db」是否存在：{DT_EXIST("db")}
        DT_RELEASE "db"
        PRINTFORML DataTable「db」是否存在：{DT_EXIST("db")}

        ONEINPUT

    @GEN_DB_DATA
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172
    ```
    ``` title="输出结果"
    DataTable「db」是否存在：0
    创建成功
    已经存在
    DataTable「db」中的数据：5行ｘ4列
    「name」以「n」开头的列数：0
    「name」以「n」开头的列数：5
    DataTable「db」中的数据：0行ｘ4列
    创建成功
    DataTable「db」是否存在：1
    DataTable「db」是否存在：0
    ```