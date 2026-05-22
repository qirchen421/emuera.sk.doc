---
hide:
  - toc
---

# DataTable Management

| Function name                                                    | Arguments        | Return |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.en.md)  | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.en.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.en.md) | `string`        | `1`    |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.en.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.en.md)  | `string`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CREATE dataTableName
    int DT_EXIST dataTableName
    1 DT_RELEASE dataTableName
    int DT_CLEAR dataTableName
    int DT_NOCASE dataTableName, ignoreCase
    ```

    Functions for creating, deleting, checking existence, clearing data, and setting case-insensitive comparison of `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class).
    
    - `DT_CREATE`: Creates a `DataTable` with `dataTableName`. Returns `0` if a `DataTable` with that name already exists, `1` on success.
    - `DT_EXIST`: Checks if a `DataTable` with `dataTableName` exists. Returns `1` if it exists, `0` otherwise.
    - `DT_RELEASE`: Deletes the `DataTable` with `dataTableName`.
    - `DT_CLEAR`: Removes all rows from the `DataTable` with `dataTableName` (column settings remain unchanged), returns `1`. Returns `-1` if the DataTable does not exist.
    - `DT_NOCASE`: Sets whether the `DataTable` with `dataTableName` ignores case during string comparison in [`DT_SELECT`](./DT_SELECT.en.md) function. Returns `1`. Returns `-1` if the DataTable does not exist.
        - If `ignoreCase` is `0` (default): Case-sensitive
        - If `ignoreCase` is other value: Case-insensitive

    !!! warning "Warning"

        The column `id` is automatically added after the `DataTable` is created. See "[`XML`, `MAP`, `DataTable` Can Be Saved in Save Data](../EMEE/EMEE_Summary.en.md#xmlmapdatatable)" to save to save file. They are automatically deleted when "Return to Title Screen" or [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) is called.

!!! hint "Hint"

    Available as both command and function in expressions


!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML Existence of DataTable "db": {DT_EXIST("db")}
        DT_CREATE "db"
        PRINTSL RESULT ? "Success" # "Already exists"
        DT_CREATE "db"
        PRINTSL RESULT ? "Success" # "Already exists"

        CALL GEN_DB_DATA
        
        PRINTFORML DataTable "db" data count: {DT_ROW_LENGTH("db")} rows x {DT_COLUMN_LENGTH("db")} columns
        PRINTFORML Number of rows where "name" starts with "n": {DT_SELECT("db", "name LIKE 'n%'")}
        DT_NOCASE "db", 1
        PRINTFORML Number of rows where "name" starts with "n": {DT_SELECT("db", "name LIKE 'n%'")}
        DT_CLEAR "db"
        PRINTFORML DataTable "db" data count: {DT_ROW_LENGTH("db")} rows x {DT_COLUMN_LENGTH("db")} columns

        RESETDATA ; All DataTables are automatically deleted

        DT_CREATE "db"
        PRINTSL RESULT ? "Success" # "Already exists"
        PRINTFORML Existence of DataTable "db": {DT_EXIST("db")}
        DT_RELEASE "db"
        PRINTFORML Existence of DataTable "db": {DT_EXIST("db")}

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
    ``` title="Result"
    Existence of DataTable "db": 0
    Success
    Already exists
    DataTable "db" data count: 5 rows x 4 columns
    Number of rows where "name" starts with "n": 0
    Number of rows where "name" starts with "n": 5
    DataTable "db" data count: 0 rows x 4 columns
    Success
    Existence of DataTable "db": 1
    Existence of DataTable "db": 0
    ```
