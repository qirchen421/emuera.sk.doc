---
hide:
  - toc
---

# BITSET / BITGET / BITTOGGLE / BITINDEXOFFIRST

| 関数名                                                                   | 引数                                   | 戻り値 |
| :----------------------------------------------------------------------- | :------------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`BITSET`](./BITARRAY.md)           | `ref int[]`, `int`(, `int`, `int`)     | `int`  |
| ![](../assets/images/IconSK.webp)[`BITGET`](./BITARRAY.md)           | `ref int[]`, `int`                     | `int`  |
| ![](../assets/images/IconSK.webp)[`BITTOGGLE`](./BITARRAY.md)        | `ref int[]`, `int`                     | `int`  |
| ![](../assets/images/IconSK.webp)[`BITINDEXOFFIRST`](./BITARRAY.md)  | `ref int[]`(, `int`)                   | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int BITSET arrayRef, idxID{, val, length}
    int BITGET arrayRef, idxID
    int BITTOGGLE arrayRef, idxID
    int BITINDEXOFFIRST arrayRef{, val}
    ```

    整数配列を使用してビットマップ（Bitmap）をシミュレートし、ビットの設定・読み取り・反転・検索機能を提供します。

    1. **BITSET** - ビットマップ内の指定位置の1つ以上の連続ビットを設定
       - `array`: ビットマップ配列（REF渡し、変更されます）
       - `idx`: 開始ビットインデックス（0から開始）
       - `val`: 設定する値（0=クリア、1=設定、0以外も1として扱う）、デフォルト1
       - `length`: 連続設定するビット数、デフォルト1
       - 成功時1を返す

    2. **BITGET** - ビットマップ内の指定位置のビット値を読み取り
       - `array`: ビットマップ配列
       - `idx`: 読み取るビットインデックス（0から開始）
       - ビット値（0または1）を返す。インデックスが範囲外の場合は-1を返す

    3. **BITTOGGLE** - ビットマップ内の指定位置のビット値を反転（0→1、1→0）
       - `array`: ビットマップ配列（REF渡し、変更されます）
       - `idx`: 反転するビットインデックス（0から開始）
       - 成功時1、インデックス範囲外時0を返す

    4. **BITINDEXOFFIRST** - ビットマップ内で指定値を持つ最初のビットの位置を検索
       - `array`: ビットマップ配列
       - `val`: 検索するビット値（0または1、0以外は1として扱う）、デフォルト0
       - 最初に一致したビットのインデックスを返す。見つからない場合は-1を返す

    !!! warning "注意"
        - ビットマップはリトルエンディアンで格納され、各配列要素は64ビットを格納します
        - インデックスは0から開始し、範囲外の操作は無視されます
        - 使用前に整数配列をビットマップの格納コンテナとして宣言する必要があります

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; ビットマップ配列を作成（4要素 = 256ビット）
        #DIM DYNAMIC BIT_ARRAY, 4

        ; BITSET - ビットを設定
        BITSET BIT_ARRAY, 5, 1, 1
        PRINTFORML BITGET(BIT_ARRAY, 5) = {BITGET(BIT_ARRAY, 5)}

        ; BITGET - ビットを読み取り
        PRINTFORML BITGET(BIT_ARRAY, 4) = {BITGET(BIT_ARRAY, 4)}
        PRINTFORML BITGET(BIT_ARRAY, 6) = {BITGET(BIT_ARRAY, 6)}

        ; BITTOGGLE - ビットを反転
        BITTOGGLE BIT_ARRAY, 5
        PRINTFORML BITGET(BIT_ARRAY, 5) = {BITGET(BIT_ARRAY, 5)} (0になるはず)

        ; 一括設定
        BITSET BIT_ARRAY, 10, 1, 6
        PRINTFORML BITINDEXOFFIRST(BIT_ARRAY, 1) = {BITINDEXOFFIRST(BIT_ARRAY, 1)}

        ; ビットをクリア
        BITSET BIT_ARRAY, 5, 0, 1
        PRINTFORML BITINDEXOFFIRST(BIT_ARRAY, 1) = {BITINDEXOFFIRST(BIT_ARRAY, 1)}

        ; 範囲外アクセス
        PRINTFORML BITGET(BIT_ARRAY, 300) = {BITGET(BIT_ARRAY, 300)} (-1を返す)

        ONEINPUT
    ```
    ``` title="結果"
    BITGET(BIT_ARRAY, 5) = 1
    BITGET(BIT_ARRAY, 4) = 0
    BITGET(BIT_ARRAY, 6) = 0
    BITGET(BIT_ARRAY, 5) = 0 (0になるはず)
    BITINDEXOFFIRST(BIT_ARRAY, 1) = 5
    BITINDEXOFFIRST(BIT_ARRAY, 1) = 10
    BITGET(BIT_ARRAY, 300) = -1 (-1を返す)
    ```
