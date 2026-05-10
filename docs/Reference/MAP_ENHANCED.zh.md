---
hide:
  - toc
---

# MAP 扩展操作函数

| 函数名                                                                        | 参数                              | 返回值   |
| :---------------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconSK.webp)[`MAP_MERGE`](./MAP_ENHANCED.md)             | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_REMOVEIF`](./MAP_ENHANCED.md)          | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_FINDKEY`](./MAP_ENHANCED.md)           | `string`, `string`, `string`      | `string` |

!!! info "API"

    ```  { #language-erbapi }
    int MAP_MERGE destMapName, srcMapName
    int MAP_REMOVEIF mapName, matchValue, mode
    string MAP_FINDKEY mapName, matchValue, mode
    ```

    Skia（SkiaSharp版）新增的 `MAP` 扩展操作函数。提供批量合并、条件删除、条件查找功能。

    - `MAP_MERGE`：将 `srcMapName` 的所有键值对合并到 `destMapName`。同名 key 的值会被源 MAP 覆盖。成功返回 `1`，任一 MAP 不存在返回 `0`。
    - `MAP_REMOVEIF`：根据 `mode` 指定的匹配模式，批量删除符合条件的键值对。返回实际删除的数量，无效模式返回 `-1`。
    - `MAP_FINDKEY`：根据 `mode` 指定的匹配模式，查找符合条件的 key，返回逗号分隔的 key 列表。`RESULT` 设置为匹配数量。

    **匹配模式**（`MAP_REMOVEIF` 和 `MAP_FINDKEY` 共用）：

    | 模式 | 说明 |
    | :--- | :--- |
    | `"KEY_CONTAINS"` | key 包含 matchValue |
    | `"KEY_PREFIX"` | key 以 matchValue 开头 |
    | `"KEY_SUFFIX"` | key 以 matchValue 结尾 |
    | `"VAL_CONTAINS"` | value 包含 matchValue |
    | `"VAL_EQ"` | value 等于 matchValue |

    `MAP_REMOVEIF` 额外支持的模式：

    | 模式 | 说明 |
    | :--- | :--- |
    | `"VAL_NE"` | value 不等于 matchValue |

    !!! note "MAP_FINDKEY 与 MAP_REMOVEIF 的区别"
        `MAP_FINDKEY` 不支持 `"VAL_NE"` 模式（查找"不等于"意义不大，且结果可能过多）。`MAP_FINDKEY` 只查找不删除，`MAP_REMOVEIF` 查找并删除。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; === MAP_MERGE ===
        MAP_CREATE "baseDB"
        MAP_SET "baseDB", "name", "无名"
        MAP_SET "baseDB", "level", "1"

        MAP_CREATE "overrideDB"
        MAP_SET "overrideDB", "name", "勇者"
        MAP_SET "overrideDB", "class", "战士"

        MAP_MERGE "baseDB", "overrideDB"
        PRINTFORML 合并后: %MAP_TOSTRING("baseDB")%

        ; === MAP_FINDKEY ===
        MAP_CREATE "itemDB"
        MAP_SET "itemDB", "sword", "铁剑"
        MAP_SET "itemDB", "potion_hp", "药水"
        MAP_SET "itemDB", "potion_mp", "药水"
        MAP_SET "itemDB", "shield", "木盾"

        LOCALS = MAP_FINDKEY("itemDB", "potion_", "KEY_PREFIX")
        PRINTFORML potion_ 前缀的键: %LOCALS% (共{RESULT}个)

        LOCALS = MAP_FINDKEY("itemDB", "药水", "VAL_CONTAINS")
        PRINTFORML 值含"药水"的键: %LOCALS% (共{RESULT}个)

        ; === MAP_REMOVEIF ===
        MAP_CREATE "tempDB"
        MAP_SET "tempDB", "a", "1"
        MAP_SET "tempDB", "b", "2"
        MAP_SET "tempDB", "c", "1"
        MAP_SET "tempDB", "d", "3"

        LOCAL = MAP_REMOVEIF("tempDB", "1", "VAL_EQ")
        PRINTFORML 删除了 {LOCAL} 个值为1的条目
        PRINTFORML 剩余: %MAP_TOSTRING("tempDB")%

        ; === 清理 ===
        MAP_RELEASE "baseDB"
        MAP_RELEASE "overrideDB"
        MAP_RELEASE "itemDB"
        MAP_RELEASE "tempDB"

        ONEINPUT
    ```
    ``` title="输出结果"
    合并后: name=勇者,level=1,class=战士
    potion_ 前缀的键: potion_hp,potion_mp (共2个)
    值含"药水"的键: potion_hp,potion_mp (共2个)
    删除了 2 个值为1的条目
    剩余: b=2,d=3
    ```

### 相关项目
- [MAP管理](MAP_MANAGE.md)
- [MAP操作](MAP_OPERATION.md)
- [MAP键值获取](MAP_GETKEYS.md)
- [MAP序列化](MAP_SERIALIZATION.md)
