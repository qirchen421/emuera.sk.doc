---
hide:
  - toc
---

# BINPUT(S)

| 函数名                                                       | 参数                     | 返回值   |
| :----------------------------------------------------------- | :----------------------- | :------- |
| ![](../assets/images/IconEE.webp)[`BINPUT`](./BINPUT.zh.md)     | (`int`, `int`, `int`)    | `int`    |
| ![](../assets/images/IconEE.webp)[`BINPUTS`](./BINPUT.zh.md)    | (`string`, `int`, `int`) | `string` |

!!! info "API"

    ``` { #language-erbapi }
    BINPUT (defaultValue, AllowClick, CanSkip)
    BINPUTS (defaultValue, AllowClick, CanSkip)
    ```

    仅接受在执行时已按钮化的值的 INPUT(S)。  
    并非“仅接受通过按钮输入”，而是“仅接受已按钮化的值”，因此可以在兼顾键盘操作和鼠标操作的同时，排除预期之外的值。  
    如果没有任何按钮，则不会等待输入，而是将默认值放入 RESULT(S)；如果没有默认值，则会发生错误。  
    参数规格与 EM+EE 的 INPUT 扩展相同。

!!! hint "提示"

	由于是命令，因此不能作为表达式中的函数使用。

### 相关项目
* [INPUT](INPUT.zh.md)