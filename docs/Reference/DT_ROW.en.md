---
hide:
  - toc
---

# DataTable Row Management

| Function name                                                  | Arguments                                                      | Return |
| :------------------------------------------------------------ | :------------------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.md)    | `string`([, `string`, `any`] ...)                             | `int`  |
|                                                                | `string`, `ref` `string[]`, `ref` `any[]`, `int`            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.md)    | `string`, `int`, `string`, `any`([, `string`, `any`] ...) | `int`  |
|                                                                | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`   | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.md) | `string`, `int`                                              | `int`  |
|                                                                | `string`, `ref` `int[]`, `int`                              | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.md) | `string`                                                      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    a. int DT_ROW_ADD dataTableName(, columnName, columnValue) ...
    b. int DT_ROW_ADD dataTableName, columnNames, columnValues, count

    a. int DT_ROW_SET dataTableName, idValue(, columnName, columnValue) ...
    b. int DT_ROW_SET dataTableName, idValue, columnNames, columnValues, count

    a. int DT_ROW_REMOVE dataTableName, idValue
    b. int DT_ROW_REMOVE dataTableName, idValues, count

    int DT_ROW_LENGTH dataTableName
    ```

    Functions for manipulating rows in `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).

    - `DT_ROW_ADD`: Adds a row to the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
        1. Adds a row, assigns `columnValue` to column `columnName` of that row, returns the value of column `id` of the row. Multiple `columnName`/`columnValue` pairs can be passed.
        2. Adds a row, sequentially takes column names from `columnNames` and values from `columnValues`, assigns values to the corresponding columns of that row, repeats up to `count` times. Returns the value of column `id` of the row.
    - `DT_ROW_SET`: Edits values in the row where column `id` is `idValue` in the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
        1. Assigns `columnValue` to column `columnName` of that row, returns the number of edited values. Multiple `columnName`/`columnValue` pairs can be passed.
        2. Sequentially takes column names from `columnNames` and values from `columnValues`, assigns values to the corresponding columns of that row, repeats up to `count` times. Returns the number of edited values.
    - `DT_ROW_REMOVE`: Removes rows from the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
        1. Removes the row where column `id` is `idValue`. Returns `1` on success.
        2. Sequentially removes rows where column `id` matches elements in `idValues`, repeats up to `count` times. Returns the number of removed rows on success.
    - `DT_ROW_LENGTH`: Returns the number of rows in the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.

    !!! warning "Warning"

        The value of column `id` cannot be edited.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
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

        PRINTFORML Row count: {DT_ROW_LENGTH("db")}

        CALL PRINTL_ROW(0)
        DT_ROW_SET "db", id, "age", 0, "height", 50
        CALL PRINTL_ROW(0)

        ONEINPUT

    @PRINTL_ROW(index)
        #DIM index
        PRINTFORM Row {index+1} - Name: %DT_CELL_GETS("db", index, "name")% 
        PRINTFORM Age: {DT_CELL_GET("db", index, "age")} 
        PRINTFORML Height: {DT_CELL_GET("db", index, "height")}
    ``` 
    ``` title="Result"
    Row count: 5
    Row 1 - Name: Name1 Age: 11 Height: 132
    Row 1 - Name: Name1 Age: 0 Height: 50
    ```
