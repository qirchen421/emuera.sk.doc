---
hide:
  - toc
---

# XML_ADDATTRIBUTE 系列

| 函数名                                                                              | 参数                                                         | 返回值 |
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
    根据 `xpath` 选择的元素节点 / 属性（详见 [`XPath` 的介绍](https://www.octoparse.jp/blog/xpath-introduction)）添加新的属性「`attrName`=`attrValue`」到指定的 `XML` 中。省略参数 `attrValue` 时，新增的属性值默认设为空字符串。当 `xpath` 的匹配结果存在多个时，必须将参数 `doSetAll` 设为 `0` 以外的数值才能成功新增属性。

    - `methodType` 为 `0` 或直接省略时，在选择的元素节点的属性列表末尾添加新属性。
    - `methodType` 为 `1` 时，在选择的元素节点的属性之前添加新属性。
    - `methodType` 为 `2` 时，在选择的元素节点的属性之后添加新属性。

    新属性添加成功时返回新增的次数（因为可能会匹配到多个结果，导致新增复数次）；失败时返回 `0`。

    1.  从以 `xmlId` 的字符串转换结果([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))为 ID 而指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 中检索元素。若指定的 `XmlDocument` 不存在，返回 `-1`。
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

        PRINTFORML {XML_ADDATTRIBUTE(xml, "/xml", "foo")} -> %xml%

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_ADDATTRIBUTE(0, "/xml/@foo", "id", "1", 1)} -> %XML_TOSTR(0)%

        ONEINPUT
    ```
    ``` title="输出结果"
    1 -> <xml foo="" />
    1 -> <xml id="1" foo="" />
    ```
