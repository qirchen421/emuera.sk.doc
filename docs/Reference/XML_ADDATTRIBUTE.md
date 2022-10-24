---
hide:
  - toc
---

# XML_ADDATTRIBUTE系

| 関数名                                                                              | 引数                                                         | 戻り値 |
| :---------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)        | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`  |
|                                                                                     | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.md) | `string`, `string`, `string`(, `string`, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDATTRIBUTE xmlId, xpath, attrName(, attrValue, methodType, doSetAll)
    2. int XML_ADDATTRIBUTE ref xml, xpath, attrName(, attrValue, methodType, doSetAll)
    3. int XML_ADDATTRIBUTE_BYNAME xmlName, xpath, attrName(, attrValue, methodType, doSetAll)
    ```
    指定した`XML`に対して、`xpath`で選択した属性・要素ノードによって、新しい属性「`attrName`=`attrValue`」を追加します([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。  
	`attrValue`を省略した場合、空文字列にします。`doSetAll`が`0`または省略、かつ合致結果数が`1`以上である場合、追加は行われません。

    - `methodType`が`0`または省略した場合、選択した要素ノードの属性リストの最後に属性を追加します。
    - `methodType`が`1`の場合、選択した属性の前に属性を追加します。
    - `methodType`が`2`の場合、選択した属性の後に属性を追加します。

    成功した場合、合致結果の数を返す。失敗した場合、`0`を返す。

    1. `xmlId`を文字列に変換した結果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))をキーとして、保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。
    2. `xml`からノードを選択し、結果を`xml`に代入します。`xml`は変数でなければなりません。
    3. `xmlName`をキーとして、保存した`XmlDocument`からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。

    !!! warning "注意"

        実際の`XmlNode`インスタンスを得ることではないため、`xpath`の先頭に「`//`」の表現を使っても意味がありません。

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
