---
hide:
  - toc
---

# LINEISEMPTY

| 函数名                                                                 | 参数 | 返回值 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`LINEISEMPTY`](./LINEISEMPTY.zh.md) | 无   | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int LINEISEMPTY
    ```
    判断当前正在[`PRINT`](./PRINT.zh.md)的行是否为空行的指令。  
    在执行此指令时，如果尝试执行`PRINTL`的结果将只是一个空行，则向`RESULT:0`赋值或返回`1`，否则赋值或返回`0`。  
    在使用`PRINTC`系列指令根据条件依次排列按钮时，最后使用此指令可以判断是否有要显示的按钮，如果没有，则可以执行专用的显示处理。

!!! hint "提示"

    同时支持作为指令和表达式函数使用。