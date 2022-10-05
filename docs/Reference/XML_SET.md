# XML_SET系

| 関数名                                                            | 引数                                               | 戻り値 |
| :---------------------------------------------------------------- | :------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.md)        | `int`, `string`, `string`(, `int`, `int`)          | `int`  |
|                                                                   | `ref` `string`, `string`, `string`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.md) | `string`, `string`, `string`(, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_SET xmlId, xpath, value(, doSetAll, outputType)
    2. int XML_SET ref xml, xpath, value(, doSetAll, outputType)
    3. int XML_SET_BYNAME xmlName, xpath, value(, doSetAll, outputType)
    ```
    `xpath`の規則で`xml`からノードを選択、合致ノードに`value`を代入し、合致結果数を返します([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。  
	`doSetAll`が`0`または省略、かつ合致結果数が`1`以上である場合、代入は行われません。失敗した場合、`0`を返す。
    
    1. `xmlId`を文字列に変換した結果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))をキーとして、保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。
    2. `xml`からノードを選択し、結果を`xml`に代入します。`xml`は変数でなければなりません。
    3. `xmlName`をキーとして、保存した`XmlDocument`からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。

    `outputType`の値によって，代入結果を決めます。

    - `1`: ノードの`InnerText`
    - `2`: ノードの`InnerXml`
    - 他または省略: ノードの`Value`

    !!! warning "注意"

        実際の`XmlNode`インスタンスを得ることではないため、`xpath`の先頭に「`//`」の表現を使っても意味がありません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><file name='A.txt'>InnerText内容A</file><a>A</a></test>"

        ; 直接文字列から探索
        PRINTFORML 結果数：{XML_SET(xml, "/test/*", "B", 1, 1)}
        PRINTSL xml
        XML_DOCUMENT 0, xml

        ; XmlDocumentから探索
        PRINTFORML 結果数：{XML_SET(0, "/test/file/@name", "X.xml")}
        XML_GET 0, "/test/file/@name", 1
        PRINTSL RESULTS

        ONEINPUT
    ``` 
    ``` title="結果"
    結果数：2
    <test><file name="A.txt">B</file><a>B</a></test>
    結果数：1
    X.xml
    ```
