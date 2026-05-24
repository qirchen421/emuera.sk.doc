## List of commands and functions

---

## Icons meaning

- ![](../assets/images/Iconeramaker.webp) - Commands available from eramaker
- ![](../assets/images/IconEmuera.webp) - Commands added, changed, and extended in Emuera
- ![](../assets/images/IconEM.webp) - Commands added, changed, or extended in EM (EvilMask version)
- ![](../assets/images/IconEE.webp) - Commands added, changed, or extended in EE (Enterprise Edition)
- ![](../assets/images/Icondotnet.webp) - Commands added, changed, or extended in [Emuera.NET](https://gitlab.com/VVIIlet/emuera)
- ![](../assets/images/IconSK.webp) - Commands added, changed, or extended in Skia (SkiaSharp)
- ![](../assets/images/Iconetc.webp) - Commands added, modified, or extended by other contributors

**Return value notation**: `void`¹ means the instruction itself does not return a value, but [`RETURN`](./RETURN.en.md) in the called function sets `RESULT`; at the function end, `RESULT:0 = 0` is implicitly set. `none` means the instruction does not return a value and does not affect `RESULT`.

## Tutorial Cross-Reference

For detailed explanations and usage examples of each category, see the corresponding tutorial chapter.

| Reference Category | Tutorial Chapter |
|:--|:--|
| PRINT related / Display & font operations | [Basic Output](../tutorial/basic-output.en.md) |
| String manipulation & reference | [FORM Syntax](../tutorial/form-syntax.en.md) |
| Arithmetics | [Assignment Statements](../tutorial/assignment.en.md) |
| Character operations & reference / Variable & CSV reference | [Character Variables](../tutorial/character-variables.en.md) / [Variable Declaration](../tutorial/variable-declaration.en.md) |
| Loop & branching | [Conditional Branching](../tutorial/condition.en.md) / [Loops](../tutorial/loop.en.md) |
| Function (CALL etc.) / RETURN related | [Functions & CALL](../tutorial/call.en.md) / [Jumps](../tutorial/jump.en.md) |
| Input & wait | [Functions & CALL](../tutorial/call.en.md) (INPUT section) |
| HTML related | [HTML Tag Syntax](../tutorial/html-syntax.en.md) |
| Image processing / Sound related | [ERB File Format Extensions](../tutorial/erb-format-extension.en.md) |
| Save data operations | [ERB File Format Extensions](../tutorial/erb-format-extension.en.md) (Save data section) |

---

### PRINT related { #print }

| Function name                                                                                                                                     | Arguments                                                    | Return   |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)(\|K\|D)(\|L\|W)</code>](./PRINT.en.md) | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(\|V\|S\|FORM\|FORMS)(\|K\|D)</code>](./PRINTSINGLE.en.md)                                    | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(\|FORM)(C\|LC)(\|K\|D)</code>](./PRINTC.en.md)                                                     | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTDATA(\|K\|D)(\|L\|W)</code>](./PRINTDATA.en.md)                                                     | none                                                         | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTBUTTON(\|C\|LC)</code>](./PRINTBUTTON.en.md)                                                        | `string`, `any`                                              | none     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(\|FORM)</code>](./PRINTPLAIN.en.md)                                                           | `string`                                                     | none     |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.en.md)                                                                                | none                                                         | none     |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.en.md)                                                                      | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.en.md)                                                                        | `formedString`                                               | none     |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.en.md)                                                                              | `string`                                                     | `string` |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.en.md)                                                                        | `string`                                                     | none     |
| ![](../assets/images/IconEmuera.webp)[`CLEARLINE`](./CLEARLINE.en.md)                                                                                | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.en.md)                                                                           | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.en.md)                                                                        | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.en.md)                                                                          | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.en.md)                                                                           | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.en.md)                                                                         | `int`                                                        | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.en.md)                                                                          | none                                                         | none     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.en.md)                                                                      | none                                                         | none     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.en.md)                                               | `string`                                                     | none     |
|                                                                                                                                                   | `string`, `int`, `int`, `int`                                | none     |
|                                                                                                                                                   | `string`, `string`, `int`, `int`, `int`                      | none     |
|                                                                                                                                                   | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | none     |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.en.md)                                                                              | `int`                                                        | none     |
|                                                                                                                                                   | `int`, `int`, `int`, `int`                                   | none     |
| ![](../assets/images/IconEmuera.webp)[`PRINT_SPACE`](./PRINT_SPACE.en.md)                                                                            | `int`                                                        | none     |
| ![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)N</code>](./PRINTN.en.md) | `string` | none   |

### Display operation, font operation, display specifications { #display-font }

