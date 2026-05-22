---
hide:
  - toc
---

# 数学扩展函数

## 基本数学函数

| 函数名                                                                 | 参数  | 返回值 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.zh.md)     | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.zh.md)      | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.zh.md)    | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.zh.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBRT value
    int LOG value
    int LOG10 value
    int EXPOMENT value
    ```

    以下摘自私家改造版更新日志

        新增数学函数作为表达式内函数
        CBRT（立方根）
        LOG（自然对数）
        LOG10（常用对数）
        EXPONENT（指数函数）
        所有格式均为：函数名(参数)

    由于 Emuera 无法处理小数，使用时需要一些技巧。

## 三角函数

| 函数名                                                          | 参数          | 返回值              |
| :-------------------------------------------------------------- | :------------ | :------------------ |
| ![](../assets/images/IconSK.webp)[`SIN`](./MATH_EXTENSION.zh.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`COS`](./MATH_EXTENSION.zh.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`TAN`](./MATH_EXTENSION.zh.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ASIN`](./MATH_EXTENSION.zh.md)  | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ACOS`](./MATH_EXTENSION.zh.md)  | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ATAN`](./MATH_EXTENSION.zh.md)  | `int`/`float` | `int`/`float`（同型） |

!!! info "API"

    ```  { #language-erbapi }
    int/float SIN angle
    int/float COS angle
    int/float TAN angle
    int/float ASIN value
    int/float ACOS value
    int/float ATAN value
    ```

    Skia（SkiaSharp版）新增。C# 原生三角函数。

    **同名重载**：函数名不区分 Int/Float 版本（无 F 后缀变体）。当参数为 Float 类型时返回 Float，为 Int 类型时返回 Int。与运算符重载一致（`1 + 2.0` 返回 Float，`SIN(1.0)` 也返回 Float）。

    - 参数均为**弧度制**。如需角度转弧度，使用 `angle * PI() / 180`。
    - `ASIN`/`ACOS` 的参数必须在 `[-1, 1]` 范围内，超出时抛出错误。
    - Int 版本返回截断小数后的整数值（如 `SIN(1) = 0`，因为 sin(1 rad) ≈ 0.84 → 截断为 0）。
    - Float 版本返回完整的 double 精度浮点数。

## 端数处理

| 函数名                                                            | 参数          | 返回值              |
| :---------------------------------------------------------------- | :------------ | :------------------ |
| ![](../assets/images/IconSK.webp)[`FLOOR`](./MATH_EXTENSION.zh.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`CEIL`](./MATH_EXTENSION.zh.md)    | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ROUND`](./MATH_EXTENSION.zh.md)   | `int`/`float` | `int`/`float`（同型） |

!!! info "API"

    ```  { #language-erbapi }
    int/float FLOOR value
    int/float CEIL value
    int/float ROUND value
    ```

    Skia（SkiaSharp版）新增。端数处理函数。同名重载（与三角函数相同）。

    - `FLOOR`：向下取整（向负无穷方向）。
    - `CEIL`：向上取整（向正无穷方向）。
    - `ROUND`：四舍五入（`MidpointRounding.AwayFromZero`，0.5 向远离零的方向舍入）。
    - Int 版本对整数参数无实际效果（整数本身已是整数），主要供语义完整性使用。
    - Float 版本返回浮点数结果。

!!! hint "提示"

    基本数学函数同时支持命令和表达式内函数。三角函数和端数处理仅支持表达式内函数（在表达式中使用）。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 三角函数（弧度制，Int参数→Int返回值）
        PRINTFORML SIN(1) = {SIN(1)}
        PRINTFORML COS(1) = {COS(1)}

        ; Float版（Float参数→Float返回值）
        #DIMF rad = 0.7853981633974483
        PRINTFORML SIN(rad) = {SIN(rad)}
        PRINTFORML COS(rad) = {COS(rad)}

        ; 反三角函数
        PRINTFORML ASIN(0) = {ASIN(0)}
        PRINTFORML ACOS(0) = {ACOS(0)}

        ; 端数处理
        #DIMF val = 3.7
        PRINTFORML FLOOR(val) = {FLOOR(val)}
        PRINTFORML CEIL(val) = {CEIL(val)}
        PRINTFORML ROUND(val) = {ROUND(val)}
    ```
    ``` title="输出结果"
    SIN(1) = 0
    COS(1) = 0
    SIN(rad) = 0.707106781186548
    COS(rad) = 0.707106781186548
    ASIN(0) = 0
    ACOS(0) = 1
    FLOOR(val) = 3
    CEIL(val) = 4
    ROUND(val) = 4
    ```
