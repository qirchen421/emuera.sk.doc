---
hide:
  - toc
---

# PRINT 系

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)(\|K\|D)(\|L\|W\|N)</code>](./PRINT.zh.md) | `string` | 无 |

!!! info "API"

    ```  { #language-erbapi }
    PRINTV(|K|D)(|L|W|N) expression[, expression, ...]
    PRINTS(|K|D)(|L|W|N) stringVariable
    PRINTFORM(|K|D)(|L|W|N) formedString
    PRINTFORMS(|K|D)(|L|W|N) string
    ```
    PRINT系列的基本指令。

    ![](../assets/images/Iconeramaker.webp)第一个括号内的关键字指定参数类型。

    - 无 - (<字符串>)
    - V - (<表达式> [, <表达式> ……]) — 每个参数独立求值，整数表达式输出数值，字符串表达式输出文本
    - S - <字符串表达式>
    - FORM - (<格式化字符串>)
    - FORMS - <格式化字符串表达式>

    ![](../assets/images/IconEmuera.webp)第二个括号内的关键字"K"指定应用FORCEKANA指令。关键字"D"指定忽略SETCOLOR指令。关键字K和D不能同时指定。

    - 无 - 忽略`FORCEKANA`，并以`SETCOLOR`指定的颜色绘制。
    - K - 应用`FORCEKANA`进行绘制。
    - D - 忽略`SETCOLOR`，以配置中指定的默认颜色绘制。

    ![](../assets/images/Iconeramaker.webp)第三个括号内的关键字指定绘制后的换行和WAIT是否存在。

    - 无 - 仅`PRINT`，不换行也不执行`WAIT`。
    - L - `PRINT`后换行。
    - W - `PRINT`后换行并执行`WAIT`指令。
    - ![](../assets/images/Icondotnet.webp)N - `PRINT`后不换行，仅执行`WAIT`指令。目前不能与第二个括号内的关键字K或D组合使用。
    - 这些组合使得例如`PRINTSDW`意味着：以<字符串表达式>为参数，以默认颜色绘制，并在`PRINT`后执行`WAIT`指令。

!!! hint "提示"

    仅支持作为指令使用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
    #DIM HOGE
    #DIMS HOGES
    	PRINT 1+2=
    	HOGE = 3
    	PRINTV HOGE
    	PRINTL
    	PRINT HOGES is
    	HOGES = String
    	PRINTSL HOGES
    	PRINT HOGE*HOGE=
    	PRINTFORMSL HOGES*HOGE
    	SETCOLORBYNAME yellow
    	HOGE = GETCOLOR()
    	PRINTFORML Now color is R:{HOGE/0x10000} G:{HOGE/0x100%0x100} B:{HOGE%0x100}
    	HOGES = but PRINTD will ignore SETCOLOR
    	PRINTSDL HOGES
    	HOGES = 示例到此结束
    	FORCEKANA 2
    	PRINTK 打印的
    	PRINTFORMKW %HOGES%
    ```
    ![](../assets/images/PRINT.png)

### 相关项目
- [基本输出](../tutorial/basic-output.zh.md) — PRINT 系列教程：参数类型、行为后缀、输出颜色、按钮
- [PRINTBUTTON](PRINTBUTTON.zh.md)
- [BITMAP_CACHE_ENABLE](BITMAP_CACHE_ENABLE.zh.md)
- [Emuera新增语法>格式化字符串（FORM语法）扩展](../Emuera/expression.md#form_1)
