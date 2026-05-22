---
hide:
  - toc
---

# PUTFORM

| 函数名                                                           | 参数       | 返回值 |
| :--------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`PUTFORM`](./PUTFORM.zh.md) | `string`   | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PUTFORM saveInfo
    ```
    `PUTFORM` 只能在名为 `@SAVEINFO` 的特殊函数中使用。  
    通过使用与 `PRINTFORM` 相同的格式书写，可以为存档数据添加概要。  
    建议写入诸如第几天、角色能力如何、正在调教哪个角色等数据。

!!! hint "提示"

    仅支持指令。

### 相关项目
- [SAVEDATA](SAVEDATA.zh.md)
- [流程图>SAVEGAME](../Emuera/system_flow.md#savegame)