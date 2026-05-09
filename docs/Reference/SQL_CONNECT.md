---
hide:
  - toc
---

# SQL 接続管理

| 関数名 | 引数 | 戻り値 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_CONNECTION_OPEN`](./SQL_CONNECT.md) | `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_CONNECT`](./SQL_CONNECT.md) | `string`(, `string`) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_DISCONNECT`](./SQL_CONNECT.md) | `string` | `int` |

!!! info "API"

    ```  { #language-erbapi }
    int SQL_CONNECTION_OPEN name
    int SQL_CONNECT dbName(, connectionString)
    int SQL_DISCONNECT dbName
    ```

    SQLite データベースの接続・切断に関する関数です。

    - `SQL_CONNECTION_OPEN`：`name` を名前として、`sav/sql/` ディレクトリに SQLite データベースファイル（`name.db`）を自動作成または開きます。同名の接続が既に存在する場合は先に閉じてから再接続します。成功時 `1` を返します。
        - DotNet 上流の動作：パフォーマンス追求のため `PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;` を自動設定しますが、クラッシュ時にデータベースが破損するリスクがあります。また、`name` パラメータにパス検証がないため、悪意のあるまたは誤った ERB スクリプトが `../../` などで `sav/sql/` ディレクトリを突破し、システムの任意の場所に `.db` ファイルを作成または上書きできるパストラバーサル脆弱性があります。
        - **Skia 変体の変更**：`PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;` に変更。書き込み性能は OFF モードに近く、クラッシュ時もデータベースは破損しません。また、`name` パラメータにセキュリティチェックを追加し、有効なファイル名のみ許可、パス区切り文字や `..` を禁止（パストラバーサル防止）。
    - `SQL_CONNECT`：`dbName` を識別名として、`connectionString` で SQLite データベースに接続します。`connectionString` を省略した場合、メモリデータベース（`Data Source=:memory:`）が使用されます。同名の接続が既に存在する場合は `1` を返します。成功時 `1`、失敗時エラーを投げます。
    - `SQL_DISCONNECT`：`dbName` という名前のデータベース接続を切断し、リソースを解放します。`1` を返します。

    !!! warning "注意"

        - `SQL_CONNECTION_OPEN` は DotNet 版で追加された便利関数で、パスのマッピングを自動処理します。ほとんどのケースに適しています。
        - `SQL_CONNECT` は Skia 版の低レベル接続関数で、より柔軟な永続化インタラクションを提供します：
            - 任意のパスのデータベースファイルを指定可能（例：`Data Source=plugins/my_data.db`）、`sav/sql/` ディレクトリに限定されない
            - メモリデータベース（`Data Source=:memory:`）を使用した一時データ処理が可能
            - 接続文字列で SQLite の動作をカスタマイズ可能（WAL モード、キャッシュサイズ、読み取り専用モードなど）
            - PRAGMA を自動設定しないため、`journal_mode`、`synchronous` などのパラメータを自由に制御可能
        - 両者は同じ接続プールを共有するため、同じ `name`/`dbName` に対して両方の方式で同時接続することはできません。
        - 「タイトル画面へ戻る」または `RESETDATA` 時にすべての接続が自動的に閉じられます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; SQL_CONNECTION_OPEN で簡単接続（DBファイルは sav/sql/mydb.db に配置）
        SQL_CONNECTION_OPEN "mydb"
        PRINTFORML 接続成功：{RESULT}

        ; テーブル作成
        SQL_EXECUTE_NONQUERY "mydb", "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)"

        ; SQL_CONNECT でメモリデータベースに接続（一時データ処理用）
        SQL_CONNECT "memdb"
        PRINTFORML メモリDB接続成功：{RESULT}

        ; SQL_CONNECT でカスタムパスのデータベースに接続（プラグインデータディレクトリなど）
        SQL_CONNECT "QOL_DATA", "Data Source=plugins/qol_data.db"
        PRINTFORML プラグインDB接続成功：{RESULT}

        ; 接続切断
        SQL_DISCONNECT "mydb"
        SQL_DISCONNECT "memdb"
        SQL_DISCONNECT "QOL_DATA"

        WAIT
    ```
