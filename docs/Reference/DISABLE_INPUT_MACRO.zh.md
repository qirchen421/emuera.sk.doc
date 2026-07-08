---
hide:
  - toc
---

# DISABLE_INPUT_MACRO ![](../assets/images/IconSK.webp)

| 函数名                                                         | 参数     | 返回值   |
| :------------------------------------------------------------- | :------- | :------- |
| ![](../assets/images/IconSK.webp)[`DISABLE_INPUT_MACRO`](./DISABLE_INPUT_MACRO.zh.md) | 无 | `integer` |

!!! info "API"

    ```  { #language-erbapi }
	int DISABLE_INPUT_MACRO
    ```
    关闭所有输入（textbox + SEQUENCEINPUT）的宏解析。调用后，输入按字面整段喂入，不再解析 `(...)` 重复宏，不再按 `\n` 拆分，也不再处理 `\e` MesSkip。

    - 默认状态为宏解析开启（与原版 PressEnterKey 一致）
    - 可通过 `ENABLE_INPUT_MACRO` 恢复默认行为
    - 返回值始终为 `0`

!!! warning "注意"

    由于 `CanRestructure = false`，不会成为常量折叠的对象。

### 相关项目
- [ENABLE_INPUT_MACRO](ENABLE_INPUT_MACRO.zh.md)
- [SEQUENCEINPUT](SEQUENCEINPUT.zh.md)
- [INPUT](INPUT.zh.md)
