---
hide:
  - toc
---

# DataTableシリアライズ系

| 関数名                                                                 | 引数                         | 戻り値   |
| :--------------------------------------------------------------------- | :--------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.md)   | `string`(, `ref` `string`)   | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.md) | `string`, `string`, `string` | `int`    |


!!! info "API"

    ```  { #language-erbapi }
    1. string DT_TOXML, dataTableName(, schemaOutput)
    2. int DT_FROMXML, dataTableName, schemaXml, dataXml
    ```

    `DataTable`（データベース，[`DataTable`](https://learn.microsoft.com/ja-jp/dotnet/api/system.data.datatable?view=netframework-4.8)クラスを基づき）と`XML`を互いに変換する関数です。

    - `DT_TOXML`：`dataTableName`に対応する`DataTable`を`XML`へ変換し、フォマット情報`XML`を`schemaOutput`(省略した場合`RESULTS:1`)に代入し、データ`XML`を返します。
    - `DT_FROMXML`：フォマット情報`schemaXml`とデータ`dataXml`を解析し、`dataTableName`に対応する`DataTable`を上書きします。成功した場合`1`を、そうでない場合`0`を返します。
    
!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例" 
    
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
        PRINTFORML %DT_CELL_GETS("db", 0, "name")%の年齢は{DT_CELL_GET("db", 0, "age")}

        ONEINPUT
    ``` 
    ``` title="結果"
    Name1の年齢は11
    ```
