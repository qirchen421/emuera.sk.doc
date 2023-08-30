## 命令・式中関数の一覧

### PRINT系

| 関数名                                                                                                                         | 引数                                                         | 戻り値 |
| :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`PRINT(|V|S|FORM|FORMS)(|K|D)(|L|W)`](./PRINT.md) | `string`                                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINTSINGLE(|V|S|FORM|FORMS)(|K|D)`](./PRINTSINGLE.md)                                  | `string`                                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINT(|FORM)(C|LC)(|K|D)`](./PRINTC.md)                                                 | `string`                                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINTDATA(|K|D)(|L|W)`](./PRINTDATA.md)                                                 | なし                                                         | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINTBUTTON(|C|LC)`](./PRINTBUTTON.md)                                                  | `string`, `any`                                              | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINTPLAIN(|FORM)`](./PRINTPLAIN.md)                                                    | `string`                                                     | なし   |
| ![](../assets/images/Iconeramaker.webp)[`DRAWLINE`](./DRAWLINE.md)                                                             | なし                                                         | なし   |
| ![](../assets/images/IconEmuera.webp)[`CUSTOMDRAWLINE`](./CUSTOMDRAWLINE.md)                                                   | `string`                                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`DRAWLINEFORM`](./CUSTOMDRAWLINE.md)                                                     | `formedString`                                               | なし   |
| ![](../assets/images/IconEmuera.webp)[`REUSELASTLINE`](./REUSELASTLINE.md)                                                     | `string`                                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`CLEARLINE`](./CLEARLINE.md)                                                             | `int`                                                        | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ABL`](./PRINT_STATUS.md)                                                        | `int`                                                        | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_TALENT`](./PRINT_STATUS.md)                                                     | `int`                                                        | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_MARK`](./PRINT_STATUS.md)                                                       | `int`                                                        | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_EXP`](./PRINT_STATUS.md)                                                        | `int`                                                        | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_PALAM`](./PRINT_STATUS.md)                                                      | `int`                                                        | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_ITEM`](./PRINT_STATUS.md)                                                       | なし                                                         | なし   |
| ![](../assets/images/Iconeramaker.webp)[`PRINT_SHOPITEM`](./PRINT_STATUS.md)                                                   | なし                                                         | なし   |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`PRINT_IMG`](./PRINT_IMG.md)                            | `string`                                                     | なし   |
|                                                                                                                                | `string`, `int`, `int`, `int`                                | なし   |
|                                                                                                                                | `string`, `string`, `int`, `int`, `int`                      | なし   |
|                                                                                                                                | `string`, `string`, `2DIntegerVariable`, `int`, `int`, `int` | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINT_RECT`](./PRINT_RECT.md)                                                           | `int`                                                        | なし   |
|                                                                                                                                | `int`, `int`, `int`, `int`                                   | なし   |
| ![](../assets/images/IconEmuera.webp)[`PRINT_SPACE`](./PRINT_SPACE.md)                                                         | `int`                                                        | なし   |

### HTML系

