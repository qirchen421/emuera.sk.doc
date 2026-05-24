# 命令・式中函数一览

---

## 凡例

- ![](../assets/images/Iconeramaker.webp) - eramaker 中已有的命令
- ![](../assets/images/IconEmuera.webp) - Emuera 中追加、变更、扩展的命令
- ![](../assets/images/IconEM.webp) - EM（EvilMask 版）中追加、变更、扩展的命令
- ![](../assets/images/IconEE.webp) - EE（Enter's Edition）中追加、变更、扩展的命令
- ![](../assets/images/Icondotnet.webp) - [Emuera.NET](https://gitlab.com/VVIIlet/emuera) 中追加、变更、扩展的命令
- ![](../assets/images/IconSK.webp) - Skia（SkiaSharp版）中追加、变更、扩展的命令
- ![](../assets/images/Iconetc.webp) - 其他贡献者追加、变更、扩展的命令

**返回值标注说明**：`void`¹ 表示指令本身不返回值，但被调用函数中的 [`RETURN`](./RETURN.zh.md) 会设置 `RESULT`；函数末尾隐式 `RESULT:0 = 0`。`无` 表示指令不返回值且不影响 `RESULT`。

## 与教程的对应

各分类的详细讲解和使用示例，请参阅教程对应章节。

| Reference 分类 | 教程章节 |
|:--|:--|
| PRINT 系列 / 显示操作・字体操作 | [基本输出](../tutorial/basic-output.zh.md) |
| 字符串操作・引用 | [FORM 语法](../tutorial/form-syntax.zh.md) |
| 算术 | [赋值语句](../tutorial/assignment.zh.md) |
| 角色操作・引用 / 变量操作・CSV 引用 | [角色变量](../tutorial/character-variables.zh.md) / [变量声明](../tutorial/variable-declaration.zh.md) |
| 循环・分支结构 | [条件分支](../tutorial/condition.zh.md) / [循环](../tutorial/loop.zh.md) |
| 函数系（CALL 等）/ RETURN 系列 | [函数与 CALL](../tutorial/call.zh.md) / [跳转](../tutorial/jump.zh.md) |
| 输入・等待 | [函数与 CALL](../tutorial/call.zh.md)（INPUT 节） |
| HTML 系列 | [HTML 标签语法](../tutorial/html-syntax.zh.md) |
| 图像处理 / 音频系列 | [ERB 文件格式扩展](../tutorial/erb-format-extension.zh.md) |
| 存档数据操作 | [ERB 文件格式扩展](../tutorial/erb-format-extension.zh.md)（存档数据节） |

---

### PRINT 系列 { #print }

| 函数名                                                                                                                                            | 参数                                                         | 返回值   |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)(\|K\|D)(\|L\|W)</code>](./PRINT.zh.md) | `string`                                                     | 无     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTSINGLE(\|V\|S\|FORM\|FORMS)(\|K\|D)</code>](./PRINTSINGLE.zh.md)                                    | `string`                                                     | 无     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(\|FORM)(C\|LC)(\|K\|D)</code>](./PRINTC.zh.md)                                                     | `string`                                                     | 无     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTDATA(\|K\|D)(\|L\|W)</code>](./PRINTDATA.zh.md)                                                     | 无                                                         | 无     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTBUTTON(\|C\|LC)</code>](./PRINTBUTTON.zh.md)                                                        | `string`, `any`                                              | 无     |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(\|FORM)</code>](./PRINTPLAIN.zh.md)                                                           | `string`                                                     | 无     |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.zh.md)                                                                                | 无                                                         | 无     |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.zh.md)                                                                      | `string`                                                     | 无     |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.zh.md)                                                                        | `formedString`                                               | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETLINESTR`](./GETLINESTR.zh.md)                                                                              | `string`                                                     | `string` |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.zh.md)                                                                        | `string`                                                     | 无     |
| ![](../assets/images/IconEmuera.webp)[`CLEARLINE`](./CLEARLINE.zh.md)                                                                                | `int`                                                        | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.zh.md)                                                                           | `int`                                                        | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.zh.md)                                                                        | `int`                                                        | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.zh.md)                                                                          | `int`                                                        | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.zh.md)                                                                           | `int`                                                        | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.zh.md)                                                                         | `int`                                                        | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.zh.md)                                                                          | 无                                                         | 无     |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.zh.md)                                                                      | 无                                                         | 无     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.zh.md)                                               | `string`                                                     | 无     |
|                                                                                                                                                   | `string`, `int`, `int`, `int`                                | 无     |
|                                                                                                                                                   | `string`, `string`, `int`, `int`, `int`                      | 无     |
|                                                                                                                                                   | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | 无     |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.zh.md)                                                                              | `int`                                                        | 无     |
|                                                                                                                                                   | `int`, `int`, `int`, `int`                                   | 无     |
| ![](../assets/images/IconEmuera.webp)[`PRINT_SPACE`](./PRINT_SPACE.zh.md)                                                                            | `int`                                                        | 无     |
| ![](../assets/images/Icondotnet.webp)[<code>PRINT(\|V\|S\|FORM\|FORMS)N</code>](./PRINTN.zh.md) | `string` | 无   |

### 显示操作・字体操作・显示规格参照 { #display-font }

| 函数名                                                                         | 参数                | 返回值   |
| :----------------------------------------------------------------------------- | :------------------ | :------- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.zh.md)                       | `int`, `int`, `int` | 无     |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.zh.md)                      | `int`, `int`, `int` | 无     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.zh.md)               | `int`, `int`, `int` | 无     |
|                                                                                | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.zh.md)             | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.zh.md)           | `int`, `int`, `int` | 无     |
|                                                                                | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.zh.md)         | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLORBYNAME`](./SETCOLORBYNAME.zh.md)   | `colorName`         | 无     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.zh.md) | `colorName`         | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.zh.md)               | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.zh.md)             | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.zh.md)            | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.zh.md)          | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.zh.md)          | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.zh.md)         | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.zh.md)       | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.zh.md)        | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.zh.md)      | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.zh.md)         | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.zh.md)                 | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.zh.md)                 | `string`            | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.zh.md)                 | 无                | `string` |
| ![](../assets/images/IconEmuera.webp)[`FORCEKANA`](./FORCEKANA.zh.md)             | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.zh.md)             | `keyword`           | 无     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.zh.md)          | 无                | `string` |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.zh.md)                   | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.zh.md)            | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.zh.md)     | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCLENGTH`](./PRINTCLENGTH.zh.md)       | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.zh.md)         | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`BARSTR`](./BARSTR.zh.md)                   | `int`, `int`, `int` | `string` |
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.zh.md)               | `int`, `option`     | `string` |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.zh.md)            | `int`               | 无     |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.zh.md)              | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.zh.md)           | 无                | 无     |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.zh.md)              | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.zh.md)           | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.zh.md)             | 无                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMNAME`](./COLOR_FROM.zh.md)       | `string`            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`COLOR_FROMRGB`](./COLOR_FROM.zh.md)        | `int`, `int`, `int` | `string` |
| ![](../assets/images/IconEE.webp)[`SKIPLOG`](./SKIPLOG.zh.md)                     | `int`               | `void`   |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.zh.md)       | `int`               | `string` |
| ![](../assets/images/Iconetc.webp)[`BITMAP_CACHE_ENABLE`](./BITMAP_CACHE_ENABLE.zh.md)       | `int`               | `void` |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_ON`](./TEXT_BGC.zh.md) | `int`, `int`, `int`, `int` | `void` |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_OFF`](./TEXT_BGC.zh.md) | 无 | `void` |
| ![](../assets/images/IconSK.webp)[`STRICT_FONT_FALLBACK`](./STRICT_FONT_FALLBACK.zh.md) | `int` | `void` |


