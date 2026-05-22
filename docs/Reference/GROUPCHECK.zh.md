---
hide:
  - toc
---

# GROUPMATCH, NOSAMES, ALLSAMES

| 函数名                                                               | 参数            | 返回值 |
| :------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.zh.md) | `any`, `any`... | `int`  |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.zh.md)    | `any`, `any`... | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.zh.md)   | `any`, `any`... | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GROUPMATCH key, value...
	int NOSAMES value, value...
	int ALLSAMES value, value...
    ```
    所有参数必须是同一类型。  
    `GROUPMATCH` 返回第一个参数指定的值与第二个及后续参数中指定的值相匹配的总数。  
    `NOSAMES` 当所有参数指定的值都不同时返回 1，否则返回 0。  
    `ALLSAMES` 当所有参数指定的值都相同时返回 1，否则返回 0。  

!!! hint "提示"

    该函数既可作为指令使用，也可在表达式中使用。

### 相关项目
- [MATCH](MATCH.zh.md)