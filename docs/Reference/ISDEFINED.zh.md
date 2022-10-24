---
hide:
  - toc
---

# ISDEFINED

| 函数名                                                         | 参数     | 返回值 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ISDEFINED macroName
    ```

    如果存在与 `macroName` 同名的宏定义（`#DEFINE XXX`）则返回 `1`，否则返回 `0`。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erh title="DEFINE.ERH" }
    #DEFINE 体力 0
    #DEFINE 精力 1
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM 角色属性, 2 = 1000, 200

        PRINTFORML {ISDEFINED("体力")} {角色属性:体力} ; 此时等效于 {角色属性:0}
        PRINTFORML {ISDEFINED("精力")} {角色属性:精力} ; 此时等效于 {角色属性:1}
        PRINTFORML {ISDEFINED("攻击力")}

        ONEINPUT
    ```
    ``` title="输出结果"
    1 1000
    1 200
    0
    ```
