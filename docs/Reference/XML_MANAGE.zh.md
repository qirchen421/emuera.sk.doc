# XML_DOCUMENT 处理系列

| 函数名                                                             | 参数            | 返回值 |
| :----------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md) | `any`, `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)  | `any`           | `1`    |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)    | `any`           | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int XML_DOCUMENT xmlId, xmlContent
    1 XML_RELEASE xmlId
    int XML_EXIST xmlId
    ```

    关于 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 的生成、删除、判断是否存在的一系列函数。若 `xmlId` 为整数，则使用其字符串转换结果值([`TOSTR`](https://osdn.net/projects/emuera/wiki/exmeth#h5-str.20TOSTR.28int.20value.2C.20str.20format.20.3D.20.22.22.29))。
    
    - `XML_DOCUMENT`：解析 `xmlContent` 并保存为 `XmlDocument`。  
        如果已经存在 `xmlId` 对应的 `XmlDocument`（创建失败），返回 `0`；创建成功时，返回 `1`。
    - `XML_RELEASE`：删除 `xmlId` 对应的 `XmlDocument`。
    - `XML_EXIST`：判断 `xmlId` 对应的 `XmlDocument` 是否存在。如果存在，返回 `1`；否则返回 `0`。

    !!! warning "注意"

        关于将生成的 `XmlDocument` 保存进存档文件请参考「[`XML`、`MAP` 保存功能](./README.md#xmlmap)」。「タイトル画面へ戻る（返回标题界面）」或 [`RESETDATA`](https://osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) 后会自动删除。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。


!!! example "示例代码" 
    
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE 
        PRINTFORML 0号XmlDocument是否存在：{XML_EXIST(0)}
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "创建成功" # "已经存在"
        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "创建成功" # "已经存在"

        RESETDATA  ; 自动删除所有 XmlDocument

        XML_DOCUMENT 0, "<xml/>"
        PRINTSL RESULT ? "创建成功" # "已经存在"
        PRINTFORML 0号XmlDocument是否存在：{XML_EXIST(0)}
        XML_RELEASE 0
        PRINTFORML 0号XmlDocument是否存在：{XML_EXIST(0)}

        ONEINPUT
    ``` 
    ``` title="输出结果"
    0号XmlDocument是否存在：0
    创建成功
    已经存在
    创建成功
    0号XmlDocument是否存在：1
    0号XmlDocument是否存在：0
    ```
