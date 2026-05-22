---
hide:
  - toc
---

# PRINTPLAIN

| 函数名                                                                                  | 参数     | 返回值 |
| :-------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconEmuera.webp)[<code>PRINTPLAIN(\|FORM)</code>](./PRINTPLAIN.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    PRINTPLAIN(|FORM) string
    ```
    将参数字符串作为纯文本输出。此时即使存在按钮字符串（如0等）也不会将其按钮化。
    括号内的关键字用于指定参数类型。

    - 不加上`FORM` - <字符串>
    - 加上`FORM` - <格式化字符串>

!!! hint "提示"

    仅支持指令形式。

### 相关项目
- [PRINT](PRINT.zh.md)