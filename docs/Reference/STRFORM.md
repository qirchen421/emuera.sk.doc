---
hide:
  - toc
---

# STRFORM

| 関数名                                                         | 引数     | 戻り値   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string STRFORM formedString
    ```
    与えられた文字列をPRINTFORMなどと同様の書式付文字列とみなし、展開後の文字列を返します。  


!!! hint "ヒント"

    命令、式中関数両方対応しています。

---

# STRFORMCHECK ![](../assets/images/IconSK.webp)

| 関数名 | 引数 | 戻り値 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`STRFORMCHECK`](./STRFORM.md#strformcheck) | `string` | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int STRFORMCHECK formedString
    ```
    与えられた文字列をSTRFORMと同様の書式付文字列とみなし、展開可能かどうかを判定します。展開可能な場合は `1`、不可能な場合は `0` を返します。

    - 構文エラー（閉じ括弧の欠落など）→ `0`
    - 実行時評価エラー（存在しない変数など）→ `0`
    - STRFORMと同じパーサーを使用するため、セマンティクスの整合性が保証されます

!!! warning "注意"

    `CanRestructure = false` のため、定数畳み込みの対象になりません。

### 関連項目
- [GETVAR,GETVARS](GETSETVAR.md)
- [GETMETH,GETMETHS](GETMETH.md)
