---
hide:
  - toc
---

# XML_GET 系列

| 函数名                                                            | 参数                                          | 返回值 |
| :---------------------------------------------------------------- | :-------------------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.zh.md)        | `any`, `string`(, `int`, `int`)               | `int`  |
|                                                                   | `any`, `string`, `ref` `string[]`(, `int`)      | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.zh.md) | `string`, `string`(, `int`, `int`)            | `int`  |
|                                                                   | `string`, `string`, `ref` `string[]`(, `int`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_GET xml, xpath(, doOutput, outputType)
    2. int XML_GET xml, xpath, ref outputArray(, outputType)
    3. int XML_GET_BYNAME xmlName, xpath(, doOutput, outputType)
    4. int XML_GET_BYNAME xmlName, xpath, ref outputArray(, outputType)
    ```
    根据 `xpath` 选择的元素节点（详见 [`XPath` 的介绍](https://www.runoob.com/xpath/xpath-tutorial.html)）在指定的 `XML` 中检索。

    对于形式 `1` 和 `2`，如果 `xml` 是字符串，则在内容的 XML 文本中检索节点。如果 `xml` 是整型数值，则在以其字符串转换结果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))为 ID 而指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 中检索节点；若 `XmlDocument` 不存在，返回 `-1`。

    对于形式 `3` 和 `4`，在以 `xmlName` 为 ID 指定的 `XmlDocument` 中检索节点；若 `XmlDocument` 不存在，返回 `-1`。

    同时，

    - 对于形式`1`和`3`: 如果参数 `doOutput` 为 `0` 或直接省略，仅返回匹配到的结果数量；否则将匹配结果赋值给 `RESULTS`。
    - 对于形式`2`和`4`: 如果参数 `outputArray` 为字符串数组变量，则会将匹配结果赋值给 `outputArray`。

    根据参数 `outputType` 的值决定返回结果的类型：

    - `1`: 节点的 `InnerText`
    - `2`: 节点的 `InnerXml`
    - `3`: 节点的 `OuterXml`
    - `4`: 节点的 `Name`
    - 其他值或直接省略: 节点的 `Value`

    !!! warning "注意"

        获取的 XML 不是真正的 `XmlNode` 节点实例，因此在 `xpath` 的开头使用「`//`」快捷表示方法并不会生效。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS xml = "<test><dir readonly='false'><file name='A.txt'>InnerText内容A</file></dir><file name='B.txt'>InnerText内容B</file></test>"
        #DIMS nodes, 10
        XML_DOCUMENT 0, xml

        ; 直接从字符串中检索节点
        PRINTFORML 匹配结果数量：{XML_GET(xml, "/test//file", 1, 3)}
        PRINTFORML InnerXml(1)：%RESULTS:0%
        PRINTFORML InnerXml(2)：%RESULTS:1%

        ; 从 XmlDocument 中检索节点
        PRINTFORML 匹配结果数量：{XML_GET(0, "/test//file/@name", 1)}
        PRINTFORML Value(1)：%RESULTS:0%
        PRINTFORML Value(2)：%RESULTS:1%
        PRINTFORML 匹配结果数量：{XML_GET(0, "/test/dir/*[1]", nodes, 1)}
        PRINTFORML InnerText：%nodes:0%

        ONEINPUT
    ```
    ``` title="输出结果"
    匹配结果数量：2
    InnerXml(1)：<file name="A.txt">InnerText内容A</file>
    InnerXml(2)：<file name="B.txt">InnerText内容B</file>
    匹配结果数量：2
    Value(1)：A.txt
    Value(2)：B.txt
    匹配结果数量：1
    InnerText：InnerText内容A
    ```
