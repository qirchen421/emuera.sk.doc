---
hide:
  - toc
---

# MAP_GETKEYS

| 函数名                                                             | 参数                              | 返回值   |
| :----------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md) | `string`                          | `string` |
|                                                                    | `string`, `int`                   | `string` |
|                                                                    | `string`, `ref` `string[]`, `int` | `string` |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_GETKEYS, mapName
    2. string MAP_GETKEYS, mapName, doOutput
    3. string MAP_GETKEYS, mapName, ref outputArray, doOutput
    ```

    输出 `MAP`（键值对映射数组，或称「字典」，[`Dictionary<string,string>`](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）中保存的键名（key）。  
    不会抛出异常，如有需要请使用 [`MAP_EXIST`](./MAP_MANAGE.md) 提前进行检查。

    1. 返回形如 `键名1,键名2,键名3,...` 的字符串。如果指定的 `MAP` 不存在，则返回空字符串。
    2. 参数 `doOutput` 为 `0` 以外的数值时，将获取到的键名依次保存到 `RESULTS`，返回 `RESULTS:0`；并将获取到的 `MAP` 大小（包含的键值对数量）保存到 `RESULT`。
    2. 参数 `doOutput` 为 `0` 以外的数值时，将获取到的键名依次保存到字符串数组 `outputArray`，返回空字符串。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS keys, 5

        MAP_CREATE "MyMap"
        FOR i, 0, 5
            MAP_SET "MyMap", TOSTR(i*100), ""
        NEXT
        PRINTSL MAP_GETKEYS("MyMap")
        PRINTSL MAP_GETKEYS("MyMap", 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%]
        NEXT
        VARSET RESULTS
        PRINTSL MAP_GETKEYS("MyMap", keys, 1)
        FOR i, 0, 5
            PRINTFORML RESULTS:[%RESULTS:i%] key:[%keys:i%]
        NEXT

        ONEINPUT
    ```
    ``` title="输出结果"
    0,100,200,300,400
    0
    RESULTS:[0] key:[]
    RESULTS:[100] key:[]
    RESULTS:[200] key:[]
    RESULTS:[300] key:[]
    RESULTS:[400] key:[]

    RESULTS:[] key:[0]
    RESULTS:[] key:[100]
    RESULTS:[] key:[200]
    RESULTS:[] key:[300]
    RESULTS:[] key:[400]
    ```

### 相关项目
- [MAP操作](MAP_OPERATION.md)
