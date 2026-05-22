---
hide:
  - toc
---

# GETMETH,GETMETHS

| 函数名                                                       | 参数                                | 返回值    |
| :----------------------------------------------------------- | :---------------------------------- | :-------- |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.zh.md)  | `string`(, `int`, `argument`...)    | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.zh.md) | `string`(, `string`, `argument`...) | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	int GETMETH functionName(, defaultValue, argument...)
	string GETMETHs functionName(, defaultValue, argument...)
    ```
    可以从字符串调用式中函数。`GETMETH` 对应 `#FUNCTION`，`GETMETHS` 对应 `#FUNCTIONS`。  
    第二参数是函数未找到时的返回值，第三参数及后续参数将成为第一参数所指定的式中函数的参数。

!!! hint "提示"

    同时支持命令和式中函数。

### 相关项目
- [GETVAR,GETVARS,SETVAR](GETSETVAR.zh.md)