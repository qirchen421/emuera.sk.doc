---
hide:
  - toc
---

# TOINT, ISNUMERIC, TOFLOAT

| 函数名                                                         | 参数     | 返回值 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.zh.md)     | `string` | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.zh.md) | `string` | `int`  |
| ![](../assets/images/IconSK.webp)[`TOFLOAT`](./TOINT.zh.md)      | `string` | `float`  |

!!! info "API"

    ```  { #language-erbapi }
	int TOINT string
	int ISNUMERIC string
    ```
    `TOINT` 将参数字符串数值化，并将结果赋值给 `RESULT:0` 或直接返回。但是，只有由半角数字构成的字符串才能被数值化。  
    如果参数无法被解释为数值，则将 `0` 赋值给 `RESULT:0` 或直接返回。全角数字的情况也同样处理。  
    当传入的值不确定时，在 `TOINT` 之前使用 `ISNUMERIC` 可以提高代码的稳定性。

    `ISNUMERIC` 用于判断字符串是否可以被解析为数值（即是否可以通过 `TOINT` 获取值）。  
    如果参数可以被解释为数值，则将 `1` 赋值给 `RESULT:0` 或直接返回；否则，赋值或返回 `0`。

!!! hint "提示"

    该函数同时支持作为指令和表达式函数使用。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS HOGES
        REPEAT 3
            SELECTCASE COUNT
                CASE 0
                    HOGES = 123
                CASE 1
                    HOGES = 一二三
                CASE 2
                    HOGES = １２３
            ENDSELECT
            IF ISNUMERIC(HOGES)
                PRINTFORML 变量HOGES可以转换为数值类型({TOINT(HOGES)})
            ELSE
                PRINTFORML 变量HOGES无法转换为数值类型(%HOGES%)
            ENDIF
        REND
        WAIT
    ```
    ``` title="结果"
    变量HOGES可以转换为数值类型(123)
    变量HOGES无法转换为数值类型(一二三)
    变量HOGES无法转换为数值类型(１２３)
    ```

!!! info "API — TOFLOAT"

    ![](../assets/images/IconSK.webp) Skia 新增

    ```  { #language-erbapi }
	float TOFLOAT string
    ```
    将字符串转换为浮点数。
    将参数字符串解释为浮点数，并将结果赋值给 `RESULTF:0` 或直接返回。
    如果参数无法被解释为数值，则将 `0.0` 赋值给 `RESULTF:0` 或直接返回。

!!! hint "提示"

    该函数同时支持作为指令和表达式函数使用。

!!! example "例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMF L_F
        L_F = TOFLOAT("3.14")          ; → 3.14
        L_F = TOFLOAT("-1.5e2")        ; → -150.0
        L_F = TOFLOAT("abc")           ; → 0.0（解析失败）
        PRINTFORML {L_F}
        WAIT
    ```
    ``` title="结果"
    0.0
    ```

### 相关项目
- [TOSTR](TOSTR.zh.md)