### 字符串操作・引用 { #string-operations }

| 函数名                                                              | 参数                                              | 返回值   |
| :------------------------------------------------------------------ | :------------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.zh.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.zh.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.zh.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.zh.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.zh.md)          | `int`, `option`                                   | `string` |
| ![](../assets/images/IconSK.webp)[`TOSTRF`](./TOSTR.zh.md)          | `float`{, `option`}                                | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.zh.md)          | `string`                                          | `int`    |
| ![](../assets/images/IconSK.webp)[`TOFLOAT`](./TOINT.zh.md)          | `string`                                          | `float`    |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.zh.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.zh.md)        | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.zh.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.zh.md)    | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.zh.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.zh.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.zh.md)   | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.zh.md)  | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.zh.md) | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.zh.md)      | `string`, `int`                                   | `string` |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.zh.md)      | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.zh.md)     | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.zh.md)    | `string`, `string`                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.zh.md)          | `string`, `string`, `stringArray`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.zh.md)        | `stringArray`(, `string`, `int`, `int`)           | `string` |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.zh.md)      | `string`, `string`, `string`                      | `string` |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.zh.md)        | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.zh.md)      | `int`                                             | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.zh.md)  | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFORM`](./STRFORM.zh.md)      | `string`                                          | `string` |
| ![](../assets/images/IconSK.webp)[`EVAL`](./EVAL.zh.md)            | `string`(, `int`)                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`EVALS`](./EVAL.zh.md)           | `string`(, `string`)                              | `string` |
| ![](../assets/images/IconSK.webp)[`EVALF`](./EVAL.zh.md)           | `string`(, `float`)                               | `float`  |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.zh.md)  | `string`, `string`(, `int`)                       | `int`    |
|                                                                     | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`    |

### 算术 { #arithmetic }

