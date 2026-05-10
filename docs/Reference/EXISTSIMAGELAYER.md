---
hide:
  - toc
---

# EXISTSIMAGELAYER

| 関数名                                                                           | 引数    | 戻り値 |
| :------------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconSK.webp)[`EXISTSIMAGELAYER`](./EXISTSIMAGELAYER.md) | `int`   | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int EXISTSIMAGELAYER(depth)
    ```

    指定した`depth`の[`SETIMAGELAYER`](./SETIMAGELAYER.md)レイヤーが存在するかどうかを確認します。

    **パラメータ**：

    | パラメータ | 型 | 説明 |
    | :--- | :--- | :--- |
    | `depth` | int | レイヤーの深度値 |

    **戻り値**：存在する場合は1、存在しない場合は0を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SETIMAGELAYER "pet_1", 1

        IF EXISTSIMAGELAYER(1)
            PRINTL depth=1のレイヤーが存在します
        ELSE
            PRINTL depth=1のレイヤーは存在しません
        ENDIF

        ; 式中関数として使用
        #DIM L_COUNT
        FOR L_COUNT, 1, 5
            PRINTVL EXISTSIMAGELAYER(L_COUNT)
        NEXT
    ```
    ``` title="結果"
    depth=1のレイヤーが存在します
    1
    0
    0
    0
    ```

### 関連項目
- [SETIMAGELAYER](SETIMAGELAYER.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.md)
