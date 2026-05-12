---
hide:
  - toc
---

# UNCHECKED Arithmetic

| Function name                                                            | Arguments    | Return |
| :----------------------------------------------------------------------- | :----------- | :----- |
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

    Added in Skia (SkiaSharp version). Performs arithmetic in C# `unchecked` context, wrapping around on overflow instead of throwing an exception.

    In the Skia version, standard arithmetic operators (`+`, `-`, `*`, unary `-`) are protected by SafeArithmetic. On overflow, a warning is printed and the result is clamped to `Long.MaxValue` or `Long.MinValue`.

    However, scenarios such as hash computation and random number generation **intentionally require wrap-around overflow behavior**. The UNCHECKED series provides these for backward compatibility.

    | Function | Operation | Description |
    |:---|:---|:---|
    | `UNCHECKED_ADD(a, b)` | `a + b` | Wrap-around addition |
    | `UNCHECKED_SUB(a, b)` | `a - b` | Wrap-around subtraction |
    | `UNCHECKED_MUL(a, b)` | `a * b` | Wrap-around multiplication |
    | `UNCHECKED_NEG(a)` | `-a` | Wrap-around negation |

!!! warning "Caution"

    These functions do **not** print warnings on overflow. This makes it easy to introduce unintended overflow bugs. Use only when wrap-around behavior is genuinely required.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Normal addition (SafeArithmetic): clamped on overflow
        ; 9223372036854775807 + 1 → Long.MaxValue (clamped, warning printed)

        ; UNCHECKED_ADD: wraps around on overflow
        ; 9223372036854775807 + 1 → -9223372036854775808 (wrap-around, no warning)

        ; Usage in hash computation
        #DIM hash = 0
        hash = UNCHECKED_ADD(hash, UNCHECKED_MUL(31, someValue))
    ```
