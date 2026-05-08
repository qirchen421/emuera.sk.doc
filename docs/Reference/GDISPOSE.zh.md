---
hide:
  - toc
---

# GDISPOSE

| 函数名                                                           | 参数  | 返回值 |
| :--------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDISPOSE gID
    ```
	销毁指定`gID`的`Graphics`对象。  
	销毁成功时返回非0值。  
	当指定`gID`的`Graphics`对象尚未创建（包括已销毁的情况）时，返回0。  

!!! hint "提示"

    该函数同时支持指令和表达式函数两种使用方式。