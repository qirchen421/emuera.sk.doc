---
hide:
  - toc
---

# GCREATE

| 函数名                                                         | 参数                | 返回值 |
| :------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.zh.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GCREATE gID, width, height
    ```
    以指定尺寸创建指定 `gID` 的 `Graphics`。  
    `Graphics` 的 `gID` 必须是 0 或以上的整数，`width` 和 `height` 必须是 1 到 8192 之间的整数。  
    如果参数超出此范围，将发生错误。  
    创建成功时，返回非 0 值。  
    如果指定 `gID` 的 `Graphics` 已存在，则返回 0。  
    若要重新创建 `Graphics`，请使用 [`GDISPOSE`](./GDISPOSE.zh.md) 命令销毁现有的 `Graphics`。

!!! hint "提示"

    同时支持指令和表达式函数形式。

### 相关项目
- [GCREATEFROMFILE](GCREATEFROMFILE.zh.md)
- [GDISPOSE](GDISPOSE.zh.md)