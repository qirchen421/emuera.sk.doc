---
hide:
  - toc
---

# PRINT_STATUS 相关函数

| 函数名                                                                       | 参数 | 返回值 |
| :--------------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.md)      | `int`| 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.md)   | `int`| 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.md)     | `int`| 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.md)      | `int`| 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.md)    | `int`| 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.md)     | 无   | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.md) | 无   | 无     |

!!! info "API"

    ```  { #language-erbapi }
	PRINT_ABL charaID
	PRINT_TALENT charaID
	PRINT_MARK charaID
	PRINT_EXP charaID
	PRINT_PALAM charaID
	PRINT_ITEM
	PRINT_SHOPITEM
    ```
    分别简易显示当前状态。`PRINT_ABL`、`PRINT_TALENT`、`PRINT_MARK`、`PRINT_EXP`、`PRINT_PALAM` 请将角色编号指定为参数。

!!! hint "提示"

    仅支持指令。

!!! example "示例" 
    

    ``` { #language-erb title="ABL.csv" }
	0,能力0
	1,能力1
	2,能力2
	```

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
            ADDVOIDCHARA
            ABL:0:0 = 2
            ABL:0:2 = 3

            PRINT_ABL 0
            WAIT
    ```
    ``` title="结果"
    能力0LV2 能力2LV3
    ```