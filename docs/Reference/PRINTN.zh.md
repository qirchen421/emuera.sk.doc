---
hide:
  - toc
---

# PRINTN 系列

| 函数名                                                                                                                                            | 参数     | 返回值 |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)N</code>](./PRINT.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTN string
    PRINTVN integerVariable
    PRINTSN stringVariable
    PRINTFORMN formedString
    PRINTFORMSN string
    ```
    这是不换行的 `PRINTW` 命令。仅添加在上述基本的 `PRINT` 命令中。  
    各命令的行为和字面量与 [`PRINT` 系列命令](PRINT.md) 相同。

!!! hint "提示"

    仅命令本身支持此功能。

### 相关项目
- [PRINT](PRINT.md)