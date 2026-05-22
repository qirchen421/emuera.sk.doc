---
hide:
  - toc
---

# MAP 操作相关函数

| 函数名                                                              | 参数                         | 返回值   |
| :------------------------------------------------------------------ | :--------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.zh.md)    | `string`, `string`           | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.zh.md)    | `string`, `string`           | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.zh.md)    | `string`, `string`, `string` | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.zh.md) | `string`, `string`           | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.zh.md)   | `string`                     | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.zh.md)  | `string`                     | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    string MAP_GET mapName, key
    int MAP_HAS mapName, key
    int MAP_SET mapName, key, value
    int MAP_REMOVE mapName, key
    int MAP_SIZE mapName
    int MAP_CLEAR mapName
    ```

    操作已保存的 `MAP`（键值对映射数组，或称「字典」，[`Dictionary<string,string>`](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）的一系列函数。

    - `MAP_GET`：在名为 `mapName` 的 `MAP` 中取出 `key` 对应的值。指定的 `MAP` 不存在，或没有找到该 `key` 时，返回空字符串。不会抛出异常，如有需要请使用 `MAP_HAS` / [`MAP_EXIST`](./MAP_MANAGE.zh.md) 提前进行检查。
    - `MAP_HAS`：判断名为 `mapName` 的 `MAP` 中是否存在指定的 `key`。如果存在，返回 `1`，否则返回 `0`。若指定的 `MAP` 本身就不存在，返回 `-1`。
    - `MAP_SET`：在名为 `mapName` 的 `MAP` 中覆写 `key` 对应的值（`value`）；若指定的 `key` 不存在，自动添加 `key`；成功设置新值后返回 `1`。若指定的 `MAP` 本身就不存在，返回 `-1`。
    - `MAP_REMOVE`：在名为 `mapName` 的 `MAP` 中删除 `key` 对应的键值对，返回 `1`。若指定的 `MAP` 本身就不存在，返回 `-1`。
    - `MAP_SIZE`：返回名为 `mapName` 的 `MAP` 中保存的键值对数量。若指定的 `MAP` 本身就不存在，返回 `-1`。
    - `MAP_CLEAR`：删除名为 `mapName` 的 `MAP` 中保存的所有键值对，返回 `1`。若指定的 `MAP` 本身就不存在，返回 `-1`。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        MAP_CREATE "MyMap"
        PRINTFORML 「MyMap」的大小：{MAP_SIZE("MyMap")}
        MAP_SET "MyMap", "Id", "username"
        MAP_SET "MyMap", "PassWord", "123456"
        PRINTFORML ID：%MAP_GET("MyMap", "Id")% Password：%MAP_GET("MyMap", "PassWord")%
        PRINTFORML Name?:{MAP_HAS("MyMap", "Name")}
        PRINTFORML 「MyMap」的大小：{MAP_SIZE("MyMap")}
        MAP_CLEAR "MyMap"
        PRINTFORML 「MyMap」的大小：{MAP_SIZE("MyMap")}

        ONEINPUT
    ```
    ``` title="输出结果"
    「MyMap」的大小：0
    ID：username Password：123456
    Name?:0
    「MyMap」的大小：2
    「MyMap」的大小：0
    ```

### 相关项目
- [MAP生成](MAP_MANAGE.zh.md)