| 関数名                                                                   | 引数              | 戻り値   |
| :----------------------------------------------------------------------- | :---------------- | :------- |
| ![](../assets/images/IconEmuera.webp)[`HTML_TAGSPLIT`](./HTML_TAGSPLIT.md) | `string`(, `integerVariable`, `stringVariable`)   | `int`, `string` |
| ![](../assets/images/IconEmuera.webp)[`HTML_POPPRINTINGSTR`](./HTML_POPPRINTINGSTR.md)    | `void`| `string`|
| ![](../assets/images/IconEmuera.webp)[`HTML_GETPRINTEDSTR`](./HTML_GETPRINTEDSTR.md) | `int`| `string`|
| ![](../assets/images/IconEmuera.webp)[`HTML_ESCAPE`](./HTML_ESCAPE.md) | `string` | `string`|
| ![](../assets/images/IconEmuera.webp)[`HTML_TOPLAINTEXT`](./HTML_TOPLAINTEXT.md) | `string` | `string`|
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int`   | `string` |

### 表示操作・フォント操作・表示仕様参照

| 関数名                                                                           | 引数                  | 戻り値   |
| :------------------------------------------------------------------------------- | :-------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`BAR`](./BAR.md)                         | `int`, `int`, `int`   | なし     |
| ![](../assets/images/Iconeramaker.webp)[`BARL`](./BAR.md)                        | `int`, `int`, `int`   | なし     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLOR`](./SETCOLOR.md)                 | `int`, `int`, `int`   | なし     |
|                                                                                  | `int`                 | なし     |
| ![](../assets/images/IconEmuera.webp)[`RESETCOLOR`](./SETCOLOR.md)               | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLOR`](./SETBGCOLOR.md)             | `int`, `int`, `int`   | なし     |
|                                                                                  | `int`                 | なし     |
| ![](../assets/images/IconEmuera.webp)[`RESETBGCOLOR`](./SETBGCOLOR.md)           | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`SETCOLORBYNAME`](./SETCOLORBYNAME.md)     | `colorName`           | なし     |
| ![](../assets/images/IconEmuera.webp)[`SETBGCOLORBYNAME`](./SETCOLORBYNAME.md)   | `colorName`           | なし     |
| ![](../assets/images/IconEmuera.webp)[`GETCOLOR`](./GETCOLOR.md)                 | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETBGCOLOR`](./GETCOLOR.md)               | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFCOLOR`](./GETCOLOR.md)              | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETDEFBGCOLOR`](./GETCOLOR.md)            | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETFOCUSCOLOR`](./GETCOLOR.md)            | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FONTBOLD`](./FONT_OPERATION.md)           | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`FONTITALIC`](./FONT_OPERATION.md)         | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`FONTSTYLE`](./FONT_OPERATION.md)          | `int`                 | なし     |
| ![](../assets/images/IconEmuera.webp)[`FONTREGULAR`](./FONT_OPERATION.md)        | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`GETSTYLE`](./FONT_OPERATION.md)           | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKFONT`](./SETFONT.md)                   | `string`              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SETFONT`](./SETFONT.md)                   | `string`              | なし     |
| ![](../assets/images/IconEmuera.webp)[`GETFONT`](./SETFONT.md)                   | なし                  | `string` |
| ![](../assets/images/IconEmuera.webp)[`FORCEKANA`](./FORCEKANA.md)               | `int`                 | なし     |
| ![](../assets/images/IconEmuera.webp)[`ALIGNMENT`](./ALIGNMENT.md)               | `keyword`             | なし     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTALIGN`](./ALIGNMENT.md)            | なし                  | `string` |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.md)                     | `int`                 | なし     |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.md)              | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`PRINTCPERLINE`](./PRINTCPERLINE.md)       | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.md)           | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`BARSTR`](./BARSTR.md)                     | `int`, `int`, `int`   | `string` |
| ![](../assets/images/IconEmuera.webp)[`MONEYSTR`](./MONEYSTR.md)                 | `int`, `option`       | `string` |
| ![](../assets/images/IconEmuera.webp)[`SKIPDISP`](./SKIP_RELATE.md)              | `int`                 | なし     |
| ![](../assets/images/IconEmuera.webp)[`NOSKIP`](./SKIP_RELATE.md)                | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`ENDNOSKIP`](./SKIP_RELATE.md)             | なし                  | なし     |
| ![](../assets/images/IconEmuera.webp)[`ISSKIP`](./SKIP_RELATE.md)                | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MOUSESKIP`](./SKIP_RELATE.md)             | なし                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`MESSKIP`](./SKIP_RELATE.md)               | なし                  | `int`    |
| ![](../assets/images/IconEE.webp)[`SKIPLOG`](./SKIPLOG.md)                       | `int`                 | `void`   |
| ![](../assets/images/IconEE.webp)[`GETDISPLAYLINE`](./GETDISPLAYLINE.md)         | `int`                 | `string` |

### 文字列操作・参照

| 関数名                                                             | 引数                                              | 戻り値   |
| :----------------------------------------------------------------- | :------------------------------------------------ | :------- |
| ![](../assets/images/IconEmuera.webp)[`TOUPPER`](./TOUPPER.md)     | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOLOWER`](./TOUPPER.md)     | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOHALF`](./TOUPPER.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOFULL`](./TOUPPER.md)      | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOSTR`](./TOSTR.md)         | `int`, `option`                                   | `string` |
| ![](../assets/images/IconEmuera.webp)[`TOINT`](./TOINT.md)         | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`ISNUMERIC`](./TOINT.md)     | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLEN`](./STRLEN.md)       | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENS`](./STRLEN.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORM`](./STRLEN.md)   | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENU`](./STRLEN.md)      | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENSU`](./STRLEN.md)     | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRLENFORMU`](./STRLEN.md)  | `string`                                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRING`](./SUBSTRING.md) | `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`SUBSTRINGU`](./SUBSTRING.md)| `string`, `int`, `int`                            | `string` |
| ![](../assets/images/IconEmuera.webp)[`CHARATU`](./CHARATU.md)     | `string`, `int`                                   | `string` |
| ![](../assets/images/IconEmuera.webp)[`STRFIND`](./STRFIND.md)     | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRFINDU`](./STRFIND.md)    | `string`, `string`(, `int`)                       | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRCOUNT`](./STRCOUNT.md)   | `string`, `string`                                | `int`    |
| ![](../assets/images/IconEmuera.webp)[`SPLIT`](./SPLIT.md)         | `string`, `string`, `stringArray`                 | `int`    |
| ![](../assets/images/IconEmuera.webp)[`STRJOIN`](./SPLIT.md)       | `stringArray`(, `string`, `int`, `int`)           | `string` |
| ![](../assets/images/IconEmuera.webp)[`REPLACE`](./REPLACE.md)     | `string`, `string`, `string`                      | `string` |
| ![](../assets/images/IconEmuera.webp)[`ESCAPE`](./ESCAPE.md)       | `string`                                          | `string` |
| ![](../assets/images/IconEmuera.webp)[`UNICODE`](./UNICODE.md)     | `int`                                             | `string` |
| ![](../assets/images/IconEmuera.webp)[`ENCODETOUNI`](./UNICODE.md) | `string`                                          | `int`    |
| ![](../assets/images/IconEM.webp)[`REGEXPMATCH`](./REGEXPMATCH.md) | `string`, `string`(, `int`)                       | `int`    |
|                                                                    | `string`, `string`, `ref` `int`, `ref` `string[]` | `int`    |