| Function name                                                                  | Arguments           | Return   |
| :----------------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.en.md)                       | `int`, `int`, `int` | none     |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.en.md)                      | `int`, `int`, `int` | none     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.en.md)               | `int`, `int`, `int` | none     |
|                                                                                | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.en.md)             | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.en.md)           | `int`, `int`, `int` | none     |
|                                                                                | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.en.md)         | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLORBYNAME`](./SETCOLORBYNAME.en.md)   | `colorName`         | none     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.en.md) | `colorName`         | none     |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.en.md)               | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.en.md)             | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.en.md)            | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.en.md)          | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.en.md)          | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.en.md)         | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.en.md)       | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.en.md)        | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.en.md)      | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.en.md)         | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.en.md)                 | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.en.md)                 | `string`            | none     |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.en.md)                 | none                | `string` |
| ![](../assets/images/IconEmuera.webp)[`FORCEKANA`](./FORCEKANA.en.md)             | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.en.md)             | `keyword`           | none     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.en.md)          | none                | `string` |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.en.md)                   | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.en.md)            | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.en.md)     | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCLENGTH`](./PRINTCLENGTH.en.md)       | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.en.md)         | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`BARSTR`](./BARSTR.en.md)                   | `int`, `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.en.md)               | `int`, `option`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.en.md)            | `int`               | none     |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.en.md)              | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.en.md)           | none                | none     |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.en.md)              | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.en.md)           | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.en.md)             | none                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.en.md)       | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.en.md)        | `int`, `int`, `int` | `string` |
| ![](../assets/images/IconEE.webp)[`SKIPLOG`](./SKIPLOG.en.md)                     | `int`               | `void`   |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.en.md)       | `int`               | `string` |
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.en.md)       | `int`               | `void` |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_ON`](./TEXT_BGC.en.md) | `int`, `int`, `int`, `int` | `void` |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_OFF`](./TEXT_BGC.en.md) | none | `void` |
| ![](../assets/images/IconSK.webp)[`STRICT_FONT_FALLBACK`](./STRICT_FONT_FALLBACK.en.md) | `int` | `void` |


### String Manipulation and Reference { #string-operations }

| Function name                                                       | Arguments                                         | Return   |
| :------------------------------------------------------------------ | :------------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.en.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.en.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.en.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.en.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.en.md)          | `int`, `option`                                   | `string` |
| ![](../assets/images/IconSK.webp)[`TOSTRF`](./TOSTR.en.md)          | `float`{, `option`}                                | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.en.md)          | `string`                                          | `int`    |
| ![](../assets/images/IconSK.webp)[`TOFLOAT`](./TOINT.en.md)          | `string`                                          | `float`    |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.en.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.en.md)        | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.en.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.en.md)    | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.en.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.en.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.en.md)   | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.en.md)  | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.en.md) | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.en.md)      | `string`, `int`                                   | `string` |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.en.md)      | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.en.md)     | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.en.md)    | `string`, `string`                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.en.md)          | `string`, `string`, `stringArray`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.en.md)        | `stringArray`(, `string`, `int`, `int`)           | `string` |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.en.md)      | `string`, `string`, `string`                      | `string` |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.en.md)        | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.en.md)      | `int`                                             | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.en.md)  | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.en.md)      | `string`                                          | `string` |
| ![](../assets/images/IconSK.webp)[`EVAL`](./EVAL.en.md)            | `string`(, `int`)                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`EVALS`](./EVAL.en.md)           | `string`(, `string`)                              | `string` |
| ![](../assets/images/IconSK.webp)[`EVALF`](./EVAL.en.md)           | `string`(, `float`)                               | `float`  |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.en.md)  | `string`, `string`(, `int`)                       | `int`    |
|                                                                     | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`    |

### Arithmetics { #arithmetic }

