---
hide:
  - toc
---

# LOADDATA

| 函数名                                                           | 参数 | 返回值 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADDATA`](./LOADDATA.md) | `int`| 无     |

!!! info "API"

    ```  { #language-erbapi }
	LOADDATA saveID
    ```
	加载由 `saveID` 指定编号的文件数据。  
	如果加载失败，将导致错误终止。  
	请务必先使用 [`CHKDATA`](./CHKDATA.md) 指令检查是否可以加载，然后再执行此操作。  
	`LOADDATA`（与 [`LOADGAME`](./SAVEGAME.md) 指令不同）可以在脚本的任何位置调用。

!!! info "EM+EE 扩展：存档格式增强"

    EM+EE 扩展了 `LOADDATA` 的加载行为，在加载标准存档数据之前，会先清除当前内存中的 EM 专属数据：

    - **Map 数据**：标记为 `SAVEDATA` 关键字的 [`MAP`](./MAP.md) 字典会被清空
    - **Xml 数据**：标记为 `SAVEDATA` 关键字的 XML 文档会被移除
    - **DataTable 数据**：标记为 `SAVEDATA` 关键字的 DataTable 表会被清空

    清除后，从存档中恢复对应的 EM 专属数据，确保存档切换时数据一致性。  
    这意味着如果存档中不包含某些 EM 专属数据，加载后这些数据将不存在（而非保留加载前的值）。

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [SAVEDATA](SAVEDATA.md)
- [CHKDATA](CHKDATA.md)
