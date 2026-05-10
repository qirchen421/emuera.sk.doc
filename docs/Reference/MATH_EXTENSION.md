---
hide:
  - toc
---

# 数学拡張関数

## 基本数学関数

| 関数名                                                                 | 引数  | 戻り値 |
| :--------------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.md)     | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.md)      | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.md)    | `int` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.md) | `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBRT value
    int LOG value
    int LOG10 value
    int EXPOMENT value
    ```

    以下、私家改造版更新履歴より

        数学関数を式中関数として追加
        CBRT（三重根）
        LOG（自然対数）
        LOG10（常用対数）
        EXPONENT（指数関数）
        書式は全部：関数名(引数)

    Emueraでは小数を扱うことができないため、使用の際には工夫を必要とします。

## 三角関数

| 関数名                                                          | 引数          | 戻り値              |
| :-------------------------------------------------------------- | :------------ | :------------------ |
| ![](../assets/images/IconSK.webp)[`SIN`](./MATH_EXTENSION.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`COS`](./MATH_EXTENSION.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`TAN`](./MATH_EXTENSION.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ASIN`](./MATH_EXTENSION.md)  | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ACOS`](./MATH_EXTENSION.md)  | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ATAN`](./MATH_EXTENSION.md)  | `int`/`float` | `int`/`float`（同型） |

!!! info "API"

    ```  { #language-erbapi }
    int/float SIN angle
    int/float COS angle
    int/float TAN angle
    int/float ASIN value
    int/float ACOS value
    int/float ATAN value
    ```

    Skia（SkiaSharp版）で追加。C#ネイティブの三角関数です。

    **同名オーバーロード**：関数名にInt/Float版の区別はありません（Fサフィックスなし）。引数がFloat型の場合はFloatを，Int型の場合はIntを返します。演算子のオーバーロードと同様（`1 + 2.0`がFloatを返すように，`SIN(1.0)`もFloatを返す）。

    - パラメータは**ラジアン**です。度数から変換するには `angle * PI() / 180` を使用してください。
    - `ASIN`/`ACOS`の引数は `[-1, 1]` の範囲内である必要があります。範囲外の場合エラーが発生します。
    - Int版は小数部を切り捨てた整数値を返します（例：`SIN(1) = 0`，sin(1 rad) ≈ 0.84 → 切り捨てで0）。
    - Float版は完全なdouble精度の浮動小数点数を返します。

## 端数処理

| 関数名                                                            | 引数          | 戻り値              |
| :---------------------------------------------------------------- | :------------ | :------------------ |
| ![](../assets/images/IconSK.webp)[`FLOOR`](./MATH_EXTENSION.md)   | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`CEIL`](./MATH_EXTENSION.md)    | `int`/`float` | `int`/`float`（同型） |
| ![](../assets/images/IconSK.webp)[`ROUND`](./MATH_EXTENSION.md)   | `int`/`float` | `int`/`float`（同型） |

!!! info "API"

    ```  { #language-erbapi }
    int/float FLOOR value
    int/float CEIL value
    int/float ROUND value
    ```

    Skia（SkiaSharp版）で追加。端数処理関数です。同名オーバーロード（三角関数と同様）。

    - `FLOOR`：負の無限大方向への切り捨て。
    - `CEIL`：正の無限大方向への切り上げ。
    - `ROUND`：四捨五入（`MidpointRounding.AwayFromZero`，0.5はゼロから遠い方に丸める）。
    - Int版は整数引数に対して実質的な効果はありません（整数自体が既に整数であるため）。主に意味的な完全性のために提供されます。
    - Float版は浮動小数点数の結果を返します。

!!! hint "ヒント"

    基本数学関数は命令・式中関数両方対応。三角関数・端数処理は式中関数のみ（式内で使用）。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 三角関数（ラジアン，Int引数→Int戻り値）
        PRINTFORML SIN(1) = {SIN(1)}
        PRINTFORML COS(1) = {COS(1)}

        ; Float版（Float引数→Float戻り値）
        #DIMF rad = 0.7853981633974483
        PRINTFORML SIN(rad) = {SIN(rad)}
        PRINTFORML COS(rad) = {COS(rad)}

        ; 反三角関数
        PRINTFORML ASIN(0) = {ASIN(0)}
        PRINTFORML ACOS(0) = {ACOS(0)}

        ; 端数処理
        #DIMF val = 3.7
        PRINTFORML FLOOR(val) = {FLOOR(val)}
        PRINTFORML CEIL(val) = {CEIL(val)}
        PRINTFORML ROUND(val) = {ROUND(val)}
    ```
    ``` title="結果"
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