| Function name                                                             | Arguments                                    | Return   |
| :------------------------------------------------------------------------ | :------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.en.md)              | `int`, `float`                               | none     |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.en.md)                | `integerVariable`, `int`, `int`              | `int`    |
|                                                                           | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.en.md)                    | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.en.md)                   | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SQRT`](./SQRT.en.md)                  | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.en.md)        | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.en.md)         | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.en.md)       | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.en.md)    | `int`                                        | `int`    |
| ![](../assets/images/IconSK.webp)[`SIN`](./MATH_EXTENSION.en.md)              | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`COS`](./MATH_EXTENSION.en.md)              | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`TAN`](./MATH_EXTENSION.en.md)              | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ASIN`](./MATH_EXTENSION.en.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ACOS`](./MATH_EXTENSION.en.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ATAN`](./MATH_EXTENSION.en.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`FLOOR`](./MATH_EXTENSION.en.md)            | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`CEIL`](./MATH_EXTENSION.en.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ROUND`](./MATH_EXTENSION.en.md)            | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_ADD`](./UNCHECKED.en.md)   | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_SUB`](./UNCHECKED.en.md)   | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_MUL`](./UNCHECKED.en.md)   | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_NEG`](./UNCHECKED.en.md)   | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.en.md)       | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.en.md)       | `integerVariable`, `int`(, `int`...)         | none     |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.en.md)     | `integarVariable`, `int`(, `int`...)         | none     |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.en.md)    | `integarVariable`, `int`(, `int`...)         | none     |
| ![](../assets/images/IconSK.webp)[`BITSET`](./BITARRAY.en.md)           | `ref int[]`, `int`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconSK.webp)[`BITGET`](./BITARRAY.en.md)           | `ref int[]`, `int`                           | `int`    |
| ![](../assets/images/IconSK.webp)[`BITTOGGLE`](./BITARRAY.en.md)        | `ref int[]`, `int`                           | `int`    |
| ![](../assets/images/IconSK.webp)[`BITINDEXOFFIRST`](./BITARRAY.en.md)  | `ref int[]`(, `int`)                         | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.en.md)                    | `int`(, `int`...)                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.en.md)                    | `int`(, `int`...)                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.en.md)                  | `int`, `int`, `int`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.en.md)                | `int`, `int`, `int`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.en.md)          | `integerArray`(, `int`, `int`)               | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.en.md)                | `array`, `any`, `int`, `int`                 | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALL`](./MATCHALL.en.md) | `variable`, `any`(, `int`, `int`, `variable`) | `int` |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALLEX`](./MATCHALL.en.md) | `string`, `any`(, `int`, `int`, `variable`) | `int` |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.en.md)       | `integerArray`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.en.md)       | `integerArray`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.en.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.en.md)              | `charaArray`, `any`(, `int`, `int`)          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.en.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.en.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.en.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.en.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.en.md)      | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.en.md)         | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.en.md)        | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CONVERT`](./CONVERT.en.md)            | `int`, `int`                                 | `string` |

### Character operation/reference { #character-operations }

| Function name                                                                                           | Arguments                              | Return |
| :------------------------------------------------------------------------------------------------------ | :------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`ADDCHARA`](./ADDCHARA.en.md) | `int`(, `int`,...)                     | none   |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.en.md) | `int`(, `int`,...)                     | none   |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.en.md)                                      | `int`, `int`                           | none   |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.en.md)                                      | `charaVariable`, `keyword`             | none   |
| ![](../assets/images/IconEmuera.webp)[`GETCHARA`](./GETCHARA.en.md)                                        | `int`                                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.en.md)                                  | none                                   | none   |
| ![](../assets/images/IconEmuera.webp)[`ADDVOIDCHARA`](./ADDVOIDCHARA.en.md)                                | none                                   | none   |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.en.md)                                  | none                                   | none   |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.en.md)                                  | `int`(, `int`...)                      | none   |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.en.md)                                        | `int`                                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.en.md)                                      | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.en.md)                                  | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`COPYCHARA`](./COPYCHARA.en.md)                                      | `int`, `int`                           | none   |
| ![](../assets/images/IconEmuera.webp)[`ADDCOPYCHARA`](./ADDCOPYCHARA.en.md)                                | `int`                                  | none   |

### Variable manipulation, variable reference, CSV reference { #variable-operations }

| Function name                                                              | Arguments                                     | Return   |
| :------------------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.en.md)           | none                                          | none     |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.en.md)             | `variable`                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.en.md)           | `variable`(, `dimension`)                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.en.md)         | none                                          | none     |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.en.md)     | none                                          | none     |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.en.md)     | `int`                                         | none     |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.en.md)                   | `variable`, `variable`                        | none     |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.en.md)             | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.en.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.en.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.en.md)       | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.en.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.en.md)          | `int`, `int`                                  | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.en.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.en.md)        | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.en.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.en.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.en.md)      | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.en.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.en.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CFLAG`](./CSV_STATUS.en.md)            | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.en.md)               | `variable`, `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNAME`](./GETCSVNOBY.en.md)       | `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNICKNAME`](./GETCSVNOBY.en.md)   | `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYCALLNAME`](./GETCSVNOBY.en.md)   | `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYMASTERNAME`](./GETCSVNOBY.en.md) | `string`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.en.md)       | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.en.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.en.md)     | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.en.md) | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.en.md)               | `variable`(, `value`, `int`, `int`)           | none     |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.en.md)             | `charaVariable`(, `int`, `int`, `int`, `int`) | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.en.md)       | `variable`, `int`, `value`(, `int`, `int`)    | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.en.md)     | `variable`, `int`, `int`                      | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.en.md)         | `variable`(, `sortFormat`, `int`, `int`)      | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.en.md)         | `varible`, `variable`                         | none     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.en.md)       | `variable`(, `variable`...)                   | none     |
| ![](../assets/images/IconEmuera.webp)[`CUPCHECK`](./CUPCHECK.en.md)           | `int`                                         | none     |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.en.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.en.md)               | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.en.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.en.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.en.md)           | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.en.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.en.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.en.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.en.md)   | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.en.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.en.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.en.md)                | `string`                                      | `int`    |
| ![](../assets/images/IconSK.webp)[`GETVARF`](./GETSETVAR.en.md)               | `string`                                      | `float`  |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.en.md)               | `string`                                      | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.en.md)                | `string`, `any`                               | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.en.md)               | `string`, `any`(, `int`, `int`, `int`)        | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.en.md)       | `string`, `ref` `string[]`(, `int`, `int`)    | `1`      |
|                                                                            | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`      |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.en.md)                 | `variable`, `int`(, `int`)                    | `string` |
| ![](../assets/images/Icondotnet.webp)[`VARI`](./VAR.en.md) | `string`(, `int`) | none   |
| ![](../assets/images/Icondotnet.webp)[`VARS`](./VAR.en.md) | `string`(, `int`) | none   |

