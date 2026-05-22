---
hide:
  - toc
---

# EXISTCSV

| 函数名                                                           | 参数 | 返回值 |
| :--------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.zh.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int EXISTCSV charaNO
    ```
	检查对应的角色是否已定义，并将结果赋值给`RESULT:0`或直接返回。  
	若已定义则返回`1`，未定义则返回`0`。  
	可用于检查`ADDCHARA no`是否能无错误地执行。

!!! hint "提示"

    该函数同时支持命令和表达式函数两种调用方式。