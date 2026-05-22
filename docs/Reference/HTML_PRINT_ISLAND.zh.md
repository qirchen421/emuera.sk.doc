---
hide:
  - toc
---

# HTML_PRINT_ISLAND,HTML_PRINT_ISLAND_CLEAR

| 函数名                                                                                   | 参数     | 返回值 |
| :--------------------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND`](./HTML_PRINT_ISLAND.zh.md)       | `string` | 无     |
| ![](../assets/images/Icondotnet.webp)[`HTML_PRINT_ISLAND_CLEAR`](./HTML_PRINT_ISLAND.zh.md) | `string` | 无     |

!!! info "API"

    ```  { #language-erbapi }
    HTML_PRINT_ISLAND htmlStyleString
    ```
    其标签语法与 [`HTML_PRINT`](HTML_PRINT.zh.md) 相同，但不依赖于行信息。
    由于不依赖于行信息，与普通的 [`PRINT`](PRINT.zh.md) 指令不同，无论滚动多少都不会消失。
    详情请参阅 [`HTML_PRINT` 相关](../Emuera/HTML_PRINT.zh.md) 文档。

!!! hint "提示"

    仅支持指令形式。