---
hide:
  - toc
---

# DataTable管理系

| 関数名                                                          | 引数            | 戻り値 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.md)  | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.md) | `string`        | `1`    |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.md)   | `string`        | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.md)  | `string`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CREATE dataTableName
    int DT_EXIST dataTableName
    1 DT_RELEASE dataTableName
    int DT_CLEAR dataTableName
    int DT_NOCASE dataTableName, ignoreCase
    ```

    `DataTable`（データベース，[`DataTable`](https://learn.microsoft.com/ja-jp/dotnet/api/system.data.datatable?view=netframework-4.8)クラスを基づき）の作成、削除、存否確認、データ削除、大小文字無視設定に関する関数です。
    
    - `DT_CREATE`：`dataTableName`を名前として`DataTable`を作成します。`dataTableName`に対応する`DataTable`がすでに存在している場合，`0`を返す，成功した場合，`1`を返します。
    - `DT_EXIST`：`dataTableName`と同名の`DataTable`の存否を確認し、存在するなら`1`を返す。そうでない場合`0`を返します。
    - `DT_RELEASE`：`dataTableName`と同名の`DataTable`を削除します。
    - `DT_CLEAR`：`dataTableName`に対応する`DataTable`のすべての行を削除し（列の設定は変化しない）、`1`を返します。`DataTable`自体が存在しない場合、`-1`を返します。
    - `DT_NOCASE`：`dataTableName`に対応する`DataTable`が[`DT_SELECT`](./DT_SELECT.md)関数による文字列比較時、大小文字を無視するかを設定します。`1`を返します。`DataTable`自体が存在しない場合、`-1`を返します。
        - `ignoreCase`が`0`の場合（デファクト値）：大小文字を無視しない
        - `ignoreCase`が他の値の場合：大小文字を無視する

    !!! warning "注意"

        `DataTable`が作成あれた後、自動的に列`id`が追加されます。セーブファイルへ保存するには「[`XML`、`MAP`、`DataTable`セーブ機能](./README.md#xmlmapdatatable)」に参照してください。「タイトル画面へ戻る」か[`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA)をすると自動的に削除されます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML DataTable「db」の存否：{DT_EXIST("db")}
        DT_CREATE "db"
        PRINTSL RESULT ? "成功した" # "すでに存在している"
        DT_CREATE "db"
        PRINTSL RESULT ? "成功した" # "すでに存在している"

        CALL GEN_DB_DATA
        
        PRINTFORML DataTable「db」のデータ数：{DT_ROW_LENGTH("db")}行ｘ{DT_COLUMN_LENGTH("db")}列
        PRINTFORML 「name」の頭文字が「n」の列の数：{DT_SELECT("db", "name LIKE 'n%'")}
        DT_NOCASE "db", 1
        PRINTFORML 「name」の頭文字が「n」の列の数：{DT_SELECT("db", "name LIKE 'n%'")}
        DT_CLEAR "db"
        PRINTFORML DataTable「db」のデータ数：{DT_ROW_LENGTH("db")}行ｘ{DT_COLUMN_LENGTH("db")}列

        RESETDATA ; すべてのDataTableが自動的に削除される

        DT_CREATE "db"
        PRINTSL RESULT ? "成功した" # "すでに存在している"
        PRINTFORML DataTable「db」の存否：{DT_EXIST("db")}
        DT_RELEASE "db"
        PRINTFORML DataTable「db」の存否：{DT_EXIST("db")}

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
    ``` title="結果"
    DataTable「db」の存否：0
    成功した
    すでに存在している
    DataTable「db」のデータ数：5行ｘ4列
    「name」の頭文字が「n」の列の数：0
    「name」の頭文字が「n」の列の数：5
    DataTable「db」のデータ数：0行ｘ4列
    成功した
    DataTable「db」の存否：1
    DataTable「db」の存否：0
    ```
