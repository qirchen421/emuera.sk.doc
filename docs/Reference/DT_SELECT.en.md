---
hide:
  - toc
---

# DT_SELECT

| Function name                                                 | Arguments                                          | Return |
| :------------------------------------------------------------ | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.md) | `string`(, `string`, `string`, `ref` `int[]`)    | `int`  |


!!! info "API"

    ```  { #language-erbapi }
    int DT_SELECT dataTableName(, filterExpression, sortRule, output)
    ```

    Selects rows from the `DataTable` with `dataTableName` that satisfy `filterExpression`, sorts them according to `sortRule`, sequentially assigns column `id` values to `output`, and returns the number of rows.

    - If `filterExpression` is omitted, targets all rows.
    - If `sortRule` is omitted, no sorting is applied.
    - If `output` is not specified, column `id` values are sequentially assigned to `RESULT` (starting from `RESULT:1`).

    See [`C#'s DataTable.Select`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable.select).

!!! warning "Warning"

    The return value may exceed the number of elements in `output` / `RESULT`.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
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

        PRINTL People aged 18 or older:
        FOR i, 0, count
            CALL PRINTL_ROW(idx:i)
        NEXT

        ONEINPUT

    @PRINTL_ROW(id)
        #DIM id
        PRINTFORM Name: %DT_CELL_GETS("db", id, "name", 1)% 
        PRINTFORM Age: {DT_CELL_GET("db", id, "age", 1)} 
        PRINTFORML Height: {DT_CELL_GET("db", id, "height", 1)}
    ``` 
    ``` title="Result"
    People aged 18 or older:
    Name: Name5 Age: 18 Height: 172
    Name: Name3 Age: 18 Height: 159
    Name: Name2 Age: 21 Height: 164
    Name: Name4 Age: 33 Height: 180
    ```