| 函数名                                                                    | 参数                                         | 返回值   |
| :------------------------------------------------------------------------ | :------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.zh.md)              | `int`, `float`                               | 无     |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.zh.md)                | `integerVariable`, `int`, `int`              | `int`    |
|                                                                           | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.zh.md)                    | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.zh.md)                   | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SQRT`](./SQRT.zh.md)                  | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBRT`](./MATH_EXTENSION.zh.md)        | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LOG`](./MATH_EXTENSION.zh.md)         | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LOG10`](./MATH_EXTENSION.zh.md)       | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`EXPOMENT`](./MATH_EXTENSION.zh.md)    | `int`                                        | `int`    |
| ![](../assets/images/IconSK.webp)[`SIN`](./MATH_EXTENSION.zh.md)              | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`COS`](./MATH_EXTENSION.zh.md)              | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`TAN`](./MATH_EXTENSION.zh.md)              | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ASIN`](./MATH_EXTENSION.zh.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ACOS`](./MATH_EXTENSION.zh.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ATAN`](./MATH_EXTENSION.zh.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`FLOOR`](./MATH_EXTENSION.zh.md)            | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`CEIL`](./MATH_EXTENSION.zh.md)             | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`ROUND`](./MATH_EXTENSION.zh.md)            | `int`/`float`                                | `int`/`float` |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_ADD`](./UNCHECKED.zh.md)   | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_SUB`](./UNCHECKED.zh.md)   | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_MUL`](./UNCHECKED.zh.md)   | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconSK.webp)[`UNCHECKED_NEG`](./UNCHECKED.zh.md)   | `int`                                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.zh.md)       | `int`, `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.zh.md)       | `integerVariable`, `int`(, `int`...)         | 无     |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.zh.md)     | `integarVariable`, `int`(, `int`...)         | 无     |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.zh.md)    | `integarVariable`, `int`(, `int`...)         | 无     |
| ![](../assets/images/IconSK.webp)[`BITSET`](./BITARRAY.zh.md)           | `ref int[]`, `int`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconSK.webp)[`BITGET`](./BITARRAY.zh.md)           | `ref int[]`, `int`                           | `int`    |
| ![](../assets/images/IconSK.webp)[`BITTOGGLE`](./BITARRAY.zh.md)        | `ref int[]`, `int`                           | `int`    |
| ![](../assets/images/IconSK.webp)[`BITINDEXOFFIRST`](./BITARRAY.zh.md)  | `ref int[]`(, `int`)                         | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.zh.md)                    | `int`(, `int`...)                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.zh.md)                    | `int`(, `int`...)                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.zh.md)                  | `int`, `int`, `int`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.zh.md)                | `int`, `int`, `int`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUMARRAY`](./SUMARRAY.zh.md)          | `integerArray`(, `int`, `int`)               | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MATCH`](./MATCH.zh.md)                | `array`, `any`, `int`, `int`                 | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALL`](./MATCHALL.zh.md) | `variable`, `any`(, `int`, `int`, `variable`) | `int` |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`MATCHALLEX`](./MATCHALL.zh.md) | `string`, `any`(, `int`, `int`, `variable`) | `int` |
| ![](../assets/images/IconEmuera.webp)[`MAXARRAY`](./MAXMINARRAY.zh.md)       | `integerArray`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MINARRAY`](./MAXMINARRAY.zh.md)       | `integerArray`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUMCARRAY`](./CARRAY.zh.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CMATCH`](./CARRAY.zh.md)              | `charaArray`, `any`(, `int`, `int`)          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MAXCARRAY`](./CARRAY.zh.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MINCARRAY`](./CARRAY.zh.md)           | `charaArray`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGEARRAY`](./INRANGEARRAY.zh.md)  | `integerArray`, `int`, `int`(, `int`, `int`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`INRANGECARRAY`](./INRANGEARRAY.zh.md) | `charaArray`, `int`, `int`(, `int`, `int`)   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GROUPMATCH`](./GROUPCHECK.zh.md)      | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`NOSAMES`](./GROUPCHECK.zh.md)         | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ALLSAMES`](./GROUPCHECK.zh.md)        | `any`, `any`...                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CONVERT`](./CONVERT.zh.md)            | `int`, `int`                                 | `string` |

### 角色操作・引用 { #character-operations }

| 函数名                                                                                                  | 参数                                   | 返回值 |
| :------------------------------------------------------------------------------------------------------ | :------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`ADDCHARA`](./ADDCHARA.zh.md) | `int`(, `int`,...)                     | 无   |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.zh.md) | `int`(, `int`,...)                     | 无   |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.zh.md)                                      | `int`, `int`                           | 无   |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.zh.md)                                      | `charaVariable`, `keyword`             | 无   |
| ![](../assets/images/IconEmuera.webp)[`GETCHARA`](./GETCHARA.zh.md)                                        | `int`                                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.zh.md)                                  | 无                                   | 无   |
| ![](../assets/images/IconEmuera.webp)[`ADDVOIDCHARA`](./ADDVOIDCHARA.zh.md)                                | 无                                   | 无   |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.zh.md)                                  | 无                                   | 无   |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.zh.md)                                  | `int`(, `int`...)                      | 无   |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.zh.md)                                        | `int`                                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.zh.md)                                      | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.zh.md)                                  | `charaVariable`, `int`(, `int`, `int`) | `int`  |
| ![](../assets/images/IconEmuera.webp)[`COPYCHARA`](./COPYCHARA.zh.md)                                      | `int`, `int`                           | 无   |
| ![](../assets/images/IconEmuera.webp)[`ADDCOPYCHARA`](./ADDCOPYCHARA.zh.md)                                | `int`                                  | 无   |

### 变量操作・变量引用・CSV引用 { #variable-operations }

| 函数名                                                                     | 参数                                          | 返回值   |
| :------------------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.zh.md)           | 无                                          | 无     |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.zh.md)             | `variable`                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.zh.md)           | `variable`(, `dimension`)                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.zh.md)         | 无                                          | 无     |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.zh.md)     | 无                                          | 无     |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.zh.md)     | `int`                                         | 无     |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.zh.md)                   | `variable`, `variable`                        | 无     |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.zh.md)             | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.zh.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.zh.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.zh.md)       | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.zh.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.zh.md)          | `int`, `int`                                  | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.zh.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.zh.md)        | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.zh.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.zh.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.zh.md)      | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.zh.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.zh.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCFLAG`](./CSV_STATUS.zh.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.zh.md)               | `variable`, `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNAME`](./GETCSVNOBY.zh.md)       | `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYNICKNAME`](./GETCSVNOBY.zh.md)   | `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYCALLNAME`](./GETCSVNOBY.zh.md)   | `string`                          | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`GETCSVNOBYMASTERNAME`](./GETCSVNOBY.zh.md) | `string`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.zh.md)       | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.zh.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.zh.md)     | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.zh.md) | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.zh.md)               | `variable`(, `value`, `int`, `int`)           | 无     |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.zh.md)             | `charaVariable`(, `int`, `int`, `int`, `int`) | 无     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.zh.md)       | `variable`, `int`, `value`(, `int`, `int`)    | 无     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.zh.md)     | `variable`, `int`, `int`                      | 无     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.zh.md)         | `variable`(, `sortFormat`, `int`, `int`)      | 无     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.zh.md)         | `varible`, `variable`                         | 无     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.zh.md)       | `variable`(, `variable`...)                   | 无     |
| ![](../assets/images/IconEmuera.webp)[`CUPCHECK`](./CUPCHECK.zh.md)           | `int`                                         | 无     |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.zh.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.zh.md)               | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.zh.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.zh.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.zh.md)           | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.zh.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.zh.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.zh.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.zh.md)   | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.zh.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.zh.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.zh.md)                | `string`                                      | `int`    |
| ![](../assets/images/IconSK.webp)[`GETVARF`](./GETSETVAR.zh.md)               | `string`                                      | `float`  |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.zh.md)               | `string`                                      | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.zh.md)                | `string`, `any`                               | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.zh.md)               | `string`, `any`(, `int`, `int`, `int`)        | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.zh.md)       | `string`, `ref` `string[]`(, `int`, `int`)    | `1`      |
|                                                                            | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`      |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.zh.md)                 | `variable`, `int`(, `int`)                    | `string` |
| ![](../assets/images/Icondotnet.webp)[`VARI`](./VAR.zh.md) | `string`(, `int`) | 无   |
| ![](../assets/images/Icondotnet.webp)[`VARS`](./VAR.zh.md) | `string`(, `int`) | 无   |

### 存档操作 { #save-data }

| 函数名                                                                                              | 参数                                  | 返回值   |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------ | :------- |
| ![](../assets/images/Iconeramaker.webp)[`PUTFORM`](./PUTFORM.zh.md)                                    | `string`                              | 无     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVEDATA`](./SAVEDATA.zh.md)                                    | `int`, `string`                       | 无     |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADDATA`](./LOADDATA.zh.md)                                    | `int`                                 | 无     |
| ![](../assets/images/IconEmuera.webp)[`DELDATA`](./DELDATA.zh.md)                                      | `int`                                 | 无     |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.zh.md)                                      | `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.zh.md)                                      | `int`                                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.zh.md)                                | 无                                  | 无     |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.zh.md)                                | 无                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.zh.md) | (`string`)                            | 无     |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.zh.md)                                  | `string`, `string`, `int`(, `int`...) | 无     |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.zh.md)                                  | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.zh.md)                            | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.zh.md)                        | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.zh.md)   | `string`, `int`(, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.zh.md)   | `int`(, `int`, `int`)                 | `string` |