### 算術

| 関数名                                                                 | 引数                                 | 戻り値 |
| :--------------------------------------------------------------------- | :----------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`TIMES`](./TIMES.md)           | `int`, `float`                       | なし   |
| ![](../assets/images/IconEmuera.webp)[`POWER`](./POWER.md)             | `integerVariable`, `int`, `int`      | `int`  |
|                                                                        | `int`, `int`                         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ABS`](./ABS.md)                 | `int`                                | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SIGN`](./ABS.md)                | `int`                                | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SQRT`](./SQRT.md)               | `int`                                | `int`  |
| ![](../assets/images/IconEmuera.webp)[`GETBIT`](./BIT_OPERATION.md)    | `int`, `int`                         | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SETBIT`](./BIT_OPERATION.md)    | `integerVariable`, `int`(, `int`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`CLEARBIT`](./BIT_OPERATION.md)  | `integarVariable`, `int`(, `int`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`INVERTBIT`](./BIT_OPERATION.md) | `integarVariable`, `int`(, `int`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`MAX`](./MAX.md)                 | `int`(, `int`...)                    | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MIN`](./MAX.md)                 | `int`(, `int`...)                    | `int`  |
| ![](../assets/images/IconEmuera.webp)[`LIMIT`](./MAX.md)               | `int`, `int`, `int`                  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`INRANGE`](./MAX.md)             | `int`, `int`, `int`                  | `int`  |

### キャラ操作・参照

| 関数名                                                                                                  | 引数                                     | 戻り値 |
| :------------------------------------------------------------------------------------------------------ | :--------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`ADDCHARA`](./ADDCHARA.md) | `int`(, `int`,...)                       | なし   |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`DELCHARA`](./DELCHARA.md) | `int`(, `int`,...)                       | なし   |
| ![](../assets/images/IconEmuera.webp)[`SWAPCHARA`](./SWAPCHARA.md)                                      | `int`, `int`                             | なし   |
| ![](../assets/images/IconEmuera.webp)[`SORTCHARA`](./SORTCHARA.md)                                      | `charaVariable`, `keyword`               | なし   |
| ![](../assets/images/IconEmuera.webp)[`GETCHARA`](./GETCHARA.md)                                        | `int`                                    | `int`  |
| ![](../assets/images/IconEmuera.webp)[`ADDDEFCHARA`](./ADDDEFCHARA.md)                                  | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`ADDVOIDCHARA`](./ADDVOIDCHARA.md)                                | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`DELALLCHARA`](./DELALLCHARA.md)                                  | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`PICKUPCHARA`](./PICKUPCHARA.md)                                  | `int`(, `int`...)                        | なし   |
| ![](../assets/images/IconEmuera.webp)[`EXISTCSV`](./EXISTCSV.md)                                        | `int`                                    | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDCHARA`](./FINDCHARA.md)                                      | `charaVariable`, `int`(, `int`, `int`)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTCHARA`](./FINDCHARA.md)                                  | `charaVariable`, `int`(, `int`, `int`)   | `int`  |
| ![](../assets/images/IconEmuera.webp)[`COPYCHARA`](./COPYCHARA.md)                                      | `int`, `int`                             | なし   |
| ![](../assets/images/IconEmuera.webp)[`ADDCOPYCHARA`](./ADDCOPYCHARA.md)                                | `int`                                    | なし   |

### 変数操作・変数参照・CSV参照

| 関数名                                                                     | 引数                                          | 戻り値   |
| :------------------------------------------------------------------------- | :-------------------------------------------- | :------- |
| ![](../assets/images/Iconeramaker.webp)[`UPCHECK`](./UPCHECK.md)           | なし                                          | なし     |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE`](./VARSIZE.md)             | `variable`                                    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSIZE()`](./VARSIZE.md)           | `variable`(, `dimension`)                     | `int`    |
| ![](../assets/images/IconEmuera.webp)[`RESETDATA`](./RESETDATA.md)         | なし                                          | なし     |
| ![](../assets/images/IconEmuera.webp)[`RESETGLOBAL`](./RESETGLOBAL.md)     | なし                                          | なし     |
| ![](../assets/images/IconEmuera.webp)[`RESET_STAIN`](./RESET_STAIN.md)     | `int`                                         | なし     |
| ![](../assets/images/IconEmuera.webp)[`SWAP`](./SWAP.md)                   | `variable`, `variable`                        | なし     |
| ![](../assets/images/IconEmuera.webp)[`CSVNAME`](./CSVNAME.md)             | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVCALLNAME`](./CSVNAME.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVNICKNAME`](./CSVNAME.md)         | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVMASTERNAME`](./CSVNAME.md)       | `int`                                         | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVBASE`](./CSV_STATUS.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVCSTR`](./CSV_STATUS.md)          | `int`, `int`                                  | `string` |
| ![](../assets/images/IconEmuera.webp)[`CSVABL`](./CSV_STATUS.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVTALENT`](./CSV_STATUS.md)        | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVMARK`](./CSV_STATUS.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEXP`](./CSV_STATUS.md)           | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVRELATION`](./CSV_STATUS.md)      | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVJUEL`](./CSV_STATUS.md)          | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CSVEQUIP`](./CSV_STATUS.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CFLAG`](./CSV_STATUS.md)            | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETNUM`](./GETNUM.md)               | `variable`, `string`                          | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETPALAMLV`](./GETPALAMLV.md)       | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`GETEXPLV`](./GETPALAMLV.md)         | `int`, `int`                                  | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDELEMENT`](./FINDELEMENT.md)     | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FINDLASTELEMENT`](./FINDELEMENT.md) | `variable`, `value`(, `int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEmuera.webp)[`VARSET`](./VARSET.md)               | `variable`(, `value`, `int`, `int`)           | なし     |
| ![](../assets/images/IconEmuera.webp)[`CVARSET`](./CVARSET.md)             | `charaVariable`(, `int`, `int`, `int`, `int`) | なし     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSHIFT`](./ARRAYSHIFT.md)       | `variable`, `int`, `value`(, `int`, `int`)    | なし     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYREMOVE`](./ARRAYREMOVE.md)     | `variable`, `int`, `int`                      | なし     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYSORT`](./ARRAYSORT.md)         | `variable`(, `sortFormat`, `int`, `int`)      | なし     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYCOPY`](./ARRAYCOPY.md)         | `varible`, `variable`                         | なし     |
| ![](../assets/images/IconEmuera.webp)[`ARRAYMSORT`](./ARRAYMSORT.md)       | `variable`(, `variable`...)                   | なし     |
| ![](../assets/images/IconEmuera.webp)[`CUPCHECK`](./CUPCHECK.md)           | `int`                                         | なし     |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`EXISTVAR`](./EXISTVAR.md)               | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCBEGINSWITH`](./ENUMFUNC.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCENDSWITH`](./ENUMFUNC.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFUNCWITH`](./ENUMFUNC.md)           | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARBEGINSWITH`](./ENUMVAR.md)       | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARENDSWITH`](./ENUMVAR.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMVARWITH`](./ENUMVAR.md)             | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROBEGINSWITH`](./ENUMMACRO.md)   | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROENDSWITH`](./ENUMMACRO.md)     | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMMACROWITH`](./ENUMMACRO.md)         | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.md)                | `string`                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.md)               | `string`                                      | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.md)                | `string`, `any`                               | `1`      |
| ![](../assets/images/IconEM.webp)[`VARSETEX`](./VARSETEX.md)               | `string`, `any`(, `int`, `int`, `int`)        | `1`      |
| ![](../assets/images/IconEM.webp)[`ARRAYMSORTEX`](./ARRAYMSORTEX.md)       | `string`, `ref` `string[]`(, `int`, `int`)    | `1`      |
|                                                                            | `ref` `int`, `ref` `string[]`(, `int`, `int`) | `1`      |
| ![](../assets/images/IconEE.webp)[`ERDNAME`](./ERDNAME.md)                 | `variable`, `int`(, `int`)                    | `string` |

### セーブデータ操作

| 関数名                                                                                              | 引数                     | 戻り値           |
| :-------------------------------------------------------------------------------------------------- | :----------------------- | :--------------- |
| ![](../assets/images/Iconeramaker.webp)[`PUTFORM`](./PUTFORM.md)                                    | `string`   | なし   |
| ![](../assets/images/IconEmuera.webp)[`SAVEDATA`](./SAVEDATA.md)                                    | `int`, `string` | なし   |
| ![](../assets/images/IconEmuera.webp)[`LOADDATA`](./LOADDATA.md)                                    | `int`| なし   |
| ![](../assets/images/IconEmuera.webp)[`DELDATA`](./DELDATA.md)                                      | `int`| なし   |
| ![](../assets/images/IconEmuera.webp)[`CHKDATA`](./CHKDATA.md)                                      | `int`| `int`  |
| ![](../assets/images/IconEmuera.webp)[`SAVENOS`](./SAVENOS.md)                                      | `int`| `int`  |
| ![](../assets/images/IconEmuera.webp)[`SAVEGLOBAL`](./SAVEGLOBAL.md)                                | なし | なし   |
| ![](../assets/images/IconEmuera.webp)[`LOADGLOBAL`](./LOADGLOBAL.md)                                | なし | `int`  |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEE.webp)[`OUTPUTLOG`](./OUTPUTLOG.md) | (`string`) | なし   |
| ![](../assets/images/IconEmuera.webp)[`SAVECHARA`](./SAVECHARA.md)                                  | `string`, `string`, `int`(, `int`...) | なし   |
| ![](../assets/images/IconEmuera.webp)[`LOADCHARA`](./LOADCHARA.md)                                  | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`CHKCHARADATA`](./CHKCHARADATA.md)                            | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)[`FIND_CHARADATA`](./FIND_CHARADATA.md)                        | `string`                              | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`SAVETEXT`](./SAVETEXT.md)   | `string`, `int`(, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEmuera.webp)![](../assets/images/IconEM.webp)[`LOADTEXT`](./LOADTEXT.md)   | `int`(, `int`, `int`)                 | `string` |


### 日付・時刻取得

| 関数名                                                                       | 引数 | 戻り値           |
| :--------------------------------------------------------------------------- | :--- | :--------------- |
| ![](../assets/images/IconEmuera.webp)[`GETTIME`](./GETTIME.md)               | なし | `int`, `string`  |
| ![](../assets/images/IconEmuera.webp)[`GETTIME()`](./GETTIME.md)             | なし | `int`            |
| ![](../assets/images/IconEmuera.webp)[`GETTIMES()`](./GETTIME.md)            | なし | `string`         |
| ![](../assets/images/IconEmuera.webp)[`GETMILLISECOND`](./GETMILLISECOND.md) | なし | `int`            |
| ![](../assets/images/IconEmuera.webp)[`GETSECOND`](./GETSECOND.md)           | なし | `int`            |

### 入力・ウェイト

| 関数名                                                                     | 引数                                        | 戻り値           |
| :------------------------------------------------------------------------- | :------------------------------------------ | :--------------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.md)               | (`int`, `int`, `int`)                       | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.md)              | (`int`, `int`, `int`)                       | `void`           |
| ![](../assets/images/Iconeramaker.webp)[`WAIT`](./WAIT.md)                 | なし                                        | `void`           |
| ![](../assets/images/IconEmuera.webp)[`FORCEWAIT`](./FORCEWAIT.md)         | なし                                        | なし             |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.md)               | `int`, `int`(, `int`, `string`, `int`)      | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.md)              | `int`, `int`(, `int`, `string`, `int`)      | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TWAIT`](./TWAIT.md)                 | `int`, `int`                                | なし             |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUT`](./ONEINPUT.md)           | `int`(, `int`)                              | `int`            |
| ![](../assets/images/IconEmuera.webp)[`ONEINPUTS`](./ONEINPUT.md)          | `string`(, `int`)                           | `string`         |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.md)         | `int`, `int`(, `int`, `string`, `int`)      | `int`            |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.md)        | `int`, `string`(, `int`, `string`, `int`)   | `string`         |
| ![](../assets/images/IconEmuera.webp)[`WAITANYKEY`](./WAITANYKEY.md)       | なし                                        | なし             |
| ![](../assets/images/IconEmuera.webp)[`INPUTMOUSEKEY`](./INPUTMOUSEKEY.md) | `int`                                       | `int`            |
| ![](../assets/images/IconEE.webp)[`INPUTANY`](./INPUTANY.md)               | なし                                        | `int` / `string` |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.md)                   | (`int`, `int`, `int`)                       | `int`            |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.md)                  | (`string`, `int`, `int`)                    | `string`         |

### ループ・分岐構文

| 関数名                                                                      | 引数                                     | 戻り値 |
| :-------------------------------------------------------------------------- | :--------------------------------------- | :----- |
| ![](../assets/images/Iconeramaker.webp)[`(S)IF-ELSEIF-ELSE-ENDIF`](./IF.md) | `operand`                                | なし   |
| ![](../assets/images/Iconeramaker.webp)[`REPEAT`](./REPEAT.md)              | `int`                                    | なし   |
| ![](../assets/images/Iconeramaker.webp)[`REND`](./REPEAT.md)                | なし                                     | なし   |
| ![](../assets/images/Iconeramaker.webp)[`CONTINUE`](./CONTINUE.md)          | なし                                     | なし   |
| ![](../assets/images/Iconeramaker.webp)[`BREAK`](./CONTINUE.md)             | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.md)                      | `integerVariable`, `int`, `int`(, `int`) | なし   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.md)                     | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.md)                  | `int`                                    | なし   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.md)                   | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.md)                        | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.md)                      | `int`                                    | なし   |
| ![](../assets/images/IconEmuera.webp)[`SELECTCASE`](./SELECTCASE.md)        | `any`                                    | なし   |
| ![](../assets/images/IconEmuera.webp)[`CASE`](./SELECTCASE.md)              | `any`                                    | なし   |
| ![](../assets/images/IconEmuera.webp)[`CASEELSE`](./SELECTCASE.md)          | なし                                     | なし   |
| ![](../assets/images/IconEmuera.webp)[`ENDSELECT`](./SELECTCASE.md)         | なし                                     | なし   |

### 乱数制御

| 関数名                                                             | 引数  | 戻り値 |
| :----------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`RANDOMIZE`](./RANDOMIZE.md) | `int` | なし   |
| ![](../assets/images/IconEmuera.webp)[`DUMPRAND`](./RANDOMIZE.md)  | なし  | なし   |
| ![](../assets/images/IconEmuera.webp)[`INITRAND`](./RANDOMIZE.md)  | なし  | なし   |

### デバッグ補助・システムフロー制御

| 関数名                                                                                   | 引数                  |
| :--------------------------------------------------------------------------------------- | :-------------------- |
| ![](../assets/images/Iconeramaker.webp)[`SAVEGAME`](./SAVEGAME.md)                       | なし                  |
| ![](../assets/images/Iconeramaker.webp)[`LOADGAME`](./SAVEGAME.md)                       | なし                  |
| ![](../assets/images/Iconeramaker.webp)[`BEGIN`](./BEGIN.md)                             | `idenetifier`         |
| ![](../assets/images/Iconeramaker.webp)[`QUIT`](./QUIT.md)                               | なし                  |
| ![](../assets/images/IconEmuera.webp)[`CALLTRAIN`](./CALLTRAIN.md)                       | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.md)                           | `int`                 |
| ![](../assets/images/IconEmuera.webp)[`THROW`](./THROW.md)                               | `string`              |
| ![](../assets/images/IconEE.webp)[`QUIT_AND_RESTART`](./QUIT_AND_RESTART.md)             | なし                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT`](./FORCE_QUIT.md)                         | なし                  |
| ![](../assets/images/IconEE.webp)[`FORCE_QUIT_AND_RESTART`](./FORCE_QUIT_AND_RESTART.md) | なし                  |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md)                       | `identifier`          |
| ![](../assets/images/IconEE.webp)[`FLOWINPUT`](./FLOWINPUT.md)                           | `int`(, `int`, `int`) |

