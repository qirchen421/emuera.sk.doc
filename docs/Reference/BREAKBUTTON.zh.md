---
hide:
  - toc
---

# BREAKBUTTON

| 函数名                                                         | 参数   | 返回值 |
| :------------------------------------------------------------- | :----- | :----- |
| ![](../assets/images/IconEE.webp)[`BREAKBUTTON`](./BREAKBUTTON.zh.md) | `()`   | 无     |

!!! info "API"

    ``` { #language-erbapi }
	BREAKBUTTON
    ```

    强制更新画面的按钮化状态。  
    通常，按钮化会在每一帧自动进行，但使用此命令可以立即更新按钮化状态。  
    特别适用于动态更改文本后需要立即启用按钮的场景。

!!! hint "提示"

    由于是命令，因此不能作为表达式中的函数使用。  
    无参数。

### 相关项目
* [INPUT](INPUT.zh.md)