---
hide:
  - toc
---

# Math Extension Functions

## Basic Math Functions

| Function name                                                                  | Arguments | Return |
| :----------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)            | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)             | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)           | `int`     | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.md)        | `int`     | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBRT value
    int LOG value
    int LOG10 value
    int EXPOMENT value
    ```

    From the private modification changelog:

        Added mathematical functions as expression functions
        CBRT (cube root)
        LOG (natural logarithm)
        LOG10 (common logarithm)
        EXPONENT (exponential function)
        Format for all: functionName(argument)

    Since Emuera cannot handle decimal values, some ingenuity is required when using these functions.

## Trigonometric Functions

| Function name                                                          | Arguments     | Return                     |
| :--------------------------------------------------------------------- | :------------ | :------------------------- |
| ![](../assets/images/IconSK.webp)[`SIN`](./MATH_EXTENSION.md)          | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`COS`](./MATH_EXTENSION.md)          | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`TAN`](./MATH_EXTENSION.md)          | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`ASIN`](./MATH_EXTENSION.md)         | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`ACOS`](./MATH_EXTENSION.md)         | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`ATAN`](./MATH_EXTENSION.md)         | `int`/`float` | `int`/`float` (same type)  |

!!! info "API"

    ```  { #language-erbapi }
    int/float SIN angle
    int/float COS angle
    int/float TAN angle
    int/float ASIN value
    int/float ACOS value
    int/float ATAN value
    ```

    Added in Skia (SkiaSharp version). C# native trigonometric functions.

    **Same-name overloads**: No Int/Float variant distinction (no F suffix). Returns Float when the argument is Float, Int when the argument is Int. Consistent with operator overloading (`1 + 2.0` returns Float, `SIN(1.0)` also returns Float).

    - Parameters are in **radians**. To convert from degrees, use `angle * PI() / 180`.
    - `ASIN`/`ACOS` arguments must be in the range `[-1, 1]`. Out-of-range values will throw an error.
    - Int version returns truncated integer values (e.g., `SIN(1) = 0`, since sin(1 rad) ≈ 0.84 → truncated to 0).
    - Float version returns full double-precision floating-point numbers.

## Rounding Functions

| Function name                                                            | Arguments     | Return                     |
| :----------------------------------------------------------------------- | :------------ | :------------------------- |
| ![](../assets/images/IconSK.webp)[`FLOOR`](./MATH_EXTENSION.md)         | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`CEIL`](./MATH_EXTENSION.md)          | `int`/`float` | `int`/`float` (same type)  |
| ![](../assets/images/IconSK.webp)[`ROUND`](./MATH_EXTENSION.md)         | `int`/`float` | `int`/`float` (same type)  |

!!! info "API"

    ```  { #language-erbapi }
    int/float FLOOR value
    int/float CEIL value
    int/float ROUND value
    ```

    Added in Skia (SkiaSharp version). Rounding functions. Same-name overloads (same as trigonometric functions).

    - `FLOOR`: Rounds toward negative infinity.
    - `CEIL`: Rounds toward positive infinity.
    - `ROUND`: Rounds to nearest, using `MidpointRounding.AwayFromZero` (0.5 rounds away from zero).
    - Int version has no practical effect on integer arguments (integers are already integers). Provided mainly for semantic completeness.
    - Float version returns floating-point results.

!!! hint "Hint"

    Basic math functions support both command and expression forms. Trigonometric and rounding functions are expression-only (use within expressions).

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Trigonometric (radians, Int arg → Int return)
        PRINTFORML SIN(1) = {SIN(1)}
        PRINTFORML COS(1) = {COS(1)}

        ; Float version (Float arg → Float return)
        #DIMF rad = 0.7853981633974483
        PRINTFORML SIN(rad) = {SIN(rad)}
        PRINTFORML COS(rad) = {COS(rad)}

        ; Inverse trigonometric
        PRINTFORML ASIN(0) = {ASIN(0)}
        PRINTFORML ACOS(0) = {ACOS(0)}

        ; Rounding
        #DIMF val = 3.7
        PRINTFORML FLOOR(val) = {FLOOR(val)}
        PRINTFORML CEIL(val) = {CEIL(val)}
        PRINTFORML ROUND(val) = {ROUND(val)}
    ```
    ``` title="Result"
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
