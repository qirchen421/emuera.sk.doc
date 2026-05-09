---
hide:
  - toc
---

# SQL XML Import/Export

| Function name | Arguments | Return |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_MAP_XML`](./SQL_XML.md) | `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_DT_XML`](./SQL_XML.md) | `string`, `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_EXPORT_MAP_XML`](./SQL_XML.md) | `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_EXPORT_DT_XML`](./SQL_XML.md) | `string`, `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_XML_CUSTOM`](./SQL_XML.md) | `string`, `string`, `string`, `string`, `string` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_IMPORT_MAP_XML dbName, tableName, filePath
    int SQL_IMPORT_DT_XML dbName, tableName, schemaPath, dataPath
    int SQL_EXPORT_MAP_XML dbName, tableName, filePath
    int SQL_EXPORT_DT_XML dbName, tableName, schemaPath, dataPath
    int SQL_IMPORT_XML_CUSTOM dbName, tableName, filePath, rowXPath, columnMappings
    ```

    Functions for importing and exporting between SQLite databases and XML files. Supports MAP format, DataTable format, and custom format XML interoperability.

    - `SQL_IMPORT_MAP_XML`: Imports a MAP format XML file (`<map><p><k>key</k><v>value</v></p></map>`) into an SQLite table. Automatically creates the table (`k TEXT PRIMARY KEY, v TEXT`) and uses `INSERT OR REPLACE`. Returns `1` on success.
    - `SQL_IMPORT_DT_XML`: Imports a DataTable format XML file (Schema + Data) into an SQLite table. Infers column types (INTEGER / TEXT) from the Schema. Returns `1` on success.
    - `SQL_EXPORT_MAP_XML`: Exports an SQLite table to a MAP format XML file. Returns `1` on success.
    - `SQL_EXPORT_DT_XML`: Exports an SQLite table to a DataTable format XML file (Schema + Data). Returns `1` on success.
    - `SQL_IMPORT_XML_CUSTOM`: Imports a custom format XML file into an SQLite table. Specifies the row node path via `rowXPath` and column mappings via `columnMappings` (format: `"ColName1=childNode,ColName2=@attr"`). All column types are TEXT. Returns `1` on success.

    !!! warning "Warning"

        - A connection must be established via [`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) or [`SQL_CONNECT`](./SQL_CONNECT.md) before executing.
        - `SQL_IMPORT_MAP_XML` and `SQL_IMPORT_DT_XML` use streaming parsing (XmlReader) and support large files.
        - The Schema file for `SQL_IMPORT_DT_XML` is used to infer column types; the Data file contains the actual data.
        - Export file paths are relative to the program directory.

!!! hint "Hint"

    Available as both command and function in expressions.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "mydb"

        ; Import from MAP XML
        SQL_IMPORT_MAP_XML "mydb", "config", "data/config_map.xml"

        ; Import from DT XML
        SQL_IMPORT_DT_XML "mydb", "items", "data/items_schema.xml", "data/items_data.xml"

        ; Export to MAP XML
        SQL_EXPORT_MAP_XML "mydb", "config", "output/config_export.xml"

        ; Export to DT XML
        SQL_EXPORT_DT_XML "mydb", "items", "output/items_schema.xml", "output/items_data.xml"

        SQL_DISCONNECT "mydb"
        WAIT
    ```
