---
hide:
  - toc
---

# STRDATA

| 函数名                                                         | 参数             | 返回值 |
| :------------------------------------------------------------- | :--------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`STRDATA`](./STRDATA.zh.md) | `stringVariable` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    STRDATA stringVariable
        DATA
        DATAFORM
        DATALIST
        ENDLIST
    ENDDATA
    ```
    此指令用于将字符串赋值给指定的字符串型变量，而非使用 [`PRINTDATA`](./PRINTDATA.zh.md) 来显示字符串。  
    各格式与 `PRINTDATA` 相同，请参阅该页面。

!!! hint "提示"

    仅该指令同时支持两种用法。
### 相关项目
- [PRINTDATA](PRINTDATA.zh.md)