---
hide:
  - toc
---

# GETLINESTR

| 函数名                                                               | 参数     | 返回值   |
| :------------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.md) | `string` | `string` |

!!! info "API"

    ```  { #language-erbapi }
	string GETLINESTR pattern
    ```
    将参数字符串传递给 [`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md)、[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md) 时，返回将显示的字符串。  
    不保证此命令及表达式中函数返回的字符串长度与 `1行に表示できる文字列長`（一行可显示的字符串长度）相对应。

!!! hint "提示"

    同时支持命令和表达式中函数。

### 相关项目
- [DRAWLINE](DRAWLINE.md)
- [CUSTOMDRAWLINE](CUSTOMDRAWLINE.md)