---
hide:
  - toc
---

# DataTable Cell Management

| Function name                                                    | Arguments                                      | Return   |
| :-------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.md)    | `string`, `int`, `string`(, `int`)            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.md)   | `string`, `int`, `string`(, `int`)            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.md) | `string`, `int`, `string`(, `int`)            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.md)    | `string`, `int`, `string`(, `any`, `int`)    | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CELL_GET dataTableName, row, columnName(, asId)
    string DT_CELL_GETS dataTableName, row, columnName(, asId)
    int DT_CELL_ISNULL dataTableName, row, columnName(, asId)
    int DT_CELL_SET dataTableName, row, columnName(, value, asId)
    ```

    Functions for manipulating cells in `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).

    - `DT_CELL_GET`: Returns the integer value at column `columnName` of row `row` in the `DataTable` with `dataTableName`. Returns `0` on failure.
        - If `asId` is `1`, the row with column `id` value equal to `row` is targeted.
        - If `asId` is other value, it targets row `row` (0-indexed).
    - `DT_CELL_GETS`: Returns the string value at column `columnName` of row `row` in the `DataTable` with `dataTableName`. Returns empty string on failure.
    - `DT_CELL_ISNULL`: Returns `1` if the value at column `columnName` of row `row` in the `DataTable` with `dataTableName` is null (neither integer nor string).
        - Returns `0` if the value is not null.
        - Returns `-1` if the DataTable does not exist.
        - Returns `-2` if the corresponding row or column does not exist.
    - `DT_CELL_SET`: Assigns `value` to column `columnName` of row `row` in the `DataTable` with `dataTableName`. If `value` is omitted, assigns null.
        - Returns `1` on success.
        - Returns `0` if attempting to assign a value to column `id`.
        - Returns `-1` if the DataTable does not exist.
        - Returns `-2` if the type of `value` does not match the cell's type.
        - Returns `-3` if the corresponding row or column does not exist.

    !!! warning "Warning"

        The value of column `id` cannot be edited.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
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

        PRINTFORML Row 1 column height is \@DT_CELL_ISNULL("db", id, "height", 1)==1?null#not null\@

        DT_CELL_SET "db", 0, "height", 132

        PRINTFORM Row 1 - Name: %DT_CELL_GETS("db", 0, "name")% 
        PRINTFORM Age: {DT_CELL_GET("db", 0, "age")} 
        PRINTFORML Height: {DT_CELL_GET("db", 0, "height")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Row 1 column height is null
    Row 1 - Name: Name1 Age: 11 Height: 132
    ```
