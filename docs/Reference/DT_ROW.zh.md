---
hide:
  - toc
---

# DataTable 行管理相关函数

| 函数名                                                          | 参数                                                      | 返回值 |
| :-------------------------------------------------------------- | :-------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.zh.md)    | `string`([, `string`, `any`] ...)                         | `int`  |
|                                                                 | `string`, `ref` `string[]`, `ref` `any[]`, `int`          | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.zh.md)    | `string`, `int`, `string`, `any`([, `string`, `any`] ...) | `int`  |
|                                                                 | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`   | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.zh.md) | `string`, `int`                                           | `int`  |
|                                                                 | `string`, `ref` `int[]`, `int`                            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.zh.md) | `string`                                                  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    a. int DT_ROW_ADD dataTableName, ([, columnName, columnValue] ...)
    b. int DT_ROW_ADD dataTableName, columnNames, columnValues, count

    a. int DT_ROW_SET dataTableName, idValue, ([, columnName, columnValue] ...)
    b. int DT_ROW_ADD dataTableName, idValue, columnNames, columnValues, count

    a. int DT_ROW_REMOVE dataTableName, idValue
    b. int DT_ROW_REMOVE dataTableName, idValues, count

    int DT_ROW_LENGTH dataTableName
    ```

    `DataTable` （数据库，基于 [`DataTable`](https://learn.microsoft.com/zh-cn/dotnet/api/system.data.datatable?view=netframework-4.8) 类）的行的操作相关的一系列函数。

    - `DT_ROW_ADD`：为名为 `dataTableName` 的 `DataTable` 添加行。若指定的 `DataTable` 本身就不存在，返回 `-1`。
        1. 添加新行，将该行的 `columnName` 列赋值为 `columnValue`，返回该行的 `id` 列的值。可以传入多组 `columnName`・`columnValue`。
        2. 添加新行，依次从 `columnNames` 中取出行名，从 `columnValues` 中取出值，为对应行赋值，最大重复 `count` 次。返回该行的 `id` 列的值。
    - `DT_ROW_SET`：修改名为 `dataTableName` 的 `DataTable` 的 `id` 为 `idValue` 的行。若指定的 `DataTable` 本身就不存在，返回 `-1`。
        1. 将该行的 `columnName` 列的值设置为 `columnValue`，返回编辑成功的值的总数。可以传入多组 `columnName`・`columnValue`。
        2. 依次从 `columnNames` 中取出行名，从 `columnValues` 中取出值，为对应行赋值，最大重复 `count` 次。返回编辑成功的值的总数。
    - `DT_ROW_REMOVE`：将名为 `dataTableName` 的 `DataTable` 中的行删除。若指定的 `DataTable` 本身就不存在，返回 `-1`。
        1. 删除 `id` 列的值为 `idValue` 的行。若删除成功，返回 `1`。
        2. 依次将 `id` 与 `idValues` 的元素的值相等的行删除，最大重复 `count` 次。若删除成功，返回删除的行的数量。
    - `DT_ROW_LENGTH`：返回名为 `dataTableName` 的 `DataTable` 的行数。若指定的 `DataTable` 本身就不存在，返回 `-1`。

    !!! warning "注意"

        不能编辑 `id` 列的值。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。


!!! example "示例代码" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM id
        #DIMS columnNames = "age", "height"
        #DIM columnValues = 11, 132

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        id = DT_ROW_ADD("db", "name", "Name1")
        DT_ROW_SET "db", id, columnNames, columnValues, 2
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML 行数：{DT_ROW_LENGTH("db")}

        CALL PRINTL_ROW(0)
        DT_ROW_SET "db", id, "age", 0, "height", 50
        CALL PRINTL_ROW(0)

        ONEINPUT

    @PRINTL_ROW(index)
        #DIM index
        PRINTFORM 第{index+1}行 - 姓名：%DT_CELL_GETS("db", index, "name")% 
        PRINTFORM 年龄：{DT_CELL_GET("db", index, "age")} 
        PRINTFORML 身高：{DT_CELL_GET("db", index, "height")}
    ``` 
    ``` title="输出结果"
    行数：5
    第1行 - 姓名：Name1 年龄：11 身高：132
    第1行 - 姓名：Name1 年龄：0 身高：50
    ```
