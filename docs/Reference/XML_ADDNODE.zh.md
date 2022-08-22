# XML_ADDNODE 系列

| 函数名                                                                    | 参数                                               | 返回值 |
| :------------------------------------------------------------------------ | :------------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.md)        | `int`, `string`, `string`(, `int`, `int`)          | `int`  |
|                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.md) | `string`, `string`, `string`(, `int`, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_ADDNODE xmlId, xpath, nodeXml(, methodType, doSetAll)
    2. int XML_ADDNODE ref xml, xpath, nodeXml(, methodType, doSetAll)
    3. int XML_ADDNODE_BYNAME xmlName, xpath, nodeXml(, methodType, doSetAll)
    ```
    根据 `xpath` 选择的元素节点（详见 [`XPath` 的介绍](https://www.octoparse.jp/blog/xpath-introduction)）添加新的元素节点到指定的 `XML` 中。当 `xpath` 的匹配结果存在多个时，必须将参数 `doSetAll` 设为 `0` 以外的数值才能成功新增节点。

    - `methodType` 为 `0` 或直接省略时，将选择的元素作为父级节点，在子节点列表末尾添加 `nodeXml` 作为子节点。
    - `methodType` 为 `1` 时，在选择的元素节点（根节点除外）之前添加 `nodeXml` 作为兄弟节点。
    - `methodType` 为 `2` 时，在选择的元素节点（根节点除外）之后添加 `nodeXml` 作为兄弟节点。

    新节点添加成功时返回新增的次数（因为可能会匹配到多个结果，导致新增复数次）；失败时返回 `0`。

    1.  从以 `xmlId` 的字符串转换结果([`TOSTR`](https://zh.osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))为 ID 而指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 中检索元素。若指定的 `XmlDocument` 不存在，返回 `-1`。
    2. 从指定的 `xml` 内容中检索元素，并将新的结果重新赋值给 `xml`；`xml` 必须是变量。
    3. 从以 `xmlName` 为 ID 而指定的 `XmlDocument` 中检索元素。若指定的 `XmlDocument` 不存在，返回 `-1`。

    !!! warning "注意"

        获取的 XML 不是真正的 `XmlNode` 节点实例，因此在 `xpath` 的开头使用「`//`」快捷表示方法并不会生效。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        PRINTFORML {XML_ADDNODE(xml, "/xml", "<child/>")} -> %xml%

        XML_DOCUMENT 0, xml

        PRINTFORML {XML_ADDNODE(0, "/xml/child", "<brother/>", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ```
    ``` title="输出结果"
    1 -> <xml><child /></xml>
    1
    <xml><brother /><child /></xml>
    ```
