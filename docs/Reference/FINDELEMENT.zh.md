---
hide:
  - toc
---

# FINDELEMENT

| 函数名                                                                     | 参数                                         | 返回值 |
| :------------------------------------------------------------------------- | :------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.md)     | `variable`, `value`(, `int`, `int`, `int`)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.md) | `variable`, `value`(, `int`, `int`, `int`)   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    FINDELEMENT variableName, value(, startIndex, endIndex, completeMatch)
    FINDLASTEELEMENT variableName, value(, startIndex, endIndex, completeMatch)
    ```
    此函数用于从数组的指定范围内查找特定元素的位置。  
    `value` 的类型必须与 `variableName` 相同。  
    如果在 `startIndex` 和 `endIndex` 指定的数组元素搜索范围内，存在与 `value` 指定内容相同的元素，则返回其位置。  
    如果省略 `endIndex`，则搜索范围将覆盖到数组的最后一个元素。  
    如果存在多个匹配项，`FINDELEMENT` 返回第一个匹配项的位置，  
    `FINDLASTELEMENT` 返回最后一个匹配项的位置。如果没有匹配项，则返回 `-1`。  
    如果搜索目标是字符串类型，则可以像 [`REPLACE`](./REPLACE.md) 一样使用正则表达式。  
    `completeMatch` 仅在搜索目标是字符串类型时有效，如果为 `0`，则允许部分字符串匹配；  
    如果为非 `0` 值，则要求字符串完全匹配。

    `variableName` 中只能指定一维数组变量，不能指定多维数组。  
    如果在 `variableName` 中指定了 CFLAG 等角色数组，则仅对指定的角色进行计数。

!!! hint "提示"

    该功能同时支持指令和表达式函数。