### ツールチップ系

| 関数名                                                                           | 引数     |
| :------------------------------------------------------------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_CUSTOM`](./TOOLTIP_EXTENSION.md)      | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONT`](./TOOLTIP_EXTENSION.md)     | `string` |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_SETFONTSIZE`](./TOOLTIP_EXTENSION.md) | `int`    |
| ![](../assets/images/IconEE.webp)[`TOOLTIP_FORMAT`](./TOOLTIP_EXTENSION.md)      | `int`    |

### 関数系（CALL等）

| 関数名                                                                 | 引数           |
| :--------------------------------------------------------------------- | :------------- |
| ![](../assets/images/Iconeramaker.webp)[`CALL`](./CALL.md)    | `functionName` |
| ![](../assets/images/Iconeramaker.webp)[`JUMP`](./JUMP.md) | `functionName`   | なし   |
| ![](../assets/images/Iconeramaker.webp)[`GOTO`](./GOTO.md) | `labelName`   | なし   |
| ![](../assets/images/Iconeramaker.webp)[`RESTART`](./RESTART.md) | なし | なし   |
| ![](../assets/images/IconEE.webp)[`EXISTFUNCTION`](./EXISTFUNCTION.md) | `string`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLF`](./TRYCALLF.md)           | `functionName`       |
| ![](../assets/images/IconEE.webp)[`TRYCALLFORMF`](./TRYCALLFORMF.md)   | `formedString` |

