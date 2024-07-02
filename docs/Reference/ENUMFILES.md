---
hide:
  - toc
---

# ENUMFILES

| 関数名                                                         | 引数                        | 戻り値 |
| :------------------------------------------------------------- | :-------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.md) | `string`(, `string`, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ENUMFILES dir, pattern, option
    ```

    フォルダ`dir`の下に`pattern`で決めた条件を満たしたファイル名を`RESULTS`配列に代入する。合致ファイル数を返す。

    - `dir`は`Emuera.exe`を相対パスで指定(`..`は無効)。
    - `pattern`のデフォルト値は`*`(すべてのファイル)，[Directory.EnumerateFiles](https://docs.microsoft.com/en-us/dotnet/api/system.io.directory.enumeratefiles?view=netframework-4.8)に参照してください。
    - `option`のデフォルト値は`0`，サブフォルダを検索しない。それ以外の場合はサブフォルダも検索する。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例"
    ``` title="フォルダの構成"
    csv
     - Chara
        - Chara001.csv
     - _Default.config
     - _Fixed.config
     - VariableSize.csv
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIM total

        total = ENUMFILES("csv")
        PRINTFORML 全ファイル数（サブフォルダを除く）：{total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT
        PRINTL

        total = ENUMFILES("csv", "*.csv", 1)
        PRINTFORML CSVファイル数：{total}
        FOR i, 0, total
            PRINTSL RESULTS:i
        NEXT

        ONEINPUT
    ```
    ``` title="結果"
    全ファイル数（サブフォルダを除く）：3
    csv\VariableSize.csv
    csv\_Default.config
    csv\_Fixed.config
    
    CSVファイル数：2
    csv\VariableSize.csv
    csv\Chara\Chara001.csv
    ```

### 関連項目
- [EXISTFILE](EXISTFILE.md)