### Save data operations { #save-data }

| Function name                                                                                       | Arguments                             | Return   |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------ | :------- |
| ![](../assets/images/Iconeramaker.webp)[`PUTFORM`](./PUTFORM.en.md)                                    | `string`                              | none     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVEDATA`](./SAVEDATA.en.md)                                    | `int`, `string`                       | none     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADDATA`](./LOADDATA.en.md)                                    | `int`                                 | none     |
| ![](../assets/images/IconEmuera.webp)[`DELDATA`](./DELDATA.en.md)                                      | `int`                                 | none     |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.en.md)                                      | `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.en.md)                                      | `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.en.md)                                | none                                  | none     |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.en.md)                                | none                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.en.md) | (`string`)                            | none     |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.en.md)                                  | `string`, `string`, `int`(, `int`...) | none     |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.en.md)                                  | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.en.md)                            | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.en.md)                        | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.en.md)   | `string`, `int`(, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.en.md)   | `int`(, `int`, `int`)                 | `string` |

### Get date and time { #datetime }

| Function name                                                                | Arguments | Return          |
| :--------------------------------------------------------------------------- | :--- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.en.md)               | none | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.en.md)             | none | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.en.md)            | none | `string`        |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.en.md) | none | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETSECOND`](./GETSECOND.en.md)           | none | `int`           |

### Input/Wait { #input-wait }

| Function name                                                              | Arguments                                 | Return           |
| :------------------------------------------------------------------------- | :---------------------------------------- | :--------------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.en.md)               | (`int`, `int`, `int`)                     | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.en.md)              | (`int`, `int`, `int`)                     | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`WAIT`](./WAIT.en.md)                 | none                                      | `void`           |
| ![](../assets/images/IconEmuera.webp)[`FORCEWAIT`](./FORCEWAIT.en.md)         | none                                      | none             |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.en.md)               | `int`, `int`(, `int`, `string`, `int`)    | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.en.md)              | `int`, `int`(, `int`, `string`, `int`)    | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.en.md)                 | `int`, `int`                              | none             |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.en.md)           | `int`(, `int`)                            | `int`            |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.en.md)          | `string`(, `int`)                         | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.en.md)         | `int`, `int`(, `int`, `string`, `int`)    | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.en.md)        | `int`, `string`(, `int`, `string`, `int`) | `string`         |
| ![](../assets/images/IconEmuera.webp)[`WAITANYKEY`](./WAITANYKEY.en.md)       | none                                      | none             |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.en.md) | `int`                                     | `int`            |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.en.md)               | none                                      | `int` / `string` |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.en.md)                   | (`int`, `int`, `int`)                     | `int`            |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.en.md)                  | (`string`, `int`, `int`)                  | `string`         |
| ![](../assets/images/IconEE.webp)[`BREAKBUTTON`](./BREAKBUTTON.en.md)         | none                                      | none             |

### Loop/branch syntax { #flow-control }

| Function name                                                               | Arguments                                | Return |
| :-------------------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF-ELSEIF-ELSE-ENDIF`](./IF.en.md) | `operand`                                | none   |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.en.md)              | `int`                                    | none   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.en.md)                | none                                     | none   |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.en.md)          | none                                     | none   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.en.md)             | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.en.md)                      | `integerVariable`, `int`, `int`(, `int`) | none   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.en.md)                     | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.en.md)                  | `int`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.en.md)                   | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.en.md)                        | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.en.md)                      | `int`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.en.md)        | `any`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.en.md)              | `any`                                    | none   |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.en.md)          | none                                     | none   |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.en.md)         | none                                     | none   |

### Random Number Control { #random }

| Function name                                                      | Arguments  | Return |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.en.md) | `int` | none   |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.en.md)  | none  | none   |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.en.md)  | none  | none   |

