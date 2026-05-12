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

### 相关项目
- [FINDCHARA](FINDCHARA.md) — 按变量值查找角色
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — GETCHARA 属于第一代"固定映射"