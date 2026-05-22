---
hide:
  - toc
---

# PRINTC 系列

| 函数名                                                                                        | 参数     | 返回值 |
| :-------------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINT(\|FORM)(C\|LC)(\|K\|D)</code>](./PRINTC.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINT(C|L)(|K|D) string
    PRINTFORM(C|L)(|K|D)(|L|W) formedString
    ```
    这是 `PRINTC` 系列命令。
    这些命令会根据配置 [`PRINTC的字符数`](../Emuera/config.md#printc_1)（默认值 25）指定的字符数，通过补充半角空格来对齐并打印字符串。
    此外，在 Emuera 中，对已 `PRINT` 的字符串进行按钮化处理时，会对 `PRINTC` 系列命令进行一些特殊处理。

    第一个括号内的关键字指定参数类型。

    - 无 - <字符串>
    - `FORM` - <格式化字符串>

    第二个括号内的关键字指定对齐方式。

    - `C` - 右对齐（在左侧添加半角空格）
    - `LC` - 左对齐。

    第三个括号内的 `K`、`D` 与 [`PRINT`](./PRINT.zh.md) 系列命令相同。

    !!! hint "提示"

        仅支持命令形式。

    !!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        PRINTC AAA
        PRINT |
        PRINTC BBB
        PRINT |
        PRINTC CCC
        PRINTL |
        PRINTLC DDD
        PRINT |
        PRINTLC EEE
        PRINT |
        PRINTLC FFF
        PRINTL |
        PRINTC GGG
        PRINT |
        PRINTLC HHH
        PRINT |
        PRINTC III
        PRINTW |
    ```
    ``` title="结果"
                            AAA|                      BBB|                      CCC|
    DDD                        |EEE                      |FFF                      |
                            GGG|HHH                      |                      III|

    ```

### 相关项目
- [PRINTCPERLINE](PRINTCPERLINE.zh.md)
- [PRINTCLENGTH](PRINTCLENGTH.zh.md)