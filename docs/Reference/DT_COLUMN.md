---
hide:
  - toc
---

# DataTable列管理系

| 関数名                                                                | 引数                               | 戻り値 |
| :-------------------------------------------------------------------- | :--------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.md)    | `string`, `string`(, `any`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.md)  | `string`, `string`                 | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.md) | `string`, `string`                 | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.md) | `string`                           | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int DT_COLUMN_ADD dataTableName, columnName(, type, nullable)
    int DT_COLUMN_EXIST dataTableName, columnName
    int DT_COLUMN_REMOVE dataTableName, columnName
    int DT_COLUMN_LENGTH dataTableName
    ```

    `DataTable`（データベース，[`DataTable`](https://learn.microsoft.com/ja-jp/dotnet/api/system.data.datatable?view=netframework-4.8)クラスを基づき）の列を操作する関数です。

    - `DT_COLUMN_ADD`：`dataTableName`に対応する`DataTable`に列`columnName`を追加します。`columnName`がすでに存在している場合，`0`を返す，成功した場合，`1`を返します。
        - `type`で列に格納される値の型を指定できます。
            - `1`(整数) / `int8`(文字列)：8ビットの符号付き整数
            - `2`(整数) / `int16`(文字列)：16ビットの符号付き整数
            - `3`(整数) / `int32`(文字列)：32ビットの符号付き整数
            - `4`(整数) / `int64`(文字列)：64ビットの符号付き整数
            - `5`(整数) / `string`(文字列)：文字列（デフォルト）
        - `nullable`が`0`以外（デフォルト）の場合、この列の値が空きになれるようにします
    - `DT_COLUMN_EXIST`：`dataTableName`と同名の`DataTable`の列`columnName`の存否を確認し、存在するなら型に当たる数値（`DT_COLUMN_ADD`の`type`に参照）を返す。そうでない場合`0`を返します。
    - `DT_COLUMN_REMOVE`：`dataTableName`と同名の`DataTable`の列`columnName`を削除します。成功した場合，`1`を返します。
    - `DT_COLUMN_LENGTH`：`dataTableName`に対応する`DataTable`の列の数を返します。`DataTable`自体が存在しない場合、`-1`を返します。

    !!! warning "注意"

        列`id`を削除することができません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML 列の数：{DT_COLUMN_LENGTH("db")}，列「age」の存否：{DT_COLUMN_EXIST("db", "age")}

        DT_COLUMN_REMOVE "db", "age"
        
        PRINTFORML 列の数：{DT_COLUMN_LENGTH("db")}，列「age」の存否：{DT_COLUMN_EXIST("db", "age")}

        ONEINPUT
    ``` 
    ``` title="結果"
    列の数：4，列「age」の存否：2
    列の数：3，列「age」の存否：0
    ```
