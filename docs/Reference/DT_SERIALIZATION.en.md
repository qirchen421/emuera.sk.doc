---
hide:
  - toc
---

# DataTable Serialization

| Function name                                                                 | Arguments                        | Return   |
| :----------------------------------------------------------------------------- | :------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.en.md)   | `string`(, `ref` `string`)     | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.en.md) | `string`, `string`, `string`    | `int`    |


!!! info "API"

    ```  { #language-erbapi }
    1. string DT_TOXML dataTableName(, schemaOutput)
    2. int DT_FROMXML dataTableName, schemaXml, dataXml
    ```

    Functions to convert between `DataTable` (database, based on [`DataTable`](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable) class) and XML.

    - `DT_TOXML`: Converts the `DataTable` with `dataTableName` to XML, assigns schema XML to `schemaOutput` (or `RESULTS:1` if omitted), and returns data XML.
    - `DT_FROMXML`: Parses schema XML `schemaXml` and data XML `dataXml`, overwrites the `DataTable` with `dataTableName`. Returns `1` on success, `0` otherwise.

!!! hint "Hint"

    Available as both command and function in expressions

!!! example "Example" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIMS schema
        #DIMS data

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132

        data '= DT_TOXML("db", schema)

        DT_RELEASE "db"

        DT_FROMXML "db", schema, data
        PRINTFORML %DT_CELL_GETS("db", 0, "name")%'s age is {DT_CELL_GET("db", 0, "age")}

        ONEINPUT
    ``` 
    ``` title="Result"
    Name1's age is 11
    ```
