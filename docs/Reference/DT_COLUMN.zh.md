---
hide:
  - toc
---

# DataTable 列管理相关函数

| 函数名                                                                 | 参数                                                          | 返回值 |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.md)     | `string`, `string`(, `any`, `int`)                            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.md)   | `string`, `string`                                            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.md)  | `string`, `string`                                            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.md)  | `string`                                                      | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | 无     |

!!! info "API"

    ```  { #language-erbapi }
    int DT_COLUMN_ADD dataTableName, columnName(, type, nullable)
    int DT_COLUMN_EXIST dataTableName, columnName
    int DT_COLUMN_REMOVE dataTableName, columnName
    int DT_COLUMN_LENGTH dataTableName
    int DT_COLUMN_OPTIONS dataTableName, columnName, option, optionValue([, option, optionValue] ...)
    ```

    `DataTable` （数据库，基于 [`DataTable`](https://learn.microsoft.com/zh-cn/dotnet/api/system.data.datatable?view=netframework-4.8) 类）的列的操作相关的一系列函数。

    - `DT_COLUMN_ADD`：为名为 `dataTableName` 的 `DataTable` 添加 `columnName` 列。`columnName` 已经存在时，返回 `0`；若创建成功，返回 `1`。
        - `type` 用于指定该列存储的数据的类型。
            - `1`（整数）/ `int8`（字符串）：8位带符号整数
            - `2`（整数）/ `int16`（字符串）：16位带符号整数
            - `3`（整数）/ `int32`（字符串）：32位带符号整数
            - `4`（整数）/ `int64`（字符串）：64位带符号整数
            - `5`（整数）/ `string`（字符串）：字符串（默认值）
        - `nullable` 为 `0` 以外的数（默认值）时，该列的数据可以为空。
    - `DT_COLUMN_EXIST`：判断在名为 `dataTableName` 的 `DataTable` 中是否存在 `columnName` 列。若存在，返回存储类型对应的数值（参照 `DT_COLUMN_ADD` 的 `type` 参数）。否则返回 `0`。
    - `DT_COLUMN_REMOVE`：将名为 `dataTableName` 的 `DataTable` 中断 `columnName` 列删除。若删除成功，返回 `1`。
    - `DT_COLUMN_LENGTH`：返回名为 `dataTableName` 的 `DataTable` 的列数。若指定的 `DataTable` 本身就不存在，返回 `-1`。
    - `DT_COLUMN_OPTIONS`：对名为 `dataTableName` 的 `DataTable` 的 `columnName` 列的设置项进行设置。`option` 无视大小写。
        - `option` 为 `DEFAULT`：设定指定列的默认值。

    !!! warning "注意"

        不能删除列 `id` 。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。`DT_COLUMN_OPTIONS` 只支持命令形式。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_COLUMN_OPTIONS "db", "age", DEFAULT, 5

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML 列数：{DT_COLUMN_LENGTH("db")}，列「age」是否存在：{DT_COLUMN_EXIST("db", "age")}

        PRINTFORML %DT_CELL_GETS("db", 1, "name")%的年龄为{DT_CELL_GET("db", 1, "age")}

        DT_COLUMN_REMOVE "db", "age"

        PRINTFORML 列数：{DT_COLUMN_LENGTH("db")}，列「age」是否存在：{DT_COLUMN_EXIST("db", "age")}

        ONEINPUT
    ```
    ``` title="输出结果"
    列数：4，列「age」是否存在：2
    Name2的年龄为5
    列数：3，列「age」是否存在：0
    ```