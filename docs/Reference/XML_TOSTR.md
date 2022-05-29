# XML_TOSTR

| 関数名                                                         | 引数  | 戻り値   |
| :------------------------------------------------------------- | :---- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md) | `int` | `string` |


!!! info "API"

    ```  { #language-erbapi }
    string XML_TOSTR xmlId
    ```
    `xmlId`で保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)の内容を返すます。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        XML_DOCUMENT 0, "<xml/>"

        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="結果"
    <xml />
    ```