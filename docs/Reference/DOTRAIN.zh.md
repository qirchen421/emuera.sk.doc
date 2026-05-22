---
hide:
  - toc
---

# DOTRAIN

| 函数名                                                         | 参数  | 返回值 |
| :------------------------------------------------------------- | :---- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DOTRAIN`](./DOTRAIN.zh.md) | `int` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    DOTRAIN trainNo
    ```
    强制进行`TRAIN`的命令。  
    仅在`@EVENTTRAIN`、`@SHOW_STATUS`、`@SHOW_USERCOM`、`@USERCOM`、`@EVENTCOMEND`及从这些函数中调用的函数内可用。  
    参数指定的编号对应于`train.csv`中定义的编号。  
    其行为与选择命令时相同：初始化`UP`、`DOWN`等变量，将参数赋值给`SELECTCOM`，调用`@EVENTCOM`，调用`@COM{SELECTCOM}`……依此流程进行。

    若参数小于`0`或大于等于`TRAINNAME`的元素数量，则会发生错误，但除此之外不会进行其他检查。  
    即使参数是`train.csv`中未定义的数字，也会强制尝试执行。  
    此外，不会调用`@COM_ABLE`，而是强制执行。  
    如有必要，请在`DOTRAIN`之前执行如下检查：

    ```  { #language-erbapi }
    SIF ( X < 0 || X >= VARSIZE("TRAINNAME") || TRAINNAME:X == "" )
        RETURN
    RESULT = 1
    TRYCALLFORM COM_ABLE{X}
    SIF RESULT == 0
        RETURN
    DOTRAIN X
    ```
    相反地，也可以使用 `DOTRAIN` 来自行实现 `TRAIN` 命令。  
    例如，将 `train.csv` 留空，通过 `@SHOW_USERCOM` 自行显示，并在 `@USERCOM` 中执行 `DOTRAIN`。  
    或者，也可以不将 `train.csv` 留空，而是让所有的 `@COM_ABLE` 都返回 `0`。  
    除了修改 `@COM_ABLE`，还可以删除所有的 `@COM_ABLE`，并将 [`_replace.csv` 的 `COM_ABLE初始值`](../Emuera/replace.zh.md) 设置为 `0`。  
    另外，如果在 [`CALLTRAIN`](./CALLTRAIN.zh.md) 的处理过程中执行了 `DOTRAIN`，则 `CALLTRAIN` 的剩余部分将无效。

!!! hint "提示"

    仅支持命令。

### 相关项目
- [CALLTRAIN](CALLTRAIN.zh.md)