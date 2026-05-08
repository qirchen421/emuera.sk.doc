---
hide:
  - toc
---

# GETCHARA

| 函数名                                                           | 参数  | 返回值 |
| :--------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETCHARA`](./GETCHARA.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETCHARA charaNO
    ```
	判断指定角色是否在当前持有的角色列表中，如果在则返回其在列表中的位置，否则返回`-1`。  
	可用于从整个列表中确认特定角色是否存在。

!!! hint "提示"

    该函数同时支持作为指令和表达式函数使用。