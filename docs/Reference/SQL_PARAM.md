---
hide:
  - toc
---

# SQL パラメータ化クエリ

| 関数名 | 引数 | 戻り値 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SQL_ESCAPE`](./SQL_PARAM.md) | `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_NONQUERY`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_READER`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_LONG`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_STRING`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_FLOAT`](./SQL_PARAM.md) | `string`, `string`(, `string`...) | `float` |

!!! info "API"

    ```  { #language-erbapi }
    str SQL_ESCAPE str
    int SQL_P_EXECUTE_NONQUERY dbName, sql(, param0, param1, ...)
    int SQL_P_EXECUTE_READER dbName, sql(, param0, param1, ...)
    int SQL_P_EXECUTE_SCALAR_LONG dbName, sql(, param0, param1, ...)
    str SQL_P_EXECUTE_SCALAR_STRING dbName, sql(, param0, param1, ...)
    float SQL_P_EXECUTE_SCALAR_FLOAT dbName, sql(, param0, param1, ...)
    ```

    SQLite パラメータ化クエリに関する関数です。SQL インジェクション攻撃を防ぐために使用します。

    - `SQL_ESCAPE`：文字列を SQL エスケープします（シングルクォート `'` を `''` に変換）。手動で SQL を組み立てる場合に使用します。
    - `SQL_P_EXECUTE_NONQUERY`：パラメータ化非クエリ SQL を実行します。SQL 内で `@0`、`@1`、`@2`... をプレースホルダとして使用し、後続の引数が順番に置換されます。影響を受けた行数を返します。
    - `SQL_P_EXECUTE_READER`：パラメータ化クエリ SQL を実行します。Reader ID を返します。
    - `SQL_P_EXECUTE_SCALAR_LONG`：パラメータ化スカラークエリを実行し、整数値を返します。
    - `SQL_P_EXECUTE_SCALAR_STRING`：パラメータ化スカラークエリを実行し、文字列を返します。
    - `SQL_P_EXECUTE_SCALAR_FLOAT`：パラメータ化スカラークエリを実行し、浮動小数点数を返します。

    !!! warning "注意"

        - SQL インジェクション攻撃を防ぐため、手動での SQL 文字列結合ではなく**パラメータ化クエリの使用を推奨**します。
        - `SQL_ESCAPE` はパラメータ化クエリが使用できない場合のフォールバックとしてのみ使用してください。
        - パラメータプレースホルダは `@0`、`@1`、`@2`...（0始まり）であり、`?` や名前付きパラメータではありません。
        - すべてのパラメータ値は文字列として渡され、SQLite が列型に応じて自動変換します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)"

        ; パラメータ化挿入（安全）
        SQL_P_EXECUTE_NONQUERY "test", "INSERT INTO users VALUES (@0, @1)", "Alice", "25"
        SQL_P_EXECUTE_NONQUERY "test", "INSERT INTO users VALUES (@0, @1)", "Bob", "30"

        ; パラメータ化クエリ
        LOCAL = SQL_P_EXECUTE_READER("test", "SELECT * FROM users WHERE age > @0", "26")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORML {SQL_READER_GET_STRING(LOCAL, 0)}: {SQL_READER_GET_LONG(LOCAL, 1)}歳
        REND
        SQL_READER_CLOSE LOCAL

        ; パラメータ化スカラークエリ
        PRINTFORML 25歳以上の人数：{SQL_P_EXECUTE_SCALAR_LONG("test", "SELECT COUNT(*) FROM users WHERE age > @0", "25")}

        SQL_DISCONNECT "test"
        WAIT
    ```
