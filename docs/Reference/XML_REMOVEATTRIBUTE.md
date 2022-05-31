# XML_REMOVEATTRIBUTE

| 関数名                                                                             | 引数                              | 戻り値 |
| :--------------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md) | `int`, `string`(, `int`)          | `int`  |
|                                                                                    | `ref` `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVEATTRIBUTE xmlId, xpath(, doSetAll)
    2. int XML_REMOVEATTRIBUTE ref xml, xpath(, doSetAll)
    ```
    指定した`XML`に対して，`xpath`で選択した属性を削除します([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。`doSetAll`が`0`または省略し，かつ合致結果数が`1`以上である場合，追加を行われません。成功した場合，合致結果の数を返す。失敗した場合，`0`を返す。

    1. `xmlId`で保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)からノードを選択します。[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)が存在していない場合，`-1`を返します。
    2. `xml`がらノードを選択し，結果を`xml`に代入します。`xml`が変数でなければなりません。

    !!! warning "注意"

        実際の`XmlNode`インスタンスを得ることではないから，`xpath`の先頭に「`//`」の表現を使っても意味がありません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml id='1' name='foo'/>"

        PRINTFORML {XML_REMOVEATTRIBUTE(xml, "/xml/@id")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVEATTRIBUTE(0, "/xml/@name")} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="結果"
    1 -> <xml name="foo" />
    1 -> <xml />
    ```