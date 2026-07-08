---
hide:
  - toc
---

# ENABLE_INPUT_MACRO ![](../assets/images/IconSK.webp)

| 函数名                                                         | 参数     | 返回值   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`ENABLE_INPUT_MACRO`](./ENABLE_INPUT_MACRO.zh.md) | 无 | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int ENABLE_INPUT_MACRO
    ```
    恢复输入宏解析（默认行为）。调用 `DISABLE_INPUT_MACRO` 后可用此函数恢复原版 PressEnterKey 的宏解析、`\n` 拆分和 `\e` MesSkip 处理。

    - 返回值始终为 `0`

!!! warning "注意"

    由于 `CanRestructure = false`，不会成为常量折叠的对象。

### 相关项目
- [DISABLE_INPUT_MACRO](DISABLE_INPUT_MACRO.zh.md)
- [SEQUENCEINPUT](SEQUENCEINPUT.zh.md)
- [INPUT](INPUT.zh.md)
