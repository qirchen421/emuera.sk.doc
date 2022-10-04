# XML_GET系

| 関数名                                                            | 引数                                          | 戻り値 |
| :---------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.md)        | `any`, `string`(, `int`, `int`)               | `int`  |
|                                                                   | `any`, `string`, `ref` `string[]`(, `int`)    | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.md) | `string`, `string`(, `int`, `int`)            | `int`  |
|                                                                   | `string`, `string`, `ref` `string[]`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_GET xml, xpath(, doOutput, outputType)
    2. int XML_GET xml, xpath, ref outputArray(, outputType)
    3. int XML_GET_BYNAME xmlName, xpath(, doOutput, outputType)
    4. int XML_GET_BYNAME xmlName, xpath, ref outputArray(, outputType)
    ```
    `xpath`の規則で`xml`(`xmlName`)からノードを選択し、合致結果数を返します([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。

    書式`1`と`2`には、`xml`が文字列である場合、その内容からノードを選択します。`xml`が整数である場合、`xml`を文字列に変換した結果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))をキーとして、保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。

    書式`3`と`4`には、`xmlName`をキーとして、保存した`XmlDocument`からノードを選択します。

    なお，

    - 書式`1`と`3`: `doOutput`が`0`または省略した場合、合致結果数のみ返し、そうでない場合、合致結果を`RESULTS`に代入します。

    - 書式`2`と`4`: 合致結果を`outputArray`に代入します。

    `outputType`の値によって，代入結果を決めます。

    - `1`: ノードの`InnerText`
    - `2`: ノードの`InnerXml`
    - `3`: ノードの`OuterXml`
    - `4`: ノードの`Name`
    - 他または省略: ノードの`Value`

    !!! warning "注意"

        実際の`XmlNode`インスタンスを得ることではないため、`xpath`の先頭に「`//`」の表現を使っても意味がありません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><dir readonly='false'><file name='A.txt'>InnerText内容A</file></dir><file name='B.txt'>InnerText内容B</file></test>"
        #DIMS nodes, 10
        XML_DOCUMENT 0, xml

        ; 直接文字列から探索
        PRINTFORML 結果数：{XML_GET(xml, "/test//file", 1, 3)}
        PRINTFORML InnerXml(1)：%RESULTS:0%
        PRINTFORML InnerXml(2)：%RESULTS:1%

        ; XmlDocumentから探索
        PRINTFORML 結果数：{XML_GET(0, "/test//file/@name", 1)}
        PRINTFORML Value(1)：%RESULTS:0%
        PRINTFORML Value(2)：%RESULTS:1%
        PRINTFORML 結果数：{XML_GET(0, "/test/dir/*[1]", nodes, 1)}
        PRINTFORML InnerText：%nodes:0%

        ONEINPUT
    ``` 
    ``` title="結果"
    結果数：2
    InnerXml(1)：<file name="A.txt">InnerText内容A</file>
    InnerXml(2)：<file name="B.txt">InnerText内容B</file>
    結果数：2
    Value(1)：A.txt
    Value(2)：B.txt
    結果数：1
    InnerText：InnerText内容A
    ```
