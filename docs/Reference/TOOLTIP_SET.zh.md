---
hide:
  - toc
---

# TOOLTIP_SETDELAY, TOOLTIP_SETDURATION

| 函数名                                                                         | 参数    | 返回值 |
| :----------------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDELAY`](./TOOLTIP_SET.md)    | `int`   | 无     |
| ![](../assets/images/IconEmuera.webp)[`TOOLTIP_SETDURATION`](./TOOLTIP_SET.md) | `int`   | 无     |

!!! info "API"

    ```  { #language-erbapi }
    TOOLTIP_SETDELAY milliSecond
    TOOLTIP_SETDURATION milliSecond
    ```
    `TOOLTIP_SETDELAY` 用于设置工具提示显示前的延迟时间，单位为毫秒。
    默认值为 500（毫秒），最大值为 32767。

    `TOOLTIP_SETDURATION` 用于设置工具提示的显示持续时间，单位为毫秒。指定 0 则使用默认显示时间。

!!! hint "提示"

    仅支持作为指令使用。

### 相关项目
- [工具提示扩展功能](TOOLTIP_EXTENSION.md)
- [TOOLTIP_SETCOLOR](TOOLTIP_SETCOLOR.md)