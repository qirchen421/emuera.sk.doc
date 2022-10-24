---
hide:
  - toc
---

# DataTableセル管理系

| 関数名                                                            | 引数                                      | 戻り値   |
| :---------------------------------------------------------------- | :---------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.md)    | `string`, `int`, `string`(, `int`)        | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.md)   | `string`, `int`, `string`(, `int`)        | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.md) | `string`, `int`, `string`(, `int`)        | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.md)    | `string`, `int`, `string`(, `any`, `int`) | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    int DT_CELL_GET dataTableName, row, columnName(, asId)
    string DT_CELL_GETS dataTableName, row, columnName(, asId)
    int DT_CELL_ISNULL dataTableName, row, columnName(, asId)
    int DT_CELL_SET dataTableName, row, columnName(, value, asId)
    ```

    `DataTable`（データベース，[`DataTable`](https://learn.microsoft.com/ja-jp/dotnet/api/system.data.datatable?view=netframework-4.8)クラスを基づき）のセルを操作する関数です。

    - `DT_CELL_GET`：`dataTableName`に対応する`DataTable`に行`row`の列`columnName`の整数を返します。失敗した場合、`0`を返します。
        - `asId`が`1`の場合，列`id`の値が`row`の行にあたります。
        - `asId`がそれ以外場合，第`row`行（0行から始まる）にあたります。
    - `DT_CELL_GETS`：`dataTableName`に対応する`DataTable`に行`row`の列`columnName`の文字列を返します。失敗した場合、空文字列を返します。
    - `DT_CELL_ISNULL`：`dataTableName`に対応する`DataTable`に行`row`の列`columnName`の値が空き（整数でも文字列でもない）の場合`1`を返します。
        - 戻り値が`0`の場合，該当値が空きではありません。
        - 戻り値が`-1`の場合，`DataTable`自体が存在しません。
        - 戻り値が`-2`の場合，該当する行か列が存在しません。
    - `DT_CELL_SET`：`dataTableName`に対応する`DataTable`に行`row`の列`columnName`の値を`value`で代入します。`value`を省略した場合，空きで代入します。
        - 戻り値が`1`の場合，代入が成功しました。
        - 戻り値が`0`の場合，列`id`に値を代入しようとしました。
        - 戻り値が`-1`の場合，`DataTable`自体が存在しません。
        - 戻り値が`-2`の場合，`value`の型が該当するセルの型と違います。
        - 戻り値が`-3`の場合，該当する行か列が存在しません。

    !!! warning "注意"

        列`id`の値を編集することができません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM id

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        id = DT_ROW_ADD("db", "name", "Name1", "age", 11)
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        PRINTFORML 第1行の列heightの値は\@DT_CELL_ISNULL("db", id, "height", 1)==1?空き#空きではない\@

        DT_CELL_SET "db", 0, "height", 132

        PRINTFORM 第1行 - 名前：%DT_CELL_GETS("db", 0, "name")% 
        PRINTFORM 年齢：{DT_CELL_GET("db", 0, "age")} 
        PRINTFORML 身長：{DT_CELL_GET("db", 0, "height")}

        ONEINPUT
    ``` 
    ``` title="結果"
    第1行の列heightの値は空き
    第1行 - 名前：Name1 年齢：11 身長：132
    ```
