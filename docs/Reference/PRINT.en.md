---
hide:
  - toc
---

# PRINT Related

| Function name                                                                                                                                            | Arguments | Return   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------- | :------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)(\|K\|D)(\|L\|W\|N)</code>](./PRINT.md) | `string`  | none     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTV(|K|D)(|L|W|N) expression[, expression, ...]
    PRINTS(|K|D)(|L|W|N) stringVariable
    PRINTFORM(|K|D)(|L|W|N) formedString
    PRINTFORMS(|K|D)(|L|W|N) string
    ```
    Basic command for the PRINT family.

    ![](../assets/images/Iconeramaker.webp)The keyword in the first set of parentheses specifies the argument type.

    - None - (<string>)
    - V - (<expression> <expression> ,<expression> ...)
    - S - <string expression>
    - FORM - (<formed string>)
    - FORMS - <formed string expression>

    ![](../assets/images/IconEmuera.webp)The "K" in the second set of parentheses specifies whether to apply the FORCEKANA command. The "D" keyword specifies to ignore the SETCOLOR command. Keywords K and D cannot be used together.

    - None - Ignores `FORCEKANA` and draws with the color specified by `SETCOLOR`.
    - K - Applies `FORCEKANA` when drawing.
    - D - Ignores `SETCOLOR` and draws with the default color specified in config.

    ![](../assets/images/Iconeramaker.webp)The keyword in the third set of parentheses specifies whether to add a newline after drawing and whether to wait.

    - None - `PRINT` alone, no newline or `WAIT`.
    - L - Newline after `PRINT`.
    - W - Newline after `PRINT` and executes `WAIT` command.
    - ![](../assets/images/Icondotnet.webp)N - Executes `WAIT` command after `PRINT` without newline. Cannot be combined with keywords K or D in the second set of parentheses.
    - For example, `PRINTSDW` means: takes a <string expression> as argument, draws with default color, and executes `WAIT` command after `PRINT`.

!!! hint "Hint"

    Command only.

!!! example "Example"

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
    	HOGES = サンプルはこれでおわり
    	FORCEKANA 2
    	PRINTK ﾌﾟﾘﾝﾄの
    	PRINTFORMKW %HOGES%
    ```
    ![](../assets/images/PRINT.png)

### Related Items
- [PRINTBUTTON](PRINTBUTTON.md)
- [BITMAP_CACHE_ENABLE](BITMAP_CACHE_ENABLE.md)
- [Extensions added in Emuera>Formatted String (FORM syntax) Extensions](../Emuera/expression.en.md#formatted-string-form-syntax-extension)
