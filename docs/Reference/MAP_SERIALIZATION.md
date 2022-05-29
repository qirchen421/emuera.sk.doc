# MAPシリアライズ系

| 関数名                                                                   | 引数               | 戻り値   |
| :----------------------------------------------------------------------- | :----------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`           | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string` | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_TOXML, mapName
    2. int MAP_FROMXML, mapName, xmlMap
    ```

    `MAP`（連想配列，[`Dictionary<string,string>`](https://docs.microsoft.com/ja-jp/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）と`XML`と互いに変換する関数です。`MAP`の内容をセーブファイルに保存したい時に使えます。

    - `MAP_TOXML`：`mapName`に対応する`MAP`を`XML`へ変換して返します。
    - `MAP_FROMXML`：`mapName`に対応する`MAP`に、`XML`にあるキー・値ペアを読み取て上書きします。

    `XML`は、必ず
    ``` xml
    <map>
        <p><k>キー1</k><v>値1</v></p>
        <p><k>キー2</k><v>値2</v></p>
        <p><k>キー3</k><v>値3</v></p>
        ....
    </map>
    ```
    のようにします。
    
!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS xml

        MAP_CREATE "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i*100)
        NEXT
        xml '= MAP_TOXML("MyMap")
        PRINTSL xml

        MAP_CLEAR "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i)
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT
        PRINTL

        MAP_FROMXML "MyMap", xml
        FOR i, 0, 3
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT

        ONEINPUT
    ``` 
    ``` title="結果"
    <map><p><k>0</k><v>0</v></p><p><k>1</k><v>100</v></p><p><k>2</k><v>200</v></p></map>
    MyMap["0"] = 0
    MyMap["1"] = 1
    MyMap["2"] = 2
    
    MyMap["0"] = 0
    MyMap["1"] = 100
    MyMap["2"] = 200
    ```