### 日期・时间获取 { #datetime }

| 函数名                                                                       | 参数 | 返回值          |
| :--------------------------------------------------------------------------- | :--- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.zh.md)               | 无 | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.zh.md)             | 无 | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.zh.md)            | 无 | `string`        |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.zh.md) | 无 | `int`           |
| ![](../assets/images/IconEmuera.webp)[`GETSECOND`](./GETSECOND.zh.md)           | 无 | `int`           |

### 输入・等待 { #input-wait }

| 函数名                                                                     | 参数                                      | 返回值           |
| :------------------------------------------------------------------------- | :---------------------------------------- | :--------------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.zh.md)               | (`int`, `int`, `int`)                     | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.zh.md)              | (`int`, `int`, `int`)                     | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`WAIT`](./WAIT.zh.md)                 | 无                                      | `void`           |
| ![](../assets/images/IconEmuera.webp)[`FORCEWAIT`](./FORCEWAIT.zh.md)         | 无                                      | 无             |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.zh.md)               | `int`, `int`(, `int`, `string`, `int`)    | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.zh.md)              | `int`, `int`(, `int`, `string`, `int`)    | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.zh.md)                 | `int`, `int`                              | 无             |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.zh.md)           | `int`(, `int`)                            | `int`            |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.zh.md)          | `string`(, `int`)                         | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.zh.md)         | `int`, `int`(, `int`, `string`, `int`)    | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.zh.md)        | `int`, `string`(, `int`, `string`, `int`) | `string`         |
| ![](../assets/images/IconEmuera.webp)[`WAITANYKEY`](./WAITANYKEY.zh.md)       | 无                                      | 无             |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.zh.md) | `int`                                     | `int`            |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.zh.md)               | 无                                      | `int` / `string` |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.zh.md)                   | (`int`, `int`, `int`)                     | `int`            |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.zh.md)                  | (`string`, `int`, `int`)                  | `string`         |
| ![](../assets/images/IconEE.webp)[`BREAKBUTTON`](./BREAKBUTTON.zh.md)         | 无                                      | 无               |

### 循环・分支语法 { #flow-control }

