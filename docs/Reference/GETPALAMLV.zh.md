---
hide:
  - toc
---

# GETPALAMLV, GETEXPLV

| 函数名                                                               | 参数         | 返回值 |
| :------------------------------------------------------------------- | :----------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.md) | `int`, `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.md)   | `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    GETPALAMLV int, maxLV
    GETEXPLV int, maxLV
    ```
    将给定值与 `PALAMLV` 和 `EXPLV` 进行比较，并将该参数在 `PALAMLV` 和 `EXPLV` 中达到或超过的等级赋值给 `RESULT:0`。  
    第二个参数表示要调查的最大等级。请在使用前设置好 `PALAMLV` 和 `EXPLV` 的值。

!!! hint "提示"

    该函数既可作为指令使用，也可在表达式中作为函数使用。

### 相关项目
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — GETPALAMLV/GETEXPLV 属于第一代"数值→等级查询"