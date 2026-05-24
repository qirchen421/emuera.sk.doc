---
hide:
  - toc
---

# GETCSVNOBY系

| 関数名                                                                              | 引数     | 戻り値 |
| :---------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNAME`](./GETCSVNOBY.md)       | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNICKNAME`](./GETCSVNOBY.md)   | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYCALLNAME`](./GETCSVNOBY.md)   | `string` | `int`  |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYMASTERNAME`](./GETCSVNOBY.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    GETCSVNOBYNAME name
    GETCSVNOBYNICKNAME nickname
    GETCSVNOBYCALLNAME callname
    GETCSVNOBYMASTERNAME mastername
    ```
    キャラクターの名前からキャラ番号 (NO) を逆引きします。[CSVNAME系](CSVNAME.md)の逆操作です：CSVNAME は番号から名前を取得し、GETCSVNOBY は名前から番号を取得します。

    - `GETCSVNOBYNAME`：`NAME`（キャラクター名）で逆引き
    - `GETCSVNOBYNICKNAME`：`NICKNAME`（ニックネーム）で逆引き
    - `GETCSVNOBYCALLNAME`：`CALLNAME`（呼び名）で逆引き
    - `GETCSVNOBYMASTERNAME`：`MASTERNAME`（主人名）で逆引き

    戻り値：見つかった場合はキャラ番号 (NO)（≥0）、見つからない場合は -1 を返します。

    同名のキャラクターが複数存在する場合、最後にロードされたキャラ番号を返します。

    !!! warning "FINDCHARA との違い"
        `GETCSVNOBY*` は CSV テンプレートデータを検索するため、`ADDCHARA` で追加されていないキャラクターでも検索可能です。
        [FINDCHARA](FINDCHARA.md) は実行時に追加済みのキャラクターを検索し、登録番号 (CharaID) を返します（キャラ番号ではありません）。

!!! hint "ヒント"

    命令構文（`GETCSVNOBYNAME "絵夢 江良"`）と式構文（`LOCAL = GETCSVNOBYNAME("絵夢 江良")`）の両方に対応しています。命令として呼び出した場合、結果は `RESULT` に格納されます。検索は O(1) の計算量です。

!!! example "例"
    ``` { title Chara0.csv }
    番号,0
    名前,絵夢 江良
    呼び名,江良
    ```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        LOCAL = GETCSVNOBYNAME("絵夢 江良")
        PRINTFORMW 番号={LOCAL} 呼び名番号={GETCSVNOBYCALLNAME("江良")}
    ```
    ``` title="結果"
    番号=0 呼び名番号=0
    ```

### 関連項目
- [CSVNAME系](CSVNAME.md) — 番号から名前を取得（逆操作）
- [FINDCHARA](FINDCHARA.md) — 追加済みキャラから検索
