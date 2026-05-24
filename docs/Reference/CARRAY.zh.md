---
hide:
  - toc
---

# SUMCARRAY, CMATCH, MAXCARRAY, MINCARRAY

| 函数名                                                          | 参数                                | 返回值 |
| :-------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.zh.md) | `charaArray`(, `int`, `int`)        | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.zh.md)    | `charaArray`, `any`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.zh.md) | `charaArray`(, `int`, `int`)        | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.zh.md) | `charaArray`(, `int`, `int`)        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SUMCARRAY charaArray(, start, end)
	int CMATCH charaArray, value(, start, end)
	int MAXCARRAY charaArray(, start, end)
	int MINCARRAY charaArray(, start, end)
    ```
    这是遍历角色间的 [`SUMARRAY`](./SUMARRAY.zh.md)、[`MATCH`](./MATCH.zh.md)、[`MAXARRAY`](./MAXMINARRAY.zh.md)、[`MINARRAY`](./MAXMINARRAY.zh.md) 的变体。  
    `charaArray` 必须是角色数组变量。  
    `start, end` 需通过角色登记编号 (CharaID) 指定。  
    例如，`RESULT = SUMCARRAY(CFLAG:2, A, B)` 也可以写成如下形式。  
    （`B` 必须小于 `CHARANUM`）

        RESULT = 0
        FOR COUNT, A, B
            RESULT += CFLAG:COUNT:2
        REND

!!! hint "提示"

    同时支持指令和表达式内函数两种形式。