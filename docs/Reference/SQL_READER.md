---
hide:
  - toc
---

# SQL Reader 操作

| 関数名 | 引数 | 戻り値 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_READ`](./SQL_READER.md) | `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_LONG`](./SQL_READER.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_STRING`](./SQL_READER.md) | `int`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_READER_GET_FLOAT`](./SQL_READER.md) | `int`, `int` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_ISNULL`](./SQL_READER.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_CLOSE`](./SQL_READER.md) | `int` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_READER_READ readerId
    int SQL_READER_GET_LONG readerId, columnIndex
    str SQL_READER_GET_STRING readerId, columnIndex
    float SQL_READER_GET_FLOAT readerId, columnIndex
    int SQL_READER_ISNULL readerId, columnIndex
    int SQL_READER_CLOSE readerId
    ```

    SQLite クエリ結果（Reader）の読み取り・操作に関する関数です。

    - `SQL_READER_READ`：Reader を次の行に進めます。データがある場合 `1`、これ以上行がない場合 `0` を返します。
    - `SQL_READER_GET_LONG`：現在の行の指定列（0始まり）の整数値を取得します。
    - `SQL_READER_GET_STRING`：現在の行の指定列の文字列値を取得します。
    - `SQL_READER_GET_FLOAT`：現在の行の指定列の浮動小数点数値を取得します。
    - `SQL_READER_ISNULL`：現在の行の指定列が NULL かどうかを判定します。NULL の場合 `1`、そうでない場合 `0` を返します。
    - `SQL_READER_CLOSE`：Reader を閉じ、リソースを解放します。`1` を返します。

    !!! warning "注意"

        - `readerId` は [`SQL_EXECUTE_READER`](./SQL_EXECUTE.md) が返す値です。
        - 列値の読み取り前に、`SQL_READER_READ` を少なくとも1回呼び出す必要があります。
        - 使用後は**必ず** `SQL_READER_CLOSE` を呼んで閉じる必要があります。そうしないとリソースがリークします。
        - `columnIndex` は 0 から始まります。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SQL_CONNECTION_OPEN "test"
        SQL_EXECUTE_NONQUERY "test", "CREATE TABLE IF NOT EXISTS data (k TEXT, v INTEGER, f REAL)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO data VALUES ('a', 10, 3.14)"
        SQL_EXECUTE_NONQUERY "test", "INSERT INTO data VALUES ('b', NULL, NULL)"

        LOCAL = SQL_EXECUTE_READER("test", "SELECT * FROM data")
        REPEAT 100
            SIF !SQL_READER_READ(LOCAL)
                BREAK
            PRINTFORM {SQL_READER_GET_STRING(LOCAL, 0)}: 
            SIF SQL_READER_ISNULL(LOCAL, 1)
                PRINT NULL
            SIF !SQL_READER_ISNULL(LOCAL, 1)
                PRINTFORM {SQL_READER_GET_LONG(LOCAL, 1)}
            PRINTFORM  / 
            SIF SQL_READER_ISNULL(LOCAL, 2)
                PRINT NULL
            SIF !SQL_READER_ISNULL(LOCAL, 2)
                PRINTFORM {SQL_READER_GET_FLOAT(LOCAL, 2)}
            PRINTL
        REND
        SQL_READER_CLOSE LOCAL

        SQL_DISCONNECT "test"
        WAIT
    ```
