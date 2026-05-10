---
hide:
  - toc
---

# MAP 序列化相关函数

| 函数名                                                                         | 参数                            | 返回值   |
| :----------------------------------------------------------------------------- | :------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)         | `string`                        | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md)       | `string`, `string`              | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_TOSTRING`](./MAP_SERIALIZATION.md)      | `string`(, `string`, `string`)  | `string` |
| ![](../assets/images/IconSK.webp)[`MAP_FROMSTRING`](./MAP_SERIALIZATION.md)    | `string`, `string`(, `string`, `string`) | `int`    |

!!! info "API"

    ```  { #language-erbapi }
    1. string MAP_TOXML, mapName
    2. int MAP_FROMXML, mapName, xmlMap
    3. string MAP_TOSTRING, mapName{, sep, kvSep}
    4. int MAP_FROMSTRING, mapName, data{, sep, kvSep}
    ```

    将 `MAP`（键值对映射数组，或称「字典」，[`Dictionary<string,string>`](https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8)）与 `XML` 或字符串互相转换的函数。想把 `MAP` 的内容保存到文件（数据持久化）的时候可以使用。

    - `MAP_TOXML`：将名为 `mapName` 的 `MAP` 转换为 `XML`，返回转换后的 XML 文本。
    - `MAP_FROMXML`：解析对应格式的 `XML` 并将内容读取到名为 `mapName` 的 `MAP` 中。
    - `MAP_TOSTRING`：Skia（SkiaSharp版）新增。将名为 `mapName` 的 `MAP` 序列化为 `key=value` 格式的字符串。`sep` 为条目分隔符（默认 `","`），`kvSep` 为键值分隔符（默认 `"="`）。例如：`"k1=v1,k2=v2,k3=v3"`。
    - `MAP_FROMSTRING`：Skia（SkiaSharp版）新增。将 `MAP_TOSTRING` 序列化的字符串反序列化到 `MAP` 中。`sep` 和 `kvSep` 含义与 `MAP_TOSTRING` 相同。按第一个 `kvSep` 分割键和值，空条目或无 `kvSep` 的条目会被跳过。

    `XML` 必须为如下格式：
    ``` xml
    <map>
        <p><k>键名1</k><v>值1</v></p>
        <p><k>键名2</k><v>值2</v></p>
        <p><k>键名2</k><v>值3</v></p>
        ....
    </map>
    ```

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM i
        #DIMS xml

        MAP_CREATE "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i*100)
        NEXT
        xml '= MAP_TOXML("MyMap")
        PRINTSL xml

        MAP_CLEAR "MyMap"
        FOR i, 0, 3
            MAP_SET "MyMap", TOSTR(i), TOSTR(i)
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT
        PRINTL

        MAP_FROMXML "MyMap", xml
        FOR i, 0, 3
            PRINTFORML MyMap["%TOSTR(i)%"] = %MAP_GET("MyMap", TOSTR(i))%
        NEXT

        ONEINPUT
    ```
    ``` title="输出结果"
    <map><p><k>0</k><v>0</v></p><p><k>1</k><v>100</v></p><p><k>2</k><v>200</v></p></map>
    MyMap["0"] = 0
    MyMap["1"] = 1
    MyMap["2"] = 2

    MyMap["0"] = 0
    MyMap["1"] = 100
    MyMap["2"] = 200
    ```
