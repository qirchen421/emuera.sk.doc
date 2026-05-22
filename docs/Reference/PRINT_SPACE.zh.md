---
hide:
  - toc
---

# PRINT_SPACE

| 函数名                                                                 | 参数 | 返回值 |
| :--------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`PRINT_SPACE`](./PRINT_SPACE.zh.md) | `int`| 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINT_SPACE width
    ```
    创建一个宽度为参数指定字体大小百分比的无内容显示空间。  
    相当于 [`HTML_PRINT` 命令的 `<shape type='space'>` 标签](../Emuera/HTML_PRINT.md#shape)。  
    在 EM+EE 中，现在也可以使用 `px` 单位来指定宽度。

!!! hint "提示"

    仅支持作为命令使用。