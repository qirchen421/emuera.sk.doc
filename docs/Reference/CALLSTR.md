---
hide:
  - toc
---

# CALLSTR系

| 関数名                                                                   | 引数             | 戻り値 |
| :----------------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconSK.webp)[`CALLSTR`](./CALLSTR.md)           | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`JUMPSTR`](./CALLSTR.md)           | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCALLSTR`](./CALLSTR.md)        | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYJUMPSTR`](./CALLSTR.md)        | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCCALLSTR`](./CALLSTR.md)       | `stringVariable` | `void` |
| ![](../assets/images/IconSK.webp)[`TRYCJUMPSTR`](./CALLSTR.md)       | `stringVariable` | `void` |

!!! info "API"

    ``` { #language-erbapi }
    CALLSTR stringVariable
    JUMPSTR stringVariable
    TRYCALLSTR stringVariable
    TRYJUMPSTR stringVariable
    TRYCCALLSTR stringVariable
    TRYCJUMPSTR stringVariable
    ```

    `CALL`、`JUMP`およびその`TRY`系と同様ですが、**文字列式**で**関数呼び出し行全体**（関数名と引数を含む）を指定できます。

    呼び出した関数で[`RETURN`](./RETURN.md)が実行された場合は`RESULT`にその引数が、関数の終端に達した場合は`RESULT`に`0`が入る点は[`CALL`](./CALL.md)と同じです。

    `CALLFORM`との違い：`CALLFORM`はコンパイル時に引数構造が固定されるのに対し、CALLSTR系は実行時に文字列全体を解析します。これにより、関数に渡す引数の数や型を実行時に動的に変更できます。

    - **CALLSTR / JUMPSTR**：指定した文字列を関数呼び出しとして実行します。
    - **TRYCALLSTR / TRYJUMPSTR**：指定した関数名が存在しない場合、エラーにならずに実行をスキップします。
    - **TRYCCALLSTR / TRYCJUMPSTR**：`TRYC`系に属します。指定した関数が存在すれば実行し、存在しない場合は後続の`CATCH`句を実行します。

    !!! warning "注意"
        - 命令構文のみ対応。式中関数としては呼び出せません。
        - 文字列の解析形式は以下の2種類をサポート：
          1. **関数式記法**：`"FUNC_NAME(ARG1, ARG2)"`
          2. **カンマ区切り記法**：`"FUNC_NAME, ARG1, ARG2"`
        - 文字列内の引数は現在の実行コンテキストで解析されます。例：`"MY_FUNC(LOCAL)"`は現在の関数内の`LOCAL`変数の値を読み取ります。
        - 実行時の字句解析・構文解析が伴うため、静的な`CALL`や`CALLFORM`より実行効率はわずかに低下します。超大型ループでの使用には注意してください。
        - 文字列内の構文エラー（括弧の不一致など）は実行時に`CodeEE`エラーを発生させます。
        - INPUTS系命令のRESULTSを引数に渡す場合、コンソール入力の一部文字は`\\`でエスケープする必要があります（小括号を含む）。

!!! hint "ヒント"

    命令構文のみ対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS DYNAMIC COMMAND
        ; 動的に呼び出し文字列を構築
        COMMAND '= "TEST_FUNC" + "(100, 200)"
        CALLSTR COMMAND

        ; 引数を含む文字列を直接渡す
        LOCALS = SHOW_STATUS, 1, "READY"
        TRYCALLSTR LOCALS

    @TEST_FUNC(ARG:0, ARG:1)
        PRINTFORML 受信した引数: {ARG:0} と {ARG:1}

    @SHOW_STATUS(ARG, ARGS)
        PRINTFORML ID:{ARG} モード:%ARGS%
    ```
    ``` title="結果"
    受信した引数: 100 と 200
    ID:1 モード:READY
    ```

### 関連項目
- [CALL](CALL.md)
- [CALLFORM](FORM.md)
- [TRYCALL](TRY.md)
- [TRYC系](TRYC.md)

### ![](../assets/images/IconSK.webp)CALLFORMとの設計比較

!!! info "実行時パラメータ反射の意義"

    `CALLFORM`は関数名のみを実行時構築でき、引数はコンパイル時に固定されます。これは「関数名は動的だが引数は静的」という非対称な設計であり、真の意味での動的呼び出しとは言えません。

    `CALLSTR`系は関数名と引数の両方を実行時文字列で指定できるため、完全な実行時関数反射を実現します。この設計に合わせて、Skia版では`ConvertArg`の多余パラメータ静默破棄とTRY系の安全網も追加されています。
