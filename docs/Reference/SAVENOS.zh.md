---
hide:
  - toc
---

# SAVENOS

| 函数名                                                         | 参数 | 返回值 |
| :------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.md) | `int`| `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SAVENOS variable
    ```
	作为命令时，获取配置[`显示存档数据数量`](../Emuera/config.md#_10)中指定的数量，并赋值给指定的数值变量。默认值为`20`。  
	不能省略数值变量。  

	作为表达式函数时，返回配置`显示存档数据数量`中指定的数量。默认值为20。  
	与`GETCONFIG("显示存档数据数量")`同义。  

!!! hint "提示"

    同时支持命令和表达式函数两种形式。