# XML_REMOVEATTRIBUTE

| 函数名                                                                             | 参数                              | 返回值 |
| :--------------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md) | `int`, `string`(, `int`)          | `int`  |
|                                                                                    | `ref` `string`, `string`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVEATTRIBUTE xmlId, xpath(, doSetAll)
    2. int XML_REMOVEATTRIBUTE ref xml, xpath(, doSetAll)
    ```
    从指定的 `XML` 中删除 `xpath` 选择的属性（详见 [`XPath` 的介绍](https://www.octoparse.jp/blog/xpath-introduction)）。当 `xpath` 的匹配结果存在多个时，必须将参数 `doSetAll` 设为 `0` 以外的数值才能成功删除属性。删除属性成功时，返回已删除属性的数量；失败时返回 `0`。

    1. 从根据 `xmlId` 指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 中检索元素。若指定的 `XmlDocument` 不存在，返回 `-1`。
    2. 从指定的 `xml` 内容中检索元素，并将新的结果重新赋值给 `xml`；`xml` 必须是变量。

    !!! bug "BUG"

        目前这个函数存在 bug，经常出现删除失败的情况。预计将在 EMv8 中修复。

    !!! warning "注意"

        获取的 XML 不是真正的 `XmlNode` 节点实例，因此在 `xpath` 的开头使用「`//`」快捷表示方法并不会生效。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml id='1' name='foo'/>"

        PRINTFORML {XML_REMOVEATTRIBUTE(xml, "/xml/@id")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVEATTRIBUTE(0, "/xml/@name")} -> %XML_TOSTR(0)%

        ONEINPUT
    ```
    ``` title="输出结果"
    1 -> <xml name="foo" />
    1 -> <xml />
    ```
