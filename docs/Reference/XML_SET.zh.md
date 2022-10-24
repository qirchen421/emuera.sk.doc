---
hide:
  - toc
---

# XML_SET 系列

| 函数名                                                            | 参数                                               | 返回值 |
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
    从指定的 `XML` 中将 `xpath` 选择的节点（详见 [`XPath` 的介绍](https://www.octoparse.jp/blog/xpath-introduction)）内容设为 `value`。当 `xpath` 的匹配结果存在多个时，必须将参数 `doSetAll` 设为 `0` 以外的数值才能成功更新节点。更新节点成功时，返回已更新节点的数量；失败时返回 `0`。

    1. 从以 `xmlId` 的字符串转换结果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))为 ID 而指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 中检索元素节点进行更新。若指定的 `XmlDocument` 不存在，返回 `-1`。
    2. 从指定的 `xml` 内容中检索元素节点进行更新，并将新的结果重新赋值给 `xml`；`xml` 必须是变量。
    3. 从以 `xmlName` 为 ID 而指定的 `XmlDocument` 中检索元素节点进行更新。若指定的 `XmlDocument` 不存在，返回 `-1`。

    根据参数 `outputType` 的值决定返回结果的类型：

    - `1`: 节点的 `InnerText`
    - `2`: 节点的 `InnerXml`
    - 其他值或直接省略: 节点的 `Value`

    !!! warning "注意"

        获取的 XML 不是真正的 `XmlNode` 节点实例，因此在 `xpath` 的开头使用「`//`」快捷表示方法并不会生效。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><file name='A.txt'>InnerText内容A</file><a>A</a></test>"

        ; 直接从字符串中检索节点
        PRINTFORML 匹配结果数量：{XML_SET(xml, "/test/*", "B", 1, 1)}
        PRINTSL xml
        XML_DOCUMENT 0, xml

        ; 从 XmlDocument 中检索节点
        PRINTFORML 匹配结果数量：{XML_SET(0, "/test/file/@name", "X.xml")}
        XML_GET 0, "/test/file/@name", 1
        PRINTSL RESULTS

        ONEINPUT
    ```
    ``` title="输出结果"
    匹配结果数量：2
    <test><file name="A.txt">B</file><a>B</a></test>
    匹配结果数量：1
    X.xml
    ```
