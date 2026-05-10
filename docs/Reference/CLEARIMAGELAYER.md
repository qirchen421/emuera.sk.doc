---
hide:
  - toc
---

# CLEARIMAGELAYER / CLEARIMAGELAYER_ALL

| 関数名                                                                               | 引数    | 戻り値 |
| :----------------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER`](./CLEARIMAGELAYER.md)         | `int`   | なし   |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.md)     | なし    | なし   |

!!! info "API"

    ``` { #language-erbapi }
    CLEARIMAGELAYER depth
    CLEARIMAGELAYER_ALL
    ```

    - **CLEARIMAGELAYER**：指定した`depth`の[`SETIMAGELAYER`](./SETIMAGELAYER.md)レイヤーをクリアします。
    - **CLEARIMAGELAYER_ALL**：すべての`SETIMAGELAYER`レイヤーをクリアします。

    | パラメータ | 型 | 説明 |
    | :--- | :--- | :--- |
    | `depth` | int | クリアするレイヤーの深度値 |

    !!! warning "注意"
        - 命令構文のみ対応。式中関数としては呼び出せません。
        - `CLEARIMAGELAYER`でクリアしたレイヤーは、再度[`SETIMAGELAYER`](./SETIMAGELAYER.md)を呼び出すことで再作成できます。
        - これらのコマンドは`SETIMAGELAYER`で作成されたレイヤーにのみ影響し、[`CBGSETSPRITE`](./CBGSETSPRITE.md)や[`SETBGIMAGE`](./BACKGROUND.md)で設定された背景には影響しません。

!!! hint "ヒント"

    命令構文のみ対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SETIMAGELAYER "pet_1", 1
        SETIMAGELAYER "pet_2", 2

        ; 指定レイヤーをクリア
        CLEARIMAGELAYER 1

        ; クリアされたか確認
        PRINTVL EXISTSIMAGELAYER(1)
        PRINTVL EXISTSIMAGELAYER(2)

        ; 全レイヤーをクリア
        CLEARIMAGELAYER_ALL
    ```
    ``` title="結果"
    0
    1
    ```

### 関連項目
- [SETIMAGELAYER](SETIMAGELAYER.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.md)
