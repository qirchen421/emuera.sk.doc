---
hide:
  - toc
---

# MAP拡張操作系

| 関数名                                                                        | 引数                              | 戻り値   |
| :---------------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconSK.webp)[`MAP_MERGE`](./MAP_ENHANCED.md)             | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_REMOVEIF`](./MAP_ENHANCED.md)          | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_FINDKEY`](./MAP_ENHANCED.md)           | `string`, `string`, `string`      | `string` |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_MERGE destMapName, srcMapName
    int MAP_REMOVEIF mapName, matchValue, mode
    string MAP_FINDKEY mapName, matchValue, mode
    ```

    Skia（SkiaSharp版）で追加された`MAP`拡張操作関数です。バッチマージ，条件削除，条件検索を提供します。

    - `MAP_MERGE`：`srcMapName`のすべてのキー・値ペアを`destMapName`にマージします。同名キーは`srcMapName`の値で上書きされます。成功時`1`，いずれかのMAPが存在しない場合`0`を返します。
    - `MAP_REMOVEIF`：`mode`に基づいて条件に一致するキー・値ペアをバッチ削除します。実際に削除された数を返し，無効なモードの場合`-1`を返します。
    - `MAP_FINDKEY`：`mode`に基づいて条件に一致するキーを検索し，カンマ区切りのキーリストを返します。`RESULT`にマッチ数が設定されます。

    **マッチモード**（`MAP_REMOVEIF`と`MAP_FINDKEY`共通）：

    | モード | 説明 |
    | :----- | :--- |
    | `"KEY_CONTAINS"` | キーに`matchValue`が含まれる |
    | `"KEY_PREFIX"` | キーが`matchValue`で始まる |
    | `"KEY_SUFFIX"` | キーが`matchValue`で終わる |
    | `"VAL_CONTAINS"` | 値に`matchValue`が含まれる |
    | `"VAL_EQ"` | 値が`matchValue`と等しい |

    `MAP_REMOVEIF`のみ追加モード：

    | モード | 説明 |
    | :----- | :--- |
    | `"VAL_NE"` | 値が`matchValue`と等しくない |

    !!! note "MAP_FINDKEYとMAP_REMOVEIFの違い"
        `MAP_FINDKEY`は`"VAL_NE"`モードをサポートしません（「等しくない」の検索は結果が多すぎる可能性があるため）。`MAP_FINDKEY`は検索のみ，`MAP_REMOVEIF`は検索して削除します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; === MAP_MERGE ===
        MAP_CREATE "baseDB"
        MAP_SET "baseDB", "name", "无名"
        MAP_SET "baseDB", "level", "1"

        MAP_CREATE "overrideDB"
        MAP_SET "overrideDB", "name", "勇者"
        MAP_SET "overrideDB", "class", "戦士"

        MAP_MERGE "baseDB", "overrideDB"
        PRINTFORML マージ後: %MAP_TOSTRING("baseDB")%

        ; === MAP_FINDKEY ===
        MAP_CREATE "itemDB"
        MAP_SET "itemDB", "sword", "鉄剣"
        MAP_SET "itemDB", "potion_hp", "薬水"
        MAP_SET "itemDB", "potion_mp", "薬水"
        MAP_SET "itemDB", "shield", "木盾"

        LOCALS = MAP_FINDKEY("itemDB", "potion_", "KEY_PREFIX")
        PRINTFORML potion_プレフィックスのキー: %LOCALS% (計{RESULT}個)

        LOCALS = MAP_FINDKEY("itemDB", "薬水", "VAL_CONTAINS")
        PRINTFORML 値に「薬水」を含むキー: %LOCALS% (計{RESULT}個)

        ; === MAP_REMOVEIF ===
        MAP_CREATE "tempDB"
        MAP_SET "tempDB", "a", "1"
        MAP_SET "tempDB", "b", "2"
        MAP_SET "tempDB", "c", "1"
        MAP_SET "tempDB", "d", "3"

        LOCAL = MAP_REMOVEIF("tempDB", "1", "VAL_EQ")
        PRINTFORML 値が1のエントリを{LOCAL}個削除
        PRINTFORML 残り: %MAP_TOSTRING("tempDB")%

        ; === クリーンアップ ===
        MAP_RELEASE "baseDB"
        MAP_RELEASE "overrideDB"
        MAP_RELEASE "itemDB"
        MAP_RELEASE "tempDB"

        ONEINPUT
    ```
    ``` title="結果"
    マージ後: name=勇者,level=1,class=戦士
    potion_プレフィックスのキー: potion_hp,potion_mp (計2個)
    値に「薬水」を含むキー: potion_hp,potion_mp (計2個)
    値が1のエントリを2個削除
    残り: b=2,d=3
    ```

### 関連項目
- [MAP管理](MAP_MANAGE.md)
- [MAP操作](MAP_OPERATION.md)
- [MAPキー・値取得](MAP_GETKEYS.md)
- [MAPシリアライズ](MAP_SERIALIZATION.md)
