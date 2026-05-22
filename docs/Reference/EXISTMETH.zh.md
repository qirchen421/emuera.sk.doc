---
hide:
  - toc
---

# EXISTMETH

| 函数名                                                           | 参数 | 返回值 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.zh.md)  | `string`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTMETH functionName
    ```
	检查是否存在指定的表达式中函数，如果是`#FUNCTION`则返回1，如果是`#FUNCTIONS`则返回2，否则返回0。

!!! hint "提示"

    该函数同时支持命令和表达式中函数。

### 相关项目
- [EXISTFUNCTION](EXISTFUNCTION.zh.md)
- [GETMETH,GETMETHS](GETMETH.zh.md)