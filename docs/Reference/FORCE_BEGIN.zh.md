---
hide:
  - toc
---

# FORCE_BEGIN

| 函数名                                                             | 参数     | 返回值 |
| :----------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEE.webp)[`FORCE_BEGIN`](./FORCE_BEGIN.md) | `string` | `void` |

!!! info "API"

    ``` { #language-erbapi }
    FORCE_BEGIN SystemFuncName
    ```

    忽略流程控制的影响，强制执行 `BEGIN` 命令。

!!! hint "提示"

    只能在命令中使用。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        BEGIN ABLUP

    @SHOW_JUEL
        PRINTL @SHOW_JUEL
        FORCE_BEGIN SHOP

    @EVENTSHOP
        PRINTL @EVENTSHOP

    @SHOW_SHOP
        PRINTL @SHOW_SHOP
        FORCE_BEGIN TURNEND

    @EVENTTURNEND
        PRINTL @EVENTTURNEND
        WAIT

    ```

    ``` title="输出结果"
    @SHOW_JUEL
    @EVENTSHOP
    @SHOW_SHOP
    @EVENTTURNEND
    ```

### 相关项目
- [BEGIN](BEGIN.md)
