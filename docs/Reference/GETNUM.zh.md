---
hide:
  - toc
---

# GETNUM

| 函数名                                                       | 参数                 | 返回值 |
| :----------------------------------------------------------- | :------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.md) | `variable`, `string` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    GETNUM variableName, indexName
    ```
    从各 CSV 文件中定义的名称获取其对应的数值，并赋值给 `RESULT:0`。  
    例如，如果在 `abl.csv` 中定义了 `2,技巧`，那么执行 `GETNUM ABL, "技巧"` 后，`RESULT:0` 将被赋值为 `2`。  
    如果未定义，则结果为 `-1`。  
    CSV 文件与变量的对应关系遵循 [「Emuera 新增语法」页面中的「通过字符串指定数组变量元素」](../Emuera/expression.md#string-array-element) 部分。

!!! hint "提示"

    此功能同时支持指令和表达式函数两种形式。

### 相关项目
- [CSV 状态相关](CSV_STATUS.md)
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — GETNUM 属于第二代"名称反查"反射