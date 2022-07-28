# REGEXPMATCH

| 関数名                                                             | 引数                                              | 戻り値 |
| :----------------------------------------------------------------- | :------------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md) | `string`, `string`(, `int`)                       | `int`  |
|                                                                    | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int REGEXPMATCH str, pattern(, output)
    2. int REGEXPMATCH str, pattern, ref groupCount, ref matches
    ```
    
    `str`が正規表現パターン`pattern`に合うなら合致結果の数を返す。合致しない場合0を返す
    
    1. `output`が`0`以外の整数の場合(デフォルトは`0`)、マッチグループ数を`RESULT:1`に、各マッチ結果を`RESULTS`に代入(合計「グループ数」×「戻り値」)
    
    2. マッチグループ数を`groupCount`に、各マッチ結果を`matches`に代入(合計「グループ数」×「戻り値」)

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM groupCount
        #DIMS matches, 10
        #DIM i
        #DIM j
        #DIM count

        REGEXPMATCH "Apple Banana Car", "(.{2})\\b"
        PRINTFORML 合致結果数:{RESULT}
        count = REGEXPMATCH("Apple Banana Car", ".(.{2})\\b", groupCount, matches)
        PRINTFORML 合致結果数:{count} グループ数:{groupCount}
        FOR i, 0, count
            PRINTFORML 結果{i+1}:
            FOR j, 0, groupCount
                PRINTFORM グループ{j}:%matches:(i*groupCount+j)% 
            NEXT
            PRINTL
        NEXT
        
        ONEINPUT
        
    ``` 
    ``` title="結果"
    合致結果数:3
    合致結果数:3 グループ数:2
    結果1:
    グループ0:ple グループ1:le 
    結果2:
    グループ0:ana グループ1:na 
    結果3:
    グループ0:Car グループ1:ar 
    ```
