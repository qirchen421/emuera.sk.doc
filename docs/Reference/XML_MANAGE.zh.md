# XML_DOCUMENT 处理系列

| 函数名                                                             | 参数            | 返回值 |
| :----------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md) | `int`, `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)  | `int`           | `1`    |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)    | `int`           | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int XML_DOCUMENT xmlId, xmlContent
    1 XML_RELEASE xmlId
    int XML_EXIST xmlId
    ```

    关于 [`XmlDocument`](https://docs.microsoft.com/zh-cn/dotnet/api/system.xml.xmldocument?view=netframework-4.8) 的生成、删除、判断是否存在的一系列函数。
    
    - `XML_DOCUMENT`：解析 `xmlContent` 并保存为 `XmlDocument`。  
        如果已经存在 `xmlId` 对应的 `XmlDocument`（创建失败），返回 `0`；创建成功时，返回 `1`。
    - `XML_RELEASE`：删除 `xmlId` 对应的 `XmlDocument`。
    - `XML_EXIST`：判断 `xmlId` 对应的 `XmlDocument` 是否存在。如果存在，返回 `1`；否则返回 `0`。

    !!! warning "注意"

        生成的 `XmlDocument` 不会自动保存到硬盘文件中，「タイトル画面へ戻る（返回标题界面）」或 [`RESETDATA`](https://zh.osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) 后会自动删除。

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