| 函数名                                                                      | 参数                                     | 返回值 |
| :-------------------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF-ELSEIF-ELSE-ENDIF`](./IF.zh.md) | `operand`                                | 无   |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.zh.md)              | `int`                                    | 无   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.zh.md)                | 无                                     | 无   |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.zh.md)          | 无                                     | 无   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.zh.md)             | 无                                     | 无   |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.zh.md)                      | `integerVariable`, `int`, `int`(, `int`) | 无   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.zh.md)                     | 无                                     | 无   |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.zh.md)                  | `int`                                    | 无   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.zh.md)                   | 无                                     | 无   |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.zh.md)                        | 无                                     | 无   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.zh.md)                      | `int`                                    | 无   |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.zh.md)        | `any`                                    | 无   |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.zh.md)              | `any`                                    | 无   |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.zh.md)          | 无                                     | 无   |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.zh.md)         | 无                                     | 无   |

### 随机数控制 { #random }

| 函数名                                                             | 参数  | 返回值 |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.zh.md) | `int` | 无   |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.zh.md)  | 无  | 无   |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.zh.md)  | 无  | 无   |

### 调试辅助・系统流程控制 { #debug-system-flow }

| 函数名                                                                                   | 参数                  |
| :--------------------------------------------------------------------------------------- | :-------------------- |
| ![](../assets/images/Iconeramaker.webp)[`SAVEGAME`](./SAVEGAME.zh.md)                       | 无                  |
| ![](../assets/images/Iconeramaker.webp)[`LOADGAME`](./SAVEGAME.zh.md)                       | 无                  |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.zh.md)                             | `idenetifier`         |
| ![](../assets/images/Iconeramaker.webp)[`QUIT`](./QUIT.zh.md)                               | 无                  |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.zh.md)                       | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.zh.md)                           | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.zh.md)                               | `string`              |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.zh.md)             | 无                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.zh.md)                         | 无                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.zh.md) | 无                  |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.zh.md)                       | `identifier`          |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.zh.md)                           | `int`(, `int`, `int`) |
| ![](../assets/images/IconEE.webp)[`FLOWINPUTS`](./FLOWINPUT.zh.md)                          | `int`(, `string`)     |

### 函数系列（CALL 等） { #function-call }

| 函数名 | 参数 | 返回值 |
| :----- | :--- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.zh.md)             | `functionName`             | `void`¹  |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.zh.md)             | `functionName`             | `void`¹  |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.zh.md)             | `labelName`                | 无  |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.zh.md)       | 无                       | 无  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALL`](./TRY.zh.md)             | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMP`](./TRY.zh.md)             | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRY.zh.md)             | `labelName`                | 无  |
| ![](../assets/images/IconEmuera.webp)[`CALLFORM`](./FORM.zh.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`JUMPFORM`](./FORM.zh.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`GOTOFORM`](./FORM.zh.md)           | `labelName`                | 无  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLFORM`](./TRYFORM.zh.md)     | `formedString`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPFORM`](./TRYFORM.zh.md)     | `formedString`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOFORM`](./TRYFORM.zh.md)     | `formedString`             | 无  |
| ![](../assets/images/IconEmuera.webp)[`CALLF`](./CALLF.zh.md)             | `functionName`             | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`CALLFORMF`](./CALLF.zh.md)         | `formedString`             | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`CALLEVENT`](./CALLEVENT.zh.md)     | `functionName`             | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALL`](./TRYC.zh.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCJUMP`](./TRYC.zh.md)           | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTO`](./TRYC.zh.md)            | `labelName`                | 无  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.zh.md)       | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCCALLFORM`](./TRYC.zh.md)       | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYCGOTOFORM`](./TRYC.zh.md)       | `labelName`                | 无  |
| ![](../assets/images/IconEmuera.webp)[`CATCH`](./TRYC.zh.md)              | 无                       | 无  |
| ![](../assets/images/IconEmuera.webp)[`ENDCATCH`](./TRYC.zh.md)           | 无                       | 无  |
| ![](../assets/images/IconEmuera.webp)[`TRYCALLLIST`](./TRYLIST.zh.md)     | 无                       | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYJUMPLIST`](./TRYLIST.zh.md)     | 无                       | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`TRYGOTOLIST`](./TRYLIST.zh.md)     | 无                       | 无  |
| ![](../assets/images/IconEmuera.webp)[`FUNC`](./TRYLIST.zh.md)            | `functionName`(, `any`...) | `void`¹  |
| ![](../assets/images/IconEmuera.webp)[`ENDFUNC`](./TRYLIST.zh.md)         | 无                       | 无  |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.zh.md) | `string`                   | `int` |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.zh.md)           | `functionName`             | `void`¹  |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.zh.md)   | `formedString`             | `void`¹  |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.zh.md)        | `functionName`             | `void`¹  |
| ![](../assets/images/Iconetc.webp)[`EXISTMETH`](./EXISTMETH.zh.md)        | `functionName`             | `int` |
| ![](../assets/images/Iconetc.webp)[`GETMETH`](./GETMETH.zh.md)            | `string`(, `int`, `argument`...)   | `int`     |
| ![](../assets/images/Iconetc.webp)[`GETMETHS`](./GETMETH.zh.md)           | `string`(, `string`, `argument`...)| `string`  |
| ![](../assets/images/IconSK.webp)[`GETMETHF`](./GETMETH.zh.md)            | `string`(, `float`, `argument`...) | `float`   |
| ![](../assets/images/IconSK.webp)[`CALLSTR`](./CALLSTR.zh.md)           | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`JUMPSTR`](./CALLSTR.zh.md)           | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYCALLSTR`](./CALLSTR.zh.md)        | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYJUMPSTR`](./CALLSTR.zh.md)        | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYCCALLSTR`](./CALLSTR.zh.md)       | `stringVariable`             | `void`¹  |
| ![](../assets/images/IconSK.webp)[`TRYCJUMPSTR`](./CALLSTR.zh.md)       | `stringVariable`             | `void`¹  |

### RETURN 系列 { #return }

| 函数名                                                                                              | 参数                     | 返回值                     |
| :-------------------------------------------------------------------------------------------------- | :----------------------  | :------------------------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.zh.md) | `int`(, `int`,...)       | `与参数相同`               |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.zh.md)                                    | `string`(, `string`,...) | `与参数相同（转换为数值型）` |
| ![](../assets/images/IconEmuera.webp)[`RETURNF`](../Emuera/user_defined_in_expression_function.zh.md)  | `any`                    | `与参数相同`               |

### DEBUG 系列 { #debug }

| 函数名                                                                    | 参数           | 返回值 |
| :------------------------------------------------------------------------ | :------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINT`](./DEBUGPRINT.zh.md)      | `string`       | 无   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTL`](./DEBUGPRINT.zh.md)     | `string`       | 无   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORM`](./DEBUGPRINT.zh.md)  | `formedString` | 无   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGPRINTFORML`](./DEBUGPRINT.zh.md) | `formedString` | 无   |
| ![](../assets/images/IconEmuera.webp)[`DEBUGCLEAR`](./DEBUGPRINT.zh.md)      | 无           | 无   |
| ![](../assets/images/IconEmuera.webp)[`ASSERT`](./ASSERT.zh.md)              | `int`          | 无   |

### 提示框系列 { #tooltip }

| 函数名                                                                           | 参数         |
| :------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETCOLOR`](./TOOLTIP_SETCOLOR.zh.md) | `int`, `int` |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.zh.md)      | `int`        |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.zh.md)   | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.zh.md)      | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](./TOOLTIP_EXTENSION.zh.md)     | `string`     |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](./TOOLTIP_EXTENSION.zh.md) | `int`        |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](./TOOLTIP_EXTENSION.zh.md)      | `int`        |

### HTML 系列 { #html-related }

