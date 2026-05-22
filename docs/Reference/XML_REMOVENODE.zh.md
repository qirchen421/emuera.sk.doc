---
hide:
  - toc
---

# XML_REMOVENODE 系列

| 函数名                                                                          | 参数                              | 返回值 |
| :------------------------------------------------------------------------------ | :-------------------------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.zh.md)        | `int`, `string`(, `int`)          | `int`  |
|                                                                                 | `ref` `string`, `string`(, `int`) | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.zh.md) | `string`, `string`(, `int`)       | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    1. int XML_REMOVENODE xmlId, xpath(, doSetAll)
    2. int XML_REMOVENODE ref xml, xpath(, doSetAll)
    3. int XML_REMOVENODE_BYNAME xmlName, xpath(, doSetAll)
    ```
    从指定的 `XML` 中删除（根节点除外）`xpath` 选择的节点（详见 [`XPath` 的介绍](https://www.octoparse.jp/blog/xpath-introduction)）。  
    当 `xpath` 的匹配结果存在多个时，必须将参数 `doSetAll` 设为 `0` 以外的数值才能成功删除节点。  
    删除节点成功时，返回已删除节点的数量；失败时返回 `0`。

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
        #DIMS xml = "<xml><brother/><brother/><sister/></xml>"

        XML_DOCUMENT 0, xml
        PRINTFORML {XML_REMOVENODE(xml, "/xml/brother", 1)} -> %xml%

        PRINTFORML {XML_REMOVENODE(0, "/xml/sister", 1)}
        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ```
    ``` title="输出结果"
    2 -> <xml><sister /></xml>
    1
    <xml><brother /><brother /></xml>
    ```
