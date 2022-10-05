# XML_TOSTR

| 函数名                                                         | 参数  | 返回值   |
| :------------------------------------------------------------- | :---- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md) | `any` | `string` |

!!! info "API"

    ```  { #language-erbapi }
    string XML_TOSTR xmlId
    ```
    以 XML 文本形式返回 `xmlId` 指定的 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 中保存的内容。若 `xmlId` 为整数，则使用其字符串转换结果值([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        XML_DOCUMENT 0, "<xml/>"

        PRINTSL XML_TOSTR(0)

        ONEINPUT
    ```
    ``` title="输出结果"
    <xml />
    ```
