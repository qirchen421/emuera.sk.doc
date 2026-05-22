---
hide:
  - toc
---

# ISDEFINED

| 函数名                                                         | 参数     | 返回值 |
| :------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEM.webp)[`ISDEFINED`](./ISDEFINED.zh.md) | `string` | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int ISDEFINED macroName
    ```

    如果定义了与`macroName`同名的宏(`#DEFINE XXX`)，则返回`1`。如果没有定义，则返回`0`。

!!! hint "提示"

    支持指令和表达式内函数两种方式。

!!! example "示例"

    ``` { #language-erh title="DEFINE.ERH" }
    #DEFINE 体力 0
    #DEFINE 气力 1
    ```
    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        #DIM 角色数据, 2 = 1000, 200

        PRINTFORML {ISDEFINED("体力")} {角色数据:体力}
        PRINTFORML {ISDEFINED("气力")} {角色数据:气力}
        PRINTFORML {ISDEFINED("攻击力")}

        ONEINPUT
    ```
    ``` title="结果"
    1 1000
    1 200
    0
    ```

### 相关项目
- [函数・预处理器>表示特殊块的行>\[IF XXX\]](../Emuera/function.md#if-xxxelseif-xxxelseendif)
- [动态解析与反射](../tutorial/dynamic-reflection.zh.md) — ISDEFINED 属于第三代"变量存在检查"