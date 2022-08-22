# XML_REPLACE 系列

| 函数名                                                                    | 参数                                        | 返回值 |
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
    从指定的 `XML` 中将 `xpath` 选择的节点（详见 [`XPath` 的介绍](https://www.octoparse.jp/blog/xpath-introduction)）替换为参数 `newXml`（新的 XML 文本）。当 `xpath` 的匹配结果存在多个时，必须将参数 `doSetAll` 设为 `0` 以外的数值才能成功更新节点。更新节点成功时，返回已更新节点的数量；失败时返回 `0`。

    1. 将 `xmlId` 指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 从根节点开始全部替换为 `newXml`。若指定的 `XmlDocument` 不存在，返回 `-1`。若 `xmlId` 为整数，则使用其字符串转换结果值([`TOSTR`](https://zh.osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))。
    2. 从以 `xmlId` 的字符串转换结果(`TOSTR`)为 ID 而指定的 `XmlDocument` 中检索元素。若指定的 `XmlDocument` 不存在，返回 `-1`。
    3. 从指定的 `xml` 内容中检索元素节点进行替换，并将新的结果重新赋值给 `xml`；`xml` 必须是变量。
    4. 从以 `xmlName` 为 ID 而指定的 `XmlDocument` 中检索元素。若指定的 `XmlDocument` 不存在，返回 `-1`。

    !!! warning "注意"

        获取的 XML 不是真正的 `XmlNode` 节点实例，因此在 `xpath` 的开头使用「`//`」快捷表示方法并不会生效。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<xml/>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REPLACE(0, "<xml><boy/></xml>")} -> %XML_TOSTR(0)%
        PRINTFORML {XML_REPLACE(0, "/xml/boy", "<girl/>")} -> %XML_TOSTR(0)%

        ONEINPUT
    ```
    ``` title="输出结果"
    1 -> <xml><boy /></xml>
    1 -> <xml><girl /></xml>
    ```