| 函数名                                                                                   | 参数                                            | 返回值          |
| :--------------------------------------------------------------------------------------- | :---------------------------------------------- | :-------------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_PRINT`](./HTML_PRINT.zh.md)                     | `string`                                        | 无            |
| ![](../assets/images/IconSK.webp)[<code>HTML_PRINT(C\|LC)</code>](./HTML_PRINTC.zh.md)                 | `string`{, `int`}                               | 无            |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.zh.md)               | `string`(, `integerVariable`, `stringVariable`) | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.zh.md)   | 无                                            | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.zh.md)     | `int`                                           | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.zh.md)                   | `string`                                        | `string`        |
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.zh.md)         | `string`                                        | `string`        |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.zh.md)                 | `string`(, `int`)                               | `int`           |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.zh.md)                 | `string`, `int`                                 | `string`        |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.zh.md)             | `string`, `int`                                 | `string`        |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND`](./HTML_PRINT_ISLAND.zh.md)       | `string`                                        | 无            |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND_CLEAR`](./HTML_PRINT_ISLAND.zh.md) | `string`                                        | 无            |

### AWAIT 相关 { #await }

| 函数名                                                                | 参数      | 返回值   |
| :-------------------------------------------------------------------- | :-------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`AWAIT`](./AWAIT.zh.md)            | `int`     | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETKEY`](./GETKEY.zh.md)          | `keyCode` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETKEYTRIGGERED`](./GETKEY.zh.md) | `keyCode` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.zh.md)         | 无      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.zh.md)         | 无      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ISACTIVE`](./ISACTIVE.zh.md)      | 无      | `int`    |
| ![](../assets/images/IconEE.webp)[`MOUSEB`](./MOUSEB.zh.md)              | 无      | `string` |

### 图像处理相关 { #image }

<details>
<summary>关于图像处理相关命令</summary>

图像处理相关的命令。<br>
G 开头的 Graphics 系列命令，用于操作可变更的绘图区域。<br>
使用 G 系列命令需要将绘图方式指定为 GRAPHICS 或 TEXTRENDERER。<br>
若绘图方式指定为 WINAPI，则 G 系列命令不可用，执行时会报错。<br>
SPRITE 开头的 Sprite 系列命令，是与精灵（Sprite）相关的命令。<br>
精灵可以像在 resources 文件夹中声明的资源一样，通过 PRINT_IMG 命令等在行中显示。<br>
CBG 开头的 ClientBackground 系列命令，是与客户端区域背景图像相关的命令。<br>
<br>
请注意，图像处理系列命令中的颜色指定不是 RGB，而是包含 Alpha 值（不透明度）的 ARGB 格式。<br>
ARGB 型以 16 进制表示为 0xAARRGGBB。<br>
<br>
图像处理系列命令的大多数也可以在表达式中作为函数调用。<br>
作为函数调用时，结果的值不会赋值给 `RESULT`，而是作为返回值。<br>

</details>

| 函数名                                                                                 | 参数                                                                                    | 返回值   |
| :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`GCREATE`](./GCREATE.zh.md)                         | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCREATEFROMFILE`](./GCREATEFROMFILE.zh.md)         | `int`, `string`(, `int`)                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDISPOSE`](./GDISPOSE.zh.md)                       | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCLEAR`](./GCLEAR.zh.md)                           | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.zh.md)           | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_DRAW`](./G_POLYGON.zh.md)               | `int`                                                                                   | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_FILL`](./G_POLYGON.zh.md)               | `int`                                                                                   | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_ADD`](./G_POLYGON.zh.md)          | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/Icondotnet.webp)![](../assets/images/IconSK.webp)[`G_POLYGON_POINT_CLEAR`](./G_POLYGON.zh.md)        | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.zh.md)                           | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                    | `int`    |
|                                                                                        | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.zh.md)           | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.zh.md)                 | `int`, `string`                                                                         | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`                                                           | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                                             | `int`    |
|                                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETCOLOR`](./GSETCOLOR.zh.md)                     | `int`, `int`, `int`, `int`                                                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETBRUSH`](./GSETBRUSH.zh.md)                     | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETFONT`](./GSETFONT.zh.md)                       | `int`, `string`, `string`(, `int`)                                                      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSETPEN`](./GSETPEN.zh.md)                         | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GCREATED`](./GCREATED.zh.md)                       | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GWIDTH`](./GWIDTHHEIGHT.zh.md)                     | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GHEIGHT`](./GWIDTHHEIGHT.zh.md)                    | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GGETCOLOR`](./GGETCOLOR.zh.md)                     | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GSAVE`](./GSAVELOAD.zh.md)                         | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GLOAD`](./GSAVELOAD.zh.md)                         | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.zh.md)               | `string`, `int`                                                                         | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`                                             | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                               | `int`    |
|                                                                                        | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMECREATE`](./SPRITEANIMECREATE.zh.md)     | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconSK.webp)[`SPRITECREATEFROMFILE`](./SPRITECREATEFROMFILE.zh.md) | `string`, `string`(, `int`, `int`, `int`, `int`)                                      | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.zh.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.zh.md)             | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.zh.md)           | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATED`](./SPRITECREATED.zh.md)             | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.zh.md)           | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.zh.md)          | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.zh.md)           | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.zh.md)          | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.zh.md)                  | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.zh.md)                  | `string`                                                                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.zh.md)               | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.zh.md)                   | `string`, `int`, `int`                                                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETG`](./CBGSETG.zh.md)                         | `int`, `int`, `int`, `int`                                                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.zh.md)               | `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `var`) | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBMAPG`](./CBGSETBMAPG.zh.md)                 | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGSETBUTTONSPRITE`](./CBGSETBUTTONSPRITE.zh.md)   | `int`, `string`, `string`, `int`, `int`, `zDepth`                                       | `int`    |
|                                                                                        | `int`, `string`, `string`, `int`, `int`, `zDepth`, `string`                             | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEAR`](./CBGCLEAR.zh.md)                       | 无                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVEMAPB`](./CBGREMOVEMAPB.zh.md)             | 无                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGCLEARBUTTON`](./CBGCLEARBUTTON.zh.md)           | 无                                                                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CBGREMOVERANGE`](./CBGREMOVERANGE.zh.md)           | `int`, `int`                                                                            | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETANIMETIMER`](./SETANIMETIMER.zh.md)             | `int`                                                                                   | 无     |
| ![](../assets/images/IconSK.webp)[`GETANIMETIMER`](./SETANIMETIMER.zh.md)             | 无                                                                                    | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.zh.md)                         | `int`, `string`(, `int`, `int`)                                                         | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.zh.md)                           | `int`                                                                                   | `string` |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.zh.md)                   | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.zh.md)                 | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.zh.md)                   | `string`, `string`, `int`(, `int`)                                                      | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.zh.md)           | `int`, `int`, `int`(, `int`, `int`)                                                     | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](./GGETPEN.zh.md)                             | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.zh.md)                   | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.zh.md)                         | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.zh.md)           | `int`                                                                                   | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.zh.md)                         | `int`, `int`, `int`, `int`, `int`                                                       | `int`    |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.zh.md)                       | `int`, `int`, `int`                                                                     | `int`    |
| ![](../assets/images/Iconetc.webp)[`SETBGIMAGE`](./BACKGROUND.zh.md)                      | `string`(, `int`, `int`)                                                                | 无     |
| ![](../assets/images/Iconetc.webp)[`REMOVEBGIMAGE`](./BACKGROUND.zh.md)                   | `string`                                                                                | 无     |
| ![](../assets/images/Iconetc.webp)[`CLEARBGIMAGE`](./BACKGROUND.zh.md)                    | 无                                                                                    | 无     |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYER`](./SETIMAGELAYER.zh.md)               | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`, `int`                           | 无     |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER`](./CLEARIMAGELAYER.zh.md)           | `int`                                                                                   | 无     |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.zh.md)       | 无                                                                                    | 无     |
| ![](../assets/images/IconSK.webp)[`EXISTSIMAGELAYER`](./EXISTSIMAGELAYER.zh.md)      | `int`                                                                                   | `int`    |
| ![](../assets/images/IconSK.webp)[`SET_TEXT_DRAWING_MODE`](./SKIA_RENDER.zh.md)          | `int`                                                                                   | `int`    |
| ![](../assets/images/IconSK.webp)[`GET_TEXT_DRAWING_MODE`](./SKIA_RENDER.zh.md)          | 无                                                                                    | `int`    |
| ![](../assets/images/IconSK.webp)[`SET_SKIA_QUALITY`](./SKIA_RENDER.zh.md)               | `int`(, `int`, `int`)                                                                   | `int`    |
| ![](../assets/images/IconSK.webp)[`GET_SKIA_QUALITY`](./SKIA_RENDER.zh.md)               | `int`                                                                                   | `int`    |

