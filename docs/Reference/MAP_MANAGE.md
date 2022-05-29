# MAP管理系

| 関数名                                                            | 引数     | 戻り値 |
| :---------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)  | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md) | `string` | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_CREATE mapName
    int MAP_EXIST mapName
    1 MAP_RELEASE mapName
    ```

    `MAP`（連想配列，[`Dictionary<string,string>`](https://docs.microsoft.com/ja-jp/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）の作り、削除、存否確認に関する関数です。
    
    - `MAP_CREATE`：`mapName`を名前として`MAP`を作成します。`mapName`に対応する`MAP`がすでに存在している場合，`0`を返す，成功した場合，`1`を返します。
    - `MAP_EXIST`：`mapName`に対応する`MAP`の存否を確認し，存在するなら`1`を返す，そうでない場合`0`を返します。。
    - `MAP_RELEASE`：`mapName`に対応する`MAP`を削除します。

    !!! warning "注意"

        作成した`MAP`は直接にセーブファイルに保存できない，「タイトル画面へ戻る」か[`RESETDATA`](https://zh.osdn.net/projects/emuera/wiki/excom#h5-RESETDATA)をすると自動的に削除されます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML MAP「MyMap」の存否：{MAP_EXIST("MyMap")}
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "成功した" # "すでに存在している"
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "成功した" # "すでに存在している"

        RESETDATA ; すべてのMAPが自動的削除される

        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "成功した" # "すでに存在している"
        PRINTFORML MAP「MyMap」の存否：{MAP_EXIST("MyMap")}
        MAP_RELEASE "MyMap"
        PRINTFORML MAP「MyMap」の存否：{MAP_EXIST("MyMap")}

        ONEINPUT
    ``` 
    ``` title="結果"
    MAP「MyMap」の存否：0
    成功した
    すでに存在している
    成功した
    MAP「MyMap」の存否：1
    MAP「MyMap」の存否：0
    ```