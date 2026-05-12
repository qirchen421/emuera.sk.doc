---
hide:
  - toc
---

# UNCHECKED 系 — UNCHECKED 计算

| 函数名                                                                   | 参数        | 返回值 |
| :----------------------------------------------------------------------- | :---------- | :----- |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_ADD`](./UNCHECKED.md)       | `int`, `int` | `int`  |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_SUB`](./UNCHECKED.md)       | `int`, `int` | `int`  |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_MUL`](./UNCHECKED.md)       | `int`, `int` | `int`  |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_NEG`](./UNCHECKED.md)       | `int`        | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int UNCHECKED_ADD a, b
    int UNCHECKED_SUB a, b
    int UNCHECKED_MUL a, b
    int UNCHECKED_NEG a
    ```

    Skia（SkiaSharp版）新增。在 C# 的 `unchecked` 上下文中执行运算，溢出时不抛出异常，而是回环折返（wrap-around）。

    Skia 版中，普通算术运算符（`+`、`-`、`*`、一元 `-`）由 SafeArithmetic 提供溢出保护。溢出时会输出警告，并将结果钳位到 `Long.MaxValue` 或 `Long.MinValue`。

    然而，在哈希计算、随机数生成等场景中，**需要故意使用回环溢出行为**。UNCHECKED 系列函数即为这种向后兼容需求而提供。

    | 函数 | 对应运算 | 说明 |
    |:---|:---|:---|
    | `UNCHECKED_ADD(a, b)` | `a + b` | 加法回环溢出 |
    | `UNCHECKED_SUB(a, b)` | `a - b` | 减法回环溢出 |
    | `UNCHECKED_MUL(a, b)` | `a * b` | 乘法回环溢出 |
    | `UNCHECKED_NEG(a)` | `-a` | 取反回环溢出 |

!!! warning "注意"

    这些函数在溢出时**不会输出警告**。容易引入非预期的溢出 bug，请仅在确实需要回环行为的场景中使用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 普通加法（SafeArithmetic）：溢出时钳位
        ; 9223372036854775807 + 1 → Long.MaxValue（钳位，有警告）

        ; UNCHECKED_ADD：溢出时回环折返
        ; 9223372036854775807 + 1 → -9223372036854775808（折返，无警告）

        ; 哈希计算中的使用示例
        #DIM hash = 0
        hash = UNCHECKED_ADD(hash, UNCHECKED_MUL(31, someValue))
    ```
