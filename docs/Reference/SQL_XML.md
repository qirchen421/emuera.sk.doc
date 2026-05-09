---
hide:
  - toc
---

# SQL XML インポート・エクスポート

| 関数名 | 引数 | 戻り値 |
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

    SQLite データベースと XML ファイル間のインポート・エクスポートに関する関数です。MAP 形式、DataTable 形式、カスタム形式の XML 相互運用をサポートします。

    - `SQL_IMPORT_MAP_XML`：MAP 形式の XML ファイル（`<map><p><k>key</k><v>value</v></p></map>`）を SQLite テーブルにインポートします。テーブルを自動作成し（`k TEXT PRIMARY KEY, v TEXT`）、`INSERT OR REPLACE` を使用します。成功時 `1` を返します。
    - `SQL_IMPORT_DT_XML`：DataTable 形式の XML ファイル（Schema + Data）を SQLite テーブルにインポートします。Schema から列型（INTEGER / TEXT）を自動推論します。成功時 `1` を返します。
    - `SQL_EXPORT_MAP_XML`：SQLite テーブルを MAP 形式の XML ファイルにエクスポートします。成功時 `1` を返します。
    - `SQL_EXPORT_DT_XML`：SQLite テーブルを DataTable 形式の XML ファイル（Schema + Data）にエクスポートします。成功時 `1` を返します。
    - `SQL_IMPORT_XML_CUSTOM`：カスタム形式の XML ファイルを SQLite テーブルにインポートします。`rowXPath` で行ノードのパスを、`columnMappings` で列マッピング（形式：`"ColName1=childNode,ColName2=@attr"`）を指定します。すべての列型は TEXT です。成功時 `1` を返します。

    !!! warning "注意"

        - 実行前に [`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) または [`SQL_CONNECT`](./SQL_CONNECT.md) で接続を確立する必要があります。
        - `SQL_IMPORT_MAP_XML` と `SQL_IMPORT_DT_XML` はストリーミング解析（XmlReader）を使用し、大きなファイルに対応します。
        - `SQL_IMPORT_DT_XML` の Schema ファイルは列型の推論に使用され、Data ファイルに実際のデータが含まれます。
        - エクスポート先のパスはプログラムディレクトリからの相対パスです。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "mydb"

        ; MAP XML からインポート
        SQL_IMPORT_MAP_XML "mydb", "config", "data/config_map.xml"

        ; DT XML からインポート
        SQL_IMPORT_DT_XML "mydb", "items", "data/items_schema.xml", "data/items_data.xml"

        ; MAP XML へエクスポート
        SQL_EXPORT_MAP_XML "mydb", "config", "output/config_export.xml"

        ; DT XML へエクスポート
        SQL_EXPORT_DT_XML "mydb", "items", "output/items_schema.xml", "output/items_data.xml"

        SQL_DISCONNECT "mydb"
        WAIT
    ```
