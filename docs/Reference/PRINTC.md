---
hide:
  - toc
---

# PRINTC 系

| 関数名                                                                                        | 引数     | 戻り値 |
| :-------------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(\|FORM)(C\|LC)(\|K\|D)</code>](./PRINTC.md) | `string` | なし   |

!!! info "API"

    ```  { #language-erbapi }
    PRINT(C|L)(|K|D) string
    PRINTFORM(C|L)(|K|D)(|L|W) formedString
    ```
    `PRINTC`系命令です。
    コンフィグ[`PRINTCの文字数`](../Emuera/config.md#printc_1)（初期値25）で指定した文字数になるように半角スペースを補ってPRINTする命令です。
    なお、Emueraでは`PRINT`された文字列のボタン化処理の中で`PRINTC`系命令を多少特別扱いしています。

    1つ目の括弧内のキーワードは引数タイプを指定します。

    - なし - <文字列>
    - `FORM` - <書式付文字列>

    2つ目の括弧内のキーワードは揃える位置を指定します。

    - `C` - 右に揃えます（左側に半角スペースを追加します）
    - `LC` - 左に揃えます。

    3つ目の括弧内の`K`,`D`は[`PRINT`](./PRINT.md)系と同じです。

!!! hint "ヒント"

    命令のみ両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    	PRINTC AAA
    	PRINT |
    	PRINTC BBB
    	PRINT |
    	PRINTC CCC
    	PRINTL |
    	PRINTLC DDD
    	PRINT |
    	PRINTLC EEE
    	PRINT |
    	PRINTLC FFF
    	PRINTL |
    	PRINTC GGG
    	PRINT |
    	PRINTLC HHH
    	PRINT |
    	PRINTC III
    	PRINTW |
    ```
    ``` title="結果"
                          AAA|                      BBB|                      CCC|
    DDD                      |EEE                      |FFF                      |
                          GGG|HHH                      |                      III|

    ```
