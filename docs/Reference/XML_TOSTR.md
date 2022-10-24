---
hide:
  - toc
---

# XML_TOSTR

| 関数名                                                         | 引数  | 戻り値   |
| :------------------------------------------------------------- | :---- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md) | `any` | `string` |


!!! info "API"

    ```  { #language-erbapi }
    string XML_TOSTR xmlId
    ```
    `xmlId`で保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)の内容を返します。`xmlId`は整数型の場合、その文字列に変換した結果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))を使います。

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
