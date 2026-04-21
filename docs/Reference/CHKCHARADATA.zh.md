---
hide:
  - toc
---

# CHKCHARADATA

| 函数名                                                                   | 参数     | 返回值 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.md) | `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CHKCHARADATA filename
    ```
    返回 dat 文件夹内由 `chara_*.dat` 表示的文件名所对应的数据信息。
    如果可以加载则返回 0，如果因某些原因无法加载则返回非 0 值。
    此外，如果可以加载，则将存档数据的备注赋值给 `RESULTS:0`；如果无法加载，则将原因赋值给 `RESULTS:0`。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

### 相关项目
- [SAVECHARA](SAVECHARA.md)
- [LOADCHARA](LOADCHARA.md)