### RETURN系

| 関数名                                                                 | 引数           |
| :--------------------------------------------------------------------- | :------------- |
| ![](../assets/images/Iconeramaker.webp)![](../assets/images/IconEmuera.webp)[`RETURN`](./RETURN.md) | `int`(, `int`,...)     | `引数に同じ`              |
| ![](../assets/images/IconEmuera.webp)[`RETURNFORM`](./RETURN.md)                                    | `strng`(, `string`,...)| `引数に同じ(数値型に変換)`|

### AWAIT関連

| 関数名                                                   | 引数 | 戻り値   |
| :--------------------------------------------------------| :--- | :------- |
| ![](../assets/images/IconEE.webp)[`MOUSEB`](./MOUSEB.md) | なし | `string` |

### 画像処理関連

| 関数名                                                                       | 引数                                | 戻り値   |
| :--------------------------------------------------------------------------- | :---------------------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`GDRAWTEXT`](./GDRAWTEXT.md)               | `int`, `string`(, `int`, `int`)     | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONT`](./GGETFONT.md)                 | `int`                               | `string` |
| ![](../assets/images/IconEE.webp)[`GGETFONTSIZE`](./GGETFONTSIZE.md)         | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETFONTSTYLE`](./GGETFONTSTYLE.md)       | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETTEXTSIZE`](./GGETTEXTSIZE.md)         | `string`, `string`, `int`(, `int`)  | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWGWITHROTATE`](./GDRAWGWITHROTATE.md) | `int`, `int`, `int`(, `int`, `int`) | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPEN`](./GGETPEN.md)                   | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETPENWIDTH`](./GGETPENWIDTH.md)         | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GGETBRUSH`](./GGETBRUSH.md)               | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`SPRITEDISPOSEALL`](./SPRITEDISPOSEALL.md) | `int`                               | `int`    |
| ![](../assets/images/IconEE.webp)[`GDRAWLINE`](./GDRAWLINE.md)               | `int`, `int`, `int`, `int`, `int`   | `int`    |
| ![](../assets/images/IconEE.webp)[`GDASHSTYLE`](./GDASHSTYLE.md)             | `int`, `int`, `int`                 | `int`    |

### サウンド系

| 関数名                                                                   | 引数     | 戻り値 |
| :----------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`PLAYSOUND`](./PLAYSOUND.md)           | `string` | なし   |
| ![](../assets/images/IconEE.webp)[`STOPSOUND`](./STOPSOUND.md)           | なし     | なし   |
| ![](../assets/images/IconEE.webp)[`PLAYBGM`](./PLAYBGM.md)               | `string` | なし   |
| ![](../assets/images/IconEE.webp)[`STOPBGM`](./STOPBGM.md)               | なし     | なし   |
| ![](../assets/images/IconEE.webp)[`EXISTSOUND`](./EXISTSOUND.md)         | `string` | `int`  |
| ![](../assets/images/IconEE.webp)[`SETSOUNDVOLUME`](./SETSOUNDVOLUME.md) | `int`    | なし   |
| ![](../assets/images/IconEE.webp)[`SETBGMVOLUME`](./SETBGMVOLUME.md)     | `int`    | なし   |

### XML系

| 関数名                                                                                    | 引数                                                         | 戻り値   |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`XML_DOCUMENT`](./XML_MANAGE.md)                        | `any`, `string`                                              | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_RELEASE`](./XML_MANAGE.md)                         | `any`                                                        | `1`      |
| ![](../assets/images/IconEM.webp)[`XML_EXIST`](./XML_MANAGE.md)                           | `any`                                                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET`](./XML_GET.md)                                | `any`, `string`(, `int`, `int`)                              | `int`    |
|                                                                                           | `any`, `string`, `ref` `string[]`(, `int`)                   | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_GET_BYNAME`](./XML_GET.md)                         | `string`, `string`(, `int`, `int`)                           | `int`    |
|                                                                                           | `string`, `string`, `ref` `string[]`(, `int`)                | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET`](./XML_SET.md)                                | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_SET_BYNAME`](./XML_SET.md)                         | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_TOSTR`](./XML_TOSTR.md)                            | `any`                                                        | `string` |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE`](./XML_ADDNODE.md)                        | `int`, `string`, `string`(, `int`, `int`)                    | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`, `int`)           | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDNODE_BYNAME`](./XML_ADDNODE.md)                 | `string`, `string`, `string`(, `int`, `int`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE`](./XML_REMOVENODE.md)                  | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVENODE_BYNAME`](./XML_REMOVENODE.md)           | `string`, `string`(, `int`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE`](./XML_REPLACE.md)                        | `int`, `string`                                              | `int`    |
|                                                                                           | `int`, `string`, `string`(, `int`)                           | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `int`)                  | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REPLACE_BYNAME`](./XML_REPLACE.md)                 | `string`, `string`, `string`(, `int`)                        | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE`](./XML_ADDATTRIBUTE.md)              | `int`, `string`, `string`(, `string`, `int`, `int`)          | `int`    |
|                                                                                           | `ref` `string`, `string`, `string`(, `string`, `int`, `int`) | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_ADDATTRIBUTE_BYNAME`](./XML_ADDATTRIBUTE.md)       | `string`, `string`, `string`(, `string`, `int`, `int`)       | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE`](./XML_REMOVEATTRIBUTE.md)        | `int`, `string`(, `int`)                                     | `int`    |
|                                                                                           | `ref` `string`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`XML_REMOVEATTRIBUTE_BYNAME`](./XML_REMOVEATTRIBUTE.md) | `string`, `string`(, `int`)                                  | `int`    |

### MAP（連想配列）系

| 関数名                                                                   | 引数                              | 戻り値   |
| :----------------------------------------------------------------------- | :-------------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`MAP_CREATE`](./MAP_MANAGE.md)         | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_EXIST`](./MAP_MANAGE.md)          | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_RELEASE`](./MAP_MANAGE.md)        | `string`                          | `1`      |
| ![](../assets/images/IconEM.webp)[`MAP_GET`](./MAP_OPERATION.md)         | `string`, `string`                | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_HAS`](./MAP_OPERATION.md)         | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SET`](./MAP_OPERATION.md)         | `string`, `string`, `string`      | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_REMOVE`](./MAP_OPERATION.md)      | `string`, `string`                | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_SIZE`](./MAP_OPERATION.md)        | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_CLEAR`](./MAP_OPERATION.md)       | `string`                          | `int`    |
| ![](../assets/images/IconEM.webp)[`MAP_GETKEYS`](./MAP_GETKEYS.md)       | `string`                          | `string` |
|                                                                          | `string`, `int`                   | `string` |
|                                                                          | `string`, `ref` `string[]`, `int` | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_TOXML`](./MAP_SERIALIZATION.md)   | `string`                          | `string` |
| ![](../assets/images/IconEM.webp)[`MAP_FROMXML`](./MAP_SERIALIZATION.md) | `string`, `string`                | `int`    |

### DataTable（データベース）系

| 関数名                                                                 | 引数                                                          | 戻り値   |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| ![](../assets/images/IconEM.webp)[`DT_CREATE`](./DT_MANAGE.md)         | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_EXIST`](./DT_MANAGE.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_RELEASE`](./DT_MANAGE.md)        | `string`                                                      | `1`      |
| ![](../assets/images/IconEM.webp)[`DT_CLEAR`](./DT_MANAGE.md)          | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_NOCASE`](./DT_MANAGE.md)         | `string`, `int`                                               | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_ADD`](./DT_COLUMN.md)     | `string`, `string`(, `any`, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_EXIST`](./DT_COLUMN.md)   | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_REMOVE`](./DT_COLUMN.md)  | `string`, `string`                                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_LENGTH`](./DT_COLUMN.md)  | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_OPTIONS`](./DT_COLUMN.md) | `string`, `string`, `keyword`, `any`([,`keyword`, `any`] ...) | なし     |
| ![](../assets/images/IconEM.webp)[`DT_COLUMN_NAMES`](./DT_COLUMN.md)   | `string`(, `ref` `string[]`)                                  | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_ADD`](./DT_ROW.md)           | `string`([, `string`, `any`] ...)                             | `int`    |
|                                                                        | `string`, `ref` `string[]`, `ref` `any[]`, `int`              | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_SET`](./DT_ROW.md)           | `string`, `int`, `string`, `any`([, `string`, `any`] ...)     | `int`    |
|                                                                        | `string`, `int`, `ref` `string[]`, `ref` `any[]`, `int`       | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_REMOVE`](./DT_ROW.md)        | `string`, `int`                                               | `int`    |
|                                                                        | `string`, `ref` `int[]`, `int`                                | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_ROW_LENGTH`](./DT_ROW.md)        | `string`                                                      | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GET`](./DT_CELL.md)         | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_GETS`](./DT_CELL.md)        | `string`, `int`, `string`(, `int`)                            | `string` |
| ![](../assets/images/IconEM.webp)[`DT_CELL_ISNULL`](./DT_CELL.md)      | `string`, `int`, `string`(, `int`)                            | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_CELL_SET`](./DT_CELL.md)         | `string`, `int`, `string`(, `any`, `int`)                     | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_SELECT`](./DT_SELECT.md)         | `string`(, `string`, `string`, `ref` `int[]`)                 | `int`    |
| ![](../assets/images/IconEM.webp)[`DT_TOXML`](./DT_SERIALIZATION.md)   | `string`(, `ref` `string`)                                    | `string` |
| ![](../assets/images/IconEM.webp)[`DT_FROMXML`](./DT_SERIALIZATION.md) | `string`, `string`, `string`                                  | `int`    |

### その他

| 関数名                                                                   | 引数                        | 戻り値   |
| :----------------------------------------------------------------------- | :-------------------------- | :------- |
| ![](../assets/images/IconEM.webp)[`EXISTFILE`](./EXISTFILE.md)           | `string`                    | `int`    |
| ![](../assets/images/IconEM.webp)[`ENUMFILES`](./ENUMFILES.md)           | `string`(, `string`, `int`) | `int`    |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md)       | なし                        | なし     |
| ![](../assets/images/IconEE.webp)[`GETMEMORYUSAGE`](./GETMEMORYUSAGE.md) | なし                        | `int`    |
| ![](../assets/images/IconEE.webp)[`CLEARMEMORY`](./CLEARMEMORY.md)       | なし                        | `int`    |
| ![](../assets/images/IconEE.webp)[`SETTEXTBOX`](./TEXTBOX.md)            | `string`                    | `1`      |
| ![](../assets/images/IconEE.webp)[`GETTEXTBOX`](./TEXTBOX.md)            | なし                        | `string` |
| ![](../assets/images/IconEM.webp)[`MOVETEXTBOX`](./TEXTBOX.md)           | `int`, `int`, `int`         | `1`      |
| ![](../assets/images/IconEM.webp)[`RESUMETEXTBOX`](./TEXTBOX.md)         | なし                        | `1`      |
