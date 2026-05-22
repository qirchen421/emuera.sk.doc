---
hide:
  - toc
---

# SETVAR / GETVAR 系列

| 函数名                                                       | 参数            | 返回值   |
| :----------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEM.webp)[`GETVAR`](./GETSETVAR.zh.md)  | `string`        | `int`    |
| ![](../assets/images/IconEM.webp)[`GETVARS`](./GETSETVAR.zh.md) | `string`        | `string` |
| ![](../assets/images/IconEM.webp)[`SETVAR`](./GETSETVAR.zh.md)  | `string`, `any` | `1`      |

!!! info "API"
    
    ``` { #language-erbapi }
    int GETVAR varName
    string GETVARS varName
    1 SETVAR varName, value
    ```

    名为 `varName` 的变量 / 常量的 `GET` / `SET` 函数（常量无法使用 `SET` 修改值）。

    - `GETVAR` 返回 `varName` 表示的整型变量 / 常量的值。
    - `GETVARS` 返回 `varName` 表示的字符串变量 / 常量的值。
    - `SETVAR` 将 `varName` 赋值为 `value`。`value` 的类型必须与该变量原本的类型相同。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erh title="DEFINE.ERH" }
    #DIMS CONST 字符串常量 = "Banana"
    #DIM 整型变量 = 10
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIMS 临时字符串变量 = "local"

        ; PRINTFORML {GETVAR("Foo")} 
        ; 报错："Foo"は解釈できない識別子です
        PRINTFORMS @"{GETVAR("整型变量")} %GETVARS("临时字符串变量")% "
        PRINTSL GETVARS("字符串常量")

        ; SETVAR "字符串常量", "Apple"
        ; 报错："字符串常量"が変数ではありません
        ; SETVAR "整型变量", "Apple"
        ; 报错："整型变量"が文字列型ではありません
        SETVAR "临时字符串变量", "temp"
        PRINTSL 临时字符串变量

        ONEINPUT
    ```
    ``` title="输出结果"
    10 local Banana
    temp
    ```

### 相关项目
- [STRFORM](STRFORM.zh.md)
- [GETMETH,GETMETHS](GETMETH.zh.md)
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — GETVAR/GETVARS/SETVAR 属于第三代"变量反射"