# XML_ADDATTRIBUTE

| 関数名                                                                       | 引数                                                         | 戻り値 |
| :--------------------------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md) | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`  |
|                                                                              | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDATTRIBUTE xmlId, xpath, attrName(, attrValue, methodType, doSetAll)
    2. int XML_ADDATTRIBUTE ref xml, xpath, attrName(, attrValue, methodType, doSetAll)
    ```
    指定した`XML`に対して，`xpath`で選択した属性・要素ノードによって，新しい属性「`attrName`=`attrValue`」を追加をします([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。`attrValue`を省略した場合，空文字列にします。`doSetAll`が`0`または省略し，かつ合致結果数が`1`以上である場合，追加を行われません。

    - `methodType`が`0`または省略した場合，選択した要素ノードの属性リストの最後に属性を追加します。
    - `methodType`が`1`の場合，選択した属性の前に属性を追加します。
    - `methodType`が`2`の場合，選択した属性の後に属性を追加します。

    成功した場合，合致結果の数を返す。失敗した場合，`0`を返す。

    1. `xmlId`で保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)からノードを選択します。[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)が存在していない場合，`-1`を返します。
    2. `xml`がらノードを選択し，結果を`xml`に代入します。`xml`が変数でなければなりません。

    !!! warning "注意"

        実際の`XmlNode`インスタンスを得ることではないから，`xpath`の先頭に「`//`」の表現を使っても意味がありません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。

!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        PRINTFORML {XML_ADDATTRIBUTE(xml, "/xml", "foo")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_ADDATTRIBUTE(0, "/xml/@foo", "id", "1", 1)} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="結果"
    1 -> <xml foo="" />
    1 -> <xml id="1" foo="" />
    ```