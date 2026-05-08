---
hide:
  - toc
---

# LOADDATA

| 函数名                                                           | 参数 | 返回值 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LOADDATA`](./LOADDATA.md) | `int`| 无     |

!!! info "API"

    ```  { #language-erbapi }
    LOADDATA saveID
    ```
    加载由 `saveID` 指定编号的文件数据。  
    如果加载失败，将导致错误终止。  
    请务必先使用 [`CHKDATA`](./CHKDATA.md) 指令检查是否可以加载，然后再执行此操作。  
    `LOADDATA`（与 [`LOADGAME`](./SAVEGAME.md) 指令不同）可以在脚本的任何位置调用。

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [LOADDATA](LOADDATA.md)
- [CHKDATA](CHKDATA.md)