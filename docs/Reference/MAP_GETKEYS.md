---
hide:
  - toc
---

# MAP_GETKEYS

| 関数名                                                             | 引数                              | 戻り値   |
| :----------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md) | `string`                          | `string` |
|                                                                    | `string`, `int`                   | `string` |
|                                                                    | `string`, `ref` `string[]`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_GETKEYS, mapName
    2. string MAP_GETKEYS, mapName, doOutput
    3. string MAP_GETKEYS, mapName, ref outputArray, doOutput
    ```

    `MAP`（連想配列，[`Dictionary<string,string>`](https://docs.microsoft.com/ja-jp/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）に保存されたキーを出力する関数です。

    1. "キー1,キー2,キー3,..."のような形の文字列を返します，`MAP`自体が存在しない場合も，空文字列を返します。例外は発生しないので、必要があれば[`MAP_EXIST`](./MAP_MANAGE.md)を使ってください。
    2. `doOutput`が`0`ではない場合，`RESULTS`にキーを順次代入し、`RESULTS:0`を返します。例外は発生しないので、必要があれば[`MAP_EXIST`](./MAP_MANAGE.md)を使ってください。
    2. `doOutput`が`0`ではない場合，`outputArray`にキーを順次代入し、空文字列を返します。例外は発生しないので、必要があれば[`MAP_EXIST`](./MAP_MANAGE.md)を使ってください。
    
!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS keys, 5

        MAP_CREATE "MyMap"
        FOR i, 0, 5
            MAP_SET "MyMap", TOSTR(i*100), ""
        NEXT
        PRINTSL MAP_GETKEYS("MyMap")
        PRINTSL MAP_GETKEYS("MyMap", 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%] 
        NEXT
        VARSET RESULTS
        PRINTSL MAP_GETKEYS("MyMap", keys, 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%] 
        NEXT

        ONEINPUT
    ``` 
    ``` title="結果"
    0,100,200,300,400
    0
    RESULTS:[0] key:[] 
    RESULTS:[100] key:[] 
    RESULTS:[200] key:[] 
    RESULTS:[300] key:[] 
    RESULTS:[400] key:[] 
    
    RESULTS:[] key:[0] 
    RESULTS:[] key:[100] 
    RESULTS:[] key:[200] 
    RESULTS:[] key:[300] 
    RESULTS:[] key:[400] 
    ```
