---
hide:
  - toc
---

# PRINTSINGLE 系列

| 函数名                                                                                                         | 参数     | 返回值 |
| :------------------------------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(\|V\|S\|FORM\|FORMS)(\|K\|D)</code>](./PRINTSINGLE.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTSINGLEV(|K|D) expression[, expression, ...]
    PRINTSINGLES(|K|D) stringVariable
    PRINTSINGLEFORM(|K|D) formedString
    PRINTSINGLEFORMS(|K|D) string
    ```
    `PRINTSINGLE` 系列与 `PRINTL` 几乎相同，但 `PRINTSINGLE` 系列不会对字符串进行换行，始终在一行内显示。
    超出屏幕边缘的字符不会被绘制。
    此外，由于会自动添加换行，因此没有 `(|L|W)` 关键字。
    其他关键字的含义与 [PRINT 系列](./PRINT.zh.md) 相同。

!!! hint "提示"

    仅支持作为指令使用。

### 相关项目
- [PRINT](PRINT.zh.md)