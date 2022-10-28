---
hide:
  - toc
---

# DataTable 序列化相关函数

| 函数名                                                                 | 参数                         | 返回值   |
| :--------------------------------------------------------------------- | :--------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.md)   | `string`(, `ref` `string`)   | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.md) | `string`, `string`, `string` | `int`    |


!!! info "API"

    ```  { #language-erbapi }
    1. string DT_TOXML, dataTableName(, schemaOutput)
    2. int DT_FROMXML, dataTableName, schemaXml, dataXml
    ```

    `DataTable` （数据库，基于 [`DataTable`](https://learn.microsoft.com/zh-cn/dotnet/api/system.data.datatable?view=netframework-4.8) 类）与 `XML`互相转换的函数。

    - `DT_TOXML`：为名为 `dataTableName` 的 `DataTable` 转换为 `XML`，格式相关信息的 `XML` 保存至 `schemaOutput`（若省略则保存至`RESULTS:1`）。返回数据 `XML`。
    - `DT_FROMXML`：解析格式相关信息 `schemaXml` 与 数据 `dataXml`，覆盖名为 `dataTableName` 的 `DataTable`。若成功则返回 `1`，否则返回`0`。
    
!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码" 
    
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
        PRINTFORML %DT_CELL_GETS("db", 0, "name")%的年龄为{DT_CELL_GET("db", 0, "age")}

        ONEINPUT
    ``` 
    ``` title="输出结果"
    Name1的年龄为11
    ```