### 音频系列 { #sound }

| 函数名                                                                   | 参数     | 返回值 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.zh.md)           | `string` | 无   |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.zh.md)           | 无     | 无   |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.zh.md)               | `string` | 无   |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.zh.md)               | 无     | 无   |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.zh.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.zh.md) | `int`    | 无   |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.zh.md)     | `int`    | 无   |
| ![](../assets/images/IconSK.webp)[`SOUNDCONTROL`](./SOUNDCONTROL.zh.md)     | `int`, `int`{, `int`, `int`} | `int`  |
| ![](../assets/images/IconSK.webp)[`BGMCONTROL`](./SOUNDCONTROL.zh.md)       | `int`{, `int`, `int`} | `int`  |
| ![](../assets/images/IconSK.webp)[`GETSOUNDORBGMINFO`](./SOUNDCONTROL.zh.md) | `int`{, `int`} | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGSOUND`](./SOUNDCONTROL.zh.md)   | {`int`}  | `int`  |
| ![](../assets/images/IconSK.webp)[`ISPLAYINGBGM`](./SOUNDCONTROL.zh.md)     | 无     | `int`  |

### XML 系列 { #xmlmapdatatable }

| 函数名                                                                                    | 参数                                                         | 返回值   |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.zh.md)                        | `any`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.zh.md)                         | `any`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.zh.md)                           | `any`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.zh.md)                                | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                           | `any`, `string`, `ref` `string[]`(, `int`)                   | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.zh.md)                         | `string`, `string`(, `int`, `int`)                           | `int`    |
|                                                                                           | `string`, `string`, `ref` `string[]`(, `int`)                | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.zh.md)                                | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.zh.md)                         | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.zh.md)                            | `any`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.zh.md)                        | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.zh.md)                 | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.zh.md)                  | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.zh.md)           | `string`, `string`(, `int`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.zh.md)                        | `int`, `string`                                              | `int`    |
|                                                                                           | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.zh.md)                 | `string`, `string`, `string`(, `int`)                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.zh.md)              | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.zh.md)       | `string`, `string`, `string`(, `string`, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.zh.md)        | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE_BYNAME`](./XML_REMOVEATTRIBUTE.zh.md) | `string`, `string`(, `int`)                                  | `int`    |

### MAP（映射数组）系列 { #map }

