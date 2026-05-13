---
hide:
  - toc
---

# EVAL / EVALS

| 関数名                                                        | 引数                                | 戻り値 |
| :------------------------------------------------------------ | :---------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`EVAL`](./EVAL.md)     | `string`(, `int`)                   | `int`  |
| ![](../assets/images/IconSK.webp)[`EVALS`](./EVAL.md)    | `string`(, `string`)                | `string` |

!!! info "API"

    ``` { #language-erbapi }
    int EVAL expressionString{, defaultValue}
    string EVALS expressionString{, defaultValue}
    ```

    渡された文字列`expression`をERB式として実行時に動的に解析・評価します。
    - `EVAL`は**整数**結果を計算して返します。
    - `EVALS`は**文字列**結果を計算して返します。

    **セーフフェイル機構（Fallback）**：
    渡された式が空、構文エラー、参照変数が存在しない、または計算結果の型が関数の要求する型と一致しない場合（例：`EVAL`で文字列を計算した場合）、エンジンは**赤字エラーを投げず**、エラーを静的にインターセプトして`defaultValue`を返します。
    - `defaultValue`を省略した場合、`EVAL`は`0`、`EVALS`は空文字列`""`を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

    命令構文：
    ```
    EVAL "LOCAL + 10"
    EVALS "\"文字列結果\""
    ```

    式中関数構文：
    ```
    LOCAL = EVAL("LOCAL + 10")
    RESULTS:0 '= EVALS("\"文字列結果\"")
    ```

    式内の変数は**現在この関数を実行しているコンテキスト**にバインドされます。
    `DataTable`や`XML`システムと組み合わせることで、計算式をデータとして外部に保存し、高度なデータ駆動アーキテクチャを実現できます。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        LOCAL:0 = 10
        LOCAL:1 = 20

        ; 1. 通常の数学演算
        PRINTFORML EVAL("LOCAL:0 + LOCAL:1 * 2") = {EVAL("LOCAL:0 + LOCAL:1 * 2")}

        ; 2. 三項演算子を含む複雑なロジック
        PRINTFORML EVAL("LOCAL:0 > 5 ? 100 # 50") = {EVAL("LOCAL:0 > 5 ? 100 # 50")}

        ; 3. セーフフェイル機構（スペルミスの変数名、デフォルト値 -1 を返す）
        PRINTFORML EVAL("LOOOOCAL:0 + 1", -1) = {EVAL("LOOOOCAL:0 + 1", -1)}

        ; 4. 文字列の動的評価
        LOCALS:0 = 剣士
        PRINTFORML EVALS("\"職業は: \" + LOCALS:0") = %EVALS("\"職業は: \" + LOCALS:0", "不明")%

        ONEINPUT
    ```
    ``` title="結果"
    EVAL("LOCAL:0 + LOCAL:1 * 2") = 50
    EVAL("LOCAL:0 > 5 ? 100 # 50") = 100
    EVAL("LOOOOCAL:0 + 1", -1) = -1
    EVALS("\"職業は: \" + LOCALS:0") = 職業は: 剣士
    ```

### 関連項目
- [CALLSTR系](CALLSTR.md)
