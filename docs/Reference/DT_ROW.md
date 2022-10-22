# DataTable行管理系

| 関数名                                                          | 引数                                                      | 戻り値 |
| :-------------------------------------------------------------- | :-------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.md)    | `string`([, `string`, `any`] ...)                         | `int`  |
|                                                                 | `string`, `ref` `string[]`, `ref` `any[]`, `int`          | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.md)    | `string`, `int`, `string`, `any`([, `string`, `any`] ...) | `int`  |
|                                                                 | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`   | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.md) | `string`, `int`                                           | `int`  |
|                                                                 | `string`, `ref` `int[]`, `int`                            | `int`  |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.md) | `string`                                                  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int DT_ROW_ADD dataTableName, ([, columnName, columnValue] ...)
    2. int DT_ROW_ADD dataTableName, columnNames, columnValues, count

    1. int DT_ROW_SET dataTableName, idValue, ([, columnName, columnValue] ...)
    2. int DT_ROW_ADD dataTableName, idValue, columnNames, columnValues, count

    1. int DT_ROW_REMOVE dataTableName, idValue
    2. int DT_ROW_REMOVE dataTableName, idValues, count

    int DT_ROW_LENGTH dataTableName
    ```

    `DataTable`（データベース，[`DataTable`](https://learn.microsoft.com/ja-jp/dotnet/api/system.data.datatable?view=netframework-4.8)クラスを基づき）の行を操作する関数です。

    - `DT_ROW_ADD`：`dataTableName`に対応する`DataTable`に行を追加します。`DataTable`自体が存在しない場合、`-1`を返します。
        1. 行を追加し、その行の列`columnName`の値を`columnValue`で代入し、行の列`id`の値を返します。複数の`columnName`・`columnValue`組を渡せます。
        2. 行を追加し、順番に`columnNames`から行名、`columnValues`から値を取出し、その行の該当列に値で代入し、最大`count`回繰り返します。行の列`id`の値を返します。
    - `DT_ROW_SET`：`dataTableName`と同名の`DataTable`の列`id`が`idValue`の行の値を編集します。`DataTable`自体が存在しない場合、`-1`を返します。
        1. その行の列`columnName`の値を`columnValue`で代入し、編集した値の数を返します。複数の`columnName`・`columnValue`組を渡せます。
        2. 順番に`columnNames`から行名、`columnValues`から値を取出し、その行の該当列に値で代入し、最大`count`回繰り返します。編集した値の数を返します。
    - `DT_ROW_REMOVE`：`dataTableName`と同名の`DataTable`の行を削除します。`DataTable`自体が存在しない場合、`-1`を返します。
        1. 列`id`が`idValue`の行を削除します。成功した場合、`1`を返します。
        2. 順番に列`id`が`idValues`の要素値に該当列する行を削除し、最大`count`回繰り返します。成功した場合、削除した行の数を返します。
    - `DT_ROW_LENGTH`：`dataTableName`に対応する`DataTable`の行の数を返します。`DataTable`自体が存在しない場合、`-1`を返します。

    !!! warning "注意"

        列`id`の値を編集することができません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM id
        #DIMS columnNames = "age", "height"
        #DIM columnValues = 11, 132

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        id = DT_ROW_ADD("db", "name", "Name1")
        DT_ROW_SET "db", id, columnNames, columnValues, 2
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML 行数：{DT_ROW_LENGTH("db")}

        CALL PRINTL_ROW(0)
        DT_ROW_SET "db", id, "age", 0, "height", 50
        CALL PRINTL_ROW(0)

        ONEINPUT

    @PRINTL_ROW(index)
        #DIM index
        PRINTFORM 第{index+1}行 - 名前：%DT_CELL_GETS("db", index, "name")% 
        PRINTFORM 年齢：{DT_CELL_GET("db", index, "age")} 
        PRINTFORML 身長：{DT_CELL_GET("db", index, "height")}
    ``` 
    ``` title="結果"
    行数：5
    第1行 - 名前：Name1 年齢：11 身長：132
    第1行 - 名前：Name1 年齢：0 身長：50
    ```
