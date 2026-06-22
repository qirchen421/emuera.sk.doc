---
hide:
  - toc
---

# STRFORM

| 函数名                                                         | 参数     | 返回值   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.zh.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string STRFORM formedString
    ```
    将给定的字符串视为与PRINTFORM等相同的格式化字符串，并返回展开后的字符串。

!!! hint "提示"

    同时支持指令和表达式函数两种形式。

---

# STRFORMCHECK ![](../assets/images/IconSK.webp)

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`STRFORMCHECK`](./STRFORM.zh.md#strformcheck) | `string` | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int STRFORMCHECK formedString
    ```
    将给定的字符串视为与STRFORM相同的格式化字符串，判断其是否可展开。可展开返回 `1`，不可展开返回 `0`。

    - 语法错误（如未闭合大括号）→ `0`
    - 运行时求值失败（如变量不存在）→ `0`
    - 与STRFORM共享同一套解析器，语义一致性有保证

!!! warning "注意"

    由于 `CanRestructure = false`，该函数不是常量折叠的候选。

### 相关项目
- [GETVAR,GETVARS](GETSETVAR.zh.md)
- [GETMETH,GETMETHS](GETMETH.zh.md)