### Debugging aids and system flow control { #debug-system-flow }

| Function name                                                                            | Arguments             |
| :--------------------------------------------------------------------------------------- | :-------------------- |
| ![](../assets/images/Iconeramaker.webp)[`SAVEGAME`](./SAVEGAME.en.md)                       | none                  |
| ![](../assets/images/Iconeramaker.webp)[`LOADGAME`](./SAVEGAME.en.md)                       | none                  |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.en.md)                             | `idenetifier`         |
| ![](../assets/images/Iconeramaker.webp)[`QUIT`](./QUIT.en.md)                               | none                  |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.en.md)                       | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.en.md)                           | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.en.md)                               | `string`              |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.en.md)             | none                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.en.md)                         | none                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.en.md) | none                  |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.en.md)                       | `identifier`          |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.en.md)                           | `int`(, `int`, `int`) |
| ![](../assets/images/IconEE.webp)[`FLOWINPUTS`](./FLOWINPUT.en.md)                          | `int`(, `string`)     |

### Functions (CALL, etc.) { #function-call }

| Function name                                                          | Arguments                  | Return |
| :--------------------------------------------------------------------- | :------------------------- | :---- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.en.md)             | `functionName`             | `void`¹  |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.en.md)             | `functionName`             | `void`¹  |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.en.md)             | `labelName`                | none  |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.en.md)       | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.en.md)             | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.en.md)             | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.en.md)             | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.en.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.en.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.en.md)           | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.en.md)     | `formedString`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.en.md)     | `formedString`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.en.md)     | `formedString`             | none  |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.en.md)             | `functionName`             | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.en.md)         | `formedString`             | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`CALLEVENT`](./CALLEVENT.en.md)     | `functionName`             | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.en.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.en.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.en.md)            | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.en.md)       | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.en.md)       | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.en.md)       | `labelName`                | none  |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.en.md)              | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.en.md)           | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.en.md)     | none                       | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.en.md)     | none                       | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.en.md)     | none                       | none  |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.en.md)            | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.en.md)         | none                       | none  |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.en.md) | `string`                   | `int` |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.en.md)           | `functionName`             | `void`¹  |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.en.md)   | `formedString`             | `void`¹  |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.en.md)        | `functionName`             | `void`¹  |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.en.md)        | `functionName`             | `int` |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.en.md)            | `string`(, `int`, `argument`...)   | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.en.md)           | `string`(, `string`, `argument`...)| `string`  |
| ![](../assets/images/IconSK.webp)[`GETMETHF`](./GETMETH.en.md)            | `string`(, `float`, `argument`...) | `float`   |
| ![](../assets/images/IconSK.webp)[`CALLSTR`](./CALLSTR.en.md)           | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`JUMPSTR`](./CALLSTR.en.md)           | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYCALLSTR`](./CALLSTR.en.md)        | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYJUMPSTR`](./CALLSTR.en.md)        | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYCCALLSTR`](./CALLSTR.en.md)       | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYCJUMPSTR`](./CALLSTR.en.md)       | `stringVariable`             | `void`¹  |

### RETURN related { #return }

| Function name                                                                                       | Arguments               | Return                     |
| :-------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.en.md) | `int`(, `int`,...)      | `Same as arguments`               |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.en.md)                                    | `string`(, `string`,...) | `Same as arguments (converted to numeric type)` |
| ![](../assets/images/IconEmuera.webp)[`RETURNF`](../Emuera/user_defined_in_expression_function.en.md)  | `any`                   | `Same as arguments`               |

### DEBUG related { #debug }

| Function name                                                             | Arguments      | Return |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.en.md)      | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.en.md)     | `string`       | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.en.md)  | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.en.md) | `formedString` | none   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.en.md)      | none           | none   |
| ![](../assets/images/IconEmuera.webp)[`ASSERT`](./ASSERT.en.md)              | `int`          | none   |

### Tooltip related { #tooltip }

| Function name                                                                    | Arguments    |
| :------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.en.md) | `int`, `int` |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.en.md)      | `int`        |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.en.md)   | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.en.md)      | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](./TOOLTIP_EXTENSION.en.md)     | `string`     |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](./TOOLTIP_EXTENSION.en.md) | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](./TOOLTIP_EXTENSION.en.md)      | `int`        |

### HTML related { #html-related }

| Function name                                                                            | Arguments                                       | Return          |
| :--------------------------------------------------------------------------------------- | :---------------------------------------------- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.en.md)                     | `string`                                        | none            |
| ![](../assets/images/IconSK.webp)[<code>HTML_PRINT(C\|LC)</code>](./HTML_PRINTC.en.md)                 | `string`{, `int`}                               | none            |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.en.md)               | `string`(, `integerVariable`, `stringVariable`) | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.en.md)   | none                                            | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.en.md)     | `int`                                           | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.en.md)                   | `string`                                        | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.en.md)         | `string`                                        | `string`        |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.en.md)                 | `string`(, `int`)                               | `int`           |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.en.md)                 | `string`, `int`                                 | `string`        |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.en.md)             | `string`, `int`                                 | `string`        |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND`](./HTML_PRINT_ISLAND.en.md)       | `string`                                        | none            |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND_CLEAR`](./HTML_PRINT_ISLAND.en.md) | `string`                                        | none            |

### AWAIT related { #await }

| Function name                                                         | Arguments | Return   |
| :-------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.en.md)            | `int`     | none     |
| ![](../assets/images/IconEmuera.webp)[`GETKEY`](./GETKEY.en.md)          | `keyCode` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETKEYTRIGGERED`](./GETKEY.en.md) | `keyCode` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.en.md)         | none      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.en.md)         | none      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ISACTIVE`](./ISACTIVE.en.md)      | none      | `int`    |
| ![](../assets/images/IconEE.webp)[`MOUSEB`](./MOUSEB.en.md)              | none      | `string` |

### Image processing related { #image }

<details>
<summary>About image processing related commands</summary>

These are image processing commands. <br>
Graphics commands beginning with G are commands for manipulating the resizable drawing area. <br>
To use G commands, you must specify GRAPHICS or TEXTRENDERER as the drawing method. <br>
If WINAPI is specified as the drawing method, G commands cannot be used and an error will occur. <br>
Sprite commands beginning with SPRITE are commands related to sprites. <br>
Sprites can also be displayed inline with the PRINT_IMG command, just like resources declared in the resources folder. <br>
ClientBackground commands beginning with CBG are commands related to the background image of the client area. <br>
<br>
Please note that the color specification in image processing commands is not RGB but ARGB format including alpha value (opacity). <br>
The ARGB type is expressed in hexadecimal as 0xAARRGGBB. <br>
<br>
Most image processing commands can also be called as functions in expressions. <br>
When called as a function, the result value is not assigned to `RESULT` but becomes the return value. <br>

</details>

| Function name                                                                          | Arguments                                                                               | Return   |
| :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.en.md)                         | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.en.md)         | `int`, `string`(, `int`)                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.en.md)                       | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.en.md)                           | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.en.md)           | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_DRAW`](./G_POLYGON.en.md)               | `int`                                                                                   | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_FILL`](./G_POLYGON.en.md)               | `int`                                                                                   | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_ADD`](./G_POLYGON.en.md)          | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_CLEAR`](./G_POLYGON.en.md)        | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.en.md)                           | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                    | `int`    |
|                                                                                        | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.en.md)           | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.en.md)                 | `int`, `string`                                                                         | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`                                                           | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                                             | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.en.md)                     | `int`, `int`, `int`, `int`                                                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.en.md)                     | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.en.md)                       | `int`, `string`, `string`(, `int`)                                                      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.en.md)                         | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCREATED`](./GCREATED.en.md)                       | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.en.md)                     | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.en.md)                    | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GGETCOLOR`](./GGETCOLOR.en.md)                     | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.en.md)                         | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.en.md)                         | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.en.md)               | `string`, `int`                                                                         | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`                                             | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                               | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.en.md)     | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconSK.webp)[`SPRITECREATEFROMFILE`](./SPRITECREATEFROMFILE.en.md) | `string`, `string`(, `int`, `int`, `int`, `int`)                                      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.en.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.en.md)             | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.en.md)           | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATED`](./SPRITECREATED.en.md)             | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.en.md)           | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.en.md)          | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.en.md)           | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.en.md)          | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.en.md)                  | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.en.md)                  | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.en.md)               | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.en.md)                   | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETG`](./CBGSETG.en.md)                         | `int`, `int`, `int`, `int`                                                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.en.md)               | `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `var`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.en.md)                 | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.en.md)   | `int`, `string`, `string`, `int`, `int`, `zDepth`                                       | `int`    |
|                                                                                        | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string`                             | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEAR`](./CBGCLEAR.en.md)                       | none                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVEMAPB`](./CBGREMOVEMAPB.en.md)             | none                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEARBUTTON`](./CBGCLEARBUTTON.en.md)           | none                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.en.md)           | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.en.md)             | `int`                                                                                   | none     |
| ![](../assets/images/IconSK.webp)[`GETANIMETIMER`](./SETANIMETIMER.en.md)             | none                                                                                    | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.en.md)                         | `int`, `string`(, `int`, `int`)                                                         | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.en.md)                           | `int`                                                                                   | `string` |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.en.md)                   | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.en.md)                 | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.en.md)                   | `string`, `string`, `int`(, `int`)                                                      | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.en.md)           | `int`, `int`, `int`(, `int`, `int`)                                                     | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](./GGETPEN.en.md)                             | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.en.md)                   | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.en.md)                         | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.en.md)           | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.en.md)                         | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.en.md)                       | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/Iconetc.webp)[`SETBGIMAGE`](./BACKGROUND.en.md)                      | `string`(, `int`, `int`)                                                                | none     |
| ![](../assets/images/Iconetc.webp)[`REMOVEBGIMAGE`](./BACKGROUND.en.md)                   | `string`                                                                                | none     |
| ![](../assets/images/Iconetc.webp)[`CLEARBGIMAGE`](./BACKGROUND.en.md)                    | none                                                                                    | none     |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYER`](./SETIMAGELAYER.en.md)               | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`, `int`                           | none     |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER`](./CLEARIMAGELAYER.en.md)           | `int`                                                                                   | none     |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.en.md)       | none                                                                                    | none     |
| ![](../assets/images/IconSK.webp)[`EXISTSIMAGELAYER`](./EXISTSIMAGELAYER.en.md)      | `int`                                                                                   | `int`    |
| ![](../assets/images/IconSK.webp)[`SET_TEXT_DRAWING_MODE`](./SKIA_RENDER.en.md)          | `int`                                                                                   | `int`    |
| ![](../assets/images/IconSK.webp)[`GET_TEXT_DRAWING_MODE`](./SKIA_RENDER.en.md)          | none                                                                                    | `int`    |
| ![](../assets/images/IconSK.webp)[`SET_SKIA_QUALITY`](./SKIA_RENDER.en.md)               | `int`(, `int`, `int`)                                                                   | `int`    |
| ![](../assets/images/IconSK.webp)[`GET_SKIA_QUALITY`](./SKIA_RENDER.en.md)               | `int`                                                                                   | `int`    |

