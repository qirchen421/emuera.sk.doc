---
hide:
  - toc
---

# SQL 実行操作

| 関数名 | 引数 | 戻り値 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_NONQUERY`](./SQL_EXECUTE.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_READER`](./SQL_EXECUTE.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_LONG`](./SQL_EXECUTE.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_STRING`](./SQL_EXECUTE.md) | `string`, `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_EXECUTE_SCALAR_FLOAT`](./SQL_EXECUTE.md) | `string`, `string` | `float` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_EXECUTE_NONQUERY dbName, sql
    int SQL_EXECUTE_READER dbName, sql
    int SQL_EXECUTE_SCALAR_LONG dbName, sql
    str SQL_EXECUTE_SCALAR_STRING dbName, sql
    float SQL_EXECUTE_SCALAR_FLOAT dbName, sql
    ```

    SQLite データベースの SQL 文実行に関する関数です。

    - `SQL_EXECUTE_NONQUERY`：非クエリ SQL 文（INSERT / UPDATE / DELETE / CREATE TABLE 等）を実行し、影響を受けた行数を返します。
    - `SQL_EXECUTE_READER`：クエリ SQL 文（SELECT）を実行し、Reader ID を返します（後続の [`SQL_READER_READ`](./SQL_READER.md) 等の操作に使用）。
    - `SQL_EXECUTE_SCALAR_LONG`：スカラークエリを実行し、結果の最初の行の最初の列を整数値で返します。結果が NULL または無い場合は `0` を返します。
    - `SQL_EXECUTE_SCALAR_STRING`：スカラークエリを実行し、結果の最初の行の最初の列を文字列で返します。結果が NULL または無い場合は空文字列を返します。
    - `SQL_EXECUTE_SCALAR_FLOAT`：スカラークエリを実行し、結果の最初の行の最初の列を浮動小数点数で返します。結果が NULL または無い場合は `0.0` を返します。

    !!! warning "注意"

        - 実行前に [`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) または [`SQL_CONNECT`](./SQL_CONNECT.md) で接続を確立する必要があります。
        - パラメータ化クエリ（SQL インジェクション対策）が必要な場合は、[`SQL_P_EXECUTE_*`](./SQL_PARAM.md) 系関数を使用してください。
        - `SQL_EXECUTE_READER` が返す Reader ID は、使用後に必ず [`SQL_READER_CLOSE`](./SQL_READER.md) を呼んで閉じる必要があります。そうしないとリソースがリークします。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"

        ; テーブル作成
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS scores (name TEXT, score INTEGER)"

        ; データ挿入
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO scores VALUES ('Alice', 95)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO scores VALUES ('Bob', 82)"

        ; スカラークエリ
        PRINTFORML 最高得点：{SQL_EXECUTE_SCALAR_LONG("test", "SELECT MAX(score) FROM scores")}
        PRINTFORML 1位の名前：{SQL_EXECUTE_SCALAR_STRING("test", "SELECT name FROM scores ORDER BY score DESC LIMIT 1")}

        ; Reader クエリ
        LOCAL = SQL_EXECUTE_READER("test", "SELECT * FROM scores")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORML {SQL_READER_GET_STRING(LOCAL, 0)}: {SQL_READER_GET_LONG(LOCAL, 1)}点
        REND
        SQL_READER_CLOSE LOCAL

        SQL_DISCONNECT "test"
        WAIT
    ```
