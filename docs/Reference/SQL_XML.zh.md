---
hide:
  - toc
---

# SQL XML 导入导出

| 函数名 | 参数 | 返回值 |
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

    SQLite 数据库与 XML 文件之间的导入导出相关函数。支持 MAP 格式、DataTable 格式和自定义格式的 XML 互操作。

    - `SQL_IMPORT_MAP_XML`：将 MAP 格式的 XML 文件（`<map><p><k>key</k><v>value</v></p></map>`）导入到 SQLite 表。自动创建表（`k TEXT PRIMARY KEY, v TEXT`）并使用 `INSERT OR REPLACE`。成功返回 `1`。
    - `SQL_IMPORT_DT_XML`：将 DataTable 格式的 XML 文件（Schema + Data）导入到 SQLite 表。根据 Schema 自动推断列类型（INTEGER / TEXT）。成功返回 `1`。
    - `SQL_EXPORT_MAP_XML`：将 SQLite 表导出为 MAP 格式的 XML 文件。成功返回 `1`。
    - `SQL_EXPORT_DT_XML`：将 SQLite 表导出为 DataTable 格式的 XML 文件（Schema + Data）。成功返回 `1`。
    - `SQL_IMPORT_XML_CUSTOM`：将自定义格式的 XML 文件导入到 SQLite 表。通过 `rowXPath` 指定行节点路径，通过 `columnMappings` 指定列映射（格式：`"ColName1=childNode,ColName2=@attr"`）。所有列类型为 TEXT。成功返回 `1`。

    !!! warning "注意"

        - 执行前必须先通过 [`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) 或 [`SQL_CONNECT`](./SQL_CONNECT.md) 建立连接。
        - `SQL_IMPORT_MAP_XML` 和 `SQL_IMPORT_DT_XML` 使用流式解析（XmlReader），支持大文件。
        - `SQL_IMPORT_DT_XML` 的 Schema 文件用于推断列类型，Data 文件包含实际数据。
        - 导出文件路径相对于程序目录。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "mydb"

        ; 从 MAP XML 导入
        SQL_IMPORT_MAP_XML "mydb", "config", "data/config_map.xml"

        ; 从 DT XML 导入
        SQL_IMPORT_DT_XML "mydb", "items", "data/items_schema.xml", "data/items_data.xml"

        ; 导出为 MAP XML
        SQL_EXPORT_MAP_XML "mydb", "config", "output/config_export.xml"

        ; 导出为 DT XML
        SQL_EXPORT_DT_XML "mydb", "items", "output/items_schema.xml", "output/items_data.xml"

        SQL_DISCONNECT "mydb"
        WAIT
    ```