### Sound related { #sound }

| Function name                                                            | Arguments| Return |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.en.md)           | `string` | none   |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.en.md)           | none     | none   |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.en.md)               | `string` | none   |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.en.md)               | none     | none   |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.en.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.en.md) | `int`    | none   |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.en.md)     | `int`    | none   |
| ![](../assets/images/IconSK.webp)[`SOUNDCONTROL`](./SOUNDCONTROL.en.md)     | `int`, `int`{, `int`, `int`} | `int`  |
| ![](../assets/images/IconSK.webp)[`BGMCONTROL`](./SOUNDCONTROL.en.md)       | `int`{, `int`, `int`} | `int`  |
| ![](../assets/images/IconSK.webp)[`GETSOUNDORBGMINFO`](./SOUNDCONTROL.en.md) | `int`{, `int`} | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGSOUND`](./SOUNDCONTROL.en.md)   | {`int`}  | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGBGM`](./SOUNDCONTROL.en.md)     | none     | `int`  |

### XML related { #xmlmapdatatable }

| Function name                                                                             | Arguments                                                    | Return   |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.en.md)                        | `any`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.en.md)                         | `any`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.en.md)                           | `any`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.en.md)                                | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                           | `any`, `string`, `ref` `string[]`(, `int`)                   | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.en.md)                         | `string`, `string`(, `int`, `int`)                           | `int`    |
|                                                                                           | `string`, `string`, `ref` `string[]`(, `int`)                | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.en.md)                                | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.en.md)                         | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.en.md)                            | `any`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.en.md)                        | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.en.md)                 | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.en.md)                  | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.en.md)           | `string`, `string`(, `int`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.en.md)                        | `int`, `string`                                              | `int`    |
|                                                                                           | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.en.md)                 | `string`, `string`, `string`(, `int`)                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.en.md)              | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.en.md)       | `string`, `string`, `string`(, `string`, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.en.md)        | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE_BYNAME`](./XML_REMOVEATTRIBUTE.en.md) | `string`, `string`(, `int`)                                  | `int`    |

### MAP (associative array) related { #map }

| Function name                                                            | Arguments                         | Return   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.en.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.en.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.en.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.en.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.en.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.en.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.en.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.en.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.en.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.en.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`MAP_VALUES`](./MAP_GETKEYS.en.md)        | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.en.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.en.md) | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_TOSTRING`](./MAP_SERIALIZATION.en.md)      | `string`(, `string`, `string`)  | `string` |
| ![](../assets/images/IconSK.webp)[`MAP_FROMSTRING`](./MAP_SERIALIZATION.en.md)    | `string`, `string`(, `string`, `string`) | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_MERGE`](./MAP_ENHANCED.en.md)             | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_REMOVEIF`](./MAP_ENHANCED.en.md)          | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_FINDKEY`](./MAP_ENHANCED.en.md)           | `string`, `string`, `string`      | `string` |

### DataTable （database） related { #datatable }

| Function name                                                          | Arguments                                                     | Return   |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.en.md)         | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.en.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.en.md)        | `string`                                                      | `1`      |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.en.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.en.md)         | `string`, `int`                                               | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.en.md)     | `string`, `string`(, `any`, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.en.md)   | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.en.md)  | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.en.md)  | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.en.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | none     |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_NAMES`](./DT_COLUMN.en.md)   | `string`(, `ref` `string[]`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.en.md)           | `string`([, `string`, `any`] ...)                             | `int`    |
|                                                                        | `string`, `ref` `string[]`, `ref` `any[]`, `int`              | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.en.md)           | `string`, `int`, `string`, `any`([, `string`, `any`] ...)     | `int`    |
|                                                                        | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`       | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.en.md)        | `string`, `int`                                               | `int`    |
|                                                                        | `string`, `ref` `int[]`, `int`                                | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.en.md)        | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.en.md)         | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconSK.webp)[`DT_CELL_GETF`](./DT_CELL.en.md)        | `string`, `int`, `string`(, `int`)                            | `float`  |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.en.md)        | `string`, `int`, `string`(, `int`)                            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.en.md)      | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.en.md)         | `string`, `int`, `string`(, `any`, `int`)                     | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.en.md)         | `string`(, `string`, `string`, `ref` `int[]`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.en.md)   | `string`(, `ref` `string`)                                    | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.en.md) | `string`, `string`, `string`                                  | `int`    |

### SQL (Database) related { #sql }

| Function name | Arguments | Return |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_CONNECTION_OPEN`](./SQL_CONNECT.en.md) | `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_CONNECT`](./SQL_CONNECT.en.md) | `string`(, `string`) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_DISCONNECT`](./SQL_CONNECT.en.md) | `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_NONQUERY`](./SQL_EXECUTE.en.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_READER`](./SQL_EXECUTE.en.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_LONG`](./SQL_EXECUTE.en.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_STRING`](./SQL_EXECUTE.en.md) | `string`, `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_EXECUTE_SCALAR_FLOAT`](./SQL_EXECUTE.en.md) | `string`, `string` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_READ`](./SQL_READER.en.md) | `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_LONG`](./SQL_READER.en.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_STRING`](./SQL_READER.en.md) | `int`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_READER_GET_FLOAT`](./SQL_READER.en.md) | `int`, `int` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_ISNULL`](./SQL_READER.en.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_CLOSE`](./SQL_READER.en.md) | `int` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_ESCAPE`](./SQL_PARAM.en.md) | `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_NONQUERY`](./SQL_PARAM.en.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_READER`](./SQL_PARAM.en.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_LONG`](./SQL_PARAM.en.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_STRING`](./SQL_PARAM.en.md) | `string`, `string`(, `string`...) | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_FLOAT`](./SQL_PARAM.en.md) | `string`, `string`(, `string`...) | `float` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_MAP_XML`](./SQL_XML.en.md) | `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_DT_XML`](./SQL_XML.en.md) | `string`, `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_EXPORT_MAP_XML`](./SQL_XML.en.md) | `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_EXPORT_DT_XML`](./SQL_XML.en.md) | `string`, `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_XML_CUSTOM`](./SQL_XML.en.md) | `string`, `string`, `string`, `string`, `string` | `int` |

### Others { #misc }

| Function name                                                              | Arguments                   | Return   |
| :------------------------------------------------------------------------- | :-------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`RAND`](./RAND.en.md)                   | `int`(, `int`)              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CLEARTEXTBOX`](./CLEARTEXTBOX.en.md)   | none                        | none     |
| ![](../assets/images/IconEmuera.webp)[`STRDATA`](./STRDATA.en.md)             | `stringVariable`            | none     |
| ![](../assets/images/IconEmuera.webp)[`STOPCALLTRAIN`](./STOPCALLTRAIN.en.md) | none                        | none     |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.en.md)         | `string`                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.en.md)        | `string`                    | `string` |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.en.md)     | none                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.en.md)    | none                        | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.en.md)             | `string`                    | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.en.md)             | `string`(, `string`, `int`) | `int`    |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.en.md)         | none                        | none     |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.en.md)   | none                        | `int`    |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.en.md)         | none                        | `int`    |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.en.md)              | `string`                    | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.en.md)              | none                        | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.en.md)             | `int`, `int`, `int`         | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.en.md)           | none                        | `1`      |
| ![](../assets/images/IconEE.webp)[`GETDOINGFUNCTION`](./GETDOINGFUNCTION.en.md) | none                      | `string` |
| ![](../assets/images/IconSK.webp)[`ARGLEN`](./ARGLEN.en.md)                   | none                        | `int`    |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE`](./HOTKEY_STATE.en.md)       | `int`(, `int`)             | `int`    |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE_INIT`](./HOTKEY_STATE.en.md)  | `int`                      | `int`    |

