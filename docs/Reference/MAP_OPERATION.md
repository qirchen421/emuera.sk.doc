---
hide:
  - toc
---

# MAP操作系

| 関数名                                                              | 引数                         | 戻り値   |
| :------------------------------------------------------------------ | :--------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)    | `string`, `string`           | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)    | `string`, `string`           | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)    | `string`, `string`, `string` | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md) | `string`, `string`           | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)   | `string`                     | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)  | `string`                     | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    string MAP_GET mapName, key
    int MAP_HAS mapName, key
    int MAP_SET mapName, key, value
    int MAP_REMOVE mapName, key
    int MAP_SIZE mapName
    int MAP_CLEAR mapName
    ```

    `MAP`（連想配列，[`Dictionary<string,string>`](https://docs.microsoft.com/ja-jp/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）に保存されたデータを操作する関数です。
    
    - `MAP_GET`：`mapName`に対応する`MAP`の`key`に対応する値を返します。存在していない場合、または`MAP`自体が存在しない場合も、空文字列を返します。例外は発生しないので、必要があれば`MAP_HAS`、[`MAP_EXIST`](./MAP_MANAGE.md)を使ってください。
    - `MAP_HAS`：`mapName`に対応する`MAP`の`key`の存否を確認し、存在する場合`1`を返す。そうでない場合`0`を返します。`MAP`自体が存在しない場合、`-1`を返します。
    - `MAP_SET`：`mapName`に対応する`MAP`の`key`に対応する値を`value`で上書きします。`key`が存在しない場合`key`を追加し、`1`を返します。`MAP`自体が存在しない場合、`-1`を返します。
    - `MAP_REMOVE`：`mapName`に対応する`MAP`の`key`に対応する値を削除し、`1`を返します。`MAP`自体が存在しない場合、`-1`を返します。
    - `MAP_SIZE`：`mapName`に対応する`MAP`のキー・値ペアの数を返します。`MAP`自体が存在しない場合、`-1`を返します。
    - `MAP_CLEAR`：`mapName`に対応する`MAP`のキー・値ペアをすべて削除し、`1`を返します。`MAP`自体が存在しない場合、`-1`を返します。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 

        MAP_CREATE "MyMap"
        PRINTFORML 「MyMap」のサイズ：{MAP_SIZE("MyMap")}
        MAP_SET "MyMap", "Id", "username"
        MAP_SET "MyMap", "PassWord", "123456"
        PRINTFORML ID：%MAP_GET("MyMap", "Id")% Password：%MAP_GET("MyMap", "PassWord")%
        PRINTFORML Name?:{MAP_HAS("MyMap", "Name")}
        PRINTFORML 「MyMap」のサイズ：{MAP_SIZE("MyMap")}
        MAP_CLEAR "MyMap"
        PRINTFORML 「MyMap」のサイズ：{MAP_SIZE("MyMap")}

        ONEINPUT
    ``` 
    ``` title="結果"
    「MyMap」のサイズ：0
    ID：username Password：123456
    Name?:0
    「MyMap」のサイズ：2
    「MyMap」のサイズ：0
    ```
