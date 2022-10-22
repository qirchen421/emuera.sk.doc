# DT_SELECT

| 関数名                                                         | 引数                                          | 戻り値 |
| :------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.md) | `string`(, `string`, `string`, `ref` `int[]`) | `int`  |


!!! info "API"

    ```  { #language-erbapi }
    int DT_SELECT dataTableName(, filterExpression, sortRule, output)
    ```

    `dataTableName`に対応する`DataTable`の中にある`filterExpression`に満足した行の列`id`の値を`sortRule`に従ってソートし、`output`に順次代入します。行の数返します。

    - `filterExpression`を省略した場合，すべての行にあたります。
    - `sortRule`を省略した場合，ソートしません。
    - `output`が指定されてない場合，列`id`の値を`RESULT`に（`RESULT:1`から）順次代入します。

    [`C#`の`DataTable.Select`](https://learn.microsoft.com/ja-jp/dotnet/api/system.data.datatable.select?view=netframework-4.8#system-data-datatable-select(system-string-system-string))に参照してください。

!!! warning "注意"

    戻り値が`output` / `RESULT`の要素数を超えた場合があります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        #DIM idx, 10
        #DIM count
        #DIM i

        DT_CREATE "db"
        DT_COLUMN_ADD "db", "name"
        DT_COLUMN_ADD "db", "height", "int16"
        DT_COLUMN_ADD "db", "age", "int16"

        DT_ROW_ADD "db", "name", "Name1", "age", 11, "height", 132
        DT_ROW_ADD "db", "name", "Name2", "age", 21, "height", 164
        DT_ROW_ADD "db", "name", "Name3", "age", 18, "height", 159
        DT_ROW_ADD "db", "name", "Name4", "age", 33, "height", 180
        DT_ROW_ADD "db", "name", "Name5", "age", 18, "height", 172

        count = DT_SELECT("db", "age >= 18", "age ASC, height DESC", idx)

        PRINTL 18以上の人：
        FOR i, 0, count
            CALL PRINTL_ROW(idx:i)
        NEXT

        ONEINPUT

    @PRINTL_ROW(id)
        #DIM id
        PRINTFORM 名前：%DT_CELL_GETS("db", id, "name", 1)% 
        PRINTFORM 年齢：{DT_CELL_GET("db", id, "age", 1)} 
        PRINTFORML 身長：{DT_CELL_GET("db", id, "height", 1)}
    ``` 
    ``` title="結果"
    18以上の人：
    名前：Name5 年齢：18 身長：172
    名前：Name3 年齢：18 身長：159
    名前：Name2 年齢：21 身長：164
    名前：Name4 年齢：33 身長：180
    ```
