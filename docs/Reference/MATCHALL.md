---
hide:
  - toc
---

# MATCHALL / MATCHALLEX

| 関数名                                                                              | 引数                                      | 戻り値 |
| :---------------------------------------------------------------------------------- | :---------------------------------------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALL`](./MATCHALL.md)     | `variable`, `any`(, `int`, `int`, `variable`) | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALLEX`](./MATCHALL.md)   | `string`, `any`(, `int`, `int`, `variable`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    MATCHALL var, value[, beg, end[, outArr]]
    MATCHALLEX "varName", value[, beg, end[, outArr]]
    ```
    配列内で値に一致するすべての要素のインデックスを検索し、一致数を返します。

    - 第一引数：`MATCHALL` は変数参照、`MATCHALLEX` は文字列変数名
    - 第二引数：検索値（配列要素と同じ型である必要があります）
    - 第三引数（省略可）：検索開始インデックス（デフォルト 0）
    - 第四引数（省略可）：検索終了インデックス（デフォルト配列長）
    - 第五引数（省略可）：出力先配列変数参照。一致したインデックスがこの配列に書き込まれます（0から順に）

    戻り値：一致した要素数。見つからない場合は 0 を返します。

!!! hint "ヒント"

    命令構文（`MATCHALL ARR, 2`）と式構文（`LOCAL = MATCHALL(ARR, 2)`）の両方に対応しています。命令として呼び出した場合、結果は `RESULT` に格納されます。[MATCH](MATCH.md) とは異なり、MATCHALL はすべての一致位置を返します。

    `MATCHALL` と `MATCHALLEX` の違いは `GETNUM` と `GETNUMB` の関係に似ています：
    - `MATCHALL` は第一引数が変数参照（コンパイル時解決）で、パフォーマンスが良い
    - `MATCHALLEX` は第一引数が文字列変数名（実行時解決）で、柔軟性が高い

    第五引数の配列長が不足する場合、超過分のインデックスは静かに破棄されますが、戻り値は実際の一致数を返します。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM ARR, 10 = 1, 2, 3, 2, 5, 2, 7, 8, 2, 10
        #DIM IDX, 10

        ; カウントのみ
        LOCAL = MATCHALL(ARR, 2)
        PRINTFORML {LOCAL} 個の 2 が見つかりました

        ; インデックスを IDX に出力
        LOCAL = MATCHALL(ARR, 2, 0, 10, IDX)
        FOR I, 0, LOCAL
            PRINTFORML IDX:{I} = {IDX:I}
        NEXT
    ```
    ``` title="結果"
    4 個の 2 が見つかりました
    IDX:0 = 1
    IDX:1 = 3
    IDX:2 = 5
    IDX:3 = 8
    ```

### 関連項目
- [MATCH](MATCH.md) — 最初の一致のみカウント
- [FINDELEMENT](FINDELEMENT.md) — 単一要素の位置を検索
