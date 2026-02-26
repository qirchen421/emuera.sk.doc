---
hide:
  - toc
---

# DataTable Column Management

| Function name                                                                 | Arguments                                                          | Return |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.md)     | `string`, `string`(, `any`, `int`)                                | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.md)   | `string`, `string`                                                | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.md)  | `string`, `string`                                                | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.md)  | `string`                                                          | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | none   |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_NAMES`](./DT_COLUMN.md)   | `string`(, `ref` `string[]`)                                     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_COLUMN_ADD dataTableName, columnName(, type, nullable)
    int DT_COLUMN_EXIST dataTableName, columnName
    int DT_COLUMN_REMOVE dataTableName, columnName
    int DT_COLUMN_LENGTH dataTableName
    int DT_COLUMN_OPTIONS dataTableName, columnName, option, optionValue([, option, optionValue] ...)
    int DT_COLUMN_NAMES dataTableName(, outputArray)
    ```

    Functions for manipulating columns in `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).

    - `DT_COLUMN_ADD`: Adds column `columnName` to the `DataTable` with `dataTableName`. Returns `0` if `columnName` already exists, `1` on success.
        - `type` specifies the type of values stored in the column.
            - `1` (integer) / `int8` (string): 8-bit signed integer
            - `2` (integer) / `int16` (string): 16-bit signed integer
            - `3` (integer) / `int32` (string): 32-bit signed integer
            - `4` (integer) / `int64` (string): 64-bit signed integer
            - `5` (integer) / `string` (string): string (default)
        - If `nullable` is not `0` (default), allows null values for this column
    - `DT_COLUMN_EXIST`: Checks if column `columnName` exists in the `DataTable` with `dataTableName`. Returns the type number (see `type` in `DT_COLUMN_ADD`) if it exists, `0` otherwise.
    - `DT_COLUMN_REMOVE`: Removes column `columnName` from the `DataTable` with `dataTableName`. Returns `1` on success.
    - `DT_COLUMN_LENGTH`: Returns the number of columns in the `DataTable` with `dataTableName`. Returns `-1` if the DataTable does not exist.
    - `DT_COLUMN_OPTIONS`: Sets options for column `columnName` in the `DataTable` with `dataTableName`. `option` is case-insensitive.
        - `option` is `DEFAULT`: Sets the default value for the specified column.
    - `DT_COLUMN_NAMES`: Sequentially assigns all column names of the `DataTable` with `dataTableName` to `outputArray`. If `outputArray` is omitted, assigns to `RESULTS`. Returns the column count.

    !!! warning "Warning"

        Column `id` cannot be removed.

!!! hint "Hint"

    Available as both command and function in expressions. `DT_COLUMN_OPTIONS` is command only.


!!! example "Example" 
    
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

        PRINT Column names:
        FOR LOCAL, 0, DT_COLUMN_NAMES("db")
            PRINTFORM %RESULTS:LOCAL% 
        NEXT
        PRINTL

        PRINTFORML Column count: {DT_COLUMN_LENGTH("db")}, column "age" exists: {DT_COLUMN_EXIST("db", "age")}

        PRINTFORML %DT_CELL_GETS("db", 1, "name")%'s age is {DT_CELL_GET("db", 1, "age")}

        DT_COLUMN_REMOVE "db", "age"

        PRINTFORML Column count: {DT_COLUMN_LENGTH("db")}, column "age" exists: {DT_COLUMN_EXIST("db", "age")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Column names: id name height age 
    Column count: 4, column "age" exists: 2
    Name2's age is 5
    Column count: 3, column "age" exists: 0
    ```
