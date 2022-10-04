# XML_REPLACE系

| 関数名                                                                    | 引数                                        | 戻り値 |
| :------------------------------------------------------------------------ | :------------------------------------------ | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)        | `any`, `string`                             | `int`  |
|                                                                           | `int`, `string`, `string`(, `int`)          | `int`  |
|                                                                           | `ref` `string`, `string`, `string`(, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.md) | `string`, `string`, `string`(, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REPLACE xmlId, newXml
    2. int XML_REPLACE xmlId, xpath, newXml(, doSetAll)
    3. int XML_REPLACE ref xml, xpath, newXml(, doSetAll)
    4. int XML_REPLACE_BYNAME xmlName, xpath, newXml(, doSetAll)
    ```
    指定した`XML`に対して、`xpath`の規則で`xml`からノードを選択し、合致ノードを`newXml`で上書きします([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。  
	`doSetAll`が`0`または省略、かつ合致結果数が`1`以上である場合、上書きは行われません。成功した場合、合致結果の数を返す。失敗した場合、`0`を返す。

    1. `xmlId`で保存した[`XmlDocument`](https://docs.microsoft.com/ja-jp/dotnet/api/system.xml.xmldocument?view=netframework-4.8)のルートノードを`newXml`で上書きします。`XmlDocument`が存在していない場合、`-1`を返します。`xmlId`は整数型の場合、その文字列に変換した結果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))を使います。
    2. `xmlId`を文字列に変換した結果(`TOSTR`)をキーとして、保存した`XmlDocument`からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。
    3. `xml`からノードを選択し、結果を`xml`に代入します。`xml`は変数でなければなりません。
    4. `xmlName`をキーとして、保存した`XmlDocument`からノードを選択します。`XmlDocument`が存在していない場合、`-1`を返します。

    !!! warning "注意"

        実際の`XmlNode`インスタンスを得ることではないため、`xpath`の先頭に「`//`」の表現を使っても意味がありません。

!!! hint "ヒント"

    命令、式中関数両方対応しています。


!!! example "例" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REPLACE(0, "<xml><boy/></xml>")} -> %XML_TOSTR(0)%
        PRINTFORML {XML_REPLACE(0, "/xml/boy", "<girl/>")} -> %XML_TOSTR(0)%

        ONEINPUT
    ``` 
    ``` title="結果"
    1 -> <xml><boy /></xml>
    1 -> <xml><girl /></xml>
    ```
