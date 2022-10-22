# DataTable 单元格管理相关函数

| 函数名                                                            | 参数                                      | 返回值   |
| :---------------------------------------------------------------- | :---------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.md)    | `string`, `int`, `string`(, `int`)        | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.md)   | `string`, `int`, `string`(, `int`)        | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.md) | `string`, `int`, `string`(, `int`)        | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.md)    | `string`, `int`, `string`(, `any`, `int`) | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CELL_GET dataTableName, row, columnName(, asId)
    string DT_CELL_GETS dataTableName, row, columnName(, asId)
    int DT_CELL_ISNULL dataTableName, row, columnName(, asId)
    int DT_CELL_SET dataTableName, row, columnName(, value, asId)
    ```

    `DataTable` （数据库，基于 [`DataTable`](https://learn.microsoft.com/zh-cn/dotnet/api/system.data.datatable?view=netframework-4.8) 类）的单元格的操作相关的一系列函数。

    - `DT_CELL_GET`：返回名为 `dataTableName` 的 `DataTable` 的 `row` 行 `columnName` 列的整数。若失败，返回 `0`。
        - 若 `asId` 为 `1`，操作的行为 `id` 列的值等于 `row` 的行。
        - 若 `asId` 其它值或被省略，操作的行为第 `row` 行（起始行为第0行）。
    - `DT_CELL_GETS`：返回名为 `dataTableName` 的 `DataTable` 的 `row` 行 `columnName` 列的字符串。若失败，返回空字符串。
    - `DT_CELL_ISNULL`：若名为 `dataTableName` 的 `DataTable` 的 `row` 行 `columnName` 列的值为空（不同于整数和字符串）时返回 `1`。
        - 返回值为 `0` 时，所查询的值不为空。
        - 返回值为 `-1` 时，指定的 `DataTable` 本身就不存在。
        - 返回值为 `-2` 时，指定的行或列不存在。
    - `DT_CELL_SET`：将名为 `dataTableName` 的 `DataTable` 的 `row` 行 `columnName` 列的单元格赋值为 `value`。若省略 `value`，赋值为空。
        - 返回值为 `1` 时，赋值成功。
        - 返回值为 `0` 时，尝试设置 `id` 列的值。
        - 返回值为 `-1` 时，指定的 `DataTable` 本身就不存在。
        - 返回值为 `-2` 时，`value` 的类型与该单元格的类型不符。
        - 返回值为 `-3` 时，指定的行或列不存在。

    !!! warning "注意"

        不能编辑 `id` 列的值。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM id

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        id = DT_ROW_ADD("db", "name", "Name1", "age", 11)
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML 第1行的height列的值为\@DT_CELL_ISNULL("db", id, "height", 1)==1?空#非空\@

        DT_CELL_SET "db", 0, "height", 132

        PRINTFORM 第1行 - 姓名：%DT_CELL_GETS("db", 0, "name")% 
        PRINTFORM 年龄：{DT_CELL_GET("db", 0, "age")} 
        PRINTFORML 身高：{DT_CELL_GET("db", 0, "height")}

        ONEINPUT
    ``` 
    ``` title="输出结果"
    第1行的height列的值为空
    第1行 - 姓名：Name1 年龄：11 身高：132
    ```
