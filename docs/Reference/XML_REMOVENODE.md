---
hide:
  - toc
---

# XML_REMOVENODE系

| 関数名                                                                          | 引数                              | 戻り値 |
| :------------------------------------------------------------------------------ | :-------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.md)        | `int`, `string`(, `int`)          | `int`  |
|                                                                                 | `ref` `string`, `string`(, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.md) | `string`, `string`(, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVENODE xmlId, xpath(, doSetAll)
    2. int XML_REMOVENODE ref xml, xpath(, doSetAll)
    3. int XML_REMOVENODE_BYNAME xmlName, xpath(, doSetAll)
    ```
    指定した`XML`に対して、`xpath`で選択した要素ノード（ルートノードは無効）を削除します([`XPath`について](https://www.octoparse.jp/blog/xpath-introduction))。  
	`doSetAll`が`0`または省略し、かつ合致結果数が`1`以上である場合、削除は行われません。成功した場合、合致結果の数を返す。失敗した場合、`0`を返す。
    
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
        #DIMS xml = "<xml><brother/><brother/><sister/></xml>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVENODE(xml, "/xml/brother", 1)} -> %xml%

        PRINTFORML {XML_REMOVENODE(0, "/xml/sister", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ``` 
    ``` title="結果"
    2 -> <xml><sister /></xml>
    1
    <xml><brother /><brother /></xml>
    ```
