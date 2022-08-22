# XML_DOCUMENT管理系

| 関数名                                                             | 引数            | 戻り値 |
| :----------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md) | `any`, `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)  | `any`           | `1`    |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)    | `any`           | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int XML_DOCUMENT xmlId, xmlContent
    1 XML_RELEASE xmlId
    int XML_EXIST xmlId
    ```

    [`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)の作成、削除、存否確認に関する関数です。`xmlId`は整数型の場合、その文字列に変換した結果([`TOSTR`](https://zh.osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))を使います。
    
    - `XML_DOCUMENT`：`xmlContent`を解析し、`XmlDocument`として保存する。`xmlId`に対応する`XmlDocument`がすでに存在している場合、`0`を返す。成功した場合、`1`を返します。
    - `XML_RELEASE`：`xmlId`に対応する`XmlDocument`を削除します。
    - `XML_EXIST`：`xmlId`に対応する`XmlDocument`の存否を確認し、存在するなら`1`を返す。そうでない場合`0`を返します。

    !!! warning "注意"

        作成した`XmlDocument`は直接にセーブファイルに保存されません。「タイトル画面へ戻る」か[`RESETDATA`](https://zh.osdn.net/projects/emuera/wiki/excom#h5-RESETDATA)をすると自動的に削除されます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML 0番XmlDocumentの存否：{XML_EXIST(0)}
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "成功した" # "すでに存在している"
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "成功した" # "すでに存在している"

        RESETDATA ; すべてのXmlDocumentが自動的削除される

        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "成功した" # "すでに存在している"
        PRINTFORML 0番XmlDocumentの存否：{XML_EXIST(0)}
        XML_RELEASE 0
        PRINTFORML 0番XmlDocumentの存否：{XML_EXIST(0)}

        ONEINPUT
    ``` 
    ``` title="結果"
    0番XmlDocumentの存否：0
    成功した
    すでに存在している
    成功した
    0番XmlDocumentの存否：1
    0番XmlDocumentの存否：0
    ```
