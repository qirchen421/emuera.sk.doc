# MAP 管理相关函数

| 函数名                                                            | 参数     | 返回值 |
| :---------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)  | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)   | `string` | `int`  |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md) | `string` | `1`    |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_CREATE mapName
    int MAP_EXIST mapName
    1 MAP_RELEASE mapName
    ```

    创建 / 删除 / 判断是否存在 `MAP`（键值对映射数组，或称「字典」，[`Dictionary<string,string>`](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）的一系列函数。

    - `MAP_CREATE`：生成名为 `mapName` 的 `MAP`。  
        如果已经存在名为 `mapName` 的 `MAP`（创建失败），返回 `0`；若创建成功，返回 `1`。
    - `MAP_EXIST`：判断是否存在名为 `mapName` 的 `MAP`，若存在，返回 `1`；否则返回 `0`。
    - `MAP_RELEASE`：删除名为 `mapName` 的 `MAP`。

    !!! warning "注意"

        关于生成的 `MAP` 保存进存档文件请参考「[`XML`、`MAP` 保存功能](./README.md#xmlmap)」。「タイトル画面へ戻る（返回标题界面）」或 [`RESETDATA`](https://zh.osdn.net/projects/emuera/wiki/excom#h5-RESETDATA) 后会自动删除。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        PRINTFORML MAP「MyMap」是否存在：{MAP_EXIST("MyMap")}
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "创建成功" # "已经存在"
        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "创建成功" # "已经存在"

        RESETDATA ; 自动删除所有 MAP

        MAP_CREATE "MyMap"
        PRINTSL RESULT ? "创建成功" # "已经存在"
        PRINTFORML MAP「MyMap」是否存在：{MAP_EXIST("MyMap")}
        MAP_RELEASE "MyMap"
        PRINTFORML MAP「MyMap」是否存在：{MAP_EXIST("MyMap")}

        ONEINPUT
    ```
    ``` title="输出结果"
    MAP「MyMap」是否存在：0
    创建成功
    已经存在
    创建成功
    MAP「MyMap」是否存在：1
    MAP「MyMap」是否存在：0
    ```
