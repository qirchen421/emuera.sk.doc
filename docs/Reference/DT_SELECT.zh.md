# DT_SELECT

| 函数名                                                            | 参数                                      | 返回值   |
| :------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.md) | `string`(, `string`, `string`, `ref` `int[]`) | `int`  |


!!! info "API"

    ```  { #language-erbapi }
    int DT_SELECT dataTableName(, filterExpression, sortRule, output)
    ```

    从名为 `dataTableName` 的 `DataTable` 中选择满足 `filterExpression` 的行，将其 `id` 列的值按照 `sortRule` 的规则排序、依次代入 `output` 数组中。返回被选择的行的总数。

    - 若省略 `filterExpression`，选择所有的行。
    - 若省略 `sortRule`，不进行排序。
    - 若未指定 `output` ，将 `id` 的值依次代入 `RESULT` 数组（从 `RESULT:1` 开始）。

    请参考 [`C#` 的 `DataTable.Select`](https://learn.microsoft.com/zh-cn/dotnet/api/system.data.datatable.select?view=netframework-4.8#system-data-datatable-select(system-string-system-string)) 的说明。

!!! warning "注意"

    返回值可能会超过 `output` / `RESULT` 数组的大小。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM idx, 10
        #DIM count
        #DIM i

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        count = DT_SELECT("db", "age >= 18", "age ASC, height DESC", idx)

        PRINTL 18岁及以上的人：
        FOR i, 0, count
            CALL PRINTL_ROW(idx:i)
        NEXT

        ONEINPUT

    @PRINTL_ROW(id)
        #DIM id
        PRINTFORM 姓名：%DT_CELL_GETS("db", id, "name", 1)% 
        PRINTFORM 年龄：{DT_CELL_GET("db", id, "age", 1)} 
        PRINTFORML 身高：{DT_CELL_GET("db", id, "height", 1)}
    ``` 
    ``` title="输出结果"
    18岁及以上的人：
    姓名：Name5 年龄：18 身高：172
    姓名：Name3 年龄：18 身高：159
    姓名：Name2 年龄：21 身高：164
    姓名：Name4 年龄：33 身高：180
    ```