| 函数名                                                                   | 参数                              | 返回值   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.zh.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.zh.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.zh.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.zh.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.zh.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.zh.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.zh.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.zh.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.zh.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.zh.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`MAP_VALUES`](./MAP_GETKEYS.zh.md)        | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.zh.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.zh.md) | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_TOSTRING`](./MAP_SERIALIZATION.zh.md)      | `string`(, `string`, `string`)  | `string` |
| ![](../assets/images/IconSK.webp)[`MAP_FROMSTRING`](./MAP_SERIALIZATION.zh.md)    | `string`, `string`(, `string`, `string`) | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_MERGE`](./MAP_ENHANCED.zh.md)             | `string`, `string`                | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_REMOVEIF`](./MAP_ENHANCED.zh.md)          | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconSK.webp)[`MAP_FINDKEY`](./MAP_ENHANCED.zh.md)           | `string`, `string`, `string`      | `string` |

### DataTable（数据库）系列 { #datatable }

| 函数名                                                                 | 参数                                                          | 返回值   |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.zh.md)         | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.zh.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.zh.md)        | `string`                                                      | `1`      |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.zh.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.zh.md)         | `string`, `int`                                               | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.zh.md)     | `string`, `string`(, `any`, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.zh.md)   | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.zh.md)  | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.zh.md)  | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.zh.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | 无     |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_NAMES`](./DT_COLUMN.zh.md)   | `string`(, `ref` `string[]`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.zh.md)           | `string`([, `string`, `any`] ...)                             | `int`    |
|                                                                        | `string`, `ref` `string[]`, `ref` `any[]`, `int`              | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.zh.md)           | `string`, `int`, `string`, `any`([, `string`, `any`] ...)     | `int`    |
|                                                                        | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`       | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.zh.md)        | `string`, `int`                                               | `int`    |
|                                                                        | `string`, `ref` `int[]`, `int`                                | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.zh.md)        | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.zh.md)         | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconSK.webp)[`DT_CELL_GETF`](./DT_CELL.zh.md)        | `string`, `int`, `string`(, `int`)                            | `float`  |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.zh.md)        | `string`, `int`, `string`(, `int`)                            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.zh.md)      | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.zh.md)         | `string`, `int`, `string`(, `any`, `int`)                     | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.zh.md)         | `string`(, `string`, `string`, `ref` `int[]`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.zh.md)   | `string`(, `ref` `string`)                                    | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.zh.md) | `string`, `string`, `string`                                  | `int`    |

### SQL（数据库）系列 { #sql }

| 函数名 | 参数 | 返回值 |
| :-------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`SQL_CONNECTION_OPEN`](./SQL_CONNECT.zh.md) | `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_CONNECT`](./SQL_CONNECT.zh.md) | `string`(, `string`) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_DISCONNECT`](./SQL_CONNECT.zh.md) | `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_NONQUERY`](./SQL_EXECUTE.zh.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_READER`](./SQL_EXECUTE.zh.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_LONG`](./SQL_EXECUTE.zh.md) | `string`, `string` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_EXECUTE_SCALAR_STRING`](./SQL_EXECUTE.zh.md) | `string`, `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_EXECUTE_SCALAR_FLOAT`](./SQL_EXECUTE.zh.md) | `string`, `string` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_READ`](./SQL_READER.zh.md) | `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_LONG`](./SQL_READER.zh.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_GET_STRING`](./SQL_READER.zh.md) | `int`, `int` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_READER_GET_FLOAT`](./SQL_READER.zh.md) | `int`, `int` | `float` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_ISNULL`](./SQL_READER.zh.md) | `int`, `int` | `int` |
| ![](../assets/images/Icondotnet.webp)[`SQL_READER_CLOSE`](./SQL_READER.zh.md) | `int` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_ESCAPE`](./SQL_PARAM.zh.md) | `string` | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_NONQUERY`](./SQL_PARAM.zh.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_READER`](./SQL_PARAM.zh.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_LONG`](./SQL_PARAM.zh.md) | `string`, `string`(, `string`...) | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_STRING`](./SQL_PARAM.zh.md) | `string`, `string`(, `string`...) | `string` |
| ![](../assets/images/IconSK.webp)[`SQL_P_EXECUTE_SCALAR_FLOAT`](./SQL_PARAM.zh.md) | `string`, `string`(, `string`...) | `float` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_MAP_XML`](./SQL_XML.zh.md) | `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_DT_XML`](./SQL_XML.zh.md) | `string`, `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_EXPORT_MAP_XML`](./SQL_XML.zh.md) | `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_EXPORT_DT_XML`](./SQL_XML.zh.md) | `string`, `string`, `string`, `string` | `int` |
| ![](../assets/images/IconSK.webp)[`SQL_IMPORT_XML_CUSTOM`](./SQL_XML.zh.md) | `string`, `string`, `string`, `string`, `string` | `int` |

### 其他 { #misc }

| 函数名                                                                     | 参数                        | 返回值   |
| :------------------------------------------------------------------------- | :-------------------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`RAND`](./RAND.zh.md)                   | `int`(, `int`)              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CLEARTEXTBOX`](./CLEARTEXTBOX.zh.md)   | 无                        | 无     |
| ![](../assets/images/IconEmuera.webp)[`STRDATA`](./STRDATA.zh.md)             | `stringVariable`            | 无     |
| ![](../assets/images/IconEmuera.webp)[`STOPCALLTRAIN`](./STOPCALLTRAIN.zh.md) | 无                        | 无     |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIG`](./GETCONFIG.zh.md)         | `string`                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETCONFIGS`](./GETCONFIG.zh.md)        | `string`                    | `string` |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.zh.md)     | 无                        | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.zh.md)    | 无                        | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.zh.md)             | `string`                    | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.zh.md)             | `string`(, `string`, `int`) | `int`    |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.zh.md)         | 无                        | 无     |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.zh.md)   | 无                        | `int`    |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.zh.md)         | 无                        | `int`    |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.zh.md)              | `string`                    | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.zh.md)              | 无                        | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.zh.md)             | `int`, `int`, `int`         | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.zh.md)           | 无                        | `1`      |
| ![](../assets/images/IconEE.webp)[`GETDOINGFUNCTION`](./GETDOINGFUNCTION.zh.md) | 无                      | `string` |
| ![](../assets/images/IconSK.webp)[`ARGLEN`](./ARGLEN.zh.md)                   | 无                         | `int`    |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE`](./HOTKEY_STATE.zh.md)       | `int`(, `int`)             | `int`    |
| ![](../assets/images/Iconetc.webp)[`HOTKEY_STATE_INIT`](./HOTKEY_STATE.zh.md)  | `int`                      | `int`    |

