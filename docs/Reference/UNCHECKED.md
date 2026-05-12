---
hide:
  - toc
---

# UNCHECKED系 — UNCHECKED計算

| 関数名                                                                   | 引数        | 戻り値 |
| :----------------------------------------------------------------------- | :---------- | :----- |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_ADD`](./UNCHECKED.md)       | `int`, `int` | `int`  |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_SUB`](./UNCHECKED.md)       | `int`, `int` | `int`  |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_MUL`](./UNCHECKED.md)       | `int`, `int` | `int`  |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_NEG`](./UNCHECKED.md)       | `int`        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int UNCHECKED_ADD a, b
    int UNCHECKED_SUB a, b
    int UNCHECKED_MUL a, b
    int UNCHECKED_NEG a
    ```

    Skia（SkiaSharp版）で追加。C#の`unchecked`コンテキストで演算を行い、オーバーフロー時に例外を投げずにラップアラウンド（折り返し）します。

    Skia版では通常の算術演算子（`+`, `-`, `*`, 単項`-`）がSafeArithmeticによりオーバーフロー保護されています。オーバーフローが発生すると警告を出力し、`Long.MaxValue`または`Long.MinValue`にクランプされます。

    しかし、ハッシュ計算や乱数生成など、**意図的にラップアラウンド動作が必要な場面**があります。このような後方互換性のためにUNCHECKED系関数を提供します。

    | 関数 | 対応演算 | 説明 |
    |:---|:---|:---|
    | `UNCHECKED_ADD(a, b)` | `a + b` | 加算のラップアラウンド |
    | `UNCHECKED_SUB(a, b)` | `a - b` | 減算のラップアラウンド |
    | `UNCHECKED_MUL(a, b)` | `a * b` | 乗算のラップアラウンド |
    | `UNCHECKED_NEG(a)` | `-a` | 符号反転のラップアラウンド |

!!! warning "注意"

    これらの関数はオーバーフロー時に**警告を出力しません**。意図しないオーバーフローのバグを混入しやすいため、ラップアラウンドが本当に必要な場面でのみ使用してください。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 通常の加算（SafeArithmetic）：オーバーフロー時はクランプ
        ; 9223372036854775807 + 1 → Long.MaxValue（クランプ、警告あり）

        ; UNCHECKED_ADD：オーバーフロー時はラップアラウンド
        ; 9223372036854775807 + 1 → -9223372036854775808（折り返し、警告なし）

        ; ハッシュ計算での使用例
        #DIM hash = 0
        hash = UNCHECKED_ADD(hash, UNCHECKED_MUL(31, someValue